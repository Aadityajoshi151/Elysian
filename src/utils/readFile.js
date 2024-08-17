const path = require('path')
const fs = require('fs');

const readBookmarksFile = () => {
    const filePath = path.join(__dirname, '../data/bookmarks.json');
    const bookmarks = fs.readFileSync(filePath, 'utf-8')
    return bookmarks;
}

module.exports = {
    readBookmarksFile
};