function Base() {}

Base.success = function (data) {
    console.log('success')
    return
    this.status = 200
    this.body = data
}

Base.error = function (message) {
    console.log('error')
    return
    this.status = 404
    this.body = message
}

module.exports = Base
