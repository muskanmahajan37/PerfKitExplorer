/**
 * @copyright Copyright 2014 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @fileoverview ErrorService is an angular service that provides
 * storage and methods for managing errors on the page.
 * @author joemu@google.com (Joe Allan Muharsky)
 */

goog.provide('p3rf.perfkit.explorer.components.error.ErrorService');
goog.require('p3rf.perfkit.explorer.components.error.ErrorModel');
goog.require('p3rf.perfkit.explorer.components.error.ErrorTypes');


goog.scope(function() {
const components = p3rf.perfkit.explorer.components;
const ErrorModel = components.error.ErrorModel;
const ErrorTypes = components.error.ErrorTypes;



/**
 * @param {!angular.Scope} $rootScope Provides access to the root scope.
 * @param {!angular.$filter} $filter Angular filter service.
 * @param {!angular.$window} $window Angular window service.
 * @ngInject
 * @constructor
 */
components.error.ErrorService = function($rootScope, $filter, $window) {
  /** @private {!angular.$filter} */
  this.filter_ = $filter;

  /** @private {!angular.$window} */
  this.window_ = window;

  /** @private {!angular.Scope} */
  this.rootScope_ = $rootScope;

  /** @export {!Array.<ErrorModel>} */
  this.errors = [];

  /** @export {!Array.<!string>} */
  this.errorTypes = ErrorTypes.All;

  /** @export {!boolean} */
  this.logToConsole = true;

  /**
   * The worst error severity to show.  For example, WARNING would show both
   * WARNING and DANGER alerts.
   * @export {!ErrorTypes}
   */
  this.MAX_ERROR_SEVERITY = ErrorTypes.WARNING;
};
const ErrorService = components.error.ErrorService;


/**
 * Adds an error to the errors list, optionally replacing an existing one.
 *
 * If the opt_error_id flag is specified, then if an error with that ID can
 * be found, it will be replaced.  Otherwise, a new error will be added.
 *
 * @param {!string} errorType A string representing the type of error.  See
 *     components.errors.ErrorTypes for supported values.
 * @param {!string} text The text to display.
 * @param {?string=} opt_errorId The ID of the error message.  It will replace
 *     an error with the same ID.  If not provided, the error is added to the
 *     list unconditionally.
 * @return {?ErrorModel} A new or existing ErrorModel, or null if not needed.
 * @export
 */
ErrorService.prototype.addError = function(errorType, text, opt_errorId) {
  if (goog.isDef(opt_errorId)) {
    if (ErrorTypes.All.indexOf(errorType) >
        ErrorTypes.All.indexOf(this.MAX_ERROR_SEVERITY)) {
      return null;
    }

    let existingError = this.filter_('getByProperty')(
        'errorId', opt_errorId, this.errors);
    if (existingError) {
      existingError.errorType = errorType;
      existingError.text = text;
      return existingError;
    }
  }
  let error = new ErrorModel(errorType, text, opt_errorId);
  this.errors.push(error);

  if (this.logToConsole === true) {
    this.window_.console.log(text);
  }

  return error;
};


  /**
   * Adds a WARNING to the errors list, optionally replacing an existing one.
   *
   * If the opt_error_id flag is specified, then if an error with that ID can
   * be found, it will be replaced.  Otherwise, a new error will be added.
   *
   * @param {!string} text The text to display.
   * @param {?string=} opt_errorId The ID of the error message.  It will replace
   *     an error with the same ID.  If not provided, the error is added to the
   *     list unconditionally.
   * @return {ErrorModel} A new or existing ErrorModel.
   * @export
   */

ErrorService.prototype.addWarning = function(text, opt_errorId) {
  return this.addError(ErrorTypes.WARNING, text, opt_errorId);
};


  /**
   * Adds an INFO to the errors list, optionally replacing an existing one.
   *
   * If the opt_error_id flag is specified, then if an error with that ID can
   * be found, it will be replaced.  Otherwise, a new error will be added.
   *
   * @param {!string} text The text to display.
   * @param {?string=} opt_errorId The ID of the error message.  It will replace
   *     an error with the same ID.  If not provided, the error is added to the
   *     list unconditionally.
   * @return {ErrorModel} A new or existing ErrorModel.
   * @export
   */

  ErrorService.prototype.addInfo = function(text, opt_errorId) {
    return this.addError(ErrorTypes.INFO, text, opt_errorId);
  };


  /**
   * Adds a SUCCESS to the errors list, optionally replacing an existing one.
   *
   * If the opt_error_id flag is specified, then if an error with that ID can
   * be found, it will be replaced.  Otherwise, a new error will be added.
   *
   * @param {!string} text The text to display.
   * @param {?string=} opt_errorId The ID of the error message.  It will replace
   *     an error with the same ID.  If not provided, the error is added to the
   *     list unconditionally.
   * @return {ErrorModel} A new or existing ErrorModel.
   * @export
   */

  ErrorService.prototype.addSuccess = function(text, opt_errorId) {
    return this.addError(ErrorTypes.SUCCESS, text, opt_errorId);
  };


  /**
   * Adds a DANGER to the errors list, optionally replacing an existing one.
   *
   * If the opt_error_id flag is specified, then if an error with that ID can
   * be found, it will be replaced.  Otherwise, a new error will be added.
   *
   * @param {!string} text The text to display.
   * @param {?string=} opt_errorId The ID of the error message.  It will replace
   *     an error with the same ID.  If not provided, the error is added to the
   *     list unconditionally.
   * @return {ErrorModel} A new or existing ErrorModel.
   * @export
   */

  ErrorService.prototype.addDanger = function(text, opt_errorId) {
    return this.addError(ErrorTypes.DANGER, text, opt_errorId);
  };


/**
 * Removes all errors.
 * @export
 */
ErrorService.prototype.removeAllErrors = function() {
  while (this.errors.length > 0) {
    this.errors.pop();
  }
};


/**
 * Removes an error from a specific index.
 * @param {!number} errorIndex The index in the errors collection that should
 *     be removed.
 * @export
 */
ErrorService.prototype.removeErrorAt = function(errorIndex) {
  this.errors.splice(errorIndex, 1);
};


/**
 * Removes an error from the list.
 *
 * @param {!ErrorModel} error An ErrorModel instance to remove.
 * @export
 */
ErrorService.prototype.removeError = function(error) {
  let errorIndex = this.errors.indexOf(error);

  if (!errorIndex) {
    console.log('removeError failed: error not found:');
    console.log(error);
  } else {
    this.removeErrorAt(errorIndex);
  }
};


/**
 * Removes an error matching a specific id.
 * @param {!number} errorId The id of the error to be removed.
 */
ErrorService.prototype.removeErrorById = function(errorId) {
  let error = this.filter_('getByProperty')('errorId', errorId, this.errors);

  if (!error) {
    console.log('removeError failed: id "' + errorId + '" not found.');
    return;
  }

  this.removeError(error);
};

});  // goog.scope
