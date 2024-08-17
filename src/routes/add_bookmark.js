const express = require('express');
const router = express.Router();
const addBookmarkController = require('../controllers/addBookmarkController');

router.post('/', express.json(), addBookmarkController.handleAddBookmark);

module.exports = router;
