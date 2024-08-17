const express = require('express');
const router = express.Router();
const importFromElysianController = require('../controllers/importFromElysianController');

router.get('/', express.json(), importFromElysianController.handleImportFromElysian);

module.exports = router;
