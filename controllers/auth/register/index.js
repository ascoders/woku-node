var user = require('../../../models/user')
var controller = {}

// 创建用户
exports.index = function* () {
    var result = yield user.add({
        nickname: '123'
    })

    return this.body = result
}
