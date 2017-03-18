'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Job Schema
 */
var JobSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Job Name',
    trim: true
  },
  description: {
    type: String,
    default: '',
    required: 'Please fill Job Description',
    trim: true
  },
  seniority_level: {
    type: String,
    default: '',
    trim: true
  },
  employment_type: {
    type: String,
    default: '',
    trim: true
  },
  job_functions: {
    type: String,
    default: '',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  created_by: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  company: {
    type: Schema.ObjectId,
    ref: 'Company'
  }
});

mongoose.model('Job', JobSchema);
