const express = require('express');
const router = express.Router();

const HomeController = require('../app/Controllers/HomeController');

// router.get('/', (req, res) => {
//     res.send('Welcome to the Home Page!');
// });

router.get('/', HomeController.index);

module.exports = router;