<template>
    <el-breadcrumb separator="/" class="bread">
        <el-breadcrumb-item v-for="item in breadcrumb" :key="item" :to="{ path: '/' }">{{ item.name }}</el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    components: {
    },
    computed: {
        ...mapGetters({
            breadcrumb: 'breadcrumb'
        })
    },
    mounted () {
        console.log(this.breadcrumb);
    }
};
</script>
<style scoped>
    .bread {
        float: left;
        line-height: 48px;
        padding-left: 8px;
    }
</style>
