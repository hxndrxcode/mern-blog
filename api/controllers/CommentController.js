const Comment = require('../models/Comment')
const Post = require('../models/Post')
const { postDate } = require('../helpers/Helper')

class Controller {
    async myCommentList(req, res) {
        // let x = new Comment({
        //     blog_id: '60f83876585d3500dd4872f3',
        //     post_id: '60fb2e46046bfc243dce48d8',
        //     comment: 'Wow keren banget tutorialnya gan! Jangan lupa kunjungan baliknya.',
        //     created_by: req.user.id,
        //     updated_by: req.user.id,
        //     is_hidden: false,
        //     formatted_date: ''
        // })
        // await x.save()

        let query = {
            blog_id: req.query.blog_id
        }
        if (req.query.post_id) {
            query.post_id = req.query.post_id
        }
        let data = await Comment.find(query)
        let post = await Post.find({
            _id: { $in: data.map(v => v.post_id) }
        }, {
            _id: 1, title: 1, permalink: 1
        })

        data.forEach(v => {
            v.formatted_date = postDate(v.created_at)
            v.post = post.find(w => String(w._id) === v.post_id)
        })

        return res.json({
            data
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