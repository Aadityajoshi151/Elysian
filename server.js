const express = require('express');
const fs = require('fs');
require('dotenv').config();
const { MongoClient } = require('mongodb');
const app = express();
const path = require('path');

const uri = 'mongodb://localhost:27017'; // Replace with your MongoDB connection URI
const client = new MongoClient(uri);

// async function connectToDatabase() {
//   console.log("inside db conn")
//   try {
//     await client.connect();
//     console.log('Connected to the database');
//   } catch (error) {
//     console.error('Error connecting to the database:', error);
//   }
// }

// connectToDatabase();

const API_KEY = process.env.ELYSIAN_API_KEY

let elementRoot = null;

// Bookmark tree data structure
let bookmarkTree = null;

// Set the root DOM element
function setElementRoot(elementRootNode) {
    elementRoot = elementRootNode;
}

// Set the bookmark tree data structure
function setBookmarkTree(bookmarkTreeData) {
    bookmarkTree = bookmarkTreeData;
}

// Render the bookmark tree
function render() {
    const root = document.createElement("ul");
    const tree = walkTree(bookmarkTree);
    tree.querySelector("span").innerText = "/"; // Root node has no title
    root.appendChild(tree);
    elementRoot.appendChild(root);
}

// Get selected bookmarks' IDs
function getSelectedBookmarksId() {
    return getSelectedBookmarksIdFrom(elementRoot);
}

// Teardown the bookmark tree from the DOM
function teardown() {
    const bookmarkTreeElement = elementRoot.querySelector("ul");
    if (bookmarkTreeElement) {
        bookmarkTreeElement.remove();
    }
}

// Recursively walk through the bookmark tree
function walkTree(bookmark) {
    let listItem = null;
    if (isExportableNode(bookmark)) {
        listItem = createListItem(bookmark.title, bookmark.id);
        if (bookmark.children) {
            const children = document.createElement("ul");
            for (const child of bookmark.children) {
                const childNode = walkTree(child);
                if (childNode) {
                    children.appendChild(childNode);
                }
            }
            listItem.appendChild(children);
        }
    }
    return listItem;
}

// Check if a node is exportable (i.e., not an empty folder or horizontal line)
function isExportableNode(bookmark) {
    return bookmark.children || bookmark.title;
}

// Placeholder function for creating a list item (should be customized as needed)
function createListItem(title, id) {
    const listItem = document.createElement("li");
    listItem.textContent = title || "(Untitled)";
    listItem.dataset.id = id;
    return listItem;
}

// Placeholder function for getting selected bookmarks' IDs (should be customized as needed)
function getSelectedBookmarksIdFrom(element) {
    const selectedItems = element.querySelectorAll('li.selected');
    return Array.from(selectedItems).map(item => item.dataset.id);
}

// Write bookmark data to a JSON file
function writeDataFile(jsonData) {
    const filePath = path.join(__dirname, 'bookmarks.json');

    // Convert the JSON string back to an object for validation if necessary
    //const data = JSON.stringify(jsonData);

    // Write the data to a JSON file
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf-8');

    console.log(`Bookmarks have been saved to ${filePath}`);
}





function flattenBookmarks(data) {
  console.log("9")
  console.log(data)
  const flattened = [];
  function flattenRecursively(bookmarks, parentId) {
    bookmarks.forEach(bookmark => {
      const flatBookmark = {
        id: bookmark.id,
        parentId: bookmark.parentId,
        title: bookmark.title,
        index: bookmark.index,
        dateAdded: bookmark.dateAdded,
      };
      if (bookmark.url) {
        flatBookmark.url = bookmark.url;
      }
      flattened.push(flatBookmark);
      if (bookmark.children) {
        flattenRecursively(bookmark.children, bookmark.id);
      }
    });
  }
  flattenRecursively(data.bookmarks, 2);
  return flattened;
}

function isAuthorized(key) {
  return (key === API_KEY ? true : false);
}

// Define a function to read the local JSON file
function readDataFile(callback) {
  fs.readFile('bookmarks.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      callback(err, null);
      return;
    }

    // Parse the JSON data
    const jsonData = JSON.parse(data);
    callback(null, jsonData);
  });
}

// function writeDataFile(jsonData, callback) {
//   fs.writeFile('bookmarks.json', JSON.stringify(jsonData), (err) => {
//     if (err) {
//       console.error(err);
//       callback(err);
//       return;
//     }

//     callback(null);
//   });
// }

// Define a GET route to read the local JSON file
app.get('/bookmarks', (req, res) => {
  if (!isAuthorized(req.get("Authorization"))) {
    res.status(401).send('Unauthorized request');
    return;
  }
  readDataFile((err, jsonData) => {
    if (err) {
      res.status(500).send('Error reading data file');
      return;
    }

    // Send the JSON data as the response
    res.status(200).send(jsonData);
  });
});


function readBookmarksFile() {
  fs.readFile('bookmarks.json', 'utf8', (err, data) => {
    console.log(data)
    if (err) {
      console.error(err);
      return;
    }

    // Parse the JSON data
    const jsonData = JSON.parse(data);
    return jsonData;
  });
}

function writeBookmarksFile(bookmarks) {
  const filePath = path.join(__dirname, 'bookmarks.json')
  return new Promise((resolve, reject) => {
      fs.writeFile(filePath, JSON.stringify(bookmarks, null, 2), 'utf-8', (err) => {
          if (err) {
              return reject(new Error('Failed to write bookmarks file'));
          }
          resolve();
      });
  });
}

