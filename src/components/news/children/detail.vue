<template>
  <div>
      <h2>{{detail.title}}</h2>
      <div v-html="detail.content"></div>
  </div>
</template>
<script>
  // import config from './config.js';
  export default {
      data () {
          return {
              detail: {}
          };
      },
      methods: {
      },
      created () {
      },
      mounted () {
          let p = this.$route.params;
          this.$get('/testapi/news/detail', p).then(data => {
              this.detail = data.data;
          });
      }
  };
</script>
<style scoped>
</style>
