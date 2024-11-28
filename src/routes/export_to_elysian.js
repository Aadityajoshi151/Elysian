const express = require('express');
const router = express.Router();
const exportToElysianController = require('../controllers/exportToElysianController');

//Route used when bookmarks are sent from browser to the server
//http://<IP>:6161/api/export_to_elysian
//REST Verb: POST
router.post('/', express.json({limit: '10mb'}), exportToElysianController.handleExportToElysian);

module.exports = router;
