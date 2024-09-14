const writeFile = require('../utils/writeFile');
const authCheck = require('../utils/authCheck');

const handleExportToElysian = (req, res) => {
    try {
        if (authCheck.isAuthorized(req.headers.authorization)) {
            writeFile.createBookmarksFile(JSON.stringify(req.body))
            res.status(200).json('Export successful');
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
