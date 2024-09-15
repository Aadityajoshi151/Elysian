const readFile = require('../utils/readFile');
const writeFile = require('../utils/writeFile');
const authCheck = require('../utils/authCheck');

function updateChildBookmark(bookmarks, new_bookmark) {
    for (let i = 0; i < bookmarks.length; i++) { //For loop for searching the bookmark to be updated
        let node = bookmarks[i];
        if (node.id === new_bookmark.id) { //Found bookmark to be updated
            console.group(updateChildBookmark.name)
            if (new_bookmark.url === undefined) {  //Folder is updated (no url, only title)
                node.title = new_bookmark.title
                console.log(new_bookmark.title+' Folder updated')
            }
            else { //Bookmark is updated
                node.title = new_bookmark.title;
                node.url = new_bookmark.url;
                console.log(new_bookmark.title+' Bookmark updated')
                
            }
            console.groupEnd()
        }
        //Recursion
        if (node.children && node.children.length > 0) {
            updateChildBookmark(node.children, new_bookmark);
        }
    }
}

const handleUpdateBookmark = (req, res) => {
    try {
        if (authCheck.isAuthorized(req.headers.authorization)) { //Validates API Key
            bookmarks = readFile.readBookmarksFile() //Reads bookmarks from the file
            bookmarks = JSON.parse(bookmarks) //Converts them in JS object
            updateChildBookmark(bookmarks, req.body)
            writeFile.createBookmarksFile(JSON.stringify(bookmarks)) //Writes the updated bookmarks (after updation) back to the file
            res.status(200).json({ message: 'Bookmark Updated' });
        }
        else {
            res.status(401).json('Unauthorized');
            console.error(handleUpdateBookmark.name + ': Unauthorized')
        }
    }
    catch (err) {
        console.error(handleUpdateBookmark.name + ': ' + err)
    }
};

module.exports = {
    handleUpdateBookmark
};