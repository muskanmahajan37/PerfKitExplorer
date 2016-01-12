/**
 * @copyright Copyright 2015 Google Inc. All rights reserved.
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
 * @fileoverview Version info class, including update and verify scripts.
 *
 * v8   2015-Aug    Adds a chart.columns array to store column styles.
 *
 * @author joemu@google.com (Joe Allan Muharsky)
 */


goog.provide('p3rf.perfkit.explorer.components.dashboard.versions.DashboardSchemaV10');

goog.require('p3rf.perfkit.explorer.components.dashboard.versions.DashboardVersionUtil');
goog.require('p3rf.perfkit.explorer.ext.bigquery.BigqueryConfigModel');


goog.scope(function() {
  const explorer = p3rf.perfkit.explorer;
  const DashboardVersionUtil = explorer.components.dashboard.versions.DashboardVersionUtil;
  const BigQueryConfigModel = explorer.ext.bigquery.BigqueryConfigModel;

  /**
   * @constructor
   */
  explorer.components.dashboard.versions.DashboardSchemaV10 = function() {
    this.version = '10';
  };
  const DashboardSchema = (
      explorer.components.dashboard.versions.DashboardSchemaV10);

  DashboardSchema.prototype.verify = function(dashboard) {
    if (!goog.isDefAndNotNull(dashboard.config)) {
      return false;
    }

    if (!goog.isDefAndNotNull(dashboard.config.bigQuery)) {
      return false;
    }

    if (!goog.isDefAndNotNull(dashboard.config.bigQuery.optimizeCurrentTimestamp)) {
      return false;
    }

    return DashboardVersionUtil.VerifyDashboard(
        dashboard, null, function(widget) {
      if (!goog.isDefAndNotNull(widget.datasource.config.bigQuery)) {
        return false;
      }

      if (!goog.isDefAndNotNull(widget.datasource.config.bigQuery.optimizeCurrentTimestamp)) {
        return false;
      }

      return true;
    });
  };

  DashboardSchema.prototype.update = function(dashboard) {
    if (!goog.isDefAndNotNull(dashboard.config)) {
      dashboard.config = {};
    }

    if (!goog.isDefAndNotNull(dashboard.config.bigQuery)) {
      dashboard.config.bigQuery = new BigQueryConfigModel(false);
      
      dashboard.config.bigQuery.optimizeCurrentTimestamp.enabled = false;
      dashboard.config.bigQuery.optimizeCurrentTimestamp.granularity = 'HOUR';
    }

    DashboardVersionUtil.UpdateDashboard(dashboard, null, function(widget) {
      if (!goog.isDefAndNotNull(widget.datasource.config.bigQuery)) {
        widget.datasource.config.bigQuery = new BigQueryConfigModel();
      }
    });
  };
});
