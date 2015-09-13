var user = require('../../../models/user')
var crypto = require('crypto')

// 用户登陆
exports.index = {
    get: function* () {
        var form = yield user.findOne({
            nickname: this.query.account,
            password: this.query.password
        })

        // 用户不存在
        if (!result.ok) {
            return this.body = result
        }

        // 密码不正确
        if (crypto.createHash('md5').update(form.password).digest('hex') !== result.data.password) {
            return this.body = {
                ok: false,
                data: '密码错误'
            }
        }

        return this.body = result
    }
}
