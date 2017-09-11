<template>
    <div>
        <ul v-if="newsList.length>0">
            <li v-for="item in newsList" :key="item.news_id">
                <router-link :to="'/news/detail/' + item.news_id" >
                  {{item.title}}
                </router-link>
                <p>{{item.createTime.replace(/\s.+/,'')}}</p>
                <p>{{item.shortContent}}</p>
            </li>
        </ul>
    </div>
</template>
<script>
  // import config from './config.js';
  export default {
      data () {
          return {
              // newsList: [],
              cPageNO: 1,
              pageSize: 10
          };
      },
      methods: {
          /* getNewsList () {
              this.$get('/testapi/news').then(data => {
                  this.isShow = true;
                  let backData = data.data;
                  this.newsList = backData.list;
                  this.pageSize = backData.pageSize;
                  this.cPageNO = backData.cPageNO;
              });
          } */
      },
      created () {
      },
      computed: {
          newsList () {
              return this.$store.getters.getNewsList;
          }
      },
      mounted () {
          // this.getNewsList();
          this.$store.dispatch('fetchNewsList');
          this.$store.commit('updataParams', {key: 'title', val: 'dd'});
      }
  };
</script>
<style scoped>
  body {
    background: none;
  }
</style>
