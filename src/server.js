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
        if (error.code === 'ENOENT') {
            return res.status(404).send('No bookmarks currently present on Elysian');
        } else if (error instanceof SyntaxError) {
            return res.status(500).send('Error parsing JSON file');
        } else {
            return res.status(500).send('Error reading file');
        }
    }
    
});

const PORT = 6161;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));