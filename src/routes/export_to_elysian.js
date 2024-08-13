const express = require('express');
const router = express.Router();
const exportToElysianController = require('../controllers/exportToElysianController');

router.post('/', exportToElysianController.handleExportToElysian);

module.exports = router;
