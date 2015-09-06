var router = require('koa-router')()

var auth = require('../controllers/auth')

router.use('/api', auth.routes())

module.exports = router
