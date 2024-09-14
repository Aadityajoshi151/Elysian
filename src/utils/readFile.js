const path = require('path')
const fs = require('fs');

const readBookmarksFile = () => {
    try {
        const filePath = path.join(__dirname, '../data/bookmarks.json');
        const bookmarks = fs.readFileSync(filePath, 'utf-8')
        return bookmarks;
    }
    catch (err) {
        console.error(readBookmarksFile.name + ': ' + err)
    }
}

module.exports = {
    readBookmarksFile
};