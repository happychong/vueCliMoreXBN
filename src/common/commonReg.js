/*
 * 自定义表单验证
 */

// 手机号码
const isPhone = (value) => {
    if (value.length === 11 && /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(value)) {
        return true;
    } else {
        return false;
    }
};

// 邮箱
const isEmail = (value) => {
    if (/^([a-z0-9A-Z]+[-|_|]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\.)+[a-zA-Z]{2,}$/.test(value)) {
        return true;
    } else {
        return false;
    }
};

// 英文+数字 格式
const isEnMixNumber = (value) => {
    if (/^[a-zA-Z0-9]*$/.test(value)) {
        return true;
    } else {
        return false;
    }
};

export default {
    isPhone,
    isEmail,
    isEnMixNumber
};
