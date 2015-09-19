var global = avalon.define({
    $id: "global",

    // 当前登录账号
    my: {
        // 信息
        info: {},

        // 是否已登陆
        isLogin: false,

        //退出登陆
        logout: function () {
            wk.delete({
                url: '/api/users/authentication',
                data: {
                    id: global.my.id
                },
                done: function (data) {
                    global.my.isLogin = false
                    global.my.info = {}

                    wk.notice('账号已登出', 'green')

                    //如果用户在用户信息后台则返回首页
                    if (mmState.currentState.stateName.indexOf('user') > -1) {
                        avalon.router.navigate('/')
                    }
                }
            })
        },
    },

    // 我的信息是否加载完毕的promise
    $myDeferred: null,

    // 菜单
    menu: {
        // 是否显示
        show: true,
        // 当前选择栏
        current: '',
        // 主题颜色
        dark: false
    },

    // 页尾
    footer: {
        // 是否展现
        show: true
    }
})

global.$myDeferred = $.Deferred()
