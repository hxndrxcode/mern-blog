const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Model = new Schema({
  oauth: Array,
  username: String,
  password: String,
  email: String,
  fullname: String,
  photo: String,
  bio: String,
  is_verified: { type: Boolean, default: false },
  verification_code: String,
  blog_count: { type: Number, default: 0 }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
});

// Compile model from schema
module.exports = mongoose.model('User', Model)