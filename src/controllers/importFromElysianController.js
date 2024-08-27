const readFile = require('../utils/readFile');
const authCheck = require('../utils/authCheck');

const handleImportFromElysian = (req, res) => {
    if (authCheck.isAuthorized(req.headers.authorization)){
        bookmarks = readFile.readBookmarksFile()
        res.status(200).json(JSON.parse(bookmarks))
    }
    else{
        res.status(401).json('Unauthorized');
    }
};

module.exports = {
    handleImportFromElysian
};
