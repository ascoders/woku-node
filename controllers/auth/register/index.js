var user = require('../../../models/user')
var crypto = require('crypto')
var validator = require('validator')

// 创建用户
exports.index = {
    get: function* () {
        var form = {
            nickname: this.query.nickname,
            password: this.query.password,
            email: this.query.email
        }

        if (validator.isNull(form.nickname)) {
            return this.body = {
                ok: false,
                data: '帐号不能为空'
            }
        }

        if (validator.isNull(form.password)) {
            return this.body = {
                ok: false,
                data: '密码不能为空'
            }
        }

        if (validator.isNull(form.email)) {
            return this.body = {
                ok: false,
                data: '邮箱不能为空'
            }
        }

        // 密码长度限定
        if (!validator.isLength(form.password, 6, 30)) {
            return this.body = {
                ok: false,
                data: '密码长度为6-30'
            }
        }

        var result = yield user.add(form)

        if (!result.ok) {
            return this.body = {
                ok: false,
                data: result.data
            }
        }

        return this.body = {
            ok: true,
            data: {
                id: result.data.id,
                nickname: result.data.nickname
            }
        }
    }
}

// 判断昵称是否可以注册
exports.nicknameLegal = {
    get: function* () {
        var form = {
            nickname: this.query.nickname
        }

        // 查询昵称是否存在
        var result = yield user.findOne({
            where: {
                nickname: form.nickname
            },
            attribute: ['id']
        })

        if (result.ok) {
            // 查到了用户，此昵称不可用
            return this.body = {
                ok: false,
                data: '昵称已被占用'
            }
        }

        return this.body = {
            ok: true
        }
    }
}
