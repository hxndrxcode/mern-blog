const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Model = new Schema({
  blog_id: Schema.Types.ObjectId,
  post_id: Schema.Types.ObjectId,
  comment: String,
  created_by: String,
  updated_by: String,
  is_hidden: {type: Boolean, default: false},
  is_private: {type: Boolean, default: false}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
});

// Compile model from schema
module.exports = mongoose.model('Comment', Model)