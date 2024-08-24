const express = require('express');
const router = express.Router();
const moveBookmarkController = require('../controllers/moveBookmarkController');

router.post('/', express.json(), moveBookmarkController.handleMoveBookmark);

module.exports = router;
