const readFile = require('../utils/readFile');
const writeFile = require('../utils/writeFile');

const handleUpdateBookmark = (req, res) => {
    bookmarks = readFile.readBookmarksFile()
    bookmarks = JSON.parse(bookmarks)   
    const indexToUpdate = bookmarks.findIndex((bookmarks) => bookmarks.id === req.body.id);
    bookmarks[indexToUpdate].title = req.body.title
    bookmarks[indexToUpdate].url = req.body.url
    writeFile.createBookmarksFile(JSON.stringify(bookmarks))
    res.json({ message: 'Bookmark Updated' });
};

module.exports = {
    handleUpdateBookmark
};