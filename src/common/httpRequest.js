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
// let showErrorMsg = commonMethods.showErrorMsg;

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
        return this;
    }
    // catch 回调绑定
    catch (fn) {
        this.catch = fn;
        return this;
    }
    handleReback (data) {
        if (this.isSelfHandleReback) {
            // 自己处理
            if (!data.data.statusCode) {
                this.then && this.then.call(this.vueObj, data.data);
            } else {
                // 公用处理接口错误返回
                this.catch && this.catch.call(this.vueObj, data.data);
            }
            // this.then(data.data);
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
                this.then && this.then.call(this.vueObj, data.data);
            }
        }
    }
    showErrorMsg (data) {
        commonMethods.showErrorMsg.call(this, data);
    }
}

class Get extends $http {
    constructor (vueObj, url, opts, isSelfHandleReback) {
        super();
        var that = this;
        this.isSelfHandleReback = isSelfHandleReback;
        this.vueObj = vueObj;
        this.requestObj = axios.get(url, opts)
            .then((data) => {
                that.handleReback(data);
            });
    }
}

class Post extends $http {
    constructor (vueObj, url, opts, isSelfHandleReback) {
        super();
        var that = this;
        this.isSelfHandleReback = isSelfHandleReback;
        this.vueObj = vueObj;
        this.requestObj = axios.post(url, opts)
            .then((data) => {
                that.handleReback(data);
            });
    }
}

$http.install = function (Vue, options) {
    Vue.prototype.$post = function (url, opts, isSelfHandleReback) {
        return new Post(this, url, opts, isSelfHandleReback);
    };
    Vue.prototype.$get = function (url, opts, isSelfHandleReback) {
        return new Get(this, url, opts, isSelfHandleReback);
    };
};

export default $http;
