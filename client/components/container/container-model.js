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
 * @fileoverview Model definition for a widget of type container. It inherits
 * from WidgetModel.
 * @author joemu@google.com (Joe Allan Muharsky)
 */

goog.provide('p3rf.perfkit.explorer.components.container.ContainerModel');
goog.provide('p3rf.perfkit.explorer.components.container.ContainerWidgetConfig');
goog.provide('p3rf.perfkit.explorer.components.container.ContainerWidgetModel');
goog.provide('p3rf.perfkit.explorer.components.container.Flow');

goog.require('p3rf.perfkit.explorer.models.WidgetConfig');
goog.require('p3rf.perfkit.explorer.models.WidgetModel');
goog.require('p3rf.perfkit.explorer.models.WidgetState');
goog.require('p3rf.perfkit.explorer.models.WidgetType');

goog.scope(function() {
const WidgetConfig = p3rf.perfkit.explorer.models.WidgetConfig;
const WidgetModel = p3rf.perfkit.explorer.models.WidgetModel;
const WidgetState = p3rf.perfkit.explorer.models.WidgetState;
const WidgetType = p3rf.perfkit.explorer.models.WidgetType;

/**
 * @enum {string}
 */
p3rf.perfkit.explorer.components.container.Flow = {
  ROW: 'row',
  COLUMN: 'column',
  WRAP: 'wrap'
};
const Flow = p3rf.perfkit.explorer.components.container.Flow;


/** @constructor */
p3rf.perfkit.explorer.components.container.
ContainerModel = function() {
  /** @export {Flow} */
  this.flow = Flow.ROW;

  /** @export {number} */
  this.columns = 1;

  /** @export {number} */
  this.height = 250;

  /** @export {?number} */
  this.header_height = null;

  /** @export {string} */
  this.header_text = '';

  /** @export {?number} */
  this.footer_height = null;

  /** @export {string} */
  this.footer_text = '';

  /** @export {Array.<WidgetConfig>} */
  this.children = [];

  /** @export {?number} */
  this.widget_header_height = null;

  /** @export {?number} */
  this.widget_footer_height = null;
};
const ContainerModel = (
    p3rf.perfkit.explorer.components.container.ContainerModel);


/**
 * @constructor
 * @extends p3rf.perfkit.explorer.models.WidgetModel
 */
p3rf.perfkit.explorer.components.container.
ContainerWidgetModel = function() {
  goog.base(this);

  this.type = WidgetType.CONTAINER;

  /**
   * @type {ContainerModel}
   * @export
   */
  this.container = new ContainerModel();
};
const ContainerWidgetModel = (
    p3rf.perfkit.explorer.components.container.
    ContainerWidgetModel);
goog.inherits(ContainerWidgetModel, WidgetModel);


/**
 * @constructor
 * @param {!Object} widgetFactoryService
 * @param {?(Object|ContainerWidgetModel)=} opt_model JSON or
 *     ContainerWidgetModel.
 * @extends p3rf.perfkit.explorer.models.WidgetConfig
 */
p3rf.perfkit.explorer.components.container.
ContainerWidgetConfig = function(
    widgetFactoryService, opt_model) {
  /**
   * The persisted model of the widget. It's usually a simple JSON object
   * returned by the server but it respects the ContainerWidgetModel class
   * definition.
   *
   * Warning: Do not keep a reference on this property, it can be replaced by an
   * updated JSON at any time. Instead, keep a reference on the
   * ContainerWidgetConfig object that contains it.
   *
   * @type {!(Object|ContainerWidgetModel)}
   * @export
   */
  this.model = opt_model || new ContainerWidgetModel();

  if (!this.model.id) {
    this.model.id = widgetFactoryService.generateWidgetId();
  }

  // Add the widget to widgetsById.
  widgetFactoryService.widgetsById[this.model.id] = this;

  /**
   * Returns the state object corresponding to this widget.
   *
   * Note: It is a function in order for Angular watchers to be able to watch
   * this widget and ignore its state. Otherwise, it will throw a circular
   * dependency error.
   *
   * @return {WidgetState}
   * @export
   */
  this.state = function() {
    return widgetFactoryService.statesById[this.model.id];
  };

  // Add the widget state to statesById.
  widgetFactoryService.statesById[this.model.id] =
  widgetFactoryService.statesById[this.model.id] || new WidgetState();
};
const ContainerWidgetConfig = (
    p3rf.perfkit.explorer.components.container.
    ContainerWidgetConfig);
// No formal goog.inherits to work around lack of generics.

});  // goog.scope
