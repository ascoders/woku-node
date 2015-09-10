var user = require('../../../models/user')
var crypto = require('crypto')
var validator = require('validator')
var controller = {}

// 创建用户
controller.index = function* () {
    var form = {
            nickname: this.query.nickname,
            password: this.query.password,
            email: this.query.email
        }
        /*
            var form = request.get(this.query, {
                nickname: {
                    isNull: {
                        args: false,
                        msg: '帐号不能为空'
                    }
                },
                password: {
                    isNull: {
                        args: false,
                        msg: '密码不能为空'
                    }
                },
                email: {
                    isNull: {
                        args: false,
                        msg: '邮箱不能为空'
                    }
                }
            })
        */
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

module.exports = controller
