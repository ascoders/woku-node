var Sequelize = require('sequelize')

module.exports = new Sequelize('woku', 'root', 'aaaa', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 1,
        idle: 10000
    }
})
