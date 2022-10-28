<!-- 数据检索 -->
<template>
  <div>
    <div class="dataSearchMenu">
      <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
               background-color="#152c40"
               menu-trigger="click"
               text-color="#fff" active-text-color="#409EFF">
        <el-submenu index="1">
          <template slot="title">空间筛选</template>
          <el-submenu index="1-1">
            <template slot="title">行政区</template>
            <div class="timeSearch guoneiwai">
              <el-tabs v-model="activeName1" @tab-click="handleClick1">
                <el-tab-pane label="国内" name="1">
                  <el-form>
                    <el-form-item label="地区" :label-width="formLabelWidth">
                      <el-select v-model="selectProvince" placeholder="请选择省" style="width: 145px">
                        <el-option v-for="item in provinces" size="small" :key="item.value"
                                   :label="item.label"
                                   :value="item.value"
                                   @click.native="changeProvince()">
                        </el-option>
                      </el-select>
                      <el-select v-model="selectCity" placeholder="请选择市" style="width: 145px">
                        <el-option v-for="item in cities" size="small"
                                   :key="item.value"
                                   :label="item.label"
                                   :value="item.value"
                                   @click.native="changeCity">
                        </el-option>
                      </el-select>
                      <el-select v-model="selectArea" placeholder="请选择区" style="width: 145px">
                        <el-option v-for="item in area" size="small"
                                   :key="item.value"
                                   :label="item.label"
                                   :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="搜索" :label-width="formLabelWidth">
                      <el-input placeholder="请输入搜索的地区名" clearable v-model="searchArea">
                        <i slot="suffix" class="el-input__icon el-icon-search"></i>
                      </el-input>
                    </el-form-item>
                  </el-form>
                  <div class="juzhong">
                    <el-button type="primary" size="mini" @click="queryByRegion">确定</el-button>
                    <el-button size="mini" @click="clearAllEntity">清空</el-button>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="国外" name="2">
                  <el-form>
                    <el-form-item label="搜索" :label-width="formLabelWidth">
                      <el-input placeholder="请输入搜索的地区名" clearable v-model="searchForeign">
                        <i slot="suffix" class="el-input__icon el-icon-search"></i>
                      </el-input>
                    </el-form-item>
                  </el-form>
                  <div class="juzhong">
                    <el-button type="primary" size="mini" @click="queryByWorld">确定</el-button>
                    <el-button size="mini" @click="clearAllEntity">清空</el-button>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-submenu>
          <el-submenu index="1-2">
            <template slot="title">经纬度</template>
            <div class="timeSearch jingweidu">
              <el-tabs v-model="activeName2" @tab-click="handleClick2">
                <el-tab-pane label="左上右下" name="1">
                  <el-form ref="form" :model="lonLatForm" label-width="80px">
                    <el-form-item label="左上经度:">
                      <el-input clearable v-model="lonLatForm.leftTopLon"
                                placeholder="例如123.45"></el-input>
                    </el-form-item>
                    <el-form-item label="左上纬度:">
                      <el-input clearable v-model="lonLatForm.leftTopLat"
                                placeholder="例如74.355"></el-input>
                    </el-form-item>
                    <el-form-item label="右下经度:">
                      <el-input clearable v-model="lonLatForm.rightBottomLon"
                                placeholder="例如123.45"></el-input>
                    </el-form-item>
                    <el-form-item label="右下纬度:">
                      <el-input clearable v-model="lonLatForm.rightBottomLat"
                                placeholder="例如74.355"></el-input>
                    </el-form-item>
                  </el-form>
                  <div class="juzhong">
                    <el-button type="primary" size="mini" @click="queryByLonLat">确定</el-button>
                    <el-button size="mini">清空</el-button>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="中心点输入" name="2">
                  <el-form ref="form" :model="lonLatCenterForm" label-width="90px">
                    <el-form-item label="中心点经度:">
                      <el-input clearable v-model="lonLatCenterForm.centerLon"
                                placeholder="例如123.45"></el-input>
                    </el-form-item>
                    <el-form-item label="中心点纬度:">
                      <el-input clearable v-model="lonLatCenterForm.centerLat"
                                placeholder="例如74.355"></el-input>
                    </el-form-item>
                    <el-form-item label="长度(km):">
                      <el-input clearable v-model="lonLatCenterForm.height"></el-input>
                    </el-form-item>
                    <el-form-item label="宽度(km):">
                      <el-input clearable v-model="lonLatCenterForm.width"></el-input>
                    </el-form-item>
                  </el-form>
                  <div class="juzhong">
                    <el-button type="primary" size="mini" @click="queryByCenter">确定</el-button>
                    <el-button size="mini">清空</el-button>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-submenu>
          <el-submenu index="1-3">
            <template slot="title">绘制范围</template>
            <div class="timeSearch huizhi">
              <div class="icons" title="矩形">
                <i class="iconfont icon-24gl-square" @click="drawEntity('Rectangle')"></i>
              </div>
              <div class="icons" title="多边形">
                <i class="iconfont icon-duobianxing" @click="drawEntity('Polygon')"></i>
              </div>
              <div class="icons" title="圆形">
                <i class="iconfont icon-xingzhuang-tuoyuanxing" @click="drawEntity('Circle')"></i>
              </div>
              <div class="icons" title="线段">
                <i class="iconfont icon-icon-line-graph" @click="drawEntity('Polyline')"></i>
              </div>
              <div class="icons" title="点">
                <i class="iconfont icon-dian" @click="drawEntity('Point')"></i>
              </div>
            </div>
          </el-submenu>
          <el-submenu index="1-4">
            <template slot="title">导入范围</template>
            <div class="timeSearch">
              <el-upload class="upload-demo"
                         accept=".zip,.shp,.dbf"
                         :auto-upload="true"
                         ref="file"
                         :file-list="fileList"
                         :http-request="importFile"
                         action="#" multiple>
                选择路径：
                <el-button size="small" type="primary">上传文件</el-button>
                <p style="margin-bottom: 0;line-height: 20px;">支持.zip文件(包括.dbf、.shp、.prj三类文件)</p>
              </el-upload>
              <div style="text-align: right;margin-top: 10px;">
                <el-button type="primary" size="mini" @click="resetFile">重置</el-button>
                <el-button type="primary" size="mini" @click="handleImport">确定</el-button>
              </div>
            </div>
          </el-submenu>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">数据筛选</template>
          <el-submenu index="2-1">
            <template slot="title">数据类型</template>
            <el-menu-item index="2-1-1">光学卫星影像</el-menu-item>
            <el-menu-item index="2-1-2">雷达卫星影像</el-menu-item>
          </el-submenu>
          <el-submenu index="2-2">
            <template slot="title">卫星/传感器</template>
            <div class="timeSearch">
              <el-tree
                  ref="satelliteTree"
                  :data="satelliteData"
                  show-checkbox
                  node-key="id"
                  :props="defaultProps">
              </el-tree>
            </div>
          </el-submenu>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">时间筛选</template>
          <div class="timeSearch">
            <p>采集时间</p>
            <el-date-picker
                v-model="timeValue1"
                type="date"
                size="small"
                placeholder="选择日期">
            </el-date-picker>
            至
            <el-date-picker
                v-model="timeValue2"
                type="date"
                size="small"
                placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-submenu>
      </el-menu>
      <div class="searchBtn">
        <el-button @click="query">查询</el-button>
        <el-button @click="reset">重置</el-button>
      </div>
    </div>

    <div class="rightIcon">
      <!--            <i class="el-icon-search" title="查询" @click="queryByDate([timeValue1, timeValue2])"></i>-->
      <!--            <i class="el-icon-refresh-right" title="重置" @click="reset"></i>-->
      <i class="el-icon-shopping-cart-2" title="待下载" @click="showNotDownload"></i>
      <i class="el-icon-download" title="已下载" @click="showDownload"></i>
    </div>
    <!-- 查询弹框 -->
    <div class="downloadList" v-if="searchList">
      <i class="el-icon-close" title="关闭" @click="closeSearchList"></i>
      <p class="title">查询结果</p>
      <div class="btns">
        <span>查询结果{{ unDownloadedData.length }}景，已选择{{ selectedData.length }}景</span>
        <div class="btn">
          <el-button type="primary" size="mini" @click="">清空选择</el-button>
        </div>
      </div>
      <div class="tableMain">
        <el-table :data="unDownloadedData" border
                  :header-cell-style="{ 'text-align': 'center' }"
                  :cell-style="{ 'text-align': 'center' }"
                  @cell-mouse-enter="handleMouseEnter"
                  @cell-mouse-leave="handleMouseOut"
                  @selection-change="handleSelectionChange"
                  :row-key="handleRowKey"
                  style="width: 100%;max-height:calc(100vh - 500px) ;overflow: auto;">
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="smallPic" label="缩略图">
            <template slot-scope="scope">
              <el-image :src="imagesIP + '/' + scope.row.directory + '/' + scope.row.thumbUrl"
                        style="width:30px; height:30px;">
              </el-image>
              <i class="iconfont icon-yanjing" :class="scope.row['changeColor']"
                 @click="changeMode(scope.row)"></i>
            </template>
          </el-table-column>
          <el-table-column prop="satellite" sortable label="卫星"></el-table-column>
          <el-table-column prop="sensorID" sortable label="传感器"></el-table-column>
          <el-table-column prop="resolution" sortable label="分辨率"></el-table-column>
          <el-table-column prop="receiveTime" sortable label="采集时间"></el-table-column>
          <el-table-column prop="cloudPercent" sortable label="云量"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="notDownloadDetail(scope.row)">详情</el-button>
              <el-button type="text" size="small">下载</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align: center;margin-top: 10px;">
          <el-pagination background small layout="prev, pager, next" :total="1000">
          </el-pagination>
        </div>
      </div>
      <div class="footerIcon">
        <i class="icon el-icon-shopping-cart-2 gouwuche" title="加入待下载"></i>
      </div>
    </div>

    <!-- 未下载弹框 -->
    <div class="downloadList" v-if="notDownload">
      <i class="el-icon-close" title="关闭" @click="closeUnDownload"></i>
      <p class="title">待下载</p>
      <div class="btns">
        <span>共{{ unDownloadedData.length }}景</span>
        <div class="btn">
          <el-button type="primary" size="mini">删除</el-button>
          <el-button type="primary" size="mini">清空选择</el-button>
        </div>
      </div>
      <div class="tableMain">
        <el-table :data="unDownloadedData" border
                  :header-cell-style="{ 'text-align': 'center' }"
                  :cell-style="{ 'text-align': 'center' }"
                  @cell-mouse-enter="handleMouseEnter"
                  @cell-mouse-leave="handleMouseOut"
                  @selection-change="handleSelectionChange"
                  :row-key="handleRowKey"
                  style="width: 100%;max-height:calc(100vh - 500px) ;overflow: auto;">
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="smallPic" label="缩略图">
            <template slot-scope="scope">
              <el-image :src="imagesIP + '/' + scope.row.directory + '/' + scope.row.thumbUrl"
                        style="width:30px; height:30px;">
              </el-image>
              <i class="iconfont icon-yanjing" :class="scope.row['changeColor']"
                 @click="changeMode(scope.row)"></i>
            </template>
          </el-table-column>
          <el-table-column prop="satellite" sortable label="卫星"></el-table-column>
          <el-table-column prop="sensorID" sortable label="传感器"></el-table-column>
          <el-table-column prop="resolution" sortable label="分辨率"></el-table-column>
          <el-table-column prop="receiveTime" sortable label="采集时间"></el-table-column>
          <el-table-column prop="cloudPercent" sortable label="云量"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="notDownloadDetail(scope.row)">详情</el-button>
              <el-button type="text" size="small" @click="notDownloadDelete">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align: center;margin-top: 10px;">
          <el-pagination background small layout="prev, pager, next" :total="1000">
          </el-pagination>
        </div>
      </div>
      <div class="footerBtns">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="选择数据类型">
            <el-checkbox-group v-model="form.type">
              <el-checkbox label="AOI" name="type"></el-checkbox>
              <el-checkbox label="快视图" name="type"></el-checkbox>
              <el-checkbox label="矢量框" name="type"></el-checkbox>
              <el-checkbox label="原始数据" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="选择下载路径">
            <el-upload class="upload-demo" action="name"
                       multiple>
              <el-button size="small" type="primary">点击选择</el-button>
              <p style="margin-bottom: 0;line-height: 20px;">{{ form.path }}</p>
            </el-upload>
          </el-form-item>
        </el-form>
        <div class="btn">
          <el-button type="primary" size="small">开始下载</el-button>
          <el-button size="small">取消下载</el-button>
        </div>
      </div>
    </div>
    <!-- 已下载弹窗 -->
    <div v-if="download" class="downloadList">
      <i class="el-icon-close" title="关闭" @click="download = false"></i>
      <p class="title">已下载</p>
      <div class="btns">
        <span>共{{ downloadTotal }}景</span>
        <div class="btn">
          <el-button type="primary" size="mini">删除记录</el-button>
        </div>
      </div>
      <div class="tableMain">
        <el-table :data="downloadedData" border :header-cell-style="{ 'text-align': 'center' }"
                  :cell-style="{ 'text-align': 'center' }"
                  style="width: 100%;max-height:calc(100vh - 500px) ;overflow: auto;">
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="smallPic" label="缩略图">
            <template slot-scope="scope">
              <el-image :src="scope.row.smallPic" :preview-src-list="scope.row.srcList"
                        style="width:30px; height:30px;">
              </el-image>
              <i class="iconfont icon-yanjing" :class="scope.row['changeColor']"
                 @click="changeMode(scope.row)"></i>
            </template>
          </el-table-column>
          <el-table-column prop="satellite" sortable label="卫星"></el-table-column>
          <el-table-column prop="sensor" sortable label="传感器"></el-table-column>
          <el-table-column prop="GSD" sortable label="分辨率"></el-table-column>
          <el-table-column prop="downloadPeople" sortable label="下载人"></el-table-column>
          <el-table-column prop="downloadTime" sortable label="下载时间"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="downloadDetail">详情</el-button>
              <el-button type="text" size="small" @click="downloadDelete">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align: center;margin-top: 10px;">
          <el-pagination background small layout="prev, pager, next" :total="1000">
          </el-pagination>
        </div>
      </div>
      <div class="footerBtns">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="选择数据类型">
            <el-checkbox-group v-model="form.type">
              <el-checkbox label="AOI" name="type"></el-checkbox>
              <el-checkbox label="快视图" name="type"></el-checkbox>
              <el-checkbox label="矢量框" name="type"></el-checkbox>
              <el-checkbox label="原始数据" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="选择下载路径">
            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" multiple>
              <el-button size="small" type="primary">点击选择</el-button>
              <p style="margin-bottom: 0;line-height: 20px;">{{ form.path }}</p>
            </el-upload>
          </el-form-item>
        </el-form>
        <div class="btn">
          <el-button type="primary" size="small">开始下载</el-button>
          <el-button size="small">取消下载</el-button>
        </div>
      </div>
    </div>
    <!-- 未下载、已下载详情弹框 -->
    <el-dialog title="详情" :visible.sync="dialogDataDetail" append-to-body>
      <el-descriptions :column="2" border v-model="detailData" class="dialogDetail">
        <el-descriptions-item :prop="item.property" :label="item.name" v-for="item in detailData">
          {{ item.value }}
        </el-descriptions-item>
      </el-descriptions>
      <div class="btnRight">
        <el-button size="small" @click="closeDetail">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {regionData} from "../../node_modules/element-china-area-data";
