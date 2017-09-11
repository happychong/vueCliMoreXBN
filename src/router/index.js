import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';

const Hello = r => require.ensure([], () => r(require('components/Hello')), 'Hello');
const Login = r => require.ensure([], () => r(require('components/Login')), 'Login');
const layout = r => require.ensure([], () => r(require('components/layout')), 'layout');
const enterHome = r => require.ensure([], () => r(require('components/enter/Home')), 'enterHome');
const unEnter = r => require.ensure([], () => r(require('components/unEnter/index')), 'unEnter');
const Message = r => require.ensure([], () => r(require('components/template/Message')), 'Message');
const newsDetail = r => require.ensure([], () => r(require('components/news/children/detail')), 'news');

Vue.use(Router);
let router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/help',
            name: 'help',
            component: Hello
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/user/',
            component: layout,
            children: [
                {
                    // 当 /user/home 匹配成功，
                    // Home 会被渲染在 User 的 <router-view> 中
                    path: 'home',
                    component: enterHome
                },
                {
                    path: 'template/message',
                    meta: [
                        {
                            name: '模板管理'
                        },
                        {
                            name: '消息模板'
                        }
                    ],
                    component: Message
                    // components: {
                    //     default: Message,
                    //     breadcrumb: Breadcrumb
                    // }
                }
            ]
        },
        {
            path: '/unEnter/',
            component: layout,
            redirect: '/unEnter/index',
            children: [
                {
                    path: 'index',
                    component: unEnter
                }
            ]
        },
        {
            path: '/news/',
            component: layout,
            name: 'news',
            children: [
                {
                    path: 'detail/:id',
                    component: newsDetail
                }
            ]
        }
    ]
});

router.afterEach(route => {
    // 设置 路由判断 是否显示登录页
    if (route.path.indexOf('/help') > -1) {
        // 首先判断是否是直接显示的路由
        store.commit('setBaseItem', 'isShowThisPage', true);
    } else {
        // 不是直接显示的路由，判断 userId
        store.commit('setBaseItem', 'isShowThisPage', false);
    }
});
// router.beforeEach((to, from, next) => {
//     // debugger; // 自己记录route的方式，还要计入缓存……暂时放弃
//     console.log(store.getters.preUrl, store.getters.userId);
//     if (to.fullPath !== from.fullPath && from.fullPath === '/' && !store.getters.userId) {
//         // 初次请求是/  并且   未登录状态
//         store.commit('setPreUrl', '/user/home');
//     } else {
//         store.commit('setPreUrl', from.fullPath);
//     }
//     next();
// });

export default router;
