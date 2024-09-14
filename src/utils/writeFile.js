const path = require('path')
const fs = require('fs');

const createBookmarksFile = (bookmarks) => {
    try {
        const filePath = path.join(__dirname, '../data/bookmarks.json');
        fs.writeFileSync(filePath, bookmarks, 'utf-8');
        //console.log(createBookmarksFile.name + ': Bookmarks are saved to ' + filePath);
    }
    catch (err) {
        console.error(createBookmarksFile.name + ': ' + err)
    }
}

module.exports = {
    createBookmarksFile
};