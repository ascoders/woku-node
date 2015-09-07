var data = require('./data')

exports.add = function () {
    data.sync({
        force: true
    }).then(function () {
        return data.create({
            nickname: 'aaa'
        })
    })
}
