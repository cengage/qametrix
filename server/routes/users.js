'use strict';

// routes for users controller
var users = require('../controllers/user');

module.exports = function(app) {

    app.get('/crud/users', users.all);
    app.post('/crud/users', users.create);
    /*app.get('/crud/users/:userId', users.show);*/
    app.get('/crud/users/:email', users.findUserByEmailId);
    app.get('/crud/users/:email/:password',users.findUserByEmailAndPwd);
    /*app.put('/crud/users/:userId', users.update);*/
    app.put('/crud/users/:_id', users.update);

    app.param('userId', users.user);
};
