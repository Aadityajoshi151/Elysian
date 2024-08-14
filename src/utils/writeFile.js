const path = require('path')
const fs = require('fs');

const createBookmarksFile = () => {
    dummy_data = {"key":"value"}
    const filePath = path.join(__dirname, '../data/bookmarks.json');
    fs.writeFileSync(filePath, JSON.stringify(dummy_data, null, 2), 'utf-8');
    console.log(`Bookmarks have been saved to ${filePath}`);
}

module.exports = {
    createBookmarksFile
};