const readFile = require('../utils/readFile');
const writeFile = require('../utils/writeFile');

const handleAddBookmark = (req, res) => {
    bookmarks = readFile.readBookmarksFile()
    bookmarks = JSON.parse(bookmarks)
    if (req.body.parentId === '1'){
        bookmarks.push(req.body)
    }
    writeFile.createBookmarksFile(JSON.stringify(bookmarks))
    res.json({ message: 'Bookmark Added' });
};

module.exports = {
    handleAddBookmark
};
