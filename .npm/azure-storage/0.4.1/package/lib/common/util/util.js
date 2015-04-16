// 
// Copyright (c) Microsoft and contributors.  All rights reserved.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// 
// See the License for the specific language governing permissions and
// limitations under the License.
// 

var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var _ = require('underscore');
var util = require('util');
var Constants = require('./constants');
var StorageUtilities = require('./storageutilities');
var SR = require('./sr');

/**
* Encodes an URI.
*
* @param {string} uri The URI to be encoded.
* @return {string} The encoded URI.
*/
exports.encodeUri = function (uri) {
  return encodeURIComponent(uri)
    .replace(/!/g, '%21')
    .replace(/'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/\*/g, '%2A');
};

/**
* Returns the number of keys (properties) in an object.
*
* @param {object} value The object which keys are to be counted.
* @return {number} The number of keys in the object.
*/
exports.objectKeysLength = function (value) {
  if (!value) {
    return 0;
  }

  return _.keys(value).length;
};

/**
* Checks if a value is null or undefined.
*
* @param {object} value The value to check for null or undefined.
* @return {bool} True if the value is null or undefined, false otherwise.
*/
exports.objectIsNull = function (value) {
  return _.isNull(value) || _.isUndefined(value);
};

/**
* Checks if an object is empty.
*
* @param {object} object The object to check if it is null.
* @return {bool} True if the object is empty, false otherwise.
*/
exports.objectIsEmpty = function (object) {
  return _.isEmpty(object);
};

/**
* Determines if an object contains an integer number.
*
* @param {object}  value  The object to assert.
* @return {bool} True if the object contains an integer number; false otherwise.
*/
exports.objectIsInt = function (value) {
  return typeof value === 'number' && parseFloat(value) == parseInt(value, 10) && !isNaN(value);
};

/**
* Checks if an object is a string.
*
* @param {object} object The object to check if it is a string.
* @return {bool} True if the object is a strign, false otherwise.
*/
exports.objectIsString = function (object) {
  return _.isString(object);
};

/**
* Check if an object is a function
* @param {object} object The object to check whether it is function
* @return {bool} True if the specified object is function, otherwise false
*/
exports.objectIsFunction = function (object) {
  return _.isFunction(object);
};


/**
* Front zero padding of string to sepcified length
*/
exports.zeroPaddingString = function(str, len) {
  var paddingStr = '0000000000' + str;
  if(paddingStr.length < len) {
    return exports.zeroPaddingString(paddingStr, len);
  } else {
    return paddingStr.substr(-1 * len);
  }
};

/**
* Checks if a value is an empty string, null or undefined.
*
* @param {object} value The value to check for an empty string, null or undefined.
* @return {bool} True if the value is an empty string, null or undefined, false otherwise.
*/
exports.stringIsEmpty = function (value) {
  return _.isNull(value) || _.isUndefined(value) || value === '';
};

/**
* Checks if a value is null, empty, undefined or consists only of white-space characters.
*
* @param {object} value The value to check for null, empty, undefined and white-space only characters.
* @return {bool} True if the value is an empty string, null, undefined, or consists only of white-space characters, false otherwise.
*/
exports.IsNullOrEmptyOrUndefinedOrWhiteSpace = function (value) {
  if(_.isNull(value) || _.isUndefined(value) || value === '') {
    return true;
  }

  if(_.isString(value) && value.trim().length === 0) {
    return true;
  }

  return false;
};

/**
* Formats a text replacing '?' by the arguments.
*
* @param {string}       text      The string where the ? should be replaced.
* @param {array}        arguments Value(s) to insert in question mark (?) parameters.
* @return {string}
*/
exports.stringFormat = function (text) {
  if (arguments.length > 1) {
    for (var i = 1; text.indexOf('?') !== -1; i++) {
      text = text.replace('?', arguments[i]);
    }
  }

  return text;
};

/**
* Determines if a string starts with another.
*
* @param {string}       text      The string to assert.
* @param {string}       prefix    The string prefix.
* @return {Bool} True if the string starts with the prefix; false otherwise.
*/
exports.stringStartsWith = function (text, prefix) {
  if (_.isNull(prefix)) {
    return true;
  }

  return text.substr(0, prefix.length) === prefix;
};

/**
* Determines if a string ends with another.
*
* @param {string}       text      The string to assert.
* @param {string}       suffix    The string suffix.
* @return {Bool} True if the string ends with the suffix; false otherwise.
*/
exports.stringEndsWith = function (text, suffix) {
  if (_.isNull(suffix)) {
    return true;
  }

  return text.substr(text.length - suffix.length) === suffix;
};

/**
* Removes the BOM from a string.
*
* @param {string} str The string from where the BOM is to be removed
* @return {string} The string without the BOM.
*/
exports.removeBOM = function (str) {
  if (str.charCodeAt(0) === 0xfeff || str.charCodeAt(0) === 0xffef) {
    str = str.substring(1);
  }

  return str;
};

/**
* Merges multiple objects.
*
* @param {object} object The objects to be merged
* @return {object} The merged object.
*/
exports.merge = function () {
  return _.extend.apply(this, arguments);
};

/**
* Checks if a value exists in an array. The comparison is done in a case
* insensitive manner.
*
* @param {string} needle     The searched value.
* @param {array}  haystack   The array.
*
* @static
*
* @return {boolean}
*/
exports.inArrayInsensitive = function (needle, haystack) {
  return _.contains(_.map(haystack, function (h) { return h.toLowerCase(); }), needle.toLowerCase());
};

/**
* Returns the specified value of the key passed from object and in case that
* this key doesn't exist, the default value is returned. The key matching is
* done in a case insensitive manner.
*
* @param {string} key      The array key.
* @param {object} haystack The object to be used.
* @param {mix}    default  The value to return if $key is not found in $array.
*
* @static
*
* @return mix
*/
exports.tryGetValueInsensitive = function (key, haystack, defaultValue) {
  if (haystack) {
    for (var i in haystack) {
      if (haystack.hasOwnProperty(i) && i.toString().toLowerCase() === key.toString().toLowerCase()) {
        return haystack[i];
      }
    }
  }

  return defaultValue;
};

/**
* Returns the value in a chained object.
*
* @param {object} object   The object with the values.
* @param {array}  keys     The keys.
* @param {mix}    default  The value to return if $key is not found in $array.
*
* @static
*
* @return mix
*/
exports.tryGetValueChain = function (object, keys, defaultValue) {
  if (keys.length === 0) {
    return object;
  }

  var currentKey = keys.shift();
  if (object && object[currentKey]) {
    return exports.tryGetValueChain(object[currentKey], keys, defaultValue);
  }

  return defaultValue;
};

/**
* Rounds a date off to seconds.
*
* @param {Date} a date
* @return {string} the date in ISO8061 format, with no milliseconds component
*/
exports.truncatedISO8061Date = function (date) {
  var dateString = date.toISOString();
  return dateString.substring(0, dateString.length - 5) + 'Z';
};

exports.normalizeArgs = function (optionsOrCallback, callback, result) {
  var options = {};
  if(_.isFunction(optionsOrCallback) && !callback) {
    callback = optionsOrCallback;
  } else if (optionsOrCallback) {
    options = optionsOrCallback;
  }

  result(options, callback);
};

exports.getNodeVersion = function () {
  var parsedVersion = process.version.split('.');
  return {
    major: parseInt(parsedVersion[0].substr(1), 10),
    minor: parseInt(parsedVersion[1], 10),
    patch: parseInt(parsedVersion[2], 10)
  };
};

exports.analyzeStream = function (stream, calculateMD5, callback) {
  var digest = null;
  var length = 0;
  if (calculateMD5) {
    digest = crypto.createHash('md5');
  }

  stream.on('data', function (chunk) {
    if (calculateMD5) {
      digest.update(chunk);
    }

    length += chunk.length;
  });

  stream.on('end', function () {
    var md5 = null;
    if (calculateMD5) {
      md5 = digest.digest('base64');
    }

    callback(length, md5);
  });
};

/**
* Calculate md5sum for the stream
* @ignore
*/
exports.calculateMD5 = function(readStream, bufferLength, options, callback) {
  var internalBuff = new Buffer(bufferLength);
  var index = 0;
  var internalHash = crypto.createHash('md5');
  readStream.on('data', function(data) {
    if (index + data.length > bufferLength) {
      throw new Error(SR.INVALID_STREAM_LENGTH);
    }
    else {
      data.copy(internalBuff, index);
      internalHash.update(data);
      index += data.length;
    }
  }).on('end', function() {
    internalBuff.length = index;
    options.contentMD5 = internalHash.digest('base64');
    callback(internalBuff);
  });
};

/**
* Whether the content of buffer is all zero
*/
exports.isBufferAllZero = function (buffer) {
  for(var i = 0, len = buffer.length; i < len; i++) {
    if (buffer[i] !== 0) {
      return false;
    }
  }
  return true;
};

/**
* Write zero to stream
*/
var zeroBuffer = null;
exports.writeZerosToStream = function (stream, length, md5Hash, progressCallback, callback) {
  var defaultBufferSize = Constants.BlobConstants.DEFAULT_WRITE_BLOCK_SIZE_IN_BYTES;
  var bufferSize = Math.min(defaultBufferSize, length);
  var remaining = length - bufferSize;
  var buffer = null;
  if (bufferSize == defaultBufferSize) {
    if (!zeroBuffer) {
      zeroBuffer = new Buffer(defaultBufferSize);
      zeroBuffer.fill(0);
    }
    buffer = zeroBuffer;
  } else {
    buffer = new Buffer(bufferSize);
    buffer.fill(0);
  }
  if (md5Hash) {
    md5Hash.update(buffer);
  }
  //We can only write the entire buffer to stream instead of part of buffer.
  return stream.write(buffer, function () {
    if (exports.objectIsFunction(progressCallback)) {
      progressCallback(null, buffer.length);
    }
    buffer = null;
    if (remaining > 0) {
      exports.writeZerosToStream(stream, remaining, md5Hash, progressCallback, callback);
    } else if (exports.objectIsFunction(callback)) {
      callback(null, null);
    }
  });
};

/**
* Calculate md5sum for the content
*/
exports.getContentMd5 = function (content, encoding) {
  if (!encoding) encoding = 'base64';
  var internalHash = crypto.createHash('md5');
  internalHash.update(content, 'utf8');
  return internalHash.digest(encoding);
};

exports.getNextLocation = function(lastLocation, locationMode) {
  switch(locationMode) {
  case StorageUtilities.LocationMode.PRIMARY_ONLY:
    return Constants.StorageLocation.PRIMARY;
  case StorageUtilities.LocationMode.SECONDARY_ONLY:
    return Constants.StorageLocation.SECONDARY;
  case StorageUtilities.LocationMode.PRIMARY_THEN_SECONDARY:
  case StorageUtilities.LocationMode.SECONDARY_THEN_PRIMARY:
    return (lastLocation === Constants.StorageLocation.PRIMARY) ? Constants.StorageLocation.SECONDARY : Constants.StorageLocation.PRIMARY;
  default:
    throw new Error(util.format(SR.ARGUMENT_OUT_OF_RANGE_ERROR, 'locationMode', locationMode));
  }
};

exports.getNextListingLocationMode = function (token) {
  if(_.isNull(token) || _.isUndefined(token)) {
    return Constants.RequestLocationMode.PRIMARY_OR_SECONDARY;
  }
  else {
    switch (token.targetLocation) {
    case Constants.StorageLocation.PRIMARY:
      return Constants.RequestLocationMode.PRIMARY_ONLY;
    case Constants.StorageLocation.SECONDARY:
      return Constants.RequestLocationMode.SECONDARY_ONLY;
    default:
      throw new Error(util.format(SR.ARGUMENT_OUT_OF_RANGE_ERROR, 'targetLocation', token.targetLocation));
    }
  }
};

exports.pathExistsSync = fs.existsSync ? fs.existsSync : path.existsSync;
