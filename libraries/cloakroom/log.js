/**
 * log.js
 * Cloakroom Logging Utility
 * Author: Rai Butera
 */

var moment = require('moment');
var _ = require('lodash');
var chalk = require('chalk');
var timeFormat = 'dddd, MMMM Do YYYY, HH:mm:ss';
var shortTimeFormat = 'DD/MM/YY HH:mm:ss';
// var now = moment().format(timeFormat);

var LOG = exports;

var CONFIGURATION = {
  colors: {
    debug: 'white',
    info: 'cyan',
    warn: 'yellow',
    error: 'red',
    default: 'gray'
  },
  timestamp: true
};

LOG.log = function(level,message,usePrefix,prefix,isObject){
  var finalOutput;

  var customPrefixFormatting = function(input){
    // TODO: custom formatting for prefix
    input = chalk.bold.white('<' + input + '>');
    return input;
  };

  var colorMsgBody = function(lvl,message){
    switch(lvl){
          case 'debug':
            color = CONFIGURATION.colors.debug;
            break;
          case 'info':
            color = CONFIGURATION.colors.info;
            break;
          case 'warn':
            color = CONFIGURATION.colors.warn;
            break;
          case 'error':
            color = CONFIGURATION.colors.error;
            break;
          default:
            color = CONFIGURATION.colors.default;
            break;
    }

    return chalk[color](message);
  };

  var formatAndAppendPrefix = function(lvl, msg, pfx){
    var result, color;

    if(!_.isUndefined(pfx) && !_.isNull(pfx)){
      pfx = customPrefixFormatting(pfx);
    }

    if (!_.isUndefined(pfx) && !_.isNull(pfx)) { // prefix is defined, prepend it
      result = pfx + ' ' + msg;
    } else { // prefix is not defined, do not prepend
      result = msg;
    }
    return result;
  };

  if(_.isUndefined(isObject) || _.isNull(isObject)){
    isObject = false;
  }

  if (arguments.length < 4) {
    usePrefix = false;
  }

  if (arguments.length === 1){ // only a message was passed
    // storage message in right variable
    message = level;
    // default level to debug
    level = 'debug';
  }

  if (!_.isUndefined(isObject) && !_.isNull(isObject) && isObject === true) {
    message = JSON.stringify(message);
  }

  message = colorMsgBody(level, message);

  if (usePrefix) {
    message = formatAndAppendPrefix(level,message,prefix);
  }

  if (CONFIGURATION.timestamp) {
    var now = moment().format(shortTimeFormat);
    finalOutput = '[' + chalk.gray(now) + '] ' + message;
  } else {
    finalOutput = message;
  }

  if (level === 'debug') {
    return console.log(finalOutput);
  } else {
    return console[level](finalOutput);
  }
};

LOG.info = function (message,usePrefix,prefix,isObject) {
  return LOG.log('info',message,usePrefix,prefix,isObject);
};
LOG.error = function (message,usePrefix,prefix,isObject) {
  return LOG.log('error',message,usePrefix,prefix,isObject);
};
LOG.warn = function (message,usePrefix,prefix,isObject) {
  return LOG.log('warn',message,usePrefix,prefix,isObject);
};
LOG.debug = function (message,usePrefix,prefix,isObject) {
  return LOG.log('debug',message,usePrefix,prefix,isObject);
};
