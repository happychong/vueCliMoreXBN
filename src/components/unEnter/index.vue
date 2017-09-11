<template>
  <div>
      <el-row>
          <el-col :span="4">
              <div class="grid-content">
                  <news></news>
              </div>
          </el-col>
          <el-col :span="20">
              <img src="./../../assets/images/bgImg.png"/>
              <div class="grid-content bg-purple-light" style="width:95%;margin:0 auto;">
                  <el-steps>
                      <el-step title="Fill in information" description="填写资料" icon="edit"></el-step>
                      <el-step title="Upload files" description="上传证件" icon="upload"></el-step>
                      <el-step title="Platform audit" description="平台审核" icon="date"></el-step>
                      <el-step title="Start selling" description="开通入驻" icon="check"></el-step>
                  </el-steps>
              </div>
          </el-col>
      </el-row>
  </div>
</template>
<script>
    // import config from './config.js';
    import news from '@/components/news/news';
    export default {
        data () {
            return {
                user: ''
            };
        },
        components: {
            news
        }
    };
</script>
<style scoped>
  body {
    background: none;
  }
</style>
