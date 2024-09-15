const writeFile = require('../utils/writeFile');
const authCheck = require('../utils/authCheck');

const handleExportToElysian = (req, res) => {
    try {
        if (authCheck.isAuthorized(req.headers.authorization)) { //Validates API Key
            writeFile.createBookmarksFile(JSON.stringify(req.body)) //Writes all the bookmarks received in the file
            res.status(200).json('Export successful'); //Sends success response
            console.log(handleExportToElysian.name + ': Export successful')

        }
        else {    
            res.status(401).json('Unauthorized');
            console.error(handleExportToElysian.name + ': Unauthorized')
        }
    }
    catch (err) {
        console.error(handleExportToElysian.name+': '+err)
    }
};

module.exports = {
    handleExportToElysian
};
