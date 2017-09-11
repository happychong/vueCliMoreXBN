// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
// element-ui
import Element from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
Vue.use(Element);

import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

// http请求
import $http from './common/httpRequest';
// Vue.prototype.$http = $http;
Vue.use($http);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App },
    mounted () {
        let base = JSON.parse(localStorage.getItem('base'));
        // if (base && base.userId === '') {
        //     // 跳到登录页
        //     this.$router.push('/login');
        // } else if (base) {
        //     this.$store.commit('setBase', base);
        // }
        this.$store.commit('setBase', base);
    }
});
