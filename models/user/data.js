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
        allowNull: false,
        validate: {
            len: {
                args: [2, 10],
                msg: '昵称长度为2-10'
            },
        }
    },
    email: {
        comment: '电子邮箱 唯一索引',
        type: Sequelize.STRING(30),
        unique: true,
        validate: {
            isEmail: {
                msg: '邮箱格式错误'
            }
        }
    },
    password: {
        comment: '密码',
        type: Sequelize.CHAR(32)
    },
    portrait: {
        comment: '头像地址',
        type: Sequelize.CHAR(30),
        validate: {
            len: {
                args: [1, 30],
                msg: '头像地址长度为1-30'
            }
        }
    },
    money: {
        comment: '账户余额',
        type: Sequelize.DECIMAL(10, 3)
    },
    login_count: {
        comment: '登录次数',
        type: 'MEDIUMINT'
    },
    error_chance: {
        comment: '账号输错机会次数',
        type: 'TINYINT'
    },
    stop_time: {
        comment: '账号封停截至时间',
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    type: {
        comment: '账号类型',
        type: Sequelize.ENUM('admin', 'member', 'vip'),
        defaultValue: 'member'
    },
    upload_size: {
        comment: '今日上传大小 kb',
        type: 'MEDIUMINT'
    },
    token: {
        comment: '密钥',
        type: Sequelize.CHAR(32),
        validate: {
            len: {
                args: 32,
                msg: '密钥长度为32'
            }
        }
    }
}, {
    underscored: true
})

user.sync()

module.exports = user
