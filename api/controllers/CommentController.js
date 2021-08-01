const Comment = require('../models/Comment')
const Post = require('../models/Post')
const { postDate } = require('../helpers/Helper')

class Controller {
    async myCommentList(req, res) {
        let postId = []
        if (req.query.search) {
            let findPost = await Post.find({
                title: new RegExp(req.query.search, 'gi')
            }, { _id: 1})
            postId = findPost.map(v => v._id)
            if (postId.length === 0) {
                return res.done(200, 'Success', [])
            }
        }

        let query = {
            blog_id: req.query.blog_id
        }
        if (postId.length > 0) {
            query.post_id = { $in: postId }
        }

        let data = await Comment.find(query)
        let post = await Post.find({
            _id: { $in: data.map(v => v.post_id) }
        }, {
            _id: 1, title: 1, permalink: 1
        })

        data.forEach(v => {
            v.formatted_date = postDate(v.created_at)
            let postt = post.find(w => String(w._id) === String(v.post_id))
            v.post = {
                title: postt.title,
                permalink: postt.permalink
            }
            v.blog = {
                hostname: req.blog.hostname
            }
        })

        return res.done(200, 'Success', {
            comments: data,
            blog: req.blog
        })
    }

    async myCommentBulkAction(req, res) {
        let body = req.getBody([
            'action',
            'blog_id',
            'checked'
        ])

        if (body.action === 'hide' || body.action === 'show') {
            await Comment.updateMany({
                _id: {
                    $in: body.checked
                }
            }, {
                $set: {
                    is_hidden: Boolean(body.action === 'hide')
                }
            })
        }

        if (body.action === 'delete') {
            await Comment.updateMany({
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

    async myCommentDetail(req, res) {
        let data = await Comment.findOne({
            _id: req.params.id,
            user_id: req.user.id
        })
        if (!data) {
            throw Error(404)
        }
        return res.json({
            data
        })
    }

}

module.exports = new Controller()