const fs = require('fs')
const { uploadImage } = require('../helpers/Helper.js')

class Controller {
    async upload(req, res) {
        let base64 = fs.readFileSync(req.file.path, 'base64')
        let url = await uploadImage(base64, req.body.width, req.body.height)
        return res.json({
            url
        })
    }
}

module.exports = new Controller()