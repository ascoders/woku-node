/*==================================================
 控制器基类

 Copyright (c) 2015 翱翔大空 and other contributors
 ==================================================*/

var base = {}

module.exports = function (model) {
	this.read = function* (next) {
		var opts = this.query || {}

		this.body =
			yield model.read(opts)
	}

	this.create = function* (next) {
		var opts = this.request.body || {}

		this.body =
			yield model.create(opts)
	}

	this.update = function* (next) {
		this.body = this
	}

	this.delete = function* (next) {
		this.body = this
	}
}