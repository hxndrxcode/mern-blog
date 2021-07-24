const Blog = require('../models/Blog')

class Controller {
    async myBlogList(req, res) {
        let data = await Blog.find({
            user_id: req.user.id
        })
        return res.json({
            data
        })
    }

    async myBlogStore(req, res) {
        let data = req.getBody([
            'domain',
            'title'
        ])
        data.user_id = req.user.id

        await new Blog(data).save()
        return res.json(data)
    }

    async myBlogDetail(req, res) {
        let data = await Blog.findOne({
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

    async exploreBlog(req, res) {
        let data = await Blog.find()
        return res.json({
            data
        })
    }
}

module.exports = new Controller()