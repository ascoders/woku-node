var user = require('../../../models/user')
var email = require('../../../lib/email')
var sign = require('../../../lib/sign')

// 发送注册邮件
exports.index = {
    get: function* () {
        console.log(this.query)
        email.send({
            to: this.query.email,
            title: this.query.nickname + '! 请在60分钟内激活账号',
            content: sign.create('123', this.query)
        })
    }
}

// 判断昵称是否可以注册
exports.nicknameLegal = {
    get: function* () {
        // 查询昵称是否存在
        var result = yield user.findOne({
            where: {
                nickname: this.query.nickname
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
