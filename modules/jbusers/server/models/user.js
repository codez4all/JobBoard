/**
 * Created by sheetal on 3/14/17.
 */

var UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  passwordSalt: {
    type: String,
    required: true,
    select: false
  },
  active: {
    type: Boolean,
    default: true
  },
  roles: {
    type: [
      {
        type: String,
        enum: ['user', 'member', 'owner']
      }
    ],
    default: ['user']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }

});