import loader from "../api/utils/loader";
import config from "../api/utils/config";
import drawer from "../api/utils/drawer";
import dataContent, {GF_header, ZY_header, GF3_header, other_header} from '../components/dataManage/dataContent';
import common from "../api/utils/common";
import entity from "../api/utils/entity";
import cesium2turf from "@/api/utils/cesium2turf";
import network from "@/api/utils/network";
import { open as shapeOpen, read as shapeRead } from 'shapefile';

const Options = ['level1', 'level2', 'level3', 'level4'];
const Cesium = HXWEarth;
export default {
  data() {
    return {
      searchTotal1: '10',
      searchTotal2: '20',
      formLabelWidth: '60px',
      activeName1: '1',
      activeName2: '1',
      lonLatForm: {
        leftTopLon: '',
        leftTopLat: '',
        rightBottomLon: '',
        rightBottomLat: '',
      },
      lonLatCenterForm: {
        centerLon: '',
        centerLat: '',
        height: '',
        width: '',
      },
      //省市区联动下拉框
      provinces: regionData,
      cities: [],
      area: [],
      selectProvince: "",
      selectCity: "",
      selectArea: "",

      searchArea: '',
      searchForeign: '',

      checkAll: false,
      checkedLists: [],
      lists: Options,
      isIndeterminate: true,
      satelliteData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },

      timeValue1: '',
      timeValue2: '',
      dialogDataDetail: false,
      detailData: [
        {property: 'SatelliteID', name: '卫星ID'},
        {property: 'SensorID', name: '传感器ID'},
        {property: 'ReceiveStationID', name: '接收站ID'},
        {property: 'ReceiveTime', name: '接收时间'},
        {property: 'ProduceTime', name: '生产时间'},
        {property: 'OrbitID', name: '轨道ID'},
        {property: 'POrbitID', name: '轨道圈号'},
        {property: 'OrbitType', name: '轨道类型'},
        {property: 'AttType', name: '姿态类型'},
        {property: 'StripID', name: '条带ID'},
        {property: 'ProduceType', name: '产品类型'},
        {property: 'SceneID', name: '景序列号'},
        {property: 'ProductID', name: '产品序列号'},
        {property: 'ProductLevel', name: '产品级别'},
        {property: 'ProductQuality', name: '产品质量'},
        {property: 'ProductFormat', name: '产品格式'},
        {property: 'Bands', name: '产品谱段'},
        {property: 'BandsID', name: '产品谱段编号'},
        {property: 'ScenePath', name: '景Path'},
        {property: 'SceneRow', name: '景Row'},
      ],
      searchList: false,
      notDownload: false,
      download: false,
      activeIndex2: '1',
      total: '12',
      downloadTotal: '1',
      form: {
        type: [],
        path: "E:/aaa2022vega/codeHeGongye"
      },
      changeColor: 'icon-gray',
      unDownloadedData: [],
      selectedData: [],
      downloadedData: [],
      imagesIP: config.imagesIP,
      clazz: 'optical_satellite',

      shapeDic: {},
      currentObjId: '',
      geometryType: '',

      fileList: []
    }
  },
  methods: {
    handleClick1() {

    },
    handleClick2() {

    },
    changeProvince() {
      this.cities = [];
      this.area = [];
      this.selectCity = "";
      this.selectArea = "";
      let cityItem = this.provinces.filter(
          (item) => item.value === this.selectProvince
      );
      if (cityItem[0]) {
        this.cities = cityItem[0].children;
      }
    },
    changeCity() {
      this.area = [];
      this.selectArea = "";
      let areaItem = this.cities.filter(
          (item) => item.value === this.selectCity
      );
      if (areaItem[0]) {
        this.area = areaItem[0].children;
      }
    },

    clearAllEntity(){
      window.viewer.entities.removeAll();
      window.viewer.dataSources.removeAll();
    },

    async queryByRegion(){
      const _ = this;
      let provinceURL = "./static/data/province.geojson";
      let countyURL = "./static/data/county.geojson";
      let cityURL = "./static/data/city.geojson";
      _.clearAllEntity();
      let regionEntityCollection = [];
      if(common.isNotEmptyStr(_.selectProvince)){
        if(common.isNotEmptyStr(_.selectCity)){
          if(common.isNotEmptyStr(_.selectArea)){
            let countyGeoData = Cesium.GeoJsonDataSource.load(countyURL, {});
            await countyGeoData.then(function (dataSource){
              let entities = dataSource.entities.values;
              for(let i = 0; i < entities.length; i++){
                let entity = entities[i];
                let code = entity.properties.县代码.getValue()
                if(_.selectArea === code + ''){
                  regionEntityCollection.push(entity);
                  window.viewer.entities.add(entity);
                  window.viewer.flyTo(entity);
                }
              }
            })
          } else {
            let cityGeoData = Cesium.GeoJsonDataSource.load(cityURL, {});
            await cityGeoData.then(function (dataSource){
              let entities = dataSource.entities.values;
              for(let i = 0; i < entities.length; i++){
                let entity = entities[i];
                let code = entity.properties.市代码.getValue()
                if(_.selectCity === code + ''){
                  regionEntityCollection.push(entity);
                  window.viewer.entities.add(entity);
                  window.viewer.flyTo(entity);
                }
              }
            })
          }
        } else {
          let provinceGeoData = Cesium.GeoJsonDataSource.load(provinceURL, {});
          await provinceGeoData.then(function (dataSource){
            let entities = dataSource.entities.values;
            for(let i = 0; i < entities.length; i++){
              let entity = entities[i];
              let code = entity.properties.省代码.getValue()
              if(_.selectProvince === code + ''){
                regionEntityCollection.push(entity);
                console.log(entity);
                window.viewer.entities.add(entity);
                window.viewer.flyTo(entity);
              }
            }
          })
        }
      }
      let regionSet = new Set();
      loader.load({class: _.clazz}, function (data) {
        regionEntityCollection.forEach(function (entity) {
          data.forEach(function (object) {
            let rectB = _.createRectUseObject(object);
            if(rectB !== null){
              if(cesium2turf.polygonIntersect(rectB, entity.polygon)){
                regionSet.add(object);
              }
            }
          })
        })
        _.unDownloadedData = [...regionSet];
        _.showSearchList();
      })
    },

    async queryByWorld_(){
      const _ = this;
      let worldURL = "./static/data/world.geojson";
      let regionEntityCollection = [];
      if(common.isNotEmptyStr(_.searchForeign)){
        let worldGeoData = Cesium.GeoJsonDataSource.load(worldURL, {});
        await worldGeoData.then(function (dataSource){
          let entities = dataSource.entities.values;
          for(let i = 0; i < entities.length; i++){
            let entity = entities[i];
            // let name = entity.properties.Chi_name.getValue()
            // if(_.searchForeign === name){
            //   regionEntityCollection.push(entity);
            //   window.viewer.entities.add(entity);
            // }
          }
        })
      }
    },

    queryByWorld(){
      const _ = this;
      _.clearAllEntity();

      let object = common.getObjectFromArray(config.classRouteMapper, 'class', 'world_boundary');
      let url = object.url + '/' + _.searchForeign;
      network.getAsync(url).then(function (response) {
        let geoJson = Cesium.GeoJsonDataSource.load(response.data, {
          stroke: Cesium.Color.fromCssColorString('#00ffe1'),
          fill: Cesium.Color.WHEAT.withAlpha(0),
          strokeWidth: 10,
          clampToGround: true,
        });
        geoJson.then((dataSource) => {
          let entities = dataSource.entities.values;
          for(let i = 0; i < entities.length; i++){
            let entity = entities[i];
            entity.polygon.height = 0;
          }
          window.viewer.dataSources.add(dataSource);

          let regionSet = new Set();
          loader.load({class: _.clazz}, function (data) {
            entities.forEach(function (entity) {
              data.forEach(function (object) {
                let rectB = _.createRectUseObject(object);
                if(rectB !== null){
                  if(cesium2turf.polygonIntersect(rectB, entity.polygon)){
                    regionSet.add(object);
                  }
                }
              })
            })
            _.unDownloadedData = [...regionSet];
            _.showSearchList();
          })

        })
      })
    },

    queryByDate(data, dates) {
      //filter time
      const _ = this;
      if(common.ifDate(_.timeValue1) && common.ifDate(_.timeValue2)){
        _.unDownloadedData = data.filter(function (object) {
          if (object['receiveTime'] !== null && object['receiveTime'] !== 'NULL') {
            let date = new Date(object['receiveTime']);
            return common.ifInterval(dates, date);
          }
          return false;
        });
      }
    },

    createRectUseObject(object){
      let topLeftLon = parseFloat(object.topLeftLongitude);
      let bottomRightLat = parseFloat(object.bottomRightLatitude);
      let bottomRightLon = parseFloat(object.bottomRightLongitude);
      let topLeftLat = parseFloat(object.topLeftLatitude);
      if (isNaN(topLeftLon) || isNaN(bottomRightLat) || isNaN(bottomRightLon) || isNaN(topLeftLat)) {
        return null;
      }
      return new Cesium.Rectangle.fromDegrees(topLeftLon, bottomRightLat, bottomRightLon, topLeftLat);
    },

    queryByRect(data, rectA){
      const _ = this;
      _.unDownloadedData = data.filter(function (object) {
        let rectB = _.createRectUseObject(object);
        // let rectB = [topLeftLon, bottomRightLat, bottomRightLon, topLeftLat];
        // let intersection = entity.checkIntersection(rectA, rectB);
        if(rectB !== null){
          let intersection = entity.intersection(rectA, rectB);
          if (common.defined(intersection)) {
            return true;
          }
        }
      })
    },

    queryByLonLat(){
      const _ = this;
      let rectA = new Cesium.Rectangle.fromDegrees(parseFloat(_.lonLatForm.leftTopLon),
          parseFloat(_.lonLatForm.rightBottomLat),
          parseFloat(_.lonLatForm.rightBottomLon),
          parseFloat(_.lonLatForm.leftTopLat));
      drawer.drawRectangle(rectA);
      loader.load({class: _.clazz}, function (data) {
        _.queryByRect(data, rectA);
        _.showSearchList();
      })
    },

    queryByCenter(){
      const _ = this;
      let center = entity.lonLatToCartesian(_.lonLatCenterForm.centerLon, _.lonLatCenterForm.centerLat);
      let rectA = entity.createRectByCenter(center,
          parseFloat(_.lonLatCenterForm.width) * 1000,
          parseFloat(_.lonLatCenterForm.height) * 1000);
      drawer.drawRectangle(rectA);
      loader.load({class: _.clazz}, function (data) {
        _.queryByRect(data, rectA);
        _.showSearchList();
      })
    },

    queryByPoint(data, position){
      const _ = this;
      _.unDownloadedData = data.filter(function (object) {
        let rectB = _.createRectUseObject(object);
        // console.log(rectB, entity.cartesianToLonLat(position)[0], entity.cartesianToLonLat(position)[1]);
        if(rectB !== null){
          return cesium2turf.booleanContains(position, rectB);
        }
      })
    },

    queryByPolygon(data, polygon){
      const _ = this;
      _.unDownloadedData = data.filter(function (object) {
        let rectB = _.createRectUseObject(object);
        // let rectB = [topLeftLon, bottomRightLat, bottomRightLon, topLeftLat];
        // let intersection = entity.checkIntersection(rectA, rectB);
        if(rectB !== null){
          return cesium2turf.polygonIntersect(rectB, polygon);
        }
      })
    },

    queryByPolyline(data, polyline){
      const _ = this;
      _.unDownloadedData = data.filter(function (object) {
        let rectB = _.createRectUseObject(object);
        // let rectB = [topLeftLon, bottomRightLat, bottomRightLon, topLeftLat];
        // let intersection = entity.checkIntersection(rectA, rectB);
        if(rectB !== null){
          return cesium2turf.polylineIntersect(rectB, polyline);
        }
      })
    },

    queryBySpace(data){
      const _ = this;
      let positions = _.shapeDic[_.currentObjId];
      if(_.geometryType === 'Rectangle'){
        if (common.defined(positions)) {
          let lonLat0 = entity.cartesianToLonLat(positions[0]);
          let lonLat1 = entity.cartesianToLonLat(positions[1]);
          let rectA = new Cesium.Rectangle.fromDegrees(lonLat0[0], lonLat1[1], lonLat1[0], lonLat0[1]);
          _.queryByRect(data, rectA);
        }
      } else if(_.geometryType === 'Polygon'){
        if (common.defined(positions)) {
          let polygon = new Cesium.PolygonGraphics( { hierarchy : positions } );

          _.queryByPolygon(data, polygon);
        }
      } else if(_.geometryType === 'Circle'){
        if (common.defined(positions)) {
          let polygon = new Cesium.PolygonGraphics( { hierarchy : entity.computeCirclePolygon(positions) } );

          _.queryByPolygon(data, polygon);
        }
      } else if(_.geometryType === 'Polyline'){
        if (common.defined(positions)) {
          let polyline = new Cesium.PolylineGraphics({ positions : positions });

          _.queryByPolyline(data, polyline);
        }
      } else if(_.geometryType === 'Point'){
        if (common.defined(positions)) {
          _.queryByPoint(data, positions);
        }
      }
    },

    queryBySateAndSensor(data){
      const _ = this;
      let nodes = this.$refs.satelliteTree.getCheckedNodes();
      console.log(nodes);
      let selectedSates = [];
      function contains(object){
        for (let one of selectedSates){
          if(one['satellite'] === object['satelliteID'] &&
          one['sensor'] === object['sensorID']){
            return true;
          }
        }
      }
      if(common.defined(nodes) && nodes.length > 0){
        nodes.forEach(function (object){
          if(common.defined(object['children'])){
            selectedSates = selectedSates.concat(object['children']);
          } else {
            selectedSates.push(object);
          }
        })
      }
      _.unDownloadedData = data.filter(function (object) {
        return contains(object);
      })
    },

    query(){
      const _ = this;
      loader.load({class: _.clazz}, function (data) {
        if(_.clazz === 'radar_satellite'){
          data.forEach(function (object) {
            object['satelliteID'] = object['satellite'];
          })
        }
        //filter time
        _.unDownloadedData = data;
        _.queryByDate(_.unDownloadedData, [_.timeValue1, _.timeValue2]);

        //filter space
        _.queryBySpace(_.unDownloadedData);

        //filter satellite and sensor
        _.queryBySateAndSensor(_.unDownloadedData);
        _.showSearchList();
      })
    },

    reset() {
      this.clearAllEntity();

      this.clazz = 'optical_satellite';
      this.timeValue1 = '';
      this.timeValue2 = '';
      this.shapeDic = {};
      this.geometryType = '';
      this.currentObjId = '';
    },

    drawEntity(geometryType) {
      const _ = this;
      let callback = function () {};
      if (geometryType === 'Rectangle') {
        callback = function (positions) {
          let objId = geometryType + common.uuid().split('-')[0];
          _.shapeDic[objId] = positions;
          _.currentObjId = objId;
          _.geometryType = geometryType;
          entity.showRectangle('drawGeometry', objId, positions);
        };
      } else if (geometryType === 'Polygon') {
        callback = function (positions) {
          let objId = geometryType + common.uuid().split('-')[0];
          _.shapeDic[objId] = positions;
          _.currentObjId = objId;
          _.geometryType = geometryType;
          entity.showPolygon('drawGeometry', objId, positions);
        };
      } else if (geometryType === 'Circle') {
        callback = function (positions) {
          let objId = geometryType + common.uuid().split('-')[0];
          _.shapeDic[objId] = positions;
          _.currentObjId = objId;
          _.geometryType = geometryType;
          entity.showCircle('drawGeometry', objId, positions);
        };
      } else if (geometryType === 'Polyline') {
        callback = function (positions) {
          let objId = geometryType + common.uuid().split('-')[0];
          _.shapeDic[objId] = positions;
          _.currentObjId = objId;
          _.geometryType = geometryType;
          entity.showPolyline('drawGeometry', objId, positions);
        };
      } else if (geometryType === 'Point') {
        callback = function (position) {
          let objId = geometryType + common.uuid().split('-')[0];
          _.shapeDic[objId] = position;
          _.currentObjId = objId;
          _.geometryType = geometryType;
          entity.showPoint('drawGeometry', objId, position);
        };
      }
      entity.draw(geometryType, callback);
    },

    resetFile(){
      this.fileList = [];
    },

    importFile(input) {
      this.fileList.push(input.file);
    },

    handleImport(){
      if(!common.arrayIsEmpty(this.fileList)){
        this.parseShapefile(this.fileList);
      }
    },

    parseShapefile(files){
      const _ = this;
      let regionSet = new Set();
      const shpFile = files.find(f => f.name.endsWith('.shp'));
      const dbfFile = files.find(f => f.name.endsWith('.dbf'));
      const promises = [shpFile, dbfFile].map(i => this.readInputFile(i));
      Promise.all(promises).then(([shp, dbf]) => {
        return shapeOpen(shp, dbf);
      }).then(source => source.read()
          .then(async function log(result) {
            if(result.done){
              _.unDownloadedData = [...regionSet];
              _.showSearchList();
              return;
            }
            let geoJson = Cesium.GeoJsonDataSource.load(result.value, {
              stroke: Cesium.Color.fromCssColorString('#00ffe1'),
              fill: Cesium.Color.WHEAT.withAlpha(0),
              strokeWidth: 10,
              clampToGround: true,
            });
            geoJson.then((dataSource) => {
              let entities = dataSource.entities.values;
              for(let i = 0; i < entities.length; i++){
                let entity = entities[i];
                entity.polygon.height = 0;
              }
              window.viewer.dataSources.add(dataSource);

              loader.load({class: _.clazz}, function (data) {
                entities.forEach(function (entity) {
                  data.forEach(function (object) {
                    let rectB = _.createRectUseObject(object);
                    if(rectB !== null){
                      if(cesium2turf.polygonIntersect(rectB, entity.polygon)){
                        regionSet.add(object);
                      }
                    }
                  })
                })
              })
            })
            return await source.read().then(log);
          })).catch(error => console.error(error.stack))
    },

    readInputFile(file, type = 'ArrayBuffer') {
      return new Promise(function (resolve, reject) {
        const reader = new FileReader();
        switch (type) {
          case 'ArrayBuffer':
            reader.readAsArrayBuffer(file);
            break;
          case 'Text':
            reader.readAsText(file);
            break;
          case 'BinaryString':
            reader.readAsBinaryString(file);
            break;
          case 'DataURL':
            reader.readAsDataURL(file);
            break;
        }
        reader.onload = function () {
          resolve(this.result);
        }
        reader.onerror = function () {
          reject(this);
        }
      })
    },

    handleCheckAllChange(val) {
      this.checkedCities = val ? Options : [];
      this.isIndeterminate = false;
    },
    handleCheckedListsChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.lists.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.lists.length;
    },
    handleMouseEnter(row, column, cell, event) {
      let entity = drawer.findEntityByObjId(window.viewer, row.id);
      entity.rectangle.outlineColor.setValue(Cesium.Color.RED);
    },
    handleMouseOut(row, column, cell, event) {
      let entity = drawer.findEntityByObjId(window.viewer, row.id);
      entity.rectangle.outlineColor.setValue(Cesium.Color.BLUE);
    },
    handleSelectionChange(val) {
      this.selectedData = val
    },
    handleRowKey(row) {
      return row.id
    },
    changeMode(row) {
      let entity = drawer.findEntityByObjId(window.viewer, row.id);
      entity.rectangle.fill.setValue(!entity.rectangle.fill.getValue());

      if (entity.rectangle.fill.getValue()) {
        this.$set(row, 'changeColor', 'icon-blue');
      } else {
        this.$set(row, 'changeColor', 'icon-gray');
      }
    },
    showNotDownload() {
      const _ = this;
      this.notDownload = true;
      if (this.download = true) {
        this.download = false;
      }

      function drawRectangle(array) {
        for (let object of array) {
          if (_.clazz === 'optical_satellite') {
            object['satellite'] = object['satelliteID'];
            object['resolution'] = object['imageGSD'];
          } else {
            object['resolution'] = object['nominalResolution'];
          }
          let topLeftLon = parseFloat(object.topLeftLongitude);
          let bottomRightLat = parseFloat(object.bottomRightLatitude);
          let bottomRightLon = parseFloat(object.bottomRightLongitude);
          let topLeftLat = parseFloat(object.topLeftLatitude);
          if (isNaN(topLeftLon) || isNaN(bottomRightLat) || isNaN(bottomRightLon) || isNaN(topLeftLat)) {
            continue;
          }
          // if(object.imageUrl === null){
          //     continue;
          // }
          let imageUrl = _.imagesIP + '/' + object.directory + '/' + object.imageUrl;
          let positions = [topLeftLon, bottomRightLat, bottomRightLon, topLeftLat];
          drawer.rectangle(window.viewer, object.id, imageUrl, positions);
        }
      }

      if (!common.arrayIsEmpty(_.unDownloadedData)) {
        // drawer.clearEntityByLayerId('drawGeometry');
        drawer.clearEntityByLayerId('rectangle');
        drawRectangle(_.unDownloadedData);
      }
    },
    closeSearchList() {
      this.searchList = false;
      this.clearAllEntity();
      drawer.clearEntityByLayerId('rectangle');
      drawer.clearEntityByLayerId('drawGeometry');
    },
    closeUnDownload() {
      this.notDownload = false;
      this.clearAllEntity();
      drawer.clearEntityByLayerId('rectangle');
      drawer.clearEntityByLayerId('drawGeometry');
    },
    showSearchList() {
      const _ = this;
      this.searchList = true;

      function drawRectangle(array) {
        for (let object of array) {
          if (_.clazz === 'optical_satellite') {
            object['satellite'] = object['satelliteID'];
            object['resolution'] = object['imageGSD'];
          } else {
            object['resolution'] = object['nominalResolution'];
          }
          let topLeftLon = parseFloat(object.topLeftLongitude);
          let bottomRightLat = parseFloat(object.bottomRightLatitude);
          let bottomRightLon = parseFloat(object.bottomRightLongitude);
          let topLeftLat = parseFloat(object.topLeftLatitude);
          if (isNaN(topLeftLon) || isNaN(bottomRightLat) || isNaN(bottomRightLon) || isNaN(topLeftLat)) {
            continue;
          }
          // if(object.imageUrl === null){
          //     continue;
          // }
          let imageUrl = _.imagesIP + '/' + object.directory + '/' + object.imageUrl;
          let positions = [topLeftLon, bottomRightLat, bottomRightLon, topLeftLat];
          drawer.rectangle(window.viewer, object.id, imageUrl, positions);
        }
      }

      if (!common.arrayIsEmpty(_.unDownloadedData)) {
        // drawer.clearEntityByLayerId('drawGeometry');
        drawer.clearEntityByLayerId('rectangle');
        _.unDownloadedData.forEach(function (object) {
          _.$set(object, 'changeColor', 'icon-blue');
        });
        drawRectangle(_.unDownloadedData);
      }
    },
    showDownload() {
      this.download = true
      if (this.notDownload = true) {
        this.notDownload = false
      }
    },
    makeMenus(data, label){
      let gfs = data.filter(function (object) {
        return common.defined(object['satelliteID']) &&
            object['satelliteID'].startsWith(label);
      })
      let gfMap = new Map();
      gfs.forEach(function (object) {
        if(gfMap.has(object['satelliteID'])) {
          gfMap.get(object['satelliteID']).push(object);
        } else {
          gfMap.set(object['satelliteID'], [object]);
        }
      })
      let menus = [];
      for(let [key, value] of gfMap) {
        let menu = {
          label: key,
          children: []
        }
        let tmSet = new Set();// duplicate removal
        value.forEach(function (object){
          tmSet.add(object['sensorID']);
        })
        let arr = [...tmSet];
        let sensors = arr.map(function (label){
          return { label : label, satellite: key, sensor: label };
        })
        menu.children = sensors;
        menus.push(menu);
      }
      return menus;
    },
    makeSatelliteData(){
      const _ = this;
      _.satelliteData = [];
      if(this.clazz === 'optical_satellite'){
        loader.load({ class : _.clazz }, function (data){
          let gfMenus = _.makeMenus(data, 'GF');
          let zyMenus = _.makeMenus(data, 'ZY');
          _.satelliteData = _.satelliteData.concat([{
            label: '高分系列',
            children: gfMenus
          },{
            label: '资源系列',
            children: zyMenus
          }])
        })
      } else if(this.clazz === 'radar_satellite'){
        loader.load({ class : _.clazz }, function (data){
          data.forEach(function (object) {
            object['satelliteID'] = object['satellite'];
          })
          let gfMenus = _.makeMenus(data, 'GF');
          _.satelliteData = _.satelliteData.concat([{
            label: '高分系列',
            children: gfMenus
          }])
        })
      }
    },

    handleSelect(key, keyPath) {
      if (key === '2-1-1') {
        this.clazz = 'optical_satellite';
        this.makeSatelliteData();
      }
      if (key === '2-1-2') {
        this.clazz = 'radar_satellite';
        this.makeSatelliteData();
      }
    },
    notDownloadDetail(row) {
      this.detailData = [];
      for (let object of GF_header.data) {
        object.value = row[object['property']];
        this.detailData.push(object);
      }
      this.dialogDataDetail = true;
    },
    closeDetail() {
      this.detailData = []
      this.dialogDataDetail = false;
    },
    notDownloadDelete() {
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
    downloadDetail() {
      this.dialogDataDetail = true
    },
    downloadDelete() {
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
    }
  }
}
</script>

<style scoped lang="scss">
.dataSearchMenu {
  position: absolute;
  top: 60px;
  left: 0px;
}

.searchBtn {
  position: absolute;
  top: 10px;
  width: 200px;
  left: 420px;
}

.huizhi {
  display: flex;

  .icons {
    width: 40px;
    height: 40px;
    margin: 0 5px;
    border-radius: 50%;
    background: linear-gradient(315deg, #6772FF 0, #00F9E5 100%);
    text-align: center;
    line-height: 40px;
    cursor: pointer;

    i {
      font-size: 24px;
      font-weight: bold;
    }
  }
}

.rightIcon {
  position: absolute;
  right: 30px;
  top: 63px;
  color: #fff;
  font-size: 32px;
  cursor: pointer;

  i {
    margin-left: 20px;
  }
}

.timeSearch {
  padding: 10px;
  color: #fff;

  p {
    margin-bottom: 10px;
  }
}

.downloadList {
  position: absolute;
  background-color: rgba(23, 49, 71, 0.9);
  width: 650px;
  height: calc(100vh - 150px);
  top: 110px;
  right: 10px;
  border: 1px solid #008aff70;
  z-index: 2222;

  i.el-icon-close {
    color: #fff;
    font-size: 20px;
    position: absolute;
    right: 20px;
    top: 10px;
    cursor: pointer;
  }

  p.title {
    color: #fff;
    background: url("../assets/img/msg-title.png");
    background-size: 100%;
    line-height: 40px;
    padding-left: 20px;
  }

  .btns {
    position: relative;
    padding-left: 20px;
    padding-right: 20px;

    span {
      color: #fff;
      padding-top: 5px;
      display: inline-block;
    }

    .btn {
      position: absolute;
      right: 20px;
      top: 0;
    }
  }

  .footerBtns {
    position: absolute;
    bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
    width: 100%;

    .btn {
      text-align: center;
      border-top: 1px solid #008aff70;
      padding-top: 10px;
      margin-top: 5px;
    }

    .el-form-item::v-deep {
      margin-bottom: 0px;
      color: #fff;

      .el-form-item__label,
      .el-checkbox__label {
        color: #fff;
      }

      .el-upload {
        text-align: left;
      }
    }
  }
}

.footerIcon {
  position: absolute;
  bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  width: 100%;
  text-align: right;
}

.el-table .cell::v-deep {
  position: relative;
}

.tableMain {
  margin-top: 10px;
}

i.icon-yanjing {
  position: absolute;
  right: 7px;
  top: 5px;
  cursor: pointer;
}

i.icon-gray {
  color: #7d7d7d;
}

i.icon-blue {
  color: #409eff;
}

.gouwuche {
  font-size: 20px;
  // font-weight: bold;
  color: #fff;
  cursor: pointer;
}
</style>
