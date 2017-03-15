/**
 * Created by sheetal on 3/14/17.
 */

'use strict';

const express = require('express');
const router = express.Router();
const companyCtrl = require('../controllers/company.controller');
const jobCtrl = require('../controllers/job.controller');
const auth = require('../middlewares/authentication');
const authorize = require('../middlewares/authorization');
const response = require('../helpers/response');

//Getting one and all jobs
router.get(
  '/jobs',
  jobCtrl.getAll,
  response.toJSON('jobs')
);

router.get(
  '/jobs/:jobId',
  jobCtrl.findById,
  response.toJSON('job')
);

//getting the jobs of a certain company
router.get(
  '/companies/:companyId/jobs',
  jobCtrl.getAll,
  response.toJSON('jobs')
);

//create job
router.post(
  '/companies/:companyId/jobs',
  auth.ensured,
  companyCtrl.findById,
  authorize.onlyMembers,
  jobCtrl.create
);

//update job
router.put(
  '/companies/:companyId/jobs/:jobId',
  auth.ensured,
  companyCtrl.findById,
  authorize.onlyMembers,
  jobCtrl.findById,
  jobCtrl.update
);




