const jwt = require('jsonwebtoken')

class Middleware {
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

    getToken(req, res, next) {
        let authHeader = req.get('Authorization') || ''
        let token = authHeader.split(' ')
        if (token[1]) {
            req.authToken = token[1]
        }

        next()
    }

    loggedIn(req, res, next) {
        if (!req.authToken || req.authToken === 'undefined' || req.authToken === 'null') {
            throw Error(401)
        }

        let verify = jwt.verify(req.authToken, process.env.JWT_SECRET)
        if (!verify) {
            throw Error(401)
        }

        req.user = verify
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
