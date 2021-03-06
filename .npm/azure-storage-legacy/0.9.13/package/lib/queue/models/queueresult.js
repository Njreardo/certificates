﻿// 
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

// Module dependencies.
var Constants = require('azure-common').Constants;
var HeaderConstants = Constants.HeaderConstants;

function QueueResult(name, metadata) {
  if (name) {
    this.name = name;
  }

  if (metadata) {
    this.metadata = metadata;
  }
}

QueueResult.parse = function (messageXml) {
  var queueResult = new QueueResult();
  for (var property in messageXml) {
    if (messageXml.hasOwnProperty(property)) {
      queueResult[property.toLowerCase()] = messageXml[property];
    }
  }

  return queueResult;
};

QueueResult.prototype.getPropertiesFromHeaders = function (headers) {
  var self = this;

  var setPropertyFromHeaders = function (queueProperty, headerProperty) {
    if (!self[queueProperty] && headers[headerProperty.toLowerCase()]) {
      self[queueProperty] = headers[headerProperty.toLowerCase()];
    }
  };

  setPropertyFromHeaders('approximatemessagecount', HeaderConstants.APPROXIMATE_MESSAGES_COUNT);
};

module.exports = QueueResult;