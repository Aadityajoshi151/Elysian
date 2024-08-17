const writeFile = require('../utils/writeFile');

const handleExportToElysian = (req, res) => {
    writeFile.createBookmarksFile(JSON.stringify(req.body))
    res.json({ message: 'Export successful' });
};

module.exports = {
    handleExportToElysian
};
