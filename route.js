const express = require('express')
const router = express.Router()
const { errorHandler, handledBy, loggedIn, getToken } = require('./helpers/Middleware.js')

router.use(getToken)

const Auth = require('./controllers/AuthController.js')
const User = require('./controllers/UserController.js')
const Blog = require('./controllers/BlogController.js')


router.post('/auth/login', handledBy(Auth.login))
router.post('/auth/register', handledBy(Auth.register))

router.use(loggedIn)

router.get('/auth/user', handledBy(Auth.getUserData))
router.get('/user', handledBy(User.list))

router.get('/my/blog', handledBy(Blog.list))
router.use(errorHandler)


module.exports = router