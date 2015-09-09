var data = require('./data')

// 增
exports.add = function (info) {
    return new Promise(function (resolve) {
        data.create(info).then(function (result) {
            resolve({
                ok: true,
                data: result
            })
        }).catch(function (err) {
            resolve({
                ok: false,
                data: err
            })
        })
    })
}

// 删
exports.delete = function (where) {
    return new Promise(function (resolve) {
        data.destroy({
            where: where
        }).then(function (result) {
            resolve({
                ok: true,
                data: result
            })
        }).catch(function (err) {
            resolve({
                ok: false,
                data: err
            })
        })
    })
}

// 改
exports.update = function (data, where) {
    return new Promise(function (resolve) {
        data.update(data, {
            where: where
        }).then(function (result) {
            resolve({
                ok: true,
                data: result
            })
        }).catch(function (err) {
            resolve({
                ok: false,
                data: err
            })
        })
    })
}

// 查
exports.findOne = function (where, attributes) {
    return new Promise(function (resolve) {
        data.findOne({
            where: where,
            attributes: attributes
        }).then(function (result) {
            resolve({
                ok: true,
                data: result
            })
        }).catch(function (err) {
            resolve({
                ok: false,
                data: err
            })
        })
    })
}

// 查多个
exports.findAll = function (where, attributes) {
    return new Promise(function (resolve) {
        data.findAll({
            where: where,
            attributes: attributes
        }).then(function (result) {
            resolve({
                ok: true,
                data: result
            })
        }).catch(function (err) {
            resolve({
                ok: false,
                data: err
            })
        })
    })
}

// 查多个数据和数量
exports.findAndCountAll = function (where, attributes) {
    return new Promise(function (resolve) {
        data.findAndCountAll({
            where: where,
            attributes: attributes
        }).then(function (result) {
            resolve({
                ok: true,
                data: result
            })
        }).catch(function (err) {
            resolve(err)
        })
    })
}
