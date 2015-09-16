var user = require('../../models/user')

describe('models/user', function () {
    afterEach(function* () {
        var result = yield user.delete({
            where: {
                nickname: {
                    $in: ['test', 'test1', 'test2']
                }
            }
        })
        result.ok.should.equal(true)
    })

    describe('插入', function () {
        it('可以成功', function* () {
            var result = yield user.add({
                nickname: 'test',
                password: 'abcdef',
                email: '576625322@qq.com'
            })
            result.ok.should.equal(true)
        })

        it('主键不能赋值', function* () {
            var result = yield user.add({
                id: 100,
                nickname: 'test',
                password: 'abcdef',
                email: '576625322@qq.com'
            })
            result.ok.should.equal(false)
        })

        it('昵称不能为空', function* () {
            var result = yield user.add({
                password: 'abcdef',
                email: '576625322@qq.com'
            })
            result.ok.should.equal(false)
        })

        it('昵称不能重复', function* () {
            var result = yield user.add({
                nickname: 'test',
                password: 'abcdef',
                email: '576625322@qq.com'
            })

            var result = yield user.add({
                nickname: 'test',
                password: 'ccc',
                email: 'bbb@qq.com'
            })
            result.ok.should.equal(false)
        })

        it('密码不能为空', function* () {
            var result = yield user.add({
                nickname: 'test',
                email: '576625322@qq.com'
            })
            result.ok.should.equal(false)
        })

        it('密码长度大于6', function* () {
            var result = yield user.add({
                nickname: 'test',
                password: 'abcde',
                email: '576625322@qq.com'
            })
            result.ok.should.equal(false)
        })

        it('密码长度小于30', function* () {
            var result = yield user.add({
                nickname: 'test',
                password: 'abcdeabcdeabcdeabcdeabcdeabcdea',
                email: '576625322@qq.com'
            })
            result.ok.should.equal(false)
        })

        it('邮箱不能为空', function* () {
            var result = yield user.add({
                nickname: 'test',
                password: 'abcdef'
            })
            result.ok.should.equal(false)
        })

        it('邮箱不能重复', function* () {
            var result = yield user.add({
                nickname: 'test1',
                password: 'abcdef',
                email: 'aaa1@qq.com'
            })

            var result = yield user.add({
                nickname: 'test2',
                password: 'ccc',
                email: 'aaa1@qq.com'
            })
            result.ok.should.equal(false)
        })

        it('邮箱格式校验', function* () {
            var result = yield user.add({
                nickname: 'test',
                password: 'abcdef',
                email: '576625322qq.com'
            })
            result.ok.should.equal(false)
        })

        it('头像地址长度大于1', function* () {
            var result = yield user.add({
                nickname: 'test',
                password: 'abcdef',
                email: '576625322@qq.com',
                portrait: ''
            })
            result.ok.should.equal(false)
        })

        it('头像地址长度小于30', function* () {
            var result = yield user.add({
                nickname: 'test',
                password: 'abcdef',
                email: '576625322@qq.com',
                portrait: 'abcdeabcdeabcdeabcdeabcdeabcdea'
            })
            result.ok.should.equal(false)
        })
    })

    describe('删除', function () {
        beforeEach(function* () {
            var result = yield user.add({
                nickname: 'test',
                password: 'abcdef',
                email: '576625322@qq.com'
            })
            result.ok.should.equal(true)
        })

        afterEach(function* () {
            var result = yield user.delete({
                where: {
                    nickname: {
                        $in: ['test']
                    }
                }
            })
            result.ok.should.equal(true)
        })

        it('可以更新成功', function* () {
            var result = yield user.update({
                portrait: '123'
            }, {
                where: {
                    nickname: 'test'
                }
            })
            result.ok.should.equal(true)
        })
    })
})
