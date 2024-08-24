const writeFile = require('../utils/writeFile');

const handleMoveBookmark = (req, res) => {
    writeFile.createBookmarksFile(JSON.stringify(req.body))
    res.json({ message: 'Bookmark Moved' });
};

module.exports = {
    handleMoveBookmark
};
