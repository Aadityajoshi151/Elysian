const path = require('path')
const fs = require('fs');

const createBookmarksFile = (bookmarks) => {
    const filePath = path.join(__dirname, '../data/bookmarks.json');
    fs.writeFileSync(filePath, bookmarks, 'utf-8');
    console.log(`Bookmarks.json have been saved to ${filePath}`);
}

module.exports = {
    createBookmarksFile
};