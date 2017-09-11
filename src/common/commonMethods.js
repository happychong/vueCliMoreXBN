
/*
 * 公用方法
 */

// 引入 错误状态码
import { ErrorMsg } from './errorMsg.js';
import { MessageBox } from 'element-ui';
// 接口返回错误消息，公用处理方法
let showErrorMsg = function (data) {
    // data.statusCode = '3000403'
    let opt = {
        title: '提示信息',
        content: data.errorMsg || ErrorMsg[data.statusCode] || '未知异常'
    };
    if (data.statusCode.indexOf('403') > -1) {
        // 不渲染登陆页内容了，改为弹窗登陆，登陆后刷新当前路由
        opt.onOk = () => {
            opt.content = '接口又报403了！！！';
        };
        // 这里应该把store的userId设置为空或者null，然后弹出框的回掉里，显示登陆页
        let emptyObj = {
            userId: '',
            activeStatus: '',
            menu: {}
        };
        this.vueObj && this.vueObj.$store.commit('setBase', emptyObj);
        localStorage.setItem('base', JSON.stringify(emptyObj));
        // this.vueObj.$router.push('/login');
    } else if (data.statusCode.indexOf('412') > -1) {
        opt.content = '特殊处理:请求参数异常状态，这里将来可以显示具体哪些参数缺失';
    } else if (data.statusCode.indexOf('444') > -1) {
        opt.content = '特殊处理:包含返回数据异常状态，这里将来可以显示具体哪些参数缺失';
    }
    // iView.Modal.warning(opt);
    MessageBox.alert(opt.content, '提示信息', {
        confirmButtonText: '确定'
    });
};

export default {
    showErrorMsg
};
