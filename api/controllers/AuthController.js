const { response } = require('express')
const jwt = require('jsonwebtoken')
const lodash = require('lodash')
const User = require('../models/User')
const { hashMake, hashVerify, randomInt } = require('../helpers/Helper.js')
const Mail = require('../helpers/Mail.js')

class Controller {
    async login(req, res, next) {
        let user = await User.findOne({
            username: req.body.username
        })
        if (!user) {
            throw Error(404)
        }

        let verify = hashVerify(req.body.password, user.password)
        if (!verify) {
            throw Error(401)
        }

        let payload = {
            id: user._id,
            username: user.username
        }
        let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '90d' })
        return res.send({
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
            return res.status(405).send({
                message: 'Username already used.'
            })
        }

        let checkEmail = await User.findOne({ email: data.email })
        if (checkEmail) {
            return res.status(405).send({
                message: 'Email already registered. Please login instead.'
            })
        }

        data.password = hashMake(data.password)
        data.verification = randomInt(999999, 100000)
        const user = new User(data)
        await user.save()
        
        await Mail.send(data.email, 'register', data)
        return res.done(200, 'Success')
    }

    async getUserData(req, res) {
        return res.send({
            user: req.user
        })
    }
}

module.exports = new Controller()