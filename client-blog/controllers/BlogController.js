const Post = require('../models/Post')

class Controller {
    async home(req, res) {
        const posts = await Post.find({
            blog_id: req.blog._id
        })
        .sort({ created_at: -1 })
        return res.render('home', {
            posts,
            isHome: true
        })
    }

    async postDetail(req, res) {
        const post = await Post.findOne({
            permalink: req.params.permalink
        })
        if (!post) {
            return res.status(404).send('Not Found!')
        }
        return res.render('post', {
            post
        })
    }
}

module.exports = new Controller()
