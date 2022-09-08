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
				<el-button type="primary" size="small" >新建</el-button>
				<el-button type="primary" size="small">去重</el-button>
				<el-button type="primary" size="small">更新数据</el-button>
				<el-button type="primary" size="small" @click="deleteList">删除</el-button>
			</div>
			<div class="botanyTable">
				<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" border
					row-key="id" default-expand-all @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="55">
					</el-table-column>
					<el-table-column width="150" sortable :prop="item.property" :label="item.name" v-for="item in GF3List"></el-table-column>
					<el-table-column label="操作" width="150" fixed="right">
						<template slot-scope="scope">
							<el-button type="text" size="small">详情</el-button>
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
	</div>
</template>

<script>
	export default {
		components: {
			
		},
		data() {
			return {
				dataSearch:'',
				tableData:[
					{SatelliteID:'gf3-1'},
					{SatelliteID:'gf3-2'}
				],
				GF3List:[
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
			}
		}
	}
</script>

<style scoped lang="scss">
</style>