const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log('Router loaded');

router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));
router.use('/api', require('./api'));
router.use('/likes', require('./likes'));
//for any further routes, access from here
//router.use('/routerName', require('./routerName));

module.exports = router;