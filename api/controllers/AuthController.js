const { response } = require('express')
const jwt = require('jsonwebtoken')
const lodash = require('lodash')
const User = require('../models/User')
const { hashMake, hashVerify, randomInt } = require('../helpers/Helper.js')
const Mail = require('../helpers/Mail.js')

class Controller {
    async login(req, res, next) {
        let user = await User.findOne({
            $or: [
                { username: req.body.username },
                { email: req.body.username }
            ]
        })
        if (!user) {
            return res.error(400, 'Wrong password or username')
        }

        let verify = hashVerify(req.body.password, user.password)
        if (!verify) {
            return res.error(400, 'Wrong password or username')
        }

        if (!user.is_verified) {
            return res.error(403, 'Please activate your account')
        }

        let payload = {
            id: user._id,
            username: user.username
        }
        let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '90d' })
        return res.json({
            token,
            user: payload
        })
    }

    async register(req, res) {
        let data = lodash.pick(req.body, [
            'username',
            'password',
            'email',
            'fullname'
        ])
        let checkUsername = await User.findOne({ username: data.username })
        if (checkUsername) {
            return res.error(400, 'Username already used')
        }

        let checkEmail = await User.findOne({ email: data.email })
        if (checkEmail) {
            return res.error(400, 'Email already registered. Please login instead')
        }

        data.password = hashMake(data.password)
        data.verification_code = randomInt(999999, 100000)
        const user = new User(data)
        await user.save()
        
        await Mail.send(data.email, 'register', data)
        return res.json({
            success: true
        })
    }

    async getUserData(req, res) {
        return res.send({
            user: req.user
        })
    }
}

module.exports = new Controller()