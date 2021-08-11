const moment = require('moment')

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
}

module.exports = new Helper()
