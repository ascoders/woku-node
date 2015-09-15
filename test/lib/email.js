var email = require('../../lib/email')

describe("lib/email", function () {
    it("邮件能成功发出", function* () {
        var result = yield email.send({
            to: '576625322@qq.com',
            subject: '测试邮件标题',
            html: '测试邮件内容'
        })
        result.should.equal(true)
    })
})
