<template>
    <div>
        <div class="tab_btn js-addNew" data-permrole="107">
            <a href="?a=index#/view_template/editMessageTemplet/new/null" class="tabButton fR">
                <em class="icon-21"></em><span>新增消息模板</span>
            </a>
        </div>
        <div class="listContent">
            <div class="operation_box fix">
                <div class="operation_btn fL js-operation">
                    <a href="javascript:;" class="listButton mR20 js-multipleDelete" data-permrole="105">
                        <em class="el-icon-delete2"></em>删除
                    </a>
                </div>
                <div class="small_papogation fR js_small_papogation1"></div>
            </div>
            <el-table
                ref="multipleTable"
                :data="tableData"
                border
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="模板名称"
                  width="120">
                </el-table-column>
                <el-table-column
                  label="创建时间"
                  width="120">
                  <template scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="操作"
                  show-overflow-tooltip>
                    <template scope="scope">
                        <el-button
                          size="small"
                          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                          size="small"
                          type="danger"
                          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="papogation js-pagination" id="allListPage"></div>
        </div>
    </div>
</template>
<script>
var baseConfig = require('@/common/baseConfig.js').default;
let config = {
    getList: baseConfig.prefixUrl + '/template/message/datagrid'
};
export default {
    data () {
        return {
            tableData: [],
            multipleSelection: []
        };
    },
    methods: {
        toggleSelection (rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange (val) {
            this.multipleSelection = val;
        }
    },
    mounted () {
        this.$post(config.getList, {
            cPageNO: 1,
            pageSize: 10
        }).then(data => {
            this.tableData = data.data.list;
        });
    }
};
</script>
<style scoped>
    .tab_btn {
        width: 100%;
        height: 46px;
        background-color: #eee;
        line-height: 44px;
        display: block;
        overflow: hidden;
    }
    .tabButton {
        display: inline-block;
        border: 0;
        background-color: #f60;
        height: 48px;
        line-height: 48px;
        width: auto;
        min-width: 70px;
        text-align: center;
        padding: 0 30px;
        color: #fff;
        font-size: 14px;
        float: right;
        text-decoration: none;
    }
    .tabButton:hover {
        text-decoration: underline;
    }
    .listContent {
        padding: 15px;
    }
    .listButton {
        float: left;
        display: inline-block;
        border: 0;
        background-color: #333;
        height: 30px;
        line-height: 30px;
        width: auto;
        min-width: 70px;
        font-size: 12px;
        border-radius: 15px;
        text-align: center;
        padding: 0 18px;
        color: #fff;
    }
</style>
