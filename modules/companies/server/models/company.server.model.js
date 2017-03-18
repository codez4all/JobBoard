'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Company Schema
 */
var CompanySchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Company name',
    trim: true
  },
  headquarters: {
    type: String,
    default: '',
    required: 'Please fill Company headquarters',
    trim: true
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  website: {
    type: String,
    default: '',
    trim: true,
  },
  industry: {
    type: String,
    default: '',
    required: 'Please fill industry type',
    trim: true
  },
  specialties: {
    type: String,
    default: '',
    trim: true
  },
  company_size:{
    type: String,
    default: '',
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  members: {
    type: Array,
    default:[]
  },
  created: {
    type: Date,
    default: Date.now
  }

});

mongoose.model('Company', CompanySchema);
