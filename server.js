const express = require('express');
const fs = require('fs');

const app = express();

function flattenBookmarks(data) {
  const flattened = [];
  function flattenRecursively(bookmarks, parentId) {
    bookmarks.forEach(bookmark => {
      const flatBookmark = {
        id: bookmark.id,
        parentId,
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

function writeDataFile(jsonData, callback) {
    fs.writeFile('bookmarks.json', JSON.stringify(jsonData), (err) => {
      if (err) {
        console.error(err);
        callback(err);
        return;
      }
  
      callback(null);
    });
  }

// Define a GET route to read the local JSON file
app.get('/bookmarks', (req, res) => {
  readDataFile((err, jsonData) => {
    if (err) {
      res.status(500).send('Error reading data file');
      return;
    }

    // Send the JSON data as the response
    res.send(jsonData);
  });
});

// Define a POST route to add a JSON object to the local JSON file
app.post('/add_bookmark', express.json(), (req, res) => {
  readDataFile((err, jsonData) => {
    if (err) {
      res.status(500).send('Error reading data file');
      return;
    }
    bookmark = req.body
    console.log(bookmark)
    // Add the JSON object from the request body to the data array
    jsonData.push(bookmark);

    // Write the updated JSON data to the file
    writeDataFile(jsonData, (err) => {
        if (err) {
          res.status(500).send('Error writing data file');
          return;
        }
  
        // Send a success response
        res.status(201).send('Bookmark added successfully');
      });
  });
});

app.post('/update_bookmark', express.json(), (req, res) => {
  
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
      console.log(dataToUpdate)
      // Update the key-value pair in the object
      if (req.body.url && req.body.title){  //updating a bookmark
        dataToUpdate.url = req.body.url;
      dataToUpdate.title = req.body.title
      }
      else{ //reordering a bookmark
        dataToUpdate.index = req.body.index;
        dataToUpdate.parentId = req.body.parentId;
      }
      
      
  
      // Write the updated JSON data to the file
      writeDataFile(jsonData, (err) => {
        if (err) {Data
          res.status(500).send('Error writing data file');
          return;
        }
        // Send a success response
        res.status(201).send('Bookmark updated successfully');
      });
    });
  });

app.post('/delete_bookmark', express.json(), (req, res) =>{
    readDataFile((err, jsonData) => {
      if (err) {
        res.status(500).send('Error reading data file');
        return;
      }
      jsonData = jsonData.filter(bookmark => bookmark.id !== String(req.body.id));
      writeDataFile(jsonData, (err) => {
        if (err) {Data
          res.status(500).send('Error writing data file');
          return;
        }
        // Send a success response
        res.status(201).send('Bookmark deleted successfully');
      });
    })
  })
  
  app.post('/import_bookmarks', express.json(), (req, res) => {
    jsonData = req.body;
    writeDataFile(flattenBookmarks(jsonData), (err) => {
      if (err) {Data
        res.status(500).send('Error writing data file');
        return;
      }
      
      res.send('Bookmarks imported successfully');
    });
  })

// Start the Express.js server
app.listen(3000, () => {
  console.log('Elysian is at your service on port 3000');
});
