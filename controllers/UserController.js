const User = require('../models/User')

class Controller {
    async list(req, res) {
        let data = await User.find()
        return res.json(data)
    }

    async store(req, res) {
        let data = new User({
            username: 'admin1',
            password: '123123',
            created_at: Date.now(),
            blog_count: 0
        })
        await data.save()
        return res.json(data)
    }
}

module.exports = new Controller()