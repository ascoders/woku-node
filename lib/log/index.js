// 请求记录汇总，按照url聚合
var requestLists = {}

// 错误记录汇总
var errorLists = []

// 请求健康记录
exports.requestHealth = function* (next) {
    var start = new Date()
    yield next
    var ms = new Date() - start

    if (!requestLists[this.url]) {
        requestLists[this.url] = {
            count: 1, // 请求次数
            argTime: ms, // 平均耗时
            maxTime: ms, // 最大耗时
            minTime: ms // 最短耗时
        }
    } else {
        var count = requestLists[this.url].count
        var argTime = requestLists[this.url].argTime
        var maxTime = requestLists[this.url].maxTime
        var minTime = requestLists[this.url].minTime
        requestLists[this.url] = {
            count: count + 1,
            argTime: (argTime * count + ms) / (count + 1),
            maxTime: ms > maxTime ? ms : maxTime,
            minTime: ms < minTime ? ms : minTime
        }
    }

    // TODO:最多1000条
}

// 错误记录
exports.error = function (type, message) {
    errorLists.push({
        type: type,
        message: message
    })

    // TODO:最多1000条
}
