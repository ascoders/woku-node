var vm = avalon.define({
    // 步骤
    steps: {
        info: {
            name: '填写信息',
            icon: 'info-circle',
            locked: false
        },
        email: {
            name: '邮箱验证',
            icon: 'envelope',
            locked: true
        },
        success: {
            name: '成功',
            icon: 'check-circle',
            locked: true
        }
    },

    // 步骤名
    step: 'info',

    // 进入任意步骤
    setStep: function (name) {
        vm.step = name
    },

    // 提交信息，进入email步骤
    submitInfo: function () {
        require(['validator'], function (validator) {
            var validate = wk.validate($('#j-info'), {
                nickname: {
                    ok: validator.isLength(vm.data.nickname, 2, 10),
                    msg: '昵称长度为2-10'
                },
                password: {
                    ok: validator.isLength(vm.data.password, 6, 30),
                    msg: '密码长度为6-30'
                }
            })

            if (!validate.ok) {
                return
            }

            // 查询用户名是否存在
            $.ajax('/api/auth/register/nicknameLegal', {
                type: 'get',
                data: {
                    nickname: vm.data.nickname
                },
                success: function (data) {
                    if (!data.ok) {
                        return validate.error('nickname', vm.data.nickname + ' 已被占用')
                    }
                    vm.step = 'email'
                    vm.steps.email.locked = false
                }
            })
        })
    },

    // 提交email，进入success步骤
    submitEmail: function () {
        require(['validator'], function (validator) {
            var result = wk.validate($('#j-email'), {
                email: {
                    ok: validator.isEmail(vm.data.email),
                    msg: '邮箱格式不正确'
                },
                captcha: {
                    ok: validator.isLength(vm.data.captcha, 6, 6),
                    msg: '验证码长度为6'
                }
            })

            if (!result.ok) {
                return
            }

            // 发送注册请求
            $.ajax('/api/auth/register', {
                type: 'get',
                data: vm.data,
                success: function (data) {
                    console.log(data)
                }
            })

            vm.step = 'success'
            vm.steps.success.locked = false
        })
    },

    // 刷新验证码
    freshCap: function () {
        vm.data.captcha = ''

        // 刷新验证码
        wk.post({
            url: '/api/captcha',
            done: function (data) {
                vm.data.capid = data.captchaCode
            }
        })
    },

    // 注册表单数据
    data: {
        email: '',
        nickname: '',
        password: '',
        capid: '',
        captcha: ''
    }
})
