var router = require('koa-router')({
    prefix: '/auth'
})

router.get('/', function* () {
    this.body = 'hello!!!'
})

module.exports = router
