'use strict';

var path = require('path');
var rootPath = path.normalize(__dirname + '/../..');

module.exports = {
    root: rootPath,
    port: process.env.PORT || 3010,
    // The secret should be set to a non-guessable string that
    // is used to compute a session hash
    sessionSecret: 'Sapience-Services',
    // The name of the MongoDB collection to store sessions in
    sessionCollection: 'sessions',
    db: {
        host: 'localhost',
        port: 27017,
        database: 'sapience',
        username: '',
        password: ''
    },
    app: {
        title: 'Quality Metrics'
    },
    passport: {
        facebook: {
            clientID: 'APP_ID',
            clientSecret: 'APP_SECRET',
            callbackURL: 'http://localhost:3010/auth/facebook/callback'
        },
        twitter: {
            clientID: 'CONSUMER_KEY',
            clientSecret: 'CONSUMER_SECRET',
            callbackURL: 'http://localhost:3010/auth/twitter/callback'
        },
        github: {
            clientID: 'APP_ID',
            clientSecret: 'APP_SECRET',
            callbackURL: 'http://localhost:3010/auth/github/callback'
        },
        google: {
            clientID: 'APP_ID',
            clientSecret: 'APP_SECRET',
            callbackURL: 'http://localhost:3010/auth/google/callback'
        },
        linkedin: {
            clientID: '75yarpoenxjeys',
            clientSecret: 'VJBCUicSXeUEOdfT',
            callbackURL: 'http://localhost:3010/auth/linkedin/callback'
        }
    }
};
