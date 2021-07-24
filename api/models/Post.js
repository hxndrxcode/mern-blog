const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Model = new Schema({
  blog_id: String,
  domain: String,
  title: String,
  permalink: String,
  body: String,
  thumbnail: String,
  is_published: { type: Boolean, default: true },
  is_deleted: { type: Boolean, default: false },
  comment_count: { type: Number, default: 0 },
  published_at: { type: Date, default: Date.now() },
  created_by: String,
  updated_by: String,
  deleted_by: String,
  deleted_at: Date,
  formatted_date: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
});

Model.set('toJSON', { virtuals: true })

// Compile model from schema
module.exports = mongoose.model('Post', Model)