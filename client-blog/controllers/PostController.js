const Post = require('../models/Post')
const Blog = require('../models/Blog')
const { postDate, generatePermalink } = require('../helpers/Helper')
const moment = require('moment')

class Controller {
    async myPostList(req, res) {
        let query = {
            blog_id: req.query.blog_id,
            is_deleted: false
        }
        if (req.query.search) {
            query.title = new RegExp(req.query.search, 'gi')
        }
        let posts = await Post.find(query).sort({ created_at: -1 }).lean()
        posts.forEach(v => {
            v.formatted_date = postDate(v.published_at)
            v.blog = {
                hostname: req.blog.hostname
            }
        })

        return res.json({
            posts,
            blog: req.blog
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
            'publish_soon',
            'labels'
        ])

        let published_at = Date.now()
        if (!data.publish_soon) {
            let concated = data.published_at_date + ' ' + data.published_at_time + ':00'
            published_at = moment(concated).toDate()
        }
        if (!data.permalink) {
            data.permalink = generatePermalink(data.title)
        }
        let findImage = data.body.match(/!\[.*]\(.*\)/)
        if (findImage && findImage.length > 0) {
            data.thumbnail = findImage[0].replace(/!\[.*]\(/, '').slice(0, -1)
        } else {
            data.thumbnail = 'https://via.placeholder.com/85?Text=No+Image'
        }
        Object.assign(data, {
            published_at,
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
            return res.error(404, 'Post not found')
        }

        return res.json({
            data
        })
    }

    async myPostUpdate(req, res) {
        let detail = await Post.findById(req.params.id)
        if (!detail) {
            return res.error(404, 'Post not found')
        }

        let data = req.getBody([
            'title',
            'permalink',
            'body',
            'labels'
        ])

        let findImage = data.body.match(/!\[.*]\(.*\)/)
        if (findImage && findImage.length > 0) {
            let thumbnail = findImage[0].replace(/!\[.*]\(/, '').slice(0, -1)
            if (findImage[0] !== thumbnail) {
                data.thumbnail = thumbnail
            }
        } else {
            data.thumbnail = 'https://via.placeholder.com/85'
        }

        Object.assign(detail, data)
        await detail.save()

        return res.json({
            success: true
        })
    }

    async postFeed(req, res) {
        if (!req.user.id) {
            return res.json({
                data: []
            })
        }
        let followedBlogIds = (await Follow.find({
            user_id: req.user.id
        })).map(v => v.blog_id)

        let data = await Post.find({
            is_published: true,
            is_deleted: false,
            published_at: { $lt: Date.now() },
            blog_id: { $in: followedBlogIds }
        }).sort({ created_at: -1 }).lean()

        if (data.length > 0) {
            let blogIds = data.map(v => v.blog_id)
            let titleBlogs = await Blog.find({
                _id: { $in: blogIds }
            }, { title: 1, hostname: 1, _id: 1 })

            data.forEach(v => {
                v.formatted_date = postDate(v.published_at)
                v.blog = titleBlogs.find(w => String(w._id) == String(v.blog_id)) || {}
            })
        }

        return res.json({
            data,
            following_count: followedBlogIds.length
        })
    }

    async postByBlog(req, res) {
        let data = await Post.find({
            is_published: true,
            is_deleted: false,
            published_at: {
                $lt: Date.now()
            },
            blog_id: req.params.id
        }).sort({ created_at: -1 }).lean()
        let blogIds = data.map(v => v.blog_id)
        let titleBlogs = await Blog.find({
            _id: { $in: blogIds }
        }, { title: 1, hostname: 1, _id: 1 })

        if (data.length > 0) {
            data.forEach(v => {
                v.formatted_date = postDate(v.published_at)
                v.blog = titleBlogs.find(w => String(w._id) == String(v.blog_id)) || {}
            })
        }

        return res.json({
            posts: data
        })
    }

    async myPostBulkAction(req, res) {
        let body = req.getBody([
            'action',
            'blog_id',
            'checked'
        ])
        if (body.action === 'delete') {
            await Post.updateMany({
                _id: {
                    $in: body.checked
                }
            }, {
                $set: {
                    is_deleted: true,
                    deleted_at: Date.now(),
                    deleted_by: req.user.id
                }
            })
        }

        return res.json({
            success: true
        })
    }
}

module.exports = new Controller()