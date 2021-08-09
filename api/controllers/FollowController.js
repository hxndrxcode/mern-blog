const { postDate } = require('../helpers/Helper')
const Follow = require('../models/Follow')
const User = require('../models/User')

class Controller {
    async myFollower(req, res) {
        let query = {
            blog_id: req.query.blog_id
        }
        if (req.query.search) {
            let term = new RegExp(req.query.search, 'gi')
            let search = await User.find({
                $or: [
                    { username: term },
                    { fullname: term }
                ]
            }, {_id: 1})
            query.user_id = {
                $in: search.map(v => v._id)
            }
        }

        let data = await Follow.find(query)
        let users = await User.find({
            _id: {
                $in: data.map(v => v.user_id)
            }
        })
        data.forEach(v => {
            v.user = users.find(w => String(w._id) === String(v.user_id))
            v.formatted_date = postDate(v.created_at)
        })

        return res.json({
            followers: data,
            blog: req.blog
        })
    }

    async myFollowerUnfollow(req, res) {
        return res.error(200, 'Success', data)
    }

    async myFollowingBlog(req, res) {
        let data = await Follow.aggregate({
            $match: {
                userid: req.user.id
            },
            $lookup: {
                from: 'blogs',
                localField: 'blog_id',
                foreignField: '_id',
                as: 'blog'
            }
        })
        return res.json(data)        
    }

    async doFollow(req, res) {
        let obj = {
            user_id: req.user.id,
            blog_id: req.params.id
        }
        let check = await Follow.findOne(obj)
        if (check) {
            return res.json(true)
        }

        await new Follow(obj).save()
        return res.json(true)
    }

    async doUnfollow(req, res) {
        let obj = {
            user_id: req.user.id,
            blog_id: req.params.id
        }
        await Follow.findOneAndDelete(obj)
        return res.json(true)        
    }
}

module.exports = new Controller()