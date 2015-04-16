/*
 * @copyright
 * Copyright © Microsoft Open Technologies, Inc.
 *
 * All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http: *www.apache.org/licenses/LICENSE-2.0
 *
 * THIS CODE IS PROVIDED *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION
 * ANY IMPLIED WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A
 * PARTICULAR PURPOSE, MERCHANTABILITY OR NON-INFRINGEMENT.
 *
 * See the Apache License, Version 2.0 for the specific language
 * governing permissions and limitations under the License.
 */
'use strict';

var _ = require('underscore');
var uuid = require('node-uuid');  // want to replace with this in the future: https://gist.github.com/jed/982883



var LEVEL_STRING_MAP = {
  0 : 'ERROR:',
  1 : 'WARNING:',
  2 : 'INFO:',
  3 : 'VERBOSE:'
};

/**
 * Methods for controling global logging options for ADAL
 * @namespace
 */
var Logging = {

  /**
   * @callback LoggingCallback
   * @memberOf Logging
   * @param {Logging.LOGGING_LEVEL} level The level of this log entry.
   * @param {string} message The text content of the log entry.
   * @param {Error}  [error] An Error object if this is an {@link Logging.LOGGING_LEVEL.ERROR|ERROR} level log entry.
   */

  /**
   * @typedef LoggingOptions
   * @memberOf Logging
   * @property {LoggingCallback} [log] The function to call when ADAL generates a log entry.
   * @property {Logging.LOGGING_LEVEL} [level] The maximum level of log entries to generate.
   */

  /**
   * Describes the available logging levels.
   * @enum
   * @type {Number}
   */
  LOGGING_LEVEL : {
    ERROR    : 0,
    WARN     : 1,
    INFO     : 2,
    VERBOSE  : 3
  },

  /**
   * Sets global logging options for ADAL.
   * @param {LoggingOptions} options
   */
  setLoggingOptions : function(options) {
    if (!options) {
      options = {};
    }

    if (options.log) {
      if (!_.isFunction(options.log)) {
        throw new Error('setLogOptions expects the log key in the options parameter to be a function');
      }
    } else {
      // if no log function was passed set it to a default no op function.
      options.log = function() {};
    }

    if (options.level) {
      var level = options.level;
      if (level < 0 || level > 3) {
        throw new Error('setLogOptions expects the level key to be in the range 0 to 3 inclusive');
      }
    } else {
      options.level = this.LOGGING_LEVEL.ERROR;
    }

    this.LogOptions = options;
  },

  /**
   * Get's the current global logging options.
   * @return {LoggingOptions}
   */
  getLoggingOptions : function() {
    return this.LogOptions;
  },

  /**
   * Stores the current global logging options.
   * @private
   * @type {LoggingOptions}
   */
  LogOptions : {
    log : function() {},
    level : 0,
  }
};

/**
 * An internal logging object.
 * @class
 * @private
 * @param {string} componentName The name of the component that created this instance.  This name will be
 *                               prepended to the beginning of all log entries generated by this instance.
 */
function Logger(componentName, logContext) {
  if (!logContext) {
    throw new Error('Logger: logContext is a required parameter');
  }
  this._componentName = componentName;
  this._logContext = logContext;
}

Object.defineProperty(Logger.prototype, 'context', {
  get: function () {
    return this._logContext;
  }
});

/**
 * Generates a log entry
 * @param  {Logging.LOGGING_LEVEL} level The level of this log entry
 * @param  {string} message A message string to log.
 * @param  {Error} [error] If this is a {@link Logging.LOGGING_LEVEL.ERROR|ERROR} level log entry then the caller
 *                       should pass an error object in this parameter.
 */
Logger.prototype.log = function(level, message, error) {
  if (level <= Logging.LogOptions.level) {
    var correlationId = this._logContext.correlationId || '<no correlation id>';

    var formattedMessage = correlationId + ' - ' + this._componentName + ': ' + LEVEL_STRING_MAP[level] + ' ' + message;
    if (error) {
      formattedMessage += '\nStack:\n' + error.stack;
    }
    Logging.LogOptions.log(level, formattedMessage, error);
  }
};

/**
 * Generate an {@link Logging.LOGGING_LEVEL.ERROR|ERROR} level log entry.
 * @param  {string} message A message to log
 * @param  {Error} error The Error object associated with this log entry
 */
Logger.prototype.error = function(message, error) {
  this.log(Logging.LOGGING_LEVEL.ERROR, message, error);
};

/**
 * Generate an {@link Logging.LOGGING_LEVEL.WARN|WARN} level log entry.
 * @param  {string} message A message to log
 */
Logger.prototype.warn = function(message) {
  this.log(Logging.LOGGING_LEVEL.WARN, message, null);
};

/**
 * Generate an {@link Logging.LOGGING_LEVEL.INFO|INFO} level log entry.
 * @param  {string} message A message to log
 */
Logger.prototype.info = function(message) {
  this.log(Logging.LOGGING_LEVEL.INFO, message, null);
};

/**
 * Generate an {@link Logging.LOGGING_LEVEL.VERBOSE|VERBOSE} level log entry.
 * @param  {string} message A message to log
 */
Logger.prototype.verbose = function(message) {
  this.log(Logging.LOGGING_LEVEL.VERBOSE, message, null);
};

/**
 * Generate a {@link Logging.LOGGING_LEVEL.ERROR|ERROR} level log entry, as well as an
 * Error object to go with it.  This is a convenience method for throwing logged errors.
 * @param  {string} message A message to log
 */
Logger.prototype.createError = function(message) {
  var err = new Error(message);
  this.error(message, err);
  return err;
};

/**
 * Creates a new log context based on the correlationId passed in.  If no correlationId is passed in
 * then one is generated, by the function uuid.v4()
 * @private
 */
function createLogContext(correlationId) {
  var id = correlationId || uuid.v4();
  return { correlationId : id };
}

var exports = {
  Logging : Logging,
  Logger : Logger,
  createLogContext : createLogContext
};

module.exports = exports;