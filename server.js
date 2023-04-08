const express = require('express');
const fs = require('fs');
require('dotenv').config();
const app = express();

const API_KEY = process.env.ELYSIAN_API_KEY

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

function isAuthorized(key){
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
  if (!isAuthorized(req.get("Authorization"))){
    res.status(401).send('Unauthorized request');
    return;
  }
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
  console.log(req.get("Authorization"))
  if (!isAuthorized(req.get("Authorization"))){
    res.status(401).send('Unauthorized request');
    return;
  }
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
  if (!isAuthorized(req.get("Authorization"))){
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
        res.status(200).send('Bookmark updated successfully');
      });
    });
  });

app.post('/delete_bookmark', express.json(), (req, res) =>{
  if (!isAuthorized(req.get("Authorization"))){
    res.status(401).send('Unauthorized request');
    return;
  }
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
        res.status(410).send('Bookmark deleted successfully');
      });
    })
  })
  
  app.post('/export_to_elysian', express.json(), (req, res) => {
    if (!isAuthorized(req.get("Authorization"))){
      res.status(401).send('Unauthorized request');
      return;
    }
    jsonData = req.body;
    writeDataFile(flattenBookmarks(jsonData), (err) => {
      if (err) {Data
        res.status(500).send('Error writing data file');
        return;
      }
      res.status(200).send('Bookmarks imported successfully');
    });
  })

// Start the Express.js server
app.listen(3000, () => {
  console.log('Elysian is at your service on port 3000');
});
