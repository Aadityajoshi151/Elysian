const readFile = require('../utils/readFile');
const writeFile = require('../utils/writeFile');


function addChildBookmark(bookmarks, new_bookmark) {
    for (let i = 0; i < bookmarks.length; i++) {
        let node = bookmarks[i];
        if (node.id === new_bookmark.parentId) {
            if (!node.children) {
                node.children = [];
            }
            new_bookmark.index = node.children.length;
            node.children.push(new_bookmark);
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
    bookmarks = readFile.readBookmarksFile()
    bookmarks = JSON.parse(bookmarks)
    if (req.body.parentId === '1') {
        bookmarks.push(req.body)
    }
    else {
        //TODO Add error handling
        //result will be true or false if bookmark added or not
        result = addChildBookmark(bookmarks, req.body)
    }
    writeFile.createBookmarksFile(JSON.stringify(bookmarks))
    res.json({ message: 'Bookmark Added' });
};

module.exports = {
    handleAddBookmark
};
