const readFile = require('../utils/readFile');
const authCheck = require('../utils/authCheck');

const handleImportFromElysian = (req, res) => {
    try {
        if (authCheck.isAuthorized(req.headers.authorization)) { //Validates API Key
            bookmarks = readFile.readBookmarksFile() //Reads bookmarks from the file
            res.status(200).json(JSON.parse(bookmarks)) //Sends the bookmarks as response
            console.log(handleImportFromElysian.name + ': Sent bookmarks to Elysian extension')
        }
        else {
            res.status(401).json('Unauthorized');
            console.error(handleImportFromElysian.name + ': Unauthorized')
        }
    }
    catch (err) {
        console.error(handleImportFromElysian.name + ': ' + err)
    }
};

module.exports = {
    handleImportFromElysian
};
