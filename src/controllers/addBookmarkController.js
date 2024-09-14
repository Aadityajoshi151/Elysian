const readFile = require('../utils/readFile');
const writeFile = require('../utils/writeFile');
const authCheck = require('../utils/authCheck');


function addChildBookmark(bookmarks, new_bookmark) {
    for (let i = 0; i < bookmarks.length; i++) {
        let node = bookmarks[i];
        if (node.id === new_bookmark.parentId) {
            if (!node.children) {
                node.children = [];
            }
            new_bookmark.index = node.children.length;
            node.children.push(new_bookmark);
            console.group(addChildBookmark.name + ': Folder/Nested Bookmark added')
            console.log(node.children)
            console.groupEnd()
            return true; // bookmark added successfully
        }
        //Recursion
        if (node.children && node.children.length > 0) {
            let added = addChildBookmark(node.children, new_bookmark);
            if (added) return true; // bookmark added in the children
        }
    }
    return false; // bookmark not added (parentId not found)
}

const handleAddBookmark = (req, res) => {
    try {
        if (authCheck.isAuthorized(req.headers.authorization)) {
            bookmarks = readFile.readBookmarksFile()
            bookmarks = JSON.parse(bookmarks)
            if (req.body.parentId === '1') {
                bookmarks.push(req.body)
                console.group(handleAddBookmark.name + ': Bookmark added to bookmarks bar')
                console.log(req.body)
                console.groupEnd()
            }
            else {
                result = addChildBookmark(bookmarks, req.body)
                if (result == false) {
                    console.error(handleAddBookmark.name + ': Bookmark not added. ParentID not found')
                }
            }
            writeFile.createBookmarksFile(JSON.stringify(bookmarks))
            res.status(201).json('Bookmark Added');
        }
        else {
            res.status(401).json('Unauthorized');
            console.error(handleAddBookmark.name + ': Unauthorized')
        }
    }
    catch (err) {
        console.error(handleAddBookmark.name + ': ' + err)
    }
};

module.exports = {
    handleAddBookmark
};
