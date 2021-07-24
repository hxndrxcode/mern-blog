const express = require('express')
const router = express.Router()
const { errorHandler, handledBy, loggedIn, extender, checkAsset } = require('./helpers/Middleware.js')

router.use(extender)

const Auth = require('./controllers/AuthController.js')
const User = require('./controllers/UserController.js')
const Blog = require('./controllers/BlogController.js')
const Post = require('./controllers/PostController.js')


router.post('/auth/login', handledBy(Auth.login))
router.post('/auth/register', handledBy(Auth.register))

router.get('/postfeed', handledBy(Post.postFeed))
router.get('/exploreblog', handledBy(Blog.exploreBlog))

router.use(loggedIn)

router.get('/auth/user', handledBy(Auth.getUserData))
router.get('/profile', handledBy(User.profile))
router.put('/profile', handledBy(User.updateProfile))


router.get('/myblog', handledBy(Blog.myBlogList))
router.get('/myblog/:id', handledBy(Blog.myBlogDetail))
router.post('/myblog', handledBy(Blog.myBlogStore))

router.use(checkAsset)

router.get('/mypost', handledBy(Post.myPostList))
router.get('/mypost/:id', handledBy(Post.myPostDetail))
router.post('/mypost', handledBy(Post.myPostStore))
router.put('/mypost/:id', handledBy(Post.myPostUpdate))

router.use(errorHandler)


module.exports = router