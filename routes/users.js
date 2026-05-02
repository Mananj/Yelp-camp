const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const { storeReturnTo } = require('../middleware');
const users = require('../controllers/users');


//New way to write routes using Express Router.
//Commented out the old way. Feel free to use old way if you want,
// Both work just fine. I just prefer the new way. It looks cleaner and is easier to read.

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));

router.route('/login')
    .get(users.renderLogin)
    .post(storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login);

//router.get('/register', users.renderRegister);

//router.post('/register', catchAsync(users.register));

//router.get('/login', users.renderLogin);

//router.post('/login', storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login);

router.get('/logout', users.logout)

module.exports = router;