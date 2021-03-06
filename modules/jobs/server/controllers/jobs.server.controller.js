'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Job = mongoose.model('Job'),
  Company = mongoose.model('Company'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Job
 */
exports.create = function(req, res) {
  var job = new Job(req.body);
  job.created_by = req.user;

  var companySearchQuery = {user: req.user};

  Company.findOne(companySearchQuery).exec(function (err, company) {
    if(err){
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else if(!company){
      return res.status(400).send({
        message: 'Create company before creating job!'
      });
    }else{
      job.company = company;
      // Save Job
      job.save(function(err) {
        if (err) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else {
          res.jsonp(job);
        }
      });
    }

  });


};

/**
 * Show the current Job
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var job = req.job ? req.job.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  job.isCurrentUserOwner = req.user && job.created_by && job.created_by._id.toString() === req.user._id.toString();

  res.jsonp(job);
};

/**
 * Update a Job
 */
exports.update = function(req, res) {
  var job = req.job;

  job = _.extend(job, req.body);

  job.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(job);
    }
  });
};

/**
 * Delete an Job
 */
exports.delete = function(req, res) {
  var job = req.job;

  job.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(job);
    }
  });
};

/**
 * List of Jobs
 */
exports.list = function(req, res) {
  Job.find().sort('-created').populate('created_by', 'displayName').exec(function(err, jobs) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(jobs);
    }
  });
};

/**
 * Job middleware
 */
exports.jobByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Job is invalid'
    });
  }

  Job.findById(id).populate('created_by', 'displayName').exec(function (err, job) {
    if (err) {
      return next(err);
    } else if (!job) {
      return res.status(404).send({
        message: 'No Job with that identifier has been found'
      });
    }
    req.job = job;
    next();
  });
};
