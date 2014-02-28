'use strict';

var path = require('path');
var rootPath = path.normalize(__dirname + '/../..');

module.exports = {
    root: rootPath,
    port: process.env.PORT || 3010,
    templateEngine: 'swig',
    proxit: {
        routes: {
            '/artifacts': 'http://localhost:3000/artifacts'
        },
        verbose: true
    }
};
