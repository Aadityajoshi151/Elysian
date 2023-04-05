const express = require('express');
const fs = require('fs');

const app = express();

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
    bookmark = {id: req.body.id, url: req.body.url}
    console.log(bookmark)
    // Add the JSON object from the request body to the data array
    jsonData.bookmarks.push(bookmark);

    // Write the updated JSON data to the file
    writeDataFile(jsonData, (err) => {
        if (err) {
          res.status(500).send('Error writing data file');
          return;
        }
  
        // Send a success response
        res.send('Bookmark added successfully');
      });
  });
});

app.post('/update_bookmark', express.json(), (req, res) => {
    const id = req.body.id;
    const new_url = req.body.url;
  
    readDataFile((err, jsonData) => {
      if (err) {
        res.status(500).send('Error reading data file');
        return;
      }
  
      // Find the object with the specified ID in the data array
      const dataToUpdate = jsonData.bookmarks.find(item => item.id === id);
  
      if (!dataToUpdate) {
        res.status(404).send('Data not found');
        return;
      }
  
      // Update the key-value pair in the object
      console.log(dataToUpdate)
      console.log(dataToUpdate.url)
      dataToUpdate.url = new_url
  
      // Write the updated JSON data to the file
      writeDataFile(jsonData, (err) => {
        if (err) {Data
          res.status(500).send('Error writing data file');
          return;
        }
        // Send a success response
        res.send('Bookmark added successfully');
      });
    });
  });
  

// Start the Express.js server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
