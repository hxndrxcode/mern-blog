const express = require('express')
const router = express.Router()
const { errorHandler, handledBy, extender } = require('./helpers/Middleware.js')

router.use(extender)

const Blog = require('./controllers/BlogController.js')
const Post = require('./controllers/PostController.js')
const Page = require('./controllers/PageController.js')
const Comment = require('./controllers/CommentController.js')

router.get('/', handledBy(Blog.home))
router.get('/post/:permalink', handledBy(Blog.postDetail))

router.use(errorHandler)


module.exports = router