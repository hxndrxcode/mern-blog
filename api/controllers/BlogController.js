const { sendResponse } = require('../helpers/Helper')
const Blog = require('../models/Blog')
const Follow = require('../models/Follow')
const dns = require('dns').promises
const { getDomain, getSubdomain } = require('tldjs')

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
            'subdomain',
            'title'
        ])

        let exist = await Blog.findOne({ subdomain: data.subdomain })
        if (exist) {
            return res.done(403, 'Subdomain has been used')
        }

        data.scheme = 'https://'
        data.hostname = data.scheme + data.subdomain + '.blogwi.com'
        data.user_id = req.user.id

        await new Blog(data).save()
        return res.done(200, 'Success')
    }

    async myBlogUpdate(req, res) {
        let blog = await Blog.findOne({
            _id: req.params.id,
            user_id: req.user.id
        })
        if (!blog) {
            return res.done(404, 'Blog not found')
        }

        let body = []
        if (req.params.section === 'general') {
            body = req.getBody(['title', 'tagline', 'logo'])
        }

        if (req.params.section === 'metatag') {
            body = req.getBody(['meta_tags'])
        }

        Object.assign(blog, body)
        await blog.save()
        return res.done(200, 'Success')
    }

    async myBlogUpdateDomain(req, res) {
        let blog = await Blog.findOne({
            _id: req.params.id,
            user_id: req.user.id
        })
        if (!blog) {
            return res.done(404, 'Blog not found')
        }

        const body = req.getBody([
            'scheme', 'subdomain', 'domain'
        ])

        if (blog.subdomain !== body.subdomain) {
            let exist = await Blog.findOne({ subdomain: body.subdomain })
            if (exist) {
                return res.done(403, 'Subdomain is used')
            }
            body.hostname = 'https://' + body.subdomain + '.blogwi.com'
        }

        if (body.domain && blog.domain !== body.domain) {
            let sub = getSubdomain(body.domain)
            body.domain = (sub ? '' : 'www.') + body.domain

            let exist = await Blog.findOne({ domain: body.domain })
            if (exist) {
                return res.done(403, 'Domain is used')
            }

            let cname1 = await dns.resolveCname(body.domain)
            if (!cname1.includes('host.blogwi.org')) {
                return res.done(403, body.domain + ' does not yet pointed to host.blogwi.org')
            }

            let verifyuser = req.user.username + '.' + getDomain(body.domain)
            let cname2 = await dns.resolveCname(verifyuser)
            if (!cname2.includes('dv.blogwi.org')) {
                return res.done(403, verifyuser + ' does not pointed to dv.blogwi.org')
            }

            body.hostname = body.scheme + body.domain
        }

        Object.assign(blog, body)
        await blog.save()
        return res.done(200, 'Success')
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
