const express = require('express');
const router = express.Router();

const exportRoutes = require('./export_to_elysian');
const importRoutes = require('./import_from_elysian');

// Attach routes to specific paths
router.use('/export_to_elysian', exportRoutes);
router.use('/import_from_elysian', importRoutes);

module.exports = router;
