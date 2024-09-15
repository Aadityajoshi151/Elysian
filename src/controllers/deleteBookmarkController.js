const readFile = require('../utils/readFile');
const writeFile = require('../utils/writeFile');
const authCheck = require('../utils/authCheck');

function deleteChildNode(bookmarks, id_to_be_deleted) {
    for (let i = 0; i < bookmarks.length; i++) { //For loop for searching the bookmark to be deleted
        const node = bookmarks[i];
        if (node.id === id_to_be_deleted) { //Found bookmark to be deleted
            bookmarks.splice(i, 1);
            console.group(handleDeleteBookmark.name + ': Bookmark(s) Deleted')
            console.log(node)
            console.groupEnd()
            i--;
            continue;
        }
        //Recursion
        if (node.children && node.children.length > 0) {
            node.children = deleteChildNode(node.children, id_to_be_deleted);
        }
    }
    return bookmarks;
}


const handleDeleteBookmark = (req, res) => {
    try {
        if (authCheck.isAuthorized(req.headers.authorization)) { //Validates API Key
            bookmarks = readFile.readBookmarksFile() //Reads bookmarks from the file
            bookmarks = JSON.parse(bookmarks) //Converts them in JS object
            result = deleteChildNode(bookmarks, req.body.id)
            writeFile.createBookmarksFile(JSON.stringify(result)) //Writes the updated bookmarks (after deletion) back to the file
            res.status(200).json({ message: 'Bookmark Deleted' });
        }
        else {
            res.status(401).json('Unauthorized');
            console.error(handleDeleteBookmark.name + ': Unauthorized')
        }
    }
    catch (err) {
        console.error(handleDeleteBookmark.name + ': ' + err)
    }
};

module.exports = {
    handleDeleteBookmark
};
