const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Model = new Schema({
  blog_id: String,
  title: String,
  permalink: String,
  body: String,
  is_published: { type: Boolean, default: true },
  is_deleted: { type: Boolean, default: false },
  published_at: { type: Date, default: Date.now() },
  created_by: String,
  updated_by: String,
  deleted_by: String,
  deleted_at: Date,
  formatted_date: String,
  blog: Object
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
});

// Compile model from schema
module.exports = mongoose.model('Page', Model)