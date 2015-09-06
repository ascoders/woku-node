/*==================================================
 用户 表

 Copyright (c) 2015 翱翔大空 and other contributors
 ==================================================*/

var Base = require('./base')
var mongoose = require('mongoose')
var modelName = 'user'

// 注册表结构
mongoose.model(modelName, new mongoose.Schema({
	// 昵称
	nickname: {
		required: true,
		type: String
	},

	// 电子邮箱 也是注册时候的账号
	email: {
		type: String
	},

	// 密码
	password: {
		type: String
	},

	// 账户余额
	money: {
		type: Number
	},

	// 登陆次数
	loginCount: {
		type: Number
	},

	// 最后登陆时间
	lastLoginTime: {
		type: Date
	},

	// 账号输错剩余机会次数
	errorChance: {
		type: Number
	},

	// 账号封停截至时间
	stopTime: {
		type: Number
	},

	// 账号类型 0:超级管理员/董事长 1:会员 2:高级会员 3:白金会员
	type: {
		type: Number
	},

	// 权限范围
	power: {
		type: [String]
	},

	// 上传文件大小
	uploadSize: {
		type: Number
	},

	// 密钥
	token: {
		type: Number
	},

	// 头像地址
	avatar: {
		type: String
	},

	// 未读消息数量
	messageNumber: {
		type: Number
	},

	// 总消息数量
	messageAll: {
		type: Number
	},

	// 建立应用数量
	appCount: {
		type: Number
	}

}))

// model控制器
var model = mongoose.model(modelName)

function Model() {

}

// 继承基类的prototype
Model.prototype = new Base(model)

// 导出
module.exports = new Model()