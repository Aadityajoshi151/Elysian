const readFile = require('../utils/readFile');
const writeFile = require('../utils/writeFile');

function updateChildBookmark(bookmarks, new_bookmark){
    //TODO Add return statements during error handling
    for (let i = 0; i < bookmarks.length; i++) {
        let node = bookmarks[i];
        if (node.id === new_bookmark.id) {
            if (new_bookmark.url === undefined){  //folder is updated
                node.title = new_bookmark.title
            }
            else{ //bookmark is updated
                node.title = new_bookmark.title;
                node.url = new_bookmark.url;
            }
        }
        if (node.children && node.children.length > 0) {
            updateChildBookmark(node.children, new_bookmark);
        }
    }
}

const handleUpdateBookmark = (req, res) => {
    bookmarks = readFile.readBookmarksFile()
    bookmarks = JSON.parse(bookmarks)
    updateChildBookmark(bookmarks, req.body)
    writeFile.createBookmarksFile(JSON.stringify(bookmarks))
    res.json({ message: 'Bookmark Updated' });
};

module.exports = {
    handleUpdateBookmark
};