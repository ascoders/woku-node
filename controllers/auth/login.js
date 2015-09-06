var Base = require('../base')
var user = require('../../models/user')

var base = new Base(user)

for (var key in base) {
    module.exports[key] = base[key]
}
