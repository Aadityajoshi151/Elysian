const express = require('express');
const router = express.Router();

const export_to_elysian_routes = require('./export_to_elysian');
//const import_from_elysian_routes = require('./import_from_elysian');

// Attach routes to specific paths
router.use('/export_to_elysian', export_to_elysian_routes);
//router.use('/import_from_elysian', import_from_elysian_routes);

module.exports = router;
