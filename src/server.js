//The entry point of the server

const express = require('express');
const app = express();
require('dotenv').config()
const routes = require('./routes');
const readFile = require('./utils/readFile');

app.use('/api', routes);

app.get('/', function(req, res) {
    try{
        bookmarks = readFile.readBookmarksFile()
        bookmarks = JSON.parse(bookmarks)
        res.json(bookmarks)
    }
    catch (error){
        return res.status(500).send('Error reading bookmarks file or file not found. If this is a fresh setup of Elysian, please consider exporting your bookmarks to populate the data.');
    }
    
});

const PORT = 6161;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
