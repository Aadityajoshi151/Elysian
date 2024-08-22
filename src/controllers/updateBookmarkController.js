const readFile = require('../utils/readFile');
const writeFile = require('../utils/writeFile');

const handleUpdateBookmark = (req, res) => {
    console.log("bookmark updated")
    res.json({ message: 'Bookmark Updated' });
};

module.exports = {
    handleUpdateBookmark
};