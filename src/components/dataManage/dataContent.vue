<!-- 高分系列 -->
<template>
    <div>
        <h3><span class="el-icon-coin"></span>{{title}}</h3>
        <div class="dataManagementCon">
            <div class="data-list">
                <div class="data-search">
                    <el-input placeholder="请输入要搜索的内容" v-model="dataSearch">
                        <el-button slot="append">搜索</el-button>
                    </el-input>
                </div>
                <el-button type="primary" size="small" @click="showNewData">新建</el-button>
                <el-button type="primary" size="small">去重</el-button>
                <el-button type="primary" size="small">更新数据</el-button>
                <el-button type="primary" size="small" @click="deleteList">删除</el-button>
            </div>
            <div class="botanyTable">
                <el-table ref="multipleTable" :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                          height="64vh" tooltip-effect="dark" style="width: 100%" border
                          row-key="id" default-expand-all @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column width="150" sortable :prop="item.property" :label="item.name"
                                     v-for="item in dataList"></el-table-column>
                    <el-table-column label="操作" width="150" fixed="right">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="showDetail">详情</el-button>
                            <el-button type="text" size="small" @click="deleteList">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="fenye">
                    <el-pagination
                            background
                            layout="prev, pager, next"
                            @current-change="current_change"
                            :current-page="currentPage"
                            :page-size="pageSize"
                            :total="tableData.length">
                    </el-pagination>
                </div>

            </div>
        </div>
        <!-- 新建 -->
        <el-dialog title="新建" :visible.sync="dialogDataNew" append-to-body>
            <el-descriptions :column="2" border class="dialogDetail">
                <el-descriptions-item :label="item.name" v-for="item in dataList">
                    <el-input v-model="item.value"></el-input>
                </el-descriptions-item>
            </el-descriptions>
            <div class="btnRight">
                <el-button size="small" type="primary">确认</el-button>
                <el-button size="small" @click="dialogDataNew = false">取消</el-button>
            </div>
        </el-dialog>
        <!-- 详情 -->
        <el-dialog title="详情" :visible.sync="dialogDataDetail" append-to-body>
            <el-descriptions :column="2" border v-model="dataList" class="dialogDetail">
                <el-descriptions-item :label="item.name" v-for="(item,i) in dataList">后台获取数据</el-descriptions-item>
            </el-descriptions>
            <div class="btnRight">
                <el-button size="small" type="primary" @click="detailEdit">编辑</el-button>
                <el-button size="small" @click="dialogDataDetail = false">取消</el-button>
            </div>
        </el-dialog>
        <!-- 编辑 -->
        <el-dialog title="编辑" :visible.sync="dialogDataEdit" append-to-body>
            <el-descriptions :column="2" border class="dialogDetail">
                <el-descriptions-item :label="item.name" v-for="item in dataList">
                    <el-input v-model="item.value"></el-input>
                </el-descriptions-item>
            </el-descriptions>
            <div class="btnRight">
                <el-button size="small" type="primary">确认</el-button>
                <el-button size="small" @click="dialogDataEdit = false">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {GF_header, ZY_header, GF3_header, other_header} from './dataContent.js'
    import loader from "../../api/utils/loader";

    export default {
        components: {},
        data() {
            return {
                //分页
                pageSize: 10,
                currentPage: 1,

                title: '',
                dialogDataDetail: false,
                dialogDataNew: false,
                dialogDataEdit: false,
                dataForm: [],

                dataSearch: '',
                tableData: [
                    {SatelliteID: '123'},
                    {SatelliteID: '23'}
                ],
                dataList: []
            }
        },
        updated() {
            // 解决fixed错位
            if (this.$refs.multipleTable && this.$refs.multipleTable.doLayout) {
                this.$refs.multipleTable.doLayout();
            }
        },
        watch: {
            '$route.query.data': {
                handler(newVal, oldVal) {
                    //判断newVal有没有值监听路由变化
                    this.init()
                },
                deep: true
            }
        },
        mounted() {
            this.init()
        },
        methods: {

            //初始化
            init() {
                const _ = this;
                let GF = GF_header
                let ZY = ZY_header
                let GF3 = GF3_header
                let other = other_header
                let data = {}, clazz = ''
                this.$nextTick(() => {
                    data = eval(this.$route.query.data)
                    this.title = data.title
                    this.dataList = data.data
					if(['GF3'].includes(this.$route.query.data)){
						clazz = 'radar_satellite'
					}
					if(['GF','ZY'].includes(this.$route.query.data)){
						clazz = 'optical_satellite'
					}
					loader.load({class: clazz}, function (data) {
						_.tableData = data
					})
                })
            },

            //分页
            current_change(currentPage) {
                this.currentPage = currentPage;
            },

            deleteList() {
                this.$confirm('是否删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            handleSelectionChange() {
            },
            showDetail() {//显示详情弹框
                this.dialogDataDetail = true
            },
            showNewData() {//显示新建弹框
                this.dialogDataNew = true
            },
            detailEdit() {
                this.dialogDataEdit = true
            }
        }
    }
</script>

<style scoped lang="scss">

</style>
