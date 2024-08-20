const readFile = require('../utils/readFile');
const writeFile = require('../utils/writeFile');

const handleDeleteBookmark = (req, res) => {
    console.log("bookmark deleted")
    res.json({ message: 'Bookmark Deleted' });
};

module.exports = {
    handleDeleteBookmark
};
