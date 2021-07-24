const Post = require('../models/Post')
const { postDate } = require('../helpers/Helper')

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
        ])
        Object.assign(data, {
            domain: req.blog.domain,
            created_by: req.user.id,
            updated_by: req.user.id
        })

        await new Post(data).save()
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