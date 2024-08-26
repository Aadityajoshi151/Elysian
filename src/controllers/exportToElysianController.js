const writeFile = require('../utils/writeFile');
const authCheck = require('../utils/authCheck');

const handleExportToElysian = (req, res) => {
    if (authCheck.isAuthorized(req.headers.authorization)){
        writeFile.createBookmarksFile(JSON.stringify(req.body))
        res.status(200).send('Export successful');
    }
    else{
        res.status(403).send('Unauthorized');
    }

};

module.exports = {
    handleExportToElysian
};
