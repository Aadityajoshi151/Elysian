const readFile = require('../utils/readFile');
const writeFile = require('../utils/writeFile');

const handleDeleteBookmark = (req, res) => {
    bookmarks = readFile.readBookmarksFile()
    bookmarks = JSON.parse(bookmarks)
    for (let i = 0; i < bookmarks.length; i++) {
        let node = bookmarks[i];
        if (node.id === req.body.id){
           console.log("To be deleted:")
           console.log(node)
        }
    }  
    res.json({ message: 'Bookmark Deleted' });
};

module.exports = {
    handleDeleteBookmark
};
