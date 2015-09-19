var conf = require('../../../config/config')
var host = 'http://localhost:' + conf.web.port + '/api'

var agent = require('superagent').agent()
var userModel = require('../../../models/user/model')
var url = require('url')

describe("controllers", function () {
    describe("auth", function () {
        describe("register", function () {
            before(function* () {
                // 创建数据表
                var sync = yield userModel.sync()
            })

            after(function* () {
                // 删除数据表
                yield userModel.drop()
            })

            it("注册获得带签名的url", function* () {
                var res = yield agent.get(host + '/auth/register').query({
                    nickname: 'test',
                    email: 'sdf&@qq.com',
                    password: 'abcdef'
                })
                res.body.ok.should.equal(true)
            })

            it("注册", function* () {
                var res = yield agent.get(host + '/auth/register').query({
                    nickname: 'test',
                    email: 'sdf@qq.com',
                    password: 'abcdef'
                })

                var param
                if (res.body.ok) {
                    param = url.parse(res.body.data, true)
                }

                var registerRes = yield agent.post(host + '/auth/register').send(param.query)

                registerRes.body.ok.should.equal(true)
            })
        })
    })
})
