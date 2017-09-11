/*
 * 封装$http请求 ， 处理接口返回信息
 */

// import Vue from 'vue'

// 引入 UI组件
import Element from 'element-ui';
// 引入axios（页面请求）
import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

axios.interceptors.response.use(function (response) {
    // 处理响应数据
    return response;
}, function (error) {
    // 处理响应失败
    // new Vue({
    //     el: '#fc_conts',
    //     template: '<div>服务器累了，请刷新重试</div>'
    // });
    Element.$alert('这是一段内容', '标题名称', {
        confirmButtonText: '确定',
        callback: action => {
            this.$message({
                type: 'info',
                message: `action: ${action}`
            });
        }
    });
    return Promise.reject(error);
});
// 引入公用方法
import commonMethods from './commonMethods.js';
let showErrorMsg = commonMethods.showErrorMsg;
/**
 * $http请求 实例
 * @constructor
 * @param {object} modular - vue模块.
 * @param {object} pageData - 页面参数.
 * @param {object} options - 实例化的一些参数.可为空
 * @returns {vuePage} 一个 vuePage实例
 */
// function $http () {}

// let STORE_KEY_SESSION_ID = 'sesseionID'
// let statu = 1

class $http {
    /**
    * $http请求 实例
    * @methods
    * @param {object} modular - vue模块.
    * @param {object} pageData - 页面参数.
    * @param {object} options - 实例化的一些参数.可为空
    * @returns {vuePage} 一个 vuePage实例
    * ex.
      $http.get('/checkLogin')
          .then(fucntion (response) {console.log(response)})
          .catch(function (error) {console.log(error);});
    */
    // then回调绑定
    then (fn) {
        this.then = fn;
    }
    // catch 回调绑定
    catch (fn) {
        this.catch = fn;
    }
    handleReback (data) {
        if (this.isSelfHandleReback) {
            // 自己处理
            if (!data.statusCode) {
                this.then && this.then(data.data);
            } else {
                // 公用处理接口错误返回
                this.catch && this.catch(data.data);
            }
            this.then(data.data);
        } else {
            // 公用处理办法 2000000执行then，错误提示错误消息
            // debugger;
            // if (statu === 1) {
            //     statu += 1;
            //     data.statusCode = '3000403'
            // }
            if (data.data.statusCode && data.data.statusCode !== '2000000') {
            // 公用处理接口错误返回
                this.showErrorMsg(data.data);
            } else {
                this.then(data.data);
            }
        }
    }
    showErrorMsg (data) {
        showErrorMsg.call(this, data);
    }
}

class Get extends $http {
    constructor (url, opts, isSelfHandleReback) {
        super();
        var that = this;
        this.isSelfHandleReback = isSelfHandleReback;
        this.requestObj = axios.get(url, opts)
            .then((data) => {
                that.handleReback(data);
            });
    }
}
class Post extends $http {
    constructor (url, opts, isSelfHandleReback) {
        super();
        var that = this;
        this.isSelfHandleReback = isSelfHandleReback;
        this.requestObj = axios.post(url, opts)
            .then((data) => {
                that.handleReback(data);
            });
    }
}

// class CrossDomain extends $http {
//   constructor (url, opts, isSelfHandleReback) {
//     super()
//     var that = this
//     this.isSelfHandleReback = isSelfHandleReback
//     // 根据情况决定返回对象
//     if (store.get(STORE_KEY_SESSION_ID)) {
//       opts.sesseionID = store.get(STORE_KEY_SESSION_ID)
//       if (window.navigator.userAgent.indexOf('MSIE 9.0') != -1
//         || window.navigator.userAgent.indexOf('MSIE 8.0') != -1
//         || window.navigator.userAgent.indexOf('MSIE 7.0') != -1) {
//         var xdr = new XDomainRequest()
//         var strlll = JSON.stringify(opts.data)
//         xdr.onload = function () {
//             var data = eval('(' + xdr.responseText + ')')
//             opts.success && opts.success(data)
//         }
//         xdr.onerror = function (e) {
//             opts.error && opts.error(e)
//         }
//         //如果是IE 7 8  9 常规接口Url+/domain?obj=后跟字符串格式的json数据
//         //console.log(opts.url+"/domain;jsessionid="+opts.sesseionID+"?obj="+strlll)
//         xdr.open(opts.type, opts.url + "/domain;jsessionid=" + opts.sesseionID + "?obj=" + strlll)
//         xdr.send(null)
//         this.requestObj = xdr
//       }
//       //其他浏览器
//       else {
//         this.requestObj = new Post(url + ";jsessionid=" + opts.sesseionID, opts)
//           .then((response) => {
//               that.handleReback(response)
//           })
//       }
//     } else {
//       this.requestObj = new Get('api/auth/sessid')
//         .then((response) => {
//             that.handleReback(response)
//         })
//     }
//   }
// }

export default {
    get (url, opts, isSelfHandleReback) {
        return new Get(url, opts, isSelfHandleReback);
    },
    post (url, opts, isSelfHandleReback) {
        return new Post(url, opts, isSelfHandleReback);
    }
    // crossDomain(url, opts, isSelfHandleReback) {
    //     return new CrossDomain(url, opts, isSelfHandleReback)
    // }
};
