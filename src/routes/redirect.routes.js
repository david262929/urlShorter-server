require('dotenv').config()
const {Router} = require('express')
const Link = require('../models/Link')
const router = Router()


// /t/:code
router.get('/:code', async (req, res) => {
    try {
        const link = await Link.findOne({code: req.params.code});
        if (!link) {
            res.status(404).json({message: 'Link not found'});
        }

        link.clicks++;
        await link.save();

        return res.redirect(link.from)
    } catch (e) {
        console.log('Dear Developer catched a SERVER ERROR... /api/auth/register ...', e.message, e)
        res.status(500).json({message: 'Something went wrong'})
    }
});

module.exports = router;