const User = require('../models/User')

class Controller {
    async profile(req, res) {
        let data = await User.findById(req.user.id)
        return res.json({
            data
        })
    }

    async updateProfile(req, res) {
        let data = await User.findById(req.user.id)
        let update = req.getBody([
            'fullname',
            'photo',
            'bio'
        ])
        Object.assign(data, update)
        await data.save()
        return res.json({
            success: true
        })
    }

    async authorList(req, res) {
        let find = {}
        let authors = await User.find(find).sort({ blog_count: -1 })
        return res.json({
            authors
        })
    }

    async authorDetail(req, res) {
        let user = await User.findOne({
            username: req.params.username
        })
        return res.json({
            user
        })
    }
}

module.exports = new Controller()