var data = require('./data')
var validator = require('validator')
var crypto = require('crypto')

// model对象
exports.model = data

// 增
exports.add = function (info) {
    return new Promise(function (resolve) {
        if (!validator.isNull(info.id)) {
            return resolve({
                ok: false,
                data: '主键不能赋值'
            })
        }

        if (validator.isNull(info.nickname)) {
            return resolve({
                ok: false,
                data: '昵称不能为空'
            })
        }

        if (validator.isNull(info.password)) {
            return resolve({
                ok: false,
                data: '密码不能为空'
            })
        }

        if (validator.isNull(info.email)) {
            return resolve({
                ok: false,
                data: '邮箱不能为空'
            })
        }

        if (!validator.isLength(info.password, 6, 30)) {
            return resolve({
                ok: false,
                data: '密码长度为6-30'
            })
        }

        // 随机生成token
        crypto.randomBytes(16, function (err, buf) {
            if (err) {
                return resolve({
                    ok: false,
                    data: 'token生成失败'
                })
            }
            info.token = buf.toString('hex')

            // 密码md5
            info.password = crypto.createHash('md5').update(info.password + info.token).digest('hex')

            // 插入
            data.create(info).then(function (result) {
                return resolve({
                    ok: true,
                    data: result
                })
            }).catch(function (err) {
                return resolve({
                    ok: false,
                    data: err
                })
            })
        })
    })
}

// 删
exports.delete = function (opts) {
    return new Promise(function (resolve) {
        data.destroy(opts).then(function (result) {
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
exports.update = function (data, opts) {
    return new Promise(function (resolve) {
        data.update(data, opts).then(function (result) {
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
exports.findOne = function (info) {
    return new Promise(function (resolve) {
        data.findOne(info).then(function (result) {
            if (result) {
                resolve({
                    ok: true,
                    data: result
                })
            } else {
                resolve({
                    ok: false,
                    data: '用户不存在'
                })
            }
        }).catch(function (err) {
            resolve({
                ok: false,
                data: err
            })
        })
    })
}

// 查多个
exports.findAll = function (info) {
    return new Promise(function (resolve) {
        data.findAll(info).then(function (result) {
            if (result) {
                resolve({
                    ok: true,
                    data: result
                })
            } else {
                resolve({
                    ok: false,
                    data: '用户不存在'
                })
            }
        }).catch(function (err) {
            resolve({
                ok: false,
                data: err
            })
        })
    })
}

// 查多个数据和数量
exports.findAndCountAll = function (info) {
    return new Promise(function (resolve) {
        data.findAndCountAll(info).then(function (result) {
            resolve({
                ok: true,
                data: result
            })
        }).catch(function (err) {
            resolve(err)
        })
    })
}
