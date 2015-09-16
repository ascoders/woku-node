var user = require('../../../models/user')
var crypto = require('crypto')
var validator = require('validator')

// 用户登陆
exports.index = {
    get: function* () {
        if (!validator.isLength(this.query.password), 6, 30) {
            return this.body = {
                ok: false,
                data: '密码长度为6-30'
            }
        }

        if (!validator.isLength(this.query.account), 2, 30) {
            return this.body = {
                ok: false,
                data: '帐号长度为2-30'
            }
        }

        if (!validator.isEmail(this.query.account)) { // 不是邮箱
            if (!validator.isLength(this.query.account), 2, 10) {
                return this.body = {
                    ok: false,
                    data: '昵称长度为2-10'
                }
            }
        }

        return this.body = {
            ok: false
        }

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
}
