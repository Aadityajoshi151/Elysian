const readFile = require('../utils/readFile');
const writeFile = require('../utils/writeFile');
const authCheck = require('../utils/authCheck');

function deleteChildNode(bookmarks, id_to_be_deleted) {
    for (let i = 0; i < bookmarks.length; i++) {
        const node = bookmarks[i];
        if (node.id === id_to_be_deleted) {
            bookmarks.splice(i, 1);
            i--;
            continue;
        }
        if (node.children && node.children.length > 0) {
            node.children = deleteChildNode(node.children, id_to_be_deleted);
        }
    }
    return bookmarks;
}


const handleDeleteBookmark = (req, res) => {
    if (authCheck.isAuthorized(req.headers.authorization)){
        bookmarks = readFile.readBookmarksFile()
        bookmarks = JSON.parse(bookmarks)
        //TODO Add error handling
        //result will be true or false if bookmark deleted or not
        result = deleteChildNode(bookmarks, req.body.id)
        writeFile.createBookmarksFile(JSON.stringify(result))
        res.status(200).json({ message: 'Bookmark Deleted' });      
    }
    else{
        res.status(401).json('Unauthorized');
    }
};

module.exports = {
    handleDeleteBookmark
};
