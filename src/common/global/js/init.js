// init.js

//获取登陆用户信息
wk.get({
    url: '/api/common/global/currentUser',
    done: function (data) {
        wk.setUser(data)
    },
    fail: function () {
        global.$myDeferred.resolve() // 未登录
    }
})
