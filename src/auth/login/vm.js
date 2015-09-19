var vm = avalon.define({
    form: {
        // 账户
        account: '',
        // 密码
        password: '',
        // 记住密码
        remind: true
    },

    submit: function () { //点击登陆按钮
        require(['validator'], function (validator) {
            var validate = wk.validate($('#j-form'), {
                account: {
                    ok: validator.isLength(vm.form.account, 2, 30),
                    msg: '帐号长度为2-30'
                },
                password: {
                    ok: validator.isLength(vm.form.password, 6, 30),
                    msg: '密码长度为6-30'
                }
            })

            if (!validate.ok) {
                return
            }

            $.ajax('/api/auth/login', {
                data: vm.form,
                success: function (data) {
                    if (!data.ok) {
                        switch (data.data) {
                            case '用户不存在':
                                validate.error('account', data.data)
                                break
                            case '密码错误':
                                validate.error('password', data.data)
                                break
                        }
                        return
                    }

                    avalon.vmodels.global.my.setInfo(data.data)

                    // 跳回上个页面
                    wk.jumpLastLocation()
                }
            })
        })

    }
})