const Blog = require('../models/Blog')

class Middleware {
    async extender(req, res, next) {
        let hostname = req.protocol + '://' + req.hostname
        let blog = await Blog.findOne({
            hostname
        }).lean()
        if (!blog) {
            return res.send('Not Found!!!')
        }
        blog.navbarLink = []
        for (let i in blog.navbar) {
            if (blog.navbar[i].indexOf('label::') === 0) {
                let label = blog.navbar[i].replace('label::', '')
                blog.navbarLink[i] = {
                    url: '/label/' + label,
                    title: label
                }
            }
        }

        req.app.locals.blog = blog
        req.app.locals.isHome = false
        req.app.locals.activeNavbar = '/'
        req.blog = blog
        next()
    }

    errorHandler(error, req, res, next) {
        if (error.message === '404') {
            res.status(404).send({
                message: 'Not Found!'
            })
        } else if (error.message === '401') {
            res.status(401).send({
                message: 'Unauthorized!'
            })
        } else if (error.message === '403') {
            res.status(403).send({
                message: 'Forbidden!'
            })
        } else {
            console.error(error)
            res.status(500).send({
                message: 'Something Error!'
            })
        }
    }

    loggedIn(req, res, next) {
        if (!req.user) {
            next(Error(401))
        }

        next()
    }

    async checkAsset(req, res, next) {
        let check = await Blog.findOne({
            user_id: req.user.id,
            _id: req.input('blog_id')
        })
        if (!check) {
            next(Error(403))
        }

        req.blog = check
        next()
    }

    handledBy(fn) {
        return (req, res, next) => {
            return Promise
                .resolve(fn(req, res, next))
                .catch(next)
        }
    }
}

module.exports = new Middleware()