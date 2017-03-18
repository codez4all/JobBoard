'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Company = mongoose.model('Company'),
  //Jobs = mongoose.model('Job');
  Jobs = mongoose.model('Job'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Company
 */
exports.create = function(req, res) {
  var company = new Company(req.body);
  company.user = req.user;

  // Find this user has company created already
  Company.find({user: req.user}).exec(function(err, companies){
    if (err) {
      res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else if (companies.length == 0) {

      // Save if company does not exists
      company.save(function(err) {
        if (err) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else {
          res.jsonp(company);
        }
      });
    }else{
      return res.status(400).send({
        message: 'Company already present in your name!'
      });
    }
  });


};

/**
 * Show the current Company
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var company = req.company ? req.company.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  company.isCurrentUserOwner = req.user && company.user && company.user._id.toString() === req.user._id.toString();

  res.jsonp(company);
};

/**
 * Update a Company
 */
exports.update = function(req, res) {
  var company = req.company;

  company = _.extend(company, req.body);

  company.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(company);
    }
  });
};

/**
 * Delete an Company
 */
exports.delete = function(req, res) {
  var company = req.company;

  company.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(company);
    }
  });
};

/**
 * List of Companies
 */
exports.list = function(req, res) {
  Company.find().sort('-created').populate('user', 'displayName').exec(function(err, companies) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(companies);
    }
  });
};

/**
 * Company middleware
 */
exports.companyByID = function(req, res, next, id) {

  console.log("in companybyid::"+id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Company is invalid'
    });
  }

  Company.findById(id).populate('user', 'displayName').exec(function (err, company) {
    if (err) {
      return next(err);
    } else if (!company) {
      return res.status(404).send({
        message: 'No Company with that identifier has been found'
      });
    }
    req.company = company;
    next();
  });


};


exports.companyJobs = function(req, res){
  console.log("hkadsvbfhsk"+req.body.companyId);
  var companyId = req.body.companyId;

  console.log("in node:"+companyId);

/*  Jobs.find({employment_type:"Fulltime"}).exec(function(err, jobs) {
    console.log("after mongo hitttttt:"+jobs);
    if(err)
    {
      res.send({"status":"403"})
    }
    else
    {
      res.send({"status":"200", "jobs":jobs});
    }
  });*/


  Jobs.find({company:companyId}).exec(function(err, jobs) {
    console.log("after mongo hit:"+jobs);
    if(err)
    {
      res.send({"status":"403"})
    }
    else
    {
      res.send({"status":"200", "jobs":jobs});
    }
  });



//res.send({"data":"200status"});
}