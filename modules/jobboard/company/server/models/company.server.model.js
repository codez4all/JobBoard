/**
 * Created by sheetal on 3/14/17.
 */

'use strict';

const mongoose = require('mongoose');
const commonHelper = require('../helpers/common');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var CompanySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String
  },
  owner: {
    type: ObjectId,
    required: true,
    ref: 'User'
  },
  members: {
    type: Array,
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

CompanySchema.pre('save', function(next) {
  this.slug = commonHelper.createSlug(this.name);
next();
});


// compile Company model
module.exports = mongoose.model('Company', CompanySchema);
