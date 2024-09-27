//The entry point of the server

const express = require('express');
const app = express();
require('dotenv').config()
const routes = require('./routes');
const fs = require('fs');
const path = require('path');

app.use('/api', routes);

app.get('/', function(req, res) {
    const filePath = path.join(__dirname, '..', 'src', 'data', 'bookmarks.json');
    fs.access(filePath, fs.constants.F_OK, function(err) {
        if (err) {
            return res.status(404).send('No bookmarks present on Elysian');
        }
        fs.readFile(filePath, 'utf8', function(err, data) {
            if (err) {
                return res.status(500).send('Error reading bookmarks file');
            }
            try {
                const jsonData = JSON.parse(data);
                res.json(jsonData);
            } catch (parseError) {
                res.status(500).send('Error parsing bookmarks file');
            }
        });
    });
});

const PORT = 6161;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));