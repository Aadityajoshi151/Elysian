const readFile = require('../utils/readFile');
const writeFile = require('../utils/writeFile');

const handleMoveBookmark = (req, res) => {
    //bookmarks = readFile.readBookmarksFile()
    //bookmarks = JSON.parse(bookmarks)
    console.log("move bookmark")
    //writeFile.createBookmarksFile(JSON.stringify(result))
    res.json({ message: 'Bookmark Moved' });
};

module.exports = {
    handleMoveBookmark
};
