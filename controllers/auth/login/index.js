var controller = new require('../../base.js')
var user = require('../../../models/user')

controller.sasa = function* () {
    console.log('asdasdasdasdasdas')
}

// 用户登陆
controller.index = function* () {
    console.log('start')
    this.sasa()
    var userData = yield user.findOne({
        nickname: this.query.account,
    })

    if (userData) {
        return this.success(userData)
    }

    return this.error('不存在')
}

module.exports = controller
