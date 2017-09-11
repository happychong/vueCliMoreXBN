<template>
    <div class="wrap">
        <div class="login">
          <el-form :model="numberValidateForm" ref="numberValidateForm" :rules="rules" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="user">
              <el-input type="user" v-model="numberValidateForm.user" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="passWord">
              <el-input type="passWord" v-model="numberValidateForm.passWord" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
              <el-button @click="resetForm('numberValidateForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
    </div>
</template>
<script>
import md5 from 'blueimp-md5';
import uriConfig from './config.js';
import commonReg from 'common/commonReg.js';
import cookie from 'common/cookie.js';

export default {
    data () {
        let isnotIphone = (rule, value, callback) => {
            // value = $.trim(value)
            // var flag = true
            var source = {};

            // 组合请求参数
            var iphone = commonReg.isPhone(value);
            var email = commonReg.isEmail(value);
            var name = commonReg.isEnMixNumber(value);
            if (value.length < 3 || value.length > 20) {
                name = false;
            }
            if (iphone) {
                source['mobile'] = value;
            } else if (email) {
                source['email'] = value;
            } else if (name) {
                source['name'] = value;
            }
            this.$post(uriConfig.verifyUserName, source).then((data) => {
                if (data.data) {
                    // data.data = true 的时候，报错
                    callback(new Error(rule.message || '此账号不存在'));
                } else {
                    callback();
                }
            });
        };
        return {
            numberValidateForm: {
                user: '',
                passWord: ''
            },
            rules: {
                user: [
                    {
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 40,
                        message: '长度在 3 到 40 个字符',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 40,
                        message: '长度在 3 到 40 个字符',
                        trigger: 'change'
                    },
                    {
                        validator: isnotIphone,
                        trigger: 'blur'
                    }
                ],
                passWord: [
                    {
                        required: true,
                        type: 'string',
                        message: '请输入密码',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 20,
                        message: '长度在 3 到 20 个字符',
                        trigger: 'blur'
                    }
                ]
            }
        };
    },

    methods: {
        submitForm (formName) {
            // let _this = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$post(uriConfig.nlogin, {
                        userName: this.numberValidateForm.user,
                        password: md5(this.numberValidateForm.passWord)
                    }).then((data) => {
                        // JSESSIONID 决定 api的接口判断当前用户是否登录，因为node没有返回JSESSIONID，所以暂时重复请求api登录接口，获取JSESSIONID，设置cookie 正常项目，可以删除
                        this.$post(uriConfig.getSession, {
                            loginUser: this.numberValidateForm.user,
                            loginPwd: md5(this.numberValidateForm.passWord)
                        }).then(sesseionData => {
                            cookie.set('userID', data.userId);
                            cookie.set('auditStatus', data.activeStatus);
                            this.$store.commit('setBase', data);
                            // 写入缓存
                            localStorage.setItem('base', JSON.stringify(data));
                            if (this.$route.path === '/login' || this.$route.path === '/') {
                                // 如果当前path 是login，走如下代码
                                if (data.activeStatus === 'in') {
                                    this.$router.push('/user/home');
                                } else if (data.activeStatus === 'un') {
                                    this.$router.push('/unEnter/index');
                                }
                            }
                        });
                    });
                } else {
                    return false;
                }
            });
        },
        resetForm (formName) {
            this.$refs[formName].resetFields();
        }
    }
};
</script>
<style scoped>
    .wrap {
      background: url("./../../../images/bg.jpg") center center;
      background-size: 100%;
      height: 100%;
      width: 100%;
    }

    .login {
      width: 400px;
      height: 200px;
      position: absolute;
      top: 50%;
      margin-top: -100px;
      left: 50%;
      margin-left: -200px;
      background: rgba(255, 255, 255, 0.6);
      border-radius: 5px;
      border: 1px solid #ccc;
      box-sizing: border-box;
      padding: 30px 40px 0 0;
    }
</style>
