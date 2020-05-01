const express = require('express');
const router = express.Router();

const passport = require('passport');

const usersController = require('../controllers/users_controller');

router.get('/profile/:id', usersController.profile);
router.post('/update/:id', passport.checkAuthentication, usersController.update);
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);
router.get('/sign-out', usersController.destroySession);
router.post('/create', usersController.create);
//use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {
        failureRedirect: '/users/sign-in'
    }
), usersController.createSession);
router.get('/auth/google', passport.authenticate(
    'google',
    {
        scope: ['profile', 'email']
    }
));
router.get('/auth/google/callback', passport.authenticate(
    'google',
    {
        failureRedirect: '/users/sign-in'
    }
), usersController.createSession);
router.get('/reset-password', usersController.resetPassword);
router.post('/reset-password', usersController.findUserAndReset);
router.post('/friendship/add', usersController.addFriend);
router.post('/friendship/remove', usersController.removeFriend);
module.exports = router;