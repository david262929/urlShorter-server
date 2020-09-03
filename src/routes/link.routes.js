const {Router} = require('express')
const shortid = require('shortid')
const auth = require('../middleware/auth.middleware')
const Link = require('../models/Link')
const router = Router()

router.post('/generate', auth, async (req, res) => {
    try {
        const baseUrl = process.env.BASE_URL
        const {from} = req.body

        const existing = await Link.findOne({from});
        if(existing){
            res.json({
                message : "You have successfully shorted a link in a past.",
                link : existing
            })
            return;
        }

        const code = shortid.generate()
        const to = `${baseUrl}/t/${code}`

        const  link = new Link({
            code, to, from, owner: req.user.userId
        })

        await link.save()

        res.status(201).json({
            message : "You have successfully shorted a link.",
            link,
        })

    } catch (e) {
        console.log('Dear Developer catched a SERVER ERROR... /api/link/generate ...', e.message, e)
        res.status(500).json({message: 'Something went wrong'})
    }
});

router.get('/mylinks', auth, async (req, res) => {
    try {
        const links = await Link.find({ owner : req.user.userId  })
        res.json(links)


    } catch (e) {
        console.log('Dear Developer catched a SERVER ERROR... /api/link/mylinks ...', e.message, e)
        res.status(500).json({message: 'Something went wrong'})
    }
});

router.get('/id/:id', auth, async (req, res) => {
    try {
        const links = await Link.findById(req.params.id)
        res.json(links)
    } catch (e) {
        console.log('Dear Developer catched a SERVER ERROR... /api/auth/id/ ...', e.message, e)
        res.status(500).json({message: 'Something went wrong'})
    }
});

module.exports = router;