// import shop from '../../api/shop';
// import * as types from '../mutation-types';

import menuUrlConfig from '@/common/menuUrlConfig.js';

let setIsShowLogin = (state) => {
    let isShow = false;
    if (state.isShowThisPage) {
        // 直接显示当前页面，不判断 user
        isShow = true;
    } else {
        // 判断 user 等信息
        if (state.userId === '') {
            // user 不存在，显示登陆页面
            isShow = false;
        } else {
            // user 存在，显示当前页面
            isShow = true;
        }
    }
    state.isShowLogin = isShow;
};

// initial state
const state = {
    userId: '',
    realName: '',
    activeStatus: '',
    menu: {},
    isShowThisPage: false,
    breadcrumb: [],
    isShowLogin: false
};

// getters
const getters = {
    userId: state => state.userId,
    realName: state => state.realName,
    activeStatus: state => state.activeStatus,
    menu: state => {
        // menuUrlConfig
        return state.menu;
    },
    isShowThisPage: state => state.isShowThisPage,
    breadcrumb: state => state.breadcrumb,
    isShowLogin: state => state.isShowLogin
};

// actions
const actions = {
    // getAllProducts ({ commit }) {
    //     // shop.getProducts(products => {
    //     //     commit(types.RECEIVE_PRODUCTS, { products });
    //     // });
    // }
};

// mutations
const mutations = {
    // [types.RECEIVE_PRODUCTS] (state, { products }) {
    //     state.all = products;
    // },
    //
    // [types.ADD_TO_CART] (state, { id }) {
    //     state.all.find(p => p.id === id).inventory--;
    // }
    setBaseItem (state, name, value) {
        switch (name) {
        case 'menu':
            for (let i in value) {
                let item = value[i];
                // 一级菜单配置
                if (item.menuName && menuUrlConfig[item.menuName]) {
                    item.url = menuUrlConfig[item.menuName];
                }
                // 二级菜单配置
                let childBtn = item.childBtn;
                if (childBtn) {
                    for (let j in childBtn) {
                        let tempChild = childBtn[j];
                        if (tempChild.menuName && menuUrlConfig[tempChild.menuName]) {
                            tempChild.url = menuUrlConfig[tempChild.menuName];
                        }
                    }
                }
            }
            state.menu = value;
            break;
        case 'userId':
            state.userId = value;
            // 设置 isShowLogin 跟随useId变化
            setIsShowLogin(state);
            break;
        default:
            state[name] = value;
        }
    },
    setBaseUserId (state, id) {
        state.userId = id;
        // 设置 isShowLogin 跟随useId变化
        setIsShowLogin(state);
    },
    setActiveStatus (state, activeStatus) {
        state.activeStatus = activeStatus;
    },
    setMenu (state, tree) {
        for (let i in tree) {
            let item = tree[i];
            // 一级菜单配置
            if (item.menuName && menuUrlConfig[item.menuName]) {
                item.url = menuUrlConfig[item.menuName];
            }
            // 二级菜单配置
            let childBtn = item.childBtn;
            if (childBtn) {
                for (let j in childBtn) {
                    let tempChild = childBtn[j];
                    if (tempChild.menuName && menuUrlConfig[tempChild.menuName]) {
                        tempChild.url = menuUrlConfig[tempChild.menuName];
                    }
                }
            }
        }
        state.menu = tree;
    },
    setBase (state, data) {
        state.userId = data.userId;
        state.activeStatus = data.activeStatus;
        let tree = data.menu;
        for (let i in tree) {
            let item = tree[i];
            // 一级菜单配置
            if (item.menuName && menuUrlConfig[item.menuName]) {
                item.url = menuUrlConfig[item.menuName];
            }
            // 二级菜单配置
            let childBtn = item.childBtn;
            if (childBtn) {
                for (let j in childBtn) {
                    let tempChild = childBtn[j];
                    if (tempChild.menuName && menuUrlConfig[tempChild.menuName]) {
                        tempChild.url = menuUrlConfig[tempChild.menuName];
                    }
                }
            }
        }
        state.menu = tree;
        // 设置 isShowLogin
        setIsShowLogin(state);
    },
    setIsShowThisPage (state, isShow) {
        state.isShowThisPage = isShow;
    },
    setBreadcrumb (state, breadcrumb) {
        state.breadcrumb = breadcrumb;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
