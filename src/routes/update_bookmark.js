const express = require('express');
const router = express.Router();
const updateBookmarkController = require('../controllers/updateBookmarkController');

router.patch('/', express.json(), updateBookmarkController.handleUpdateBookmark);

module.exports = router;
