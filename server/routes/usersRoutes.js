'use strict';

// User routes use users controller
var users = require('../controllers/user');

module.exports = function(app) {
    /*var passport = app.passport;*/

    // Register the user with local provider
    app.post('/auth/register', function(req, res, next) {
        req.assert('firstName', 'You must enter a first name').notEmpty();
        req.assert('lastName', 'You must enter a last name').notEmpty();
        req.assert('email', 'You must enter a valid email address').isEmail();
        req.assert('password', 'Password must be between 8-20 characters long').len(8, 20);
        req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);

        var errors = req.validationErrors();
        if (errors) {
            return res.status(400).send(errors);
        }

        users.create(req.body).then(function(user) {
            user = user.sanitize();
            req.login(user, function(err) {
                if (err) {
                    return next(err);
                }
                return res.send(req.user);
            });
        }).catch(function(error) {
            res.status(400).send({message: error});
        });
    });

    /*// Setting up the userId param
    app.param('userId', users.user);

    // Setting the local strategy route
    app.post('/users/session', passport.authenticate('local', {
        failureRedirect: '/signin',
        failureFlash: true
    }), users.session);*/

    /*// Setting the facebook oauth routes
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['email', 'user_about_me'],
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/signin'
    }), users.authCallback);

    // Setting the github oauth routes
    app.get('/auth/github', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/github/callback', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.authCallback);

    // Setting the twitter oauth routes
    app.get('/auth/twitter', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.authCallback);

    // Setting the google oauth routes
    app.get('/auth/google', passport.authenticate('google', {
        failureRedirect: '/signin',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }), users.signin);

    app.get('/auth/google/callback', passport.authenticate('google', {
        failureRedirect: '/signin'
    }), users.authCallback);

    // Setting the linkedin oauth routes
    app.get('/auth/linkedin', passport.authenticate('linkedin', {
        failureRedirect: '/signin',
        scope: [ 'r_emailaddress' ]
    }), users.signin);

    app.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
        failureRedirect: '/siginin'
    }), users.authCallback);*/

};
