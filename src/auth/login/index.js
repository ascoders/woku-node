ctrl.$onEnter = function () {
    document.title = '登陆'
    avalon.vmodels.global.menu.current = 'login'

    // 如果已登陆，返回上一级
    $.when(global.$myDeferred).done(function () { // 此时获取用户信息完毕
        if (global.my.isLogin) {
            return wk.jumpLastLocation()
        }
    })
}

ctrl.$onRendered = function () {
    // 帐号获取焦点
    $('input[name="account"]').focus()
}
