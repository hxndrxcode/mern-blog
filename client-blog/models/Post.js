const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Model = new Schema({
    blog_id: String,
    title: String,
    permalink: String,
    html: String,
    snippet: String,
    thumbnail: String,
    is_published: { type: Boolean, default: true },
    is_deleted: { type: Boolean, default: false },
    comment_count: { type: Number, default: 0 },
    published_at: { type: Date, default: Date.now() },
    labels: Array,
    created_by: String,
    updated_by: String,
    deleted_by: String,
    deleted_at: Date
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
});

// Compile model from schema
module.exports = mongoose.model('Post', Model)