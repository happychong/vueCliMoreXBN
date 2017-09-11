<template>
    <div class="fl_conts_left">
        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
            <el-submenu :index="index" v-for="(item, index) in menu" :key="index">
                <router-link v-if="item.url" slot="title" :to="item.url">
                    <i class="el-icon-message"></i>{{ item.menuName }}
                </router-link>
                <template slot="title" v-else>
                    <i class="el-icon-message"></i>{{ item.menuName }}
                </template>
                <el-menu-item-group v-if="item.childBtn">
                    <router-link class="el-menu-item"
                        tag="li"
                        v-for="(jitem, jindex) in item.childBtn"
                        v-if="jitem.url"
                        :index="index + '-' + jindex"
                        :key="jitem"
                        :to="jitem.url">
                        {{ jitem.menuName }}
                    </router-link>
                    <!-- <el-menu-item :index="index + '-' + jindex" v-for="(jitem, jindex) in item.childBtn" :key="jitem">{{ jitem.menuName }}</el-menu-item> -->
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>
<script>
export default {
    data () {
        return {
            user: '',
            passWord: ''
        };
    },
    props: ['menu'],
    methods: {
        handleOpen (key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose (key, keyPath) {
            console.log(key, keyPath);
        }
    },
    mouned () {
        console.log(this.menu);
    }
};
</script>
<style scoped>
    .fl_conts_left {
        background: #332f2b;
        width: 100%;
    }
    .el-menu {
        background-color: none;
        text-align: left;
    }
    .el-submenu .el-menu {
        background-color: #26221f;
    }
    .el-menu-item, .el-submenu__title {
        color: #999;
    }
    .el-submenu__title:hover {
        background-color: #26221f;
    }
    .el-menu-item:hover {
        background-color: #000;
    }
</style>
