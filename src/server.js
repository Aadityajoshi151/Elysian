const express = require('express');
const fs = require('fs');
require('dotenv').config();
const app = express();
const path = require('path');


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
