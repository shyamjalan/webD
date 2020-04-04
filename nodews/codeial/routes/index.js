const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log('Router loaded');

router.get('/', homeController.home);
router.get('/home', homeController.homeAlternate);
router.use('/users', require('./users'));

//for any further routes, access from here
//router.use('/routerName', require('./routerName));

module.exports = router;