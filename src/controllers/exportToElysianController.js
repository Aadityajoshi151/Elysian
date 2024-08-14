const writeFile = require('../utils/writeFile');

const handleExportToElysian = (req, res) => {
    // Logic for handling export
    writeFile.createBookmarksFile()
    res.json({ message: 'Export successful' });
};

module.exports = {
    handleExportToElysian
};
