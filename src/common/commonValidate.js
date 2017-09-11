/*
 * 自定义表单验证
 */
import $http from './httpRequest.js';
let isTitleCanUse = (rule,value,callback) => {
    // 请求接口，远程校验，需要解决的问题，这个传参怎么实现呢，获取外层站点，主商品等信息
    let d = rule.vm.pageData;
    let params = {
        site: d.siteBaseInfo.id,
        title: value
    };
    let platformValue = d.siteBaseInfo.platformValue.toLocaleLowerCase();
    if(d.addOrEdit === 'edit'){
        params.id = d[platformValue + 'Info'].id;
    }

    $http.post(prefixUrl + '/commodity/' + platformValue + '/validate/titleExist', params).then((data) => {
        if (data.data) {
            callback(new Error(rule.message || '该商品标题已存在'));
        } else {
            callback();
        }
    });
};
// 校验违禁词
let blackWords = (rule, value, callback) => {
    let productKeyword = rule.vm.pageData.blackWords;
    let regWord = [];
    let regR = new RegExp("([+&.()])", 'g');
    productKeyword.forEach((value, index) => {
        regWord[index] = value.replace(regR, "\\\$1");
    });

    if (productKeyword.length) {
        var reg = new RegExp('\\b(' + regWord.join('|') + ')\\b', 'gi');
        //得到的违禁词
        var valit = value.toLowerCase().match(reg);
        //有违禁词
        if (valit) {
            //去重
            let set = new Set(valit);
            let temArr = [];
            for (let i of set) {
                temArr.push(i);
            }
            callback(new Error(temArr.join(',') + '为违禁词（不区分大小写）'));
        } else {
            callback();
        }
    } else {
        callback();
    }
};
export {
    isTitleCanUse,
    blackWords
 };
