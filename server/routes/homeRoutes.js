'use strict';

var config = require('../../config/config');

module.exports = function(app) {

    /**
     * Home route is required only for ui and not for service.
     * */
        // Home route
    app.get('/', function(req, res) {
        res.render('index', {
            app: config.app,
            //user: req.user,
            user: {
                email : 'your@email.com'
            },
            renderErrors : req.flash('error')
        });
    });

}