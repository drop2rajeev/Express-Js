const express = require('express');
const router = express.Router();

// Import controller
const APIController = require(path.join(__rootDir, 'app/Http/Controllers/API/APIController'));

// Define routes
router.get('/', APIController.index);

module.exports = router;