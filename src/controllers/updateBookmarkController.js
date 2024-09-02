const readFile = require('../utils/readFile');
const writeFile = require('../utils/writeFile');
const authCheck = require('../utils/authCheck');

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
    if (authCheck.isAuthorized(req.headers.authorization)){
        bookmarks = readFile.readBookmarksFile()
        bookmarks = JSON.parse(bookmarks)
        updateChildBookmark(bookmarks, req.body)
        writeFile.createBookmarksFile(JSON.stringify(bookmarks))
        res.status(200).json({ message: 'Bookmark Updated' });
    }
    else{
        res.status(401).json('Unauthorized');
    }
};

module.exports = {
    handleUpdateBookmark
};