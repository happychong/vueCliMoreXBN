/*
 * 封装$http请求 ， 处理接口返回信息
 */

// import Vue from 'vue'
function set (cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = 'expires=' + d.toGMTString();
    document.cookie = cname + '=' + cvalue + '; ' + expires;
}

function get (cname) {
    var name = cname + '=';
    var ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

export default {
    set,
    get
};
