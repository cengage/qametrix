'use strict';

var path = require('path');
var rootPath = path.normalize(__dirname + '/../..');

module.exports = {
    root: rootPath,
    port: process.env.PORT || 3010,
    // The secret should be set to a non-guessable string that
    // is used to compute a session hash
    sessionSecret: 'Cengage-Registry-Services',
    // The name of the MongoDB collection to store sessions in
    sessionCollection: 'sessions',
    db: {
        host: 'localhost',
        port: 27017,
        database: 'sapience',
        username: '',
        password: ''
    },
    templateEngine: 'swig',
    app: {
        title: 'Quality Metrics'
    }
};
