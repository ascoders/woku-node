var login = require('./login')
var register = require('./register')

var router = require('koa-router')({
    prefix: '/auth'
})

router.get('/login', login.index)

router.get('/register', register.test)

module.exports = router
