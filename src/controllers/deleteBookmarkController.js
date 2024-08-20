const readFile = require('../utils/readFile');
const writeFile = require('../utils/writeFile');

const handleDeleteBookmark = (req, res) => {
    bookmarks = readFile.readBookmarksFile()
    bookmarks = JSON.parse(bookmarks)   
    const indexToRemove = bookmarks.findIndex((bookmarks) => bookmarks.id === req.body.id);
    bookmarks.splice(indexToRemove, 1)
    writeFile.createBookmarksFile(JSON.stringify(bookmarks))
    res.json({ message: 'Bookmark Deleted' });
};

module.exports = {
    handleDeleteBookmark
};
