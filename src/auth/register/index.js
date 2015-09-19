ctrl.$onEnter = function (param, rs, rj) {
    document.title = '注册'
    avalon.vmodels.global.menu.current = 'register'

    // 如果已登陆，返回上一级
    $.when(global.$myDeferred).done(function () { // 此时获取用户信息完毕
        if (global.myLogin) {
            return wk.jumpLastLocation()
        }
    })

    // 如果有type参数
    switch (mmState.query.type) {
    case 'email':
        $.ajax('/api/auth/register', {
            type: 'post',
            data: mmState.query,
            success: function (data) {
                wk.setUser(data)
            }
        })
        break
    }
}

ctrl.$onRendered = function () {
    // 用户名获取焦点
    $('input[name="nickname"]').focus()
    $('[data-toggle="tooltip"]').tooltip()
}
