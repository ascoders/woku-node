// 根据邮箱注册用户
exports.index = {
    get: function* () {
        if (validator.isNull(this.query.nickname)) {
            return this.body = {
                ok: false,
                data: '帐号不能为空'
            }
        }

        if (validator.isNull(this.query.password)) {
            return this.body = {
                ok: false,
                data: '密码不能为空'
            }
        }

        if (validator.isNull(this.query.email)) {
            return this.body = {
                ok: false,
                data: '邮箱不能为空'
            }
        }

        // 密码长度限定
        if (!validator.isLength(this.query.password, 6, 30)) {
            return this.body = {
                ok: false,
                data: '密码长度为6-30'
            }
        }
    }
}
