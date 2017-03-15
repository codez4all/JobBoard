/**
 * Created by sheetal on 3/14/17.
 */

'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

let ApplicationSchema = new Schema({
  user: {
    type: ObjectId,
    required: true,
    ref: 'User'
  },
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'accepted', 'processed']
  },
  job: {
    type: ObjectId,
    required: true,
    ref: 'Job'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Application', ApplicationSchema);

