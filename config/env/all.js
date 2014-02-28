'use strict';

var path = require('path');
var rootPath = path.normalize(__dirname + '/../..');

module.exports = {
    root: rootPath,
    port: process.env.PORT || 3010,
    templateEngine: 'swig',
    proxit: {
        routes: {
            '/sapience/service': 'http://localhost:3000/sapience/service'
        },
        verbose: true
    },
    app: {
        title: 'Quality Metrics'
    }
};
