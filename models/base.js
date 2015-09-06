/*==================================================
 数据库基类
 定义数据处理的基础方法

 Copyright (c) 2015 翱翔大空 and other contributors
 ==================================================*/

var koa = require('koa')
var app = koa()

var util = require('util')

function Base(model) {
	this.model = model
}

Base.prototype = {
	read: function (opts) {
		opts = util._extend(opts, {
			from: 0,
			number: 10
		})

		var self = this

		return function (done) {
			self.model.find({}).limit(10).exec(function (err, data) {
				if (err) {
					return done(null, {
						ok: false,
						message: err.message,
						data: null
					})
				}

				done(null, {
					ok: true,
					message: null,
					data: data
				})
			})
		}
	},
	create: function (opts) {
		var self = this

		return function (done) {
			var instance = new self.model(opts)

			instance.save(function (err) {
				if (err) {
					return done(null, {
						ok: false,
						message: err.message,
						data: null
					})
				}

				done(null, {
					ok: true,
					message: null,
					data: instance
				})
			})
		}
	},
	update: function (opts) {

	},
	delete: function (opts) {

	}
}

module.exports = Base