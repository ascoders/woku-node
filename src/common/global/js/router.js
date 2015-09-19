// router.js
// 状态路由

require(['mmState'], function () {
    // 找不到的页面跳转到404
    avalon.router.error(function () {
        avalon.router.navigate('/404')
    })

    // 模版无法加载跳转404
    avalon.state.config({
        onloadError: function () {
            avalon.router.navigate("/404")
        },
        onBeforeUnload: function () {
            // 清除window对象上所有绑定
            $(window).unbind()

            // 删除所有模态框
            $('.ui.modals').modal('hide')
            //$('.ui.modals').remove()
        }
    })

    // 404
    state({
        module: 'common/404',
        url: '/404'
    })

    // 首页
    state({
        module: 'common/home',
        url: '/'
    })

    // 登陆
    state({
        module: 'auth/login',
        url: '/auth/login'
    })

    // 注册
    state({
        module: 'auth/register',
        url: '/auth/register'
    })

    // 应用 /////////////////

    // 应用专区（应用列表）
    state({
        module: 'app/index',
        url: '/app'
    })

    // 基础
    state({
        module: 'app/base',
        abstract: true,
        url: '/app/{path}',
        child: [{
            module: 'app/base/home',
            url: '/'
        }, { // 管理
            module: 'app/base/manage',
            url: '/manage',
            abstract: true,
            child: [{ // 首页
                module: 'app/base/manage/index',
                url: '/'
            }, { // 各模块
                module: function (params) {
                    return 'app/base/manage/' + params.type
                },
                ignoreChange: false,
                url: '/{type}'
            }]
        }, { // 分类
            module: 'app/base/category',
            url: '/category/{id}'
        }, { // 文章
            module: 'app/base/article',
            url: '/article/{id}'
        }]
    })

    // 包装state
    function state(opts) {
        opts = $.extend({
            // 默认父级控制器为全局控制器
            controller: 'global',

            // 访问url地址
            url: '/',

            // 模块名
            module: 'common/home',

            ignoreChange: true,
            abstract: false,
            child: null,

            // 父级控制器名
            parentController: '',

            // 父级state全名
            parentStateName: ''
        }, opts)

        // 如果模块名为function
        // 模块名过滤特殊字符
        if (typeof opts.module === 'function') {
            opts.stateName = opts.module({}).replace('undefined', '[params]').replace(/\//g, '').replace(/\./g, '')
        } else {
            opts.stateName = opts.module.replace(/\//g, '').replace(/\./g, '')
        }

        // 如果父级模块名不为空，则拼接模块全名
        if (opts.parentStateName !== '') {
            opts.stateName = opts.parentStateName + '.' + opts.stateName
        }

        // 设置路由属性
        avalon.state(opts.stateName, {
            controller: opts.controller,
            url: opts.url,
            abstract: opts.abstract,
            views: [{
                name: "container@" + opts.parentStateName,
                templateUrl: function (params) {
                    if (typeof opts.module === 'function') {
                        return '/static/' + opts.module(params) + '/index.html'
                    }
                    return '/static/' + opts.module + '/index.html'
                },
                controllerUrl: function (params) {
                    if (typeof opts.module === 'function') {
                        return opts.module(params) + '/index'
                    }
                    return opts.module + '/index'
                },
                ignoreChange: function (changeType) {
                    if (!opts.ignoreChange) {
                        return false
                    }
                    if (changeType) return true
                },
                cacheController: opts.ignoreChange
            }]
        })

        // 设置子属性
        if (opts.child !== null) {
            for (var key in opts.child) {
                opts.child[key].parentModule = opts.module
                opts.child[key].parentStateName = opts.stateName

                // 如果模块名不为function，则定义父级controller
                if (typeof opts.module !== 'function') {
                    opts.child[key].controller = opts.module
                } else {
                    // 否则为自己的controller
                    opts.child[key].controller = opts.controller
                }

                state(opts.child[key])
            }
        }
    }

    // 启动路由
    avalon.history.start({
        basepath: "/",
        html5Mode: true,
        routeElementJudger: function (element) {
            return typeof $(element).attr('router') !== 'undefined'
        }
    })

    // 扫描
    avalon.scan()
});
