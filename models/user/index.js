var data = require('./data')

exports.add = function () {
    return new Promise(function (resolve) {
        data.create({
            nickname: 'asdasd'
        }).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            resolve(err)
        })
    })
}
