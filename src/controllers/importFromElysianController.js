const readFile = require('../utils/readFile');

const handleImportFromElysian = (req, res) => {
    bookmarks = readFile.readBookmarksFile()
    console.log(bookmarks)
    res.json(JSON.parse(bookmarks))
};

module.exports = {
    handleImportFromElysian
};
