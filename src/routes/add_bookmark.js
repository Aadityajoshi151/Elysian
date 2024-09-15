const express = require('express');
const router = express.Router();
const addBookmarkController = require('../controllers/addBookmarkController');

//Route used when bookmark is added in browser and sent to server for addition
//http://<IP>:6161/api/add_bookmark
//REST Verb: POST
router.post('/', express.json(), addBookmarkController.handleAddBookmark);

module.exports = router;
