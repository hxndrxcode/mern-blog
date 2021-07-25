const Blog = require('../models/Blog')
const Follow = require('../models/Follow')

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
            'domain_type',
            'is_https',
            'title'
        ])
        if (data.domain_type === 'subdomain') {
            data.prefix = data.domain
            data.domain = 'https://' + data.domain + '.blogwi.com'
        } else {
            data.prefix = data.domain.replace(/\./g, '')
            data.domain = (data.is_https ? 'https://' : 'http://') + data.domain
        }
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
        let show = req.input('show')
        let query = {}
        if (req.user && show === 'follow') {
            let blogs = await Follow.find({
                user_id: req.user.id
            }, { blog_id: 1 })
            query = { _id: { $in: blogs.map(v => v.blog_id) }}
        }

        let data = await Blog.find(query)
        return res.json({
            data
        })
    }
}

module.exports = new Controller()