/*
 * 基础全局内容配置
 */

// const prefixUrl = '/api';
// const nprefixUrl = '/napi';
const prefixUrl = '/debugger/api';
const nprefixUrl = '/debugger/napi';
const _protocol = document.location.protocol;
const __LOCALHOST_PATH_IMAGES__ = _protocol + '//timage.xbniao.com/';

export default {
    prefixUrl,
    nprefixUrl,
    __LOCALHOST_PATH_IMAGES__
};
