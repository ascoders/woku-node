var user = require('../../../models/user')

// 判断昵称是否存在
exports.nickname = {
    get: function* () {
        // 查询昵称是否存在
        var result = yield user.findOne({
            where: {
                nickname: this.query.nickname
            },
            attribute: ['id']
        })

        if (result.ok) {
            // 查到了用户
            return this.body = {
                ok: true
            }
        }

        return this.body = {
            ok: false,
            data: '用户不存在'
        }
    }
}
