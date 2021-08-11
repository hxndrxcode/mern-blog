const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Model = new Schema({
  user_id: String,
  scheme: String,
  subdomain: String,
  domain: String,
  hostname: String,
  title: String,
  tagline: String,
  logo: String,
  post_count: { type: Number, default: 0 },
  follower_count: { type: Number, default: 0 },
  meta_tags: Array,
  labels: Array
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
});

// Compile model from schema
module.exports = mongoose.model('Blog', Model)