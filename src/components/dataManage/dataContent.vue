<!-- 高分系列 -->
<template>
  <div>
    <h3><span class="el-icon-coin"></span>{{ title }}</h3>
    <div class="dataManagementCon">
      <div class="data-list">
        <div class="data-search">
          <el-input placeholder="请输入要搜索的内容" v-model="dataSearch">
            <el-button slot="append" @click="searchData(dataSearch)">搜索</el-button>
          </el-input>
        </div>
        <el-button type="primary" size="small" @click="showNewData">新建</el-button>
        <el-button type="primary" size="small" @click="removeDuplicate">去重</el-button>
        <el-button type="primary" size="small" @click="init">更新数据</el-button>
        <el-button type="primary" size="small" @click="deleteItems">删除</el-button>
      </div>
      <div class="botanyTable">
        <el-table ref="multipleTable" :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                  height="64vh" tooltip-effect="dark" style="width: 100%" border
                  row-key="id" default-expand-all @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column width="150" sortable :prop="item.property" :label="item.name"
                           v-for="item in header"></el-table-column>
          <el-table-column label="操作" width="150" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="showDetail(scope.row)">详情</el-button>
              <el-button type="text" size="small" @click="deleteItem(scope.row)">删除</el-button>
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
        <el-descriptions-item :label="item.name" v-for="item in header">
          <el-input v-model="item.value"></el-input>
        </el-descriptions-item>
      </el-descriptions>
      <div class="btnRight">
        <el-button size="small" type="primary" @click="newSure">确认</el-button>
        <el-button size="small" @click="dialogDataNew = false">取消</el-button>
      </div>
    </el-dialog>
    <!-- 详情 -->
    <el-dialog title="详情" :visible.sync="dialogDataDetail" append-to-body>
      <el-descriptions :column="2" border v-model="detailData" class="dialogDetail">
        <el-descriptions-item :prop="item.property" :label="item.name" v-for="item in detailData">{{
            item.value
          }}
        </el-descriptions-item>
      </el-descriptions>
      <div class="btnRight">
        <el-button size="small" type="primary" @click="detailEdit">编辑</el-button>
        <el-button size="small" @click="dialogDataDetail = false">取消</el-button>
      </div>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog title="编辑" :visible.sync="dialogDataEdit" append-to-body>
      <el-descriptions :column="2" border class="dialogDetail">
        <el-descriptions-item :label="item.name" v-for="item in header">
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
import network from "../../api/utils/network";
import common from "../../api/utils/common";
import config from "../../api/utils/config";

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
      detailData: [],
      staticData: [],
      header: [],
      clazz: ''
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
      let data = {}
      this.$nextTick(() => {
        data = eval(this.$route.query.data)
        this.title = data.title
        this.header = data.data
        if (['GF3'].includes(this.$route.query.data)) {
          _.clazz = 'radar_satellite'
        }
        if (['GF', 'ZY'].includes(this.$route.query.data)) {
          _.clazz = 'optical_satellite'
        }
        loader.load({class: _.clazz}, function (data) {
          if (['GF'].includes(_.$route.query.data)) {
            _.tableData = data.filter(function (object) {
              return (object['satelliteID'] + '').includes('GF');
            });
          }
          if (['ZY'].includes(_.$route.query.data)) {
            _.tableData = data.filter(function (object) {
              return (object['satelliteID'] + '').includes('ZY');
            });
          }
          if (['GF3'].includes(_.$route.query.data)) {
            _.tableData = data;
          }
          _.staticData = _.tableData;
        })
      })
    },

    removeDuplicate(){
      this.tableData = common.unique(this.tableData, 'directory');
    },

    //分页
    current_change(currentPage) {
      this.currentPage = currentPage;
    },

    searchData(text){
      if (!text) {
        this.tableData = this.staticData;
        this.currentPage = 1;
      } else {
        let dataArray = this.staticData;
        this.tableData = dataArray.filter(function (object) {
          for(let key in object){
            if(object[key] && (object[key] + '').includes(text)){
              return true;
            }
          }
        })
        this.currentPage = 1;
      }
    },

    deleteItem(row) {
      const _ = this;
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let object = common.getObjectFromArray(config.classRouteMapper, 'class', this.clazz);
        let url = object.url + '/' + row.id;
        network.deleteAsync(url).then(function (response) {
          _.$store.state[_.clazz + 's'] = response.data;
          _.tableData = response.data;
          _.staticData = _.tableData;
          _.$message({
            type: 'success',
            message: '删除成功!'
          });
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    deleteItems() {

    },
    handleSelectionChange() {
    },
    showDetail(row) {//显示详情弹框
      this.detailData = [];
      for (let object of this.header) {
        let no = common.deepCopy(object);
        no.value = row[object['property']];
        this.detailData.push(no);
      }
      this.dialogDataDetail = true;
    },
    showNewData() {//显示新建弹框
      this.dialogDataNew = true;
    },
    newSure(){
      let satellite = {};
      const _ = this;
      for(let object of this.header){
        satellite[object['property']] = object['value'];
      }
      let object = common.getObjectFromArray(config.classRouteMapper, "class", this.clazz);
      network.postAsync(object.url, satellite, undefined).then(function (response){
        _.$store.state[_.clazz + 's'] = response.data;
        _.tableData = response.data;
        _.staticData = _.tableData;
        _.$message({
          type: 'success',
          message: '新增成功!'
        });
      })
    },
    detailEdit() {
      this.dialogDataEdit = true;
    }
  }
}
</script>

<style scoped lang="scss">

</style>
