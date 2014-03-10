'use strict';

var path = require('path');
var rootPath = path.normalize(__dirname + '/../..');

module.exports = {
    root: rootPath,
    port: process.env.PORT || 3010,
    templateEngine: 'swig',
    proxit: {
        routes: {
            '/sapience': 'http://localhost:3000'
        },
        verbose: true
    },
    app: {
        title: 'Quality Metrics'
    }
};
