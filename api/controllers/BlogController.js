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
            'scheme',
            'subdomain',
            'domain',
            'domain_type',
            'title'
        ])
        if (data.domain_type === 'subdomain') {
            data.domain = ''
            data.hostname = data.scheme + data.subdomain + '.blogwi.com'
        } else {
            data.subdomain = data.domain.replace(/\./g, '')
            data.hostname = data.scheme + data.domain
        }
        data.user_id = req.user.id

        await new Blog(data).save()
        return res.json(data)
    }

    async myBlogUpdate(req, res) {
        let blog = await Blog.findOne({
            _id: req.params.id,
            user_id: req.user.id
        })
        if (!blog) {
            throw Error(404)
        }

        let body = []
        if (req.params.section === 'general') {
            body = req.getBody(['title', 'tagline', 'logo'])
        }
        if (req.params.section === 'domain') {
            body = req.getBody(['scheme', 'subdomain', 'domain'])
            if (body.domain) {
                body.hostname = body.scheme + body.domain
            } else {
                body.hostname = 'https://' + body.subdomain + '.blogwi.com'
            }
        }

        Object.assign(blog, body)
        await blog.save()
        return res.json({
            success: true
        })
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

    async exploreblogDetail(req, res) {
        let id = req.params.id
        let data = await Blog.findById(id)
        if (!data) {
            throw Error(404)
        }
        return res.json({
            data
        })
    }
}

module.exports = new Controller()
