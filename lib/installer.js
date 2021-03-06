'use strict';

var _ = require('lodash');
var Dependency = require('./dependency.js');

module.exports = class Installer {
  static install (dependencies, logger, web3) {
    if (Array.isArray(dependencies)) {
      dependencies = _.map(dependencies, (d) => [null, d]);
    } else {
      dependencies = _.pairs(dependencies);
    }
    let success = true;
    for (let pair of dependencies) {
      try {
        logger.log('Retrieving ' + (pair[0] || pair[1]));
        let dependency = Dependency.fromDependencyString(pair[1], pair[0]);
        success = dependency.install(web3) && success;
        logger.log('Installed ' + dependency.getName() + ' at ' +
                   dependency.installedAt);
      } catch (e) {
        success = false;
        logger.error(String(e));
      }
    }
    return success;
  }
};
