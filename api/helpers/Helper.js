const bcrypt = require('bcryptjs')
const moment = require('moment')
const jdenticon = require('jdenticon')
const axios = require('axios')
jdenticon.configure({
    backColor: '#ddd'
});
const md = require('markdown-it')()
const cheerio = require('cheerio')

class Helper {
    hashMake(str) {
        return bcrypt.hashSync(str, 8)
    }

    hashVerify(str, hash) {
        return bcrypt.compareSync(str, hash)
    }

    randomInt(max = 9, min = 0) {
		return Math.floor(Math.random() * (max - min + 1) + min)
	}

    postDate(date) {
    	return moment(date).format('DD MMM YYYY')
    }

    generatePermalink(str) {
		return str.replace(/[^a-z0-9]+/gi, '-').replace(/^-*|-*$/g, '')
			.toLowerCase()
			.substr(0, 80)
	}

    async generateImage(size = 85) {
        let val = 'img.' + new Date().getTime() + Math.random()
        let png = jdenticon.toPng(val, size)
        let base64 = Buffer.from(png).toString('base64')
        let result = await module.exports.uploadImage(base64, 85)
        return result
    }

    async uploadImage(base64, width, height) {
        let url = process.env.CDN_URL
        let result = await axios.post(url + '/upload/json', {
            image: base64,
            height: width,
            width: height || width
        }).then(res => res.data).catch(err => {
            throw err
        })
        if (result.url) {
            result.url = url + result.url
        }
        return result.url
    }

    mdToHtml(str, hostname) {
		if (!str) {
			return ['', '']
		}

		let rendered = md.render(str)
		const $ = cheerio.load(rendered)
		$('a').each(function () {
            let href = $(this).attr('href')
			let parseUrl = new URL(href)
			if (parseUrl.origin !== hostname) {
                $(this).attr('target', '_blank')
				$(this).attr('rel', 'nofollow noopener noreferrer')
			}
		})
        let snippet = $('body').text().substr(0, 75)
		return [$('body').html(), snippet]
    }
}

module.exports = new Helper()
