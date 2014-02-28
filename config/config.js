'use strict';

// Utilize Lo-Dash utility library
var _ = require('lodash'),
    pathExtra = require('path-extra'),
    fs = require('fs');

var userConfigFileName = pathExtra.homedir() + '/artifactgraph-' + process.env.NODE_ENV + '.json',
    userConfig = fs.existsSync(userConfigFileName) ? require(userConfigFileName) : {},

    // Extend the base configuration in all.js with environment
    // specific configuration
    config = _.extend(
        require(__dirname + '/../config/env/all.js'),
        require(__dirname + '/../config/env/' + process.env.NODE_ENV + '.js') || {},
        userConfig
    );
delete config.db;
module.exports = config;
