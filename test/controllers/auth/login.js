var agent = require('superagent').agent()
var conf = require('../../../config/config')
var host = 'http://localhost:' + conf.port + '/api'

describe("controllers", function () {
    describe("auth", function () {
        describe("login", function () {
            it("用户登录", function* () {
                var res = yield agent.get(host + '/auth/login')
                res.body.ok.should.equal(true)
            })

            it("账户名总长度校验", function* () {
                var res = yield agent.get(host + '/auth/login').send({
                    account: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                    password: 'abcdef'
                })
                res.body.ok.should.equal(false)
            })

            it("昵称长度校验", function* () {
                var res = yield agent.get(host + '/auth/login').send({
                    account: 'aaaaaaaaaaa',
                    password: 'abcdef'
                })
                res.body.ok.should.equal(false)
            })

            it("邮箱校验", function* () {
                var res = yield agent.get(host + '/auth/login').send({
                    account: 'asd@qq.com',
                    password: 'abcdef'
                })
                res.body.ok.should.equal(false)
            })

            it("密码长度校验", function* () {
                var res = yield agent.get(host + '/auth/login').send({
                    password: 'abc'
                })
                res.body.ok.should.equal(false)
            })
        })
    })
})