function addBookmarkToHierarchy(bookmarks, newBookmark) {
  const { id, parentId } = newBookmark;

  function findAndInsert(parentId, bookmarks) {
      for (const bookmark of bookmarks) {
          if (bookmark.id === parentId) {
              if (!bookmark.children) {
                  bookmark.children = [];
              }
              bookmark.children.push(newBookmark);
              return true;
          }
          if (bookmark.children) {
              if (findAndInsert(parentId, bookmark.children)) {
                  return true;
              }
          }
      }
      return false;
  }

  if (!findAndInsert(parentId, bookmarks)) {
      console.error('Parent ID not found');
  }

  return bookmarks;
}

// Define a POST route to add a JSON object to the local JSON file
app.post('/add_bookmark', express.json(), (req, res) => {
  if (!isAuthorized(req.get("Authorization"))) {
    res.status(401).send('Unauthorized request');
    return;
  }
  readDataFile(async (err, jsonData) => {
    if (err) {
      res.status(500).send('Error reading data file');
      return;
    }
    newbookmark = req.body
    console.log(newbookmark)
    try {
      // Read the existing bookmarks file
      const bookmarks = readBookmarksFile();

      console.log(bookmarks)

      // Insert the new bookmark into the correct hierarchical place
      const updatedBookmarks = addBookmarkToHierarchy(bookmarks, newBookmark);

      // Write the updated bookmarks back to the file
      writeDataFile(updatedBookmarks);

      res.status(200).json({ message: 'Bookmark added successfully' });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
  });
});

app.post('/update_bookmark', express.json(), (req, res) => {
  if (!isAuthorized(req.get("Authorization"))) {
    res.status(401).send('Unauthorized request');
    return;
  }
  readDataFile((err, jsonData) => {
    if (err) {
      res.status(500).send('Error reading data file');
      return;
    }

    // Find the object with the specified ID in the data array
    const dataToUpdate = jsonData.find(item => item.id === req.body.id);

    if (!dataToUpdate) {
      res.status(404).send('Data not found');
      return;
    }
    // Update the key-value pair in the object
    if (req.body.url && req.body.title) {  //updating a bookmark
      dataToUpdate.url = req.body.url;
      dataToUpdate.title = req.body.title
    }
    else { //reordering a bookmark
      dataToUpdate.index = req.body.index;
      dataToUpdate.parentId = req.body.parentId;
    }



    // Write the updated JSON data to the file
    writeDataFile(jsonData, (err) => {
      if (err) {
        Data
        res.status(500).send('Error writing data file');
        return;
      }
      // Send a success response
      res.status(200).send('Bookmark updated successfully');
    });
  });
});

app.post('/delete_bookmark', express.json(), (req, res) => {
  //TODO: clean this messy code, change variable names and add comments
  if (!isAuthorized(req.get("Authorization"))) {
    res.status(401).send('Unauthorized request');
    return;
  }
  readDataFile((err, jsonData) => {
    if (err) {
      res.status(500).send('Error reading data file');
      return;
    }
    tobedeleted = []
    parents = []
    function deletebm(bookmarks, id) {
      tobedeleted.push(id)
      for (let i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].id === String(id) || parents.includes(String(bookmarks[i].parentId)) || tobedeleted.includes(String(bookmarks[i].parentId))) {
          tobedeleted.push(bookmarks[i].id)
          if (bookmarks[i].url === undefined) {
            id = deleteparent(jsonData, id)
          }
        }
      }
    }
    function deleteparent(bookmarks, id) {
      for (let j = 0; j < bookmarks.length; j++) {
        if (bookmarks[j].parentId == Number(id)) {
          parents.push(bookmarks[j].id)
          break
        }
      }
      return String(parents.slice(-1))
    }
    deletebm(jsonData, String(req.body.id))
    idstoberemoved = [...new Set(tobedeleted)]
    for (let i = 0; i < idstoberemoved.length; i++) {
      jsonData = jsonData.filter(bookmark => bookmark.id !== String(idstoberemoved[i]));
    }
    writeDataFile(jsonData, (err) => {
      if (err) {
        Data
        res.status(500).send('Error writing data file');
        return;
      }
      // Send a success response
      res.status(410).send('Bookmark deleted successfully');
    });
  })
})

app.post('/export_to_elysian', express.json(), (req, res) => {
  if (!isAuthorized(req.get("Authorization"))) {
    res.status(401).send('Unauthorized request');
    return;
  }
  jsonData = req.body;
  console.log(jsonData)
  writeDataFile(jsonData, (err) => {
    if (err) {
      //Data
      res.status(500).send('Error writing data file');
      return;
    }
    res.status(200).send('Bookmarks imported successfully');
  });
})

app.post('/checkauth', express.json(), (req, res) => {
  if (!isAuthorized(req.get("Authorization"))) {
    res.status(401).send('Unauthorized request');
    return;
  }
  else{
    res.status(200).send('Authentication sucessful');
  }
    
  });

  app.get('/import_from_elysian', express.json(), (req, res) => {
    if (!isAuthorized(req.get("Authorization"))) {
      res.status(401).send('Unauthorized request');
      return;
    }
    else{
      const filePath = path.join(__dirname, 'bookmarks.json');

      // Read the JSON file
      const fileData = fs.readFileSync(filePath, 'utf-8');
      console.log(fileData)
      //const bookmarksData = JSON.parse(fileData);
      //console.log(bookmarksData)
      //res.send(fileData);
      res.json(JSON.parse(fileData))
    }

      
    });
  






// Start the Express.js server
app.listen(3000, () => {
  console.log('Elysian is at your service on port 3000');
});
