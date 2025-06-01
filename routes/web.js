const express = require('express');
const router = express.Router();
const { guestAuth,sessionAuth, tokenAuth } = require(path.join(__rootDir, 'app/Middleware/Authentication'));

const HomeController = require(path.join(__rootDir, 'app/Http/Controllers/HomeController'));

// router.get('/', (req, res) => {
//     res.send('Welcome to the Home Page!');
// });

router.get('/', HomeController.index);
router.get('/login', guestAuth, HomeController.login);
router.get('/dashboard', sessionAuth, HomeController.dashboard);

module.exports = router;