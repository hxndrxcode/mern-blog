const Post = require('../models/Post')
const Blog = require('../models/Blog')
const { postDate } = require('../helpers/Helper')
const moment = require('moment')

class Controller {
    async myPostList(req, res) {
        let data = await Post.find({
            blog_id: req.query.blog_id
        })

        data.forEach(v => {
            v.formatted_date = postDate(v.published_at)
        })

        return res.json({
            data
        })
    }

    async myPostStore(req, res) {
        let data = req.getBody([
            'blog_id',
            'title',
            'permalink',
            'body',
            'published_at_date',
            'published_at_time',
            'is_published',
            'publish_soon'
        ])

        let published_at = Date.now()
        if (!data.publish_soon) {
            let concated = data.published_at_date + ' ' + data.published_at_time + ':00'
            published_at = moment(concated).toDate()
        }
        Object.assign(data, {
            published_at,
            domain: req.blog.domain,
            created_by: req.user.id,
            updated_by: req.user.id
        })

        let create = await new Post(data).save()
        if (create) {
            await Blog.updateOne({_id: req.blog._id}, {
                $inc: {
                    post_count: 1
                }
            })
        }

        return res.json({
            success: true
        })
    }

    async myPostDetail(req, res) {
        let data = await Post.findById(req.params.id)
        if (!data) {
            throw Error(404)
        }

        return res.json({
            data
        })
    }

    async myPostUpdate(req, res) {
        let detail = await Post.findById(req.params.id)
        if (!detail) {
            throw Error(404)
        }

        let data = req.getBody([
            'title',
            'permalink',
            'body',
        ])
        Object.assign(detail, data)
        await detail.save()

        return res.json({
            success: true
        })
    }

    async postFeed(req, res) {
        let data = await Post.find({
            is_published: true,
            is_deleted: false,
            published_at: {
                $lt: Date.now()
            }
        })

        data.forEach(v => {
            v.thumbnail = 'https://via.placeholder.com/85'
            v.formatted_date = postDate(v.published_at)
        })

        return res.json({
            data
        })
    }
}

module.exports = new Controller()