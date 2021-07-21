const Blog = require('../models/Blog')

class Controller {
    async list(req, res) {
        let data = await Blog.find({
            user_id: req.user.id
        })
        return res.json({
            data
        })
    }

    async store(req, res) {
        let data = req.getBody([
            'domain',
            'title'
        ])
        data.user_id = req.user.id

        await new Blog(data).save()
        return res.json(data)
    }

    async detail(req, res) {
        let data = await Blog.findById(req.params.id)
        return res.json({
            data
        })
    }
}

module.exports = new Controller()