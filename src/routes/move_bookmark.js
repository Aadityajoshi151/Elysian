const express = require('express');
const router = express.Router();
const exportToElysianController = require('../controllers/exportToElysianController');

//Route used when bookmark is moved in browser. Moving a bookmark changes the,
//indices of all other bookmarks relative to the moved bookmark hence,
//export exportToElysianController is used to export all the bookmarks.
//http://<IP>:6161/api/move_bookmark
//REST Verb: POST
router.post('/', express.json(), exportToElysianController.handleExportToElysian);

module.exports = router;
