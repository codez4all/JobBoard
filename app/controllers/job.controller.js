/**
 * Created by sheetal on 3/14/17.
 */

const MAX_LIMIT = 50;
const JOB_FIELDS = ['title', 'summary', 'description', 'type',
  'industry', 'country'];
const _ = require('lodash');
const mongoose = require('mongoose');
const Job = mongoose.model('Job');
const ObjectId = mongoose.Types.ObjectId;

module.exports.create = createJob;

function createJob(req, res, next) {
  let data = _.pick(req.body, JOB_FIELDS);
  data.company = req.company._id;
  Job.create(data, (err, job) => {
    if (err) {
    return next(err);
  }
  res.status(201).json(job);
});
}

module.exports.findById = findJobById;

function findJobById(req, res, next) {
  if (!ObjectId.isValid(id)) {
    res.status(404).send({ message: 'Not found.'});
  }
  Job.findById(req.params.jobId, (err, job) => {
    if (err) {
    return next(err);
  }
  res.resources.job = job;
  next();
});
}

module.exports.getAll = getAllJobs;

function getAllJobs(req, res, next) {
  const limit = +req.query.limit || MAX_LIMIT;
  const skip = +req.query.skip || 0;
  let query = _.pick(req.query, ['type', 'country', 'industry']);
  if (req.params.companyId) {
    query.company = req.params.companyId;
  }
  Job
    .find(query)
    .limit(limit)
    .skip(skip)
    .exec((err, jobs) => {
    if (err) {
    return next(err);
  }
  req.resources.jobs = jobs;
  next();
});
}


module.exports.update = updateJob;

function updateJob(req, res, next) {
  var data = _.pick(req.body, JOB_FIELDS);
  _.assign(req.resources.job, data);
  req.resources.job.save((err, updatedJob) => {
    if (err) {
    return next(err);
  }
  res.json(job);
});
}




