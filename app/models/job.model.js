/**
 * Created by sheetal on 3/14/17.
 */

//Add the necessary dependencies
const mongoose = require('mongoose');
const commonHelper = require('../helpers/common');
const Industries = require('../../config/variables/industries');
const Countries = require('../../config/variables/countries');
const Jobtypes = require('../../config/variables/jobtypes');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

//Retrieve only a list of validation values from the variable files
const indEnum = Industries.map(item => item.slug);
const cntEnum = Countries.map(item => item.code);
const jobEnum = Jobtypes.map(item => item.slug);

// Define the Mongoose schema
let JobSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    maxlength: 250
  },
  description: {
    type: String
  },
  type: {
    type: String,
    required: true,
    enum: jobEnum
  },

  company: {
    type: ObjectId,
    required: true,
    ref: 'Company'
  },
  industry: {
    type: String,
    required: true,
    enum: indEnum
  },
  country: {
    type: String,
    required: true,
    enum: cntEnum
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

//Add a pre-save hook
JobSchema.pre('save', (next) => {
  this.slug = commonHelper.createSlug(this.name);
next();
});

//compile the model
module.exports = mongoose.model('Job', JobSchema);
