const nodemailer = require("nodemailer")
let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
})

class Mail {
    async send(to, template, data) {
        let detail = this.generateBody(template, data)
        let send = await this.processSend(to, detail)
        return send
    }

    async processSend(to, detail) {
        let data = Object.assign(detail, {
            from: '"Blogwi.org" <noreply@blogwi.org>',
            to,
        })
        let result = await transporter.sendMail(data)
        return result
    }

    generateBody(template, data) {
        let subject = template
        let text = 'Hello ' + data.username + '! This is your data: ' + data.verification_code
        let html = '<p>Hello <b>' + data.username + '</b>! This is your data: <code>' + data.verification_code + '</code>'
        return { text, html, subject }
    }
}

module.exports = new Mail()
