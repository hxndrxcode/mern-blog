const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Model = new Schema({
  user_id: String,
  domain: String,
  title: String,
  post_count: Number,
}, {
    timestamps: true
});

// Compile model from schema
module.exports = mongoose.model('Blog', Model)