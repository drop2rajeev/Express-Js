const express = require('express');
const router = express.Router();
const path = require('path');

const HomeController = require(path.join(__basedir, 'app/Controllers/HomeController'));

// router.get('/', (req, res) => {
//     res.send('Welcome to the Home Page!');
// });

router.get('/', HomeController.index);

module.exports = router;