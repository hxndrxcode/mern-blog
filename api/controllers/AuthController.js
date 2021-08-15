const jwt = require('jsonwebtoken')
const lodash = require('lodash')
const axios = require('axios')
const User = require('../models/User')
const { hashMake, hashVerify, randomInt } = require('../helpers/Helper.js')
const Mail = require('../helpers/Mail.js')
const { generateImage } = require('../helpers/Helper.js')
const google_client_id = process.env.GOOGLE_API
const google_redirect_uri = process.env.GOOGLE_REDIRECT
const google_client_secret = process.env.GOOGLE_SECRET

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
        data.photo = await generateImage(64)
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

    async getOauthGoogle(req, res) {
        const redir = req.query.redir
        const scopes = [
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile',
            'openid'
        ]
        const encodedScope = encodeURI(scopes.join(' '))
        const authUrl = 'https://accounts.google.com/o/oauth2/v2/auth?scope=' + encodedScope + '&' +
            'access_type=offline&' +
            'prompt=select_account&' +
            'include_granted_scopes=true&' +
            'response_type=code&' +
            'state=redir:' + redir + '&' +
            'redirect_uri=' + encodeURI(google_redirect_uri) + '&' +
            'client_id=' + encodeURI(google_client_id)

        return res.send({
            url: authUrl
        })
    }

    async oauthGoogleHandler(req, res) {
        const code = req.query.code
        const payload = {}
        try {
			let param = {
				code,
				client_id: google_client_id,
				client_secret: google_client_secret,
				redirect_uri: google_redirect_uri,
				grant_type: 'authorization_code'
			}
			let getToken = await axios({
				url: 'https://oauth2.googleapis.com/token',
				data: param,
				method: 'post'
			})
				.then(res => res.data)
				.catch(() => {})

			if (!getToken && !getToken.access_token) {
				return false
			}

			let gapiUrl = 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token='
			const { data } = await axios.get(gapiUrl + getToken.access_token)
			let user = await User.findOne({
                email: data.email
            })
            if (user) {
                payload.id = user._id.toString()
                payload.username = user.username
			} else {
                let username = data.email.split('@')[0].replace(/\./g, '_') + randomInt(222, 11)
                let newUser = new User({
                    oauth: ['google-' + data.id],
                    email: data.email,
                    username,
                    fullname: data.name,
                    photo: data.picture,
                    is_verified: true
                })
                await newUser.save()
                payload.id = newUser._id.toString()
                payload.username = newUser.username
            }

            let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '90d' })
            return res.json({
                token,
                user: payload
            })
		} catch(err) {
			console.error(err)
			return res.error(500, 'Internal Error')
		}
    }
}

module.exports = new Controller()