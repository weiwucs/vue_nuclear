<!-- 高分3 -->
<template>
	<div>
		<h3><span class="el-icon-coin"></span>高分三号</h3>
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
				<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" border
					row-key="id" default-expand-all @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="55">
					</el-table-column>
					<el-table-column width="150" sortable :prop="item.property" :label="item.name" v-for="item in dataList"></el-table-column>
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
					  :total="1000">
					</el-pagination>
				</div>
			</div>
		</div>
		<!-- 新建 -->
		<el-dialog title="新建" :visible.sync="dialogDataNew" append-to-body>
			<el-descriptions :column="2" border  class="dialogDetail">
			  <el-descriptions-item :label="item.name" v-for="item in dataForm">
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
			<el-descriptions  :column="2" border v-model="dataList" class="dialogDetail">
			   <el-descriptions-item :label="item.name" v-for="(item,i) in dataList">后台获取数据</el-descriptions-item>
			</el-descriptions>
			<div class="btnRight">
				<el-button size="small" type="primary" @click="detailEdit">编辑</el-button>
				<el-button size="small" @click="dialogDataDetail = false">取消</el-button>
			</div>
		</el-dialog>
		<!-- 编辑 -->
		<el-dialog title="编辑" :visible.sync="dialogDataEdit" append-to-body>
			<el-descriptions :column="2" border  class="dialogDetail">
			  <el-descriptions-item :label="item.name" v-for="item in dataForm">
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
	export default {
		components: {
			
		},
		data() {
			return {
				dialogDataDetail:false,
				dialogDataNew:false,
				dialogDataEdit:false,
				dataForm:[
					{property:'SatelliteID',name:'卫星ID',value:''},
					{property:'SensorID',name:'传感器ID',value:''},
					{property:'ReceiveStationID',name:'接收站ID',value:''},
					{property:'ReceiveTime',name:'接收时间',value:''},
					{property:'ProduceTime',name:'生产时间',value:''},
					{property:'OrbitID',name:'轨道ID',value:''},
					{property:'POrbitID',name:'轨道圈号',value:''},
					{property:'OrbitType',name:'轨道类型',value:''},
					{property:'AttType',name:'姿态类型',value:''},
					{property:'StripID',name:'条带ID',value:''},
					{property:'ProduceType',name:'产品类型',value:''},
					{property:'SceneID',name:'景序列号',value:''},
					{property:'ProductID',name:'产品序列号',value:''},
					{property:'ProductLevel',name:'产品级别',value:''},
					{property:'ProductQuality',name:'产品质量',value:''},
					{property:'ProductFormat',name:'产品格式',value:''},
					{property:'Bands',name:'产品谱段',value:''},
					{property:'BandsID',name:'产品谱段编号',value:''},
					{property:'ScenePath',name:'景Path',value:''},
					{property:'SceneRow',name:'景Row',value:''},
				],
				
				dataSearch:'',
				tableData:[
					{SatelliteID:'gf3-1'},
					{SatelliteID:'gf3-2'}
				],
				dataList:[
					{property:'SatelliteID',name:'卫星ID'},
					{property:'SensorID',name:'传感器ID'},
					{property:'imagingMode',name:'成像模式'},
					{property:'orbitID',name:'轨道圈号'},
					{property:'OrbitType',name:'轨道类型'},
					{property:'AttType',name:'姿态类型'},
					{property:'Station',name:'地面站'},
					{property:'ReceiveTime',name:'接收时间'},
					{property:'SceneID',name:'景号'},
					{property:'ProductID',name:'产品序列号'},
					{property:'waveCode',name:'波位号'},
					{property:'NominalResolution',name:'产品分辨率'},
					{property:'WidthInMeters',name:'产品宽度'},
					{property:'productLevel',name:'产品级别'},
					{property:'productType',name:'产品类型'},
					{property:'productFormat',name:'产品格式'},
					{property:'sceneShift',name:'景漂移'},
					{property:'EarthModel',name:'椭球模型'},
					{property:'ProjectModel',name:'投影模型'},
				]
			}
		},
		methods: {
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
			handleSelectionChange(){},
			showDetail(){//显示详情弹框
				this.dialogDataDetail = true
			},
			showNewData(){//显示新建弹框
				this.dialogDataNew = true
			},
			detailEdit(){
				this.dialogDataEdit = true
			}
		}
	}
</script>

<style scoped lang="scss">
</style>