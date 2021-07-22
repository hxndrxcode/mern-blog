const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Model = new Schema({
  blog_id: String,
  title: String,
  permalink: String,
  body: String,
  comment_count: Number,
  created_by: String,
  updated_by: String,
}, {
    timestamps: true
});

// Compile model from schema
module.exports = mongoose.model('Blog', Model)