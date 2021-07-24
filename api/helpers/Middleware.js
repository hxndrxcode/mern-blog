const jwt = require('jsonwebtoken')
const Blog = require('../models/Blog')

class Middleware {
    extender(req, res, next) {
        let authHeader = req.get('Authorization') || ''
        let token = authHeader.split(' ')
        if (token[1]) {
            req.authToken = token[1]
        }

        if (req.authToken && req.authToken !== 'undefined' && req.authToken !== 'null') {
            let verify = jwt.verify(req.authToken, process.env.JWT_SECRET)
            if (verify) {
                req.user = verify
            }
        }

        req.getBody = arr => {
            let data = {}
            arr.map(v => {
                data[v] = req.body[v]
            })
            return data
        }

        req.input = key => {
            return req.method === 'GET' ? req.query[key] : req.body[key]
        }

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
            next(Error(404))
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
