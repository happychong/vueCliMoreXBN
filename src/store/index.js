import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
// import products from './modules/products';
import base from './modules/base';
// import news from './modules/news';

Vue.use(Vuex);

// const store = new Vuex.Store({
//     // 定义状态
//     state: {
//         userId: ''
//     },
//     mutations: {
//         changeUserId (state, id) {
//             state.userId = id;
//         }
//     },
//     modules: {
//         products
//     },
//     actions,
//     getters
// });

// export default store;


export default new Vuex.Store({
    actions,
    getters,
    modules: {
        base
        // news
    }
});
