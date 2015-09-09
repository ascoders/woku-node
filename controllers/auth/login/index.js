var user = require('../../../models/user')
var crypto = require('crypto')
var controller = {}

// 用户登陆
controller.index = function* () {
    var result = yield user.findOne({
        nickname: this.query.account,
    })

    // 用户不存在
    if (!result.ok) {
        return this.body = result
    }

    // 密码不正确
    if (crypto.createHash('md5').update(this.query.password).digest('hex') !== result.data.password) {
        return this.body = {
            ok: false,
            data: '密码错误'
        }
    }

    return this.body = result
}

module.exports = controller
