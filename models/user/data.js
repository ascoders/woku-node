var Sequelize = require('sequelize')
var base = require('../base')

var user = base.define('user', {
    id: {
        comment: '主键',
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    nickname: {
        comment: '昵称 唯一索引',
        type: Sequelize.STRING(10),
        unique: true,
        allowNull: false
    },
    email: {
        comment: '电子邮箱 唯一索引',
        type: Sequelize.STRING(30),
        unique: true
    },
    password: {
        comment: '密码',
        type: Sequelize.CHAR(32)
    },
    portrait: {
        comment: '头像地址',
        type: Sequelize.CHAR(30)
    },
    money: {
        comment: '账户余额',
        type: Sequelize.DECIMAL(10, 3)
    }
})

user.sync()

module.exports = user
