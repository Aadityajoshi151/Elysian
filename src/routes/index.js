//Containers the different routes for the project

const express = require('express');
const router = express.Router();

const export_to_elysian_routes = require('./export_to_elysian');
const import_from_elysian_routes = require('./import_from_elysian');
const add_bookmark_routes = require('./add_bookmark')
const delete_bookmark_routes = require('./delete_bookmark')
const update_bookmark_routes = require('./update_bookmark')
const move_bookmark_routes = require('./move_bookmark')

//Attach routes to specific paths
router.use('/export_to_elysian', export_to_elysian_routes);
router.use('/import_from_elysian', import_from_elysian_routes);
router.use('/add_bookmark', add_bookmark_routes)
router.use('/delete_bookmark', delete_bookmark_routes)
router.use('/update_bookmark', update_bookmark_routes)
router.use('/move_bookmark', move_bookmark_routes)

module.exports = router;
