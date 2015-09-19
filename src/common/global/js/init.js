// init.js

//获取登陆用户信息
$.ajax('/api/common/user/current', {
    success: function (data) {
        if (data.ok) wk.setUser(data.data)
    }
})