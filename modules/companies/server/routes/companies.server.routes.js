'use strict';

/**
 * Module dependencies
 */
var companiesPolicy = require('../policies/companies.server.policy'),
  companies = require('../controllers/companies.server.controller');

module.exports = function(app) {
  // Companies Routes
  app.route('/api/companies').all(companiesPolicy.isAllowed)
    .get(companies.list)
    .post(companies.create);

  app.route('/api/companies/:companyId').all(companiesPolicy.isAllowed)
    .get(companies.read)
    .put(companies.update)
    .delete(companies.delete)
    .post(companies.companyJobs);

/*  app.route('/api/companies/jobs/:companyId').all(companiesPolicy.isAllowed)
    .get(companies.companyJobs);
    //.put(companies.update)
    //.delete(companies.delete);*/

    app.route('/api/companies/jobs').all(companiesPolicy.isAllowed)
    .post(companies.companyJobs);
  // Finish by binding the Company middleware
  app.param('companyId', companies.companyByID);
};
