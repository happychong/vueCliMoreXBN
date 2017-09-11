/*
 * 登陆模块 uri配置文件
 */

// 引入基本配置接口
// import { nprefixUrl } from '../../common/baseConfig.js';
var baseConfig = require('../../common/baseConfig.js').default;
let config = {
    verifyUserName: baseConfig.prefixUrl + '/user/verify',
    nlogin: baseConfig.nprefixUrl + '/user/login',
    getSession: baseConfig.prefixUrl + '/user/login/'
};
export default config;
