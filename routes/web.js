const express = require('express');
const router = express.Router();

const HomeController = require(path.join(__rootDir, 'app/Http/Controllers/HomeController'));

// router.get('/', (req, res) => {
//     res.send('Welcome to the Home Page!');
// });

router.get('/', HomeController.index);

module.exports = router;