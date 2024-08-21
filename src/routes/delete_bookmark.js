const express = require('express');
const router = express.Router();
const deleteBookmarkController = require('../controllers/deleteBookmarkController');

router.delete('/', express.json(), deleteBookmarkController.handleDeleteBookmark);

module.exports = router;
