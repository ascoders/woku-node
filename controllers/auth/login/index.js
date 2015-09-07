var user = require('../../../models/user')

exports.test = function* () {
    user.add()
    this.body = 'asda'
}
