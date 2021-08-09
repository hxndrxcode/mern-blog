const Page = require('../models/Page')
const { postDate, generatePermalink } = require('../helpers/Helper')

class Controller {
    async myPageList(req, res) {
        let query = {
            blog_id: req.query.blog_id,
            is_deleted: false
        }
        let data = await Page.find(query)
        data.forEach(v => {
            v.formatted_date = postDate(v.published_at)
        })

        return res.json({
            pages: data,
            blog: req.blog
        })
    }

    async myPageStore(req, res) {
        let data = req.getBody([
            'blog_id',
            'title',
            'permalink',
            'body',
            'is_published'
        ])

        if (!data.permalink) {
            data.permalink = generatePermalink(data.title)
        }
        Object.assign(data, {
            created_by: req.user.id,
            updated_by: req.user.id
        })

        await new Page(data).save()
        return res.json({
            success: true
        })
    }

    async myPageDetail(req, res) {
        let data = await Page.findById(req.params.id)
        if (!data) {
            return res.error(404, 'Page not found')
        }

        return res.json({
            data
        })
    }

    async myPageUpdate(req, res) {
        let detail = await Page.findById(req.params.id)
        if (!detail) {
            return res.error(404, 'Page not found')
        }

        let data = req.getBody([
            'title',
            'permalink',
            'body',
            'is_published'
        ])
        Object.assign(detail, data)
        await detail.save()

        return res.json({
            success: true
        })
    }

    async myPageBulkAction(req, res) {
        let body = req.getBody([
            'action',
            'blog_id',
            'checked'
        ])
        if (body.action === 'delete') {
            await Page.updateMany({
                _id: {
                    $in: body.checked
                }
            }, {
                $set: {
                    is_deleted: true,
                    deleted_at: Date.now(),
                    deleted_by: req.user.id
                }
            })
        }

        return res.json({
            success: true
        })
    }
}

module.exports = new Controller()