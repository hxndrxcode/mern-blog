const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Model = new Schema({
  blog_id: String,
  post_id: String,
  comment: String,
  created_by: String,
  updated_by: String,
  is_hidden: {type: Boolean, default: false},
  formatted_date: String,
  post: Object,
  blog: Object,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
});

// Compile model from schema
module.exports = mongoose.model('Comment', Model)