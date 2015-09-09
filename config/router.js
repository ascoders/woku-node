var fs = require('fs')
var router = require('koa-router')()

function scanFolder(path) {
    var folderList = []
    var walk = function (path, folderList) {
        files = fs.readdirSync(path)
        files.forEach(function (item) {
            var tmpPath = path + '/' + item,
                stats = fs.statSync(tmpPath)

            if (stats.isDirectory()) {
                walk(tmpPath, folderList)
                folderList.push(tmpPath)
            }
        })
    }

    walk(path, folderList)

    return folderList
}

var controllers = scanFolder('controllers')

controllers.forEach(function (path) {
    // 遍历出来的各个目录
    var instance
    try {
        instance = require('../' + path)
    } catch (err) {
        return
    }

    // 循环方法
    for (var key in instance) {
        var apiName = key
        if (apiName !== 'index') {
            apiName = '/' + apiName
        } else {
            apiName = ''
        }

        var method = 'get'
        var apiUrl = '/api/' + path.replace('controllers/', '') + apiName
        router.get(apiUrl, instance[key])
    }
})

module.exports = router
