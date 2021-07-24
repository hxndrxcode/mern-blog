const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Model = new Schema({
  username: String,
  password: String,
  email: String,
  fullname: String,
  photo: String,
  bio: String,
  is_verified: Boolean,
  blog_count: Number
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
});

// Compile model from schema
module.exports = mongoose.model('User', Model)