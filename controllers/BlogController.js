const Blog = require('../models/Blog')

class Controller {
    async list(req, res) {
        let b = new Blog({
            user_id: req.user.id,
            domain: 'tutorial.blogwf.net',
            title: 'Kumpulan tutorial'
        })
        // await b.save()
        let data = await Blog.find({
            user_id: req.user.id
        })
        return res.json({
            data
        })
    }

    async store(req, res) {
        let data = new Blog({
            username: 'admin1',
            password: '123123',
            created_at: Date.now(),
            blog_count: 0
        })
        await data.save()
        return res.json(data)
    }
}

module.exports = new Controller()