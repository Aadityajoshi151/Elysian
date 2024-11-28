const express = require('express');
const router = express.Router();
const importFromElysianController = require('../controllers/importFromElysianController');

//Route used when bookmarks are sent from server to the browser
//http://<IP>:6161/api/import_from_elysian
//REST Verb: GET
router.get('/', express.json({limit: '10mb'}), importFromElysianController.handleImportFromElysian);

module.exports = router;
