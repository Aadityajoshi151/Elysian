const express = require('express');
const router = express.Router();
const updateBookmarkController = require('../controllers/updateBookmarkController');

//Route used when bookmark is updated in browser and sent to server for updation
//http://<IP>:6161/api/update_bookmark
//REST Verb: PATCH
router.patch('/', express.json(), updateBookmarkController.handleUpdateBookmark);

module.exports = router;
