const express = require('express');
const router = express.Router();
const path = require('path');

// Import controller
const APIController = require(path.join(__basedir, 'app/Controllers/API/APIController'));

// Define routes
router.get('/', APIController.index);

module.exports = router;