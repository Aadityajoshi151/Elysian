//const writeFile = require('../utils/writeFile');

const handleImportFromElysian = (req, res) => {
    console.log("import success")
    res.json({ message: 'Import successful' });
};

module.exports = {
    handleImportFromElysian
};
