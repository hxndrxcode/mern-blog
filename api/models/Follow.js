const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Model = new Schema({
  user_id: Schema.Types.ObjectId,
  blog_id: Schema.Types.ObjectId,
  user: Object,
  blog: Object,
  formatted_date: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
});

// Compile model from schema
module.exports = mongoose.model('Follow', Model)