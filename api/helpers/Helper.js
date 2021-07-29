const bcrypt = require('bcryptjs')
const moment = require('moment')
const jdenticon = require("jdenticon")

class Helper {
    hashMake(str) {
        return bcrypt.hashSync(str, 8)
    }

    hashVerify(str, hash) {
        return bcrypt.compareSync(str, hash)
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
