var user = require('../../../models/user')

exports.test = function* () {
    var content = yield user.add()
    this.body = content
}
