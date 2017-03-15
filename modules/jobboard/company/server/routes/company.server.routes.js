/**
 * Created by sheetal on 3/14/17.
 */

'use strict';
const express = require('express');
const router = express.Router();
const companyCtrl = require('../controllers/company.controller');
const auth = require('../middlewares/authentication');
const authorize = require('../middlewares/authorization');
const response = require('../helpers/response');

//Create a company
router.post(
  '/companies',
  auth.ensured,
  companyCtrl.checkUserCompany,
  companyCtrl.create
);

//Get all companies
router.get(
  '/companies',
  companyCtrl.getAll,
  response.toJSON('companies')
);

//Get a company by ID
router.get(
  '/companies/:companyId',
  companyCtrl.findById,
  response.toJSON('company')
);

//Update a company
router.put(
  '/companies/:companyId',
  auth.ensured,
  companyCtrl.findById,
  authorize.onlyOwner,
  companyCtrl.update,
  response.toJSON('company')
);

//Add company members
router.post(
  '/companies/:companyId/members',
  auth.ensured,
  companyCtrl.findById,
  authorize.onlyOwner,
  companyCtrl.addMember,
  response.toJSON('company')
);

//Remove a company member
router.delete(
  '/companies/:companyId/members',
  auth.ensured,
  companyCtrl.findById,
  authorize.onlyOwner,
  companyCtrl.removeMember,
  response.toJSON('company')
);

//Export the router
module.exports = router;







