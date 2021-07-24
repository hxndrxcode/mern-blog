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
}

module.exports = new Controller()