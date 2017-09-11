<template>
  <div id="app">
        <transition>
            <router-view v-if="isShowLogin"></router-view>
            <Login v-else></Login>
        </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Login from '@/components/Login';

export default {
    components: {
        Login
    },
    watch: {
        $route () {
            this.setBreadcrumb();
        }
    },
    methods: {
        setBreadcrumb () {
            let breadcrumb = this.$route.meta;
            this.$store.commit('setBaseItem', 'breadcrumb', breadcrumb);
        }
    },
    computed: {
        ...mapGetters({
            userId: 'userId',
            isShowThisPage: 'isShowThisPage',
            isShowLogin: 'isShowLogin'
        })
    }
};
</script>

<style>
html, body {
  margin: 0px;
  padding: 0;
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>
