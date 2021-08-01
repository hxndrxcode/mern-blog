const express = require('express')
const router = express.Router()
const { errorHandler, handledBy, loggedIn, extender, checkAsset } = require('./helpers/Middleware.js')

router.use(extender)

const Auth = require('./controllers/AuthController.js')
const User = require('./controllers/UserController.js')
const Blog = require('./controllers/BlogController.js')
const Post = require('./controllers/PostController.js')
const Page = require('./controllers/PageController.js')
const Comment = require('./controllers/CommentController.js')
const Follow = require('./controllers/FollowController.js')


router.post('/auth/login', handledBy(Auth.login))
router.post('/auth/register', handledBy(Auth.register))

router.get('/postfeed', handledBy(Post.postFeed))
router.get('/exploreblog', handledBy(Blog.exploreBlog))
router.get('/exploreblog/:id', handledBy(Blog.exploreblogDetail))

router.use(loggedIn)

router.get('/auth/user', handledBy(Auth.getUserData))
router.get('/profile', handledBy(User.profile))
router.put('/profile', handledBy(User.updateProfile))


router.get('/myblog', handledBy(Blog.myBlogList))
router.get('/myblog/:id', handledBy(Blog.myBlogDetail))
router.post('/myblog', handledBy(Blog.myBlogStore))
router.put('/myblog/:id/domain', handledBy(Blog.myBlogUpdateDomain))
router.put('/myblog/:id/:section', handledBy(Blog.myBlogUpdate))

router.use(checkAsset)

router.get('/mypost', handledBy(Post.myPostList))
router.get('/mypost/:id', handledBy(Post.myPostDetail))
router.post('/mypost', handledBy(Post.myPostStore))
router.put('/mypost/:id', handledBy(Post.myPostUpdate))
router.post('/mypost/bulkaction', handledBy(Post.myPostBulkAction))

router.get('/mypage', handledBy(Page.myPageList))
router.get('/mypage/:id', handledBy(Page.myPageDetail))
router.post('/mypage', handledBy(Page.myPageStore))
router.put('/mypage/:id', handledBy(Page.myPageUpdate))
router.post('/mypage/bulkaction', handledBy(Page.myPageBulkAction))

router.get('/mycomment', handledBy(Comment.myCommentList))
router.get('/mycomment/:id', handledBy(Comment.myCommentDetail))
router.post('/mycomment/bulkaction', handledBy(Comment.myCommentBulkAction))

router.get('/myfollower', handledBy(Follow.myFollower))
router.delete('/myfollower/:id', handledBy(Follow.myFollowerUnfollow))

router.use(errorHandler)


module.exports = router