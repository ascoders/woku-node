/*==================================================
 游戏 表

 Copyright (c) 2015 翱翔大空 and other contributors
 ==================================================*/

var Base = require('./base')
var mongoose = require('mongoose')
var modelName = 'game'

// 注册表结构
mongoose.model(modelName, new mongoose.Schema({
	n: {
		type: String
	}
}))

// model控制器
var model = mongoose.model(modelName)

function Model() {
	this.gameSpecial = function () {
		console.log('这是game特有的方法')
	}
}

// 继承基类的prototype
Model.prototype = new Base(model)

// 导出
module.exports = new Model()