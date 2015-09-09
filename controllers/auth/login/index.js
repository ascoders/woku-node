var user = require('../../../models/user')
var controller = {}

// 用户登陆
controller.index = function* () {
    var result = yield user.findOne({
        nickname: this.query.account,
    })

    return this.body = result
}

module.exports = controller
