/**
 * Created by sheetal on 3/15/17.
 */
(function (app) {
  'use strict';

  app.registerModule('company', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('company.admin', ['core.admin']);
  app.registerModule('company.admin.routes', ['core.admin.routes']);
  app.registerModule('company.services');
  app.registerModule('company.routes', ['ui.router', 'core.routes', 'company.services']);
}(ApplicationConfiguration));
