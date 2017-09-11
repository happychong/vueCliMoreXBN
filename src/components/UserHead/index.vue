<template>
    <div class="userhead">
        <a class="nav_Slide jc-narrowMenu" href="javascript:;"><em class="el-icon-more"></em></a>
        <Breadcrumb></Breadcrumb>
        <div class="userInfo">
            <span>lv@qq.com</span>
            <el-button type="text" @click="logout">退出</el-button>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Breadcrumb from '@/components/Breadcrumb';
export default {
    data () {
        return {
            user: ''
        };
    },
    components: {
        Breadcrumb
    },
    methods: {
        logout () {
            this.$post('/api/user/logout', {
                id: this.userId
            }).then(data => {
                let emptyObj = {
                    userId: '',
                    activeStatus: '',
                    menu: {}
                };
                this.$store.commit('setBase', emptyObj);
                localStorage.setItem('base', JSON.stringify(emptyObj));
            });
        }
    },
    computed: {
        ...mapGetters({
            userId: 'userId'
        })
    }
};
</script>
<style scoped>
    .userhead {
        line-height: 48px;
        border-bottom: 1px solid #ccc;
        display: block;
        clear: both;
        height: 48px;
    }
    .nav_Slide {
        float: left;
        display: inline-block;
        width: 48px;
        border-right: 1px solid #dedede;
        text-align: center;
    }
    .nav_Slide em {
        color: #666;
        font-size: 24px;
        vertical-align: middle;
    }
    .userInfo {
        float: right;
    }
</style>
