<template>
    <div>
        <el-row>
            <el-col :span="4"><div class="grid-content bg-purple">
                <LMenu :menu="menu"></LMenu>
            </div></el-col>
            <el-col :span="20"><div class="grid-content bg-purple-light">
                <UserHead></UserHead>
                <router-view></router-view>
            </div></el-col>
        </el-row>
        <el-row>
            <el-col :span="24"><div class="grid-content bg-purple-dark">
                小笨鸟@中国
            </div></el-col>
        </el-row>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import LMenu from '@/components/LMenu';
import UserHead from '@/components/UserHead';
export default {
    data () {
        return {
            user: ''
        };
    },
    components: {
        LMenu,
        UserHead
    },
    computed: {
        ...mapGetters({
            menu: 'menu'
        })
    }
};
</script>
<style scoped>
    body {
      background: none;
    }
    .bg-purple-dark {
        background-color: #999;
        font-size: 12px;
        color: #fff;
        font-weight: bold;
        line-height: 50px;
    }
</style>
