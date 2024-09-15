const express = require('express');
const router = express.Router();
const deleteBookmarkController = require('../controllers/deleteBookmarkController');

//Route used when bookmarkis deleted from the browser and sent to server for deletion
//http://<IP>:6161/api/delete_bookmark
//REST Verb: DELETE
router.delete('/', express.json(), deleteBookmarkController.handleDeleteBookmark);

module.exports = router;
