<!-- 资源系列 -->
<template>
	<div>
		<h3><span class="el-icon-coin"></span>资源系列</h3>
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
					<el-table-column width="150" sortable :prop="item.property" :label="item.name" v-for="item in ZYList"></el-table-column>
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
					{SatelliteID:'zy1'},
					{SatelliteID:'zy2'}
				],
				ZYList:[
					{property:'SatelliteID',name:'卫星ID'},
					{property:'ReceiveStationID',name:'接收站ID'},
					{property:'SensorID',name:'传感器ID'},
					{property:'ReceiveTime',name:'接收时间'},
					{property:'OrbitID',name:'轨道ID'},
					{property:'OrbitType',name:'轨道类型'},
					{property:'AttType',name:'姿态类型'},
					{property:'StripID',name:'条带ID'},
					{property:'ProduceType',name:'产品类型'},
					{property:'SceneID',name:'景序列号'},
					{property:'ProductID',name:'产品序列号'},
					{property:'ProductLevel',name:'产品级别'},
					{property:'ProductFormat',name:'产品格式'},
					{property:'ProduceTime',name:'生产时间'},
					{property:'Bands',name:'产品谱段'},
					{property:'ScenePath',name:'景Path'},
					{property:'SceneRow',name:'景Row'},
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