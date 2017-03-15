/**
 * Created by sheetal on 3/14/17.
 */

'use strict';

const _ = require('lodash');
const mongoose = require('mongoose');
const Company = mongoose.model('Company');
var errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

module.exports.create = createCompany;

function createCompany(req, res, next) {
  var data = _.pick(req.body, ['name', 'country', 'address']);
  data.owner = req.user._id;
  data.members = [req.user._id];

  Company.create(data, function(err, company) {
    if (err) {
    return next(err);
  }
  res.status(201).json(company);
});
}

module.exports.findById = findCompanyById;

function findCompanyById(req, res, next) {
  if (!ObjectId.isValid(id)) {
    res.status(404).send({message: 'Not found.'});
  }
  Company.findById(req.params.companyId, function(err, company) {
    if (err) {
    return next(err);
  }
  req.resources.company = company;
  next();
});
}

module.exports.getAll = getAllCompanies;

function getAllCompanies(req, res, next) {
  const limit = +req.query.limit || 50;
  const skip = +req.query.skip || 0;
  var query = _.pick(req.query, ['country']);
  Company
    .find(query)
    .limit(limit)
    .skip(skip)
    .exec(function(err, companies) {
    if (err) {
    return next(err);
  }
  req.resources.companies = companies;
  next();
});
}

module.exports.update = updateCompany;

function updateCompany(req, res, next) {
  var data = _.pick(req.body, ['name', 'country', 'address']);
  _.assign(req.resources.company, req.body);
  req.resources.company.save(function (err, updatedCompany)  {
    if (err) {
    return next(err);
  }
  req.resources.company = updatedCompany;
  next();
});
}


module.exports.addMember = addCompanyMember;

function addCompanyMember(req, res, next) {
  var includes = _.includes(req.resources.company.members, req.body.
    member);
  if (includes) {
    return res.status(409).json({
      message: 'User is already a member of your company',
      type: 'already_member'
    });
  }
  req.resources.company.members.push(req.body.member);
  req.resources.company.save(function (err, updatedCompany)  {
    if (err) {
    return next(err);
  }
  req.resources.company = updatedCompany;
  next();
});
}

module.exports.removeMember = removeCompanyMember;

function removeCompanyMember(req, res, next) {
  var includes = _.includes(req.resources.company.members, req.body.
    member);
  if (!includes) {
    return res.status(409).json({
      message: 'User is not a member of your company',
      type: 'not_member'
    });
  }
  _.pull(req.resources.company.members, req.body.member);
  req.resources.company.save(function (err, updatedCompany) {
    if (err) {
    return next(err);
  }
  req.resources.company = updatedCompany;
  next();
});
}





