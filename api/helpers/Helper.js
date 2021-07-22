const bcrypt = require('bcryptjs')

class Helper {
    async hashMake(str) {
        return bcrypt.hashSync(str, 8)
    }

    async hashVerify(str, hash) {
        return bcrypt.compareSync(str, hash)
    }

    
}

module.exports = new Helper()
