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
						<div class="timeSearch">
							
						</div>
					</el-submenu>
					<el-submenu index="1-2">
						<template slot="title">经纬度</template>
						<div class="timeSearch"></div>
					</el-submenu>
					<el-submenu index="1-3">
						<template slot="title">绘制范围</template>
						<div class="timeSearch huizhi">
							<div class="icons" title="正方形">
								<i class="iconfont icon-24gl-square"></i>
							</div>
							<div class="icons" title="多边形">
								<i class="iconfont icon-duobianxing"></i>
							</div>
							<div class="icons" title="圆形">
								<i class="iconfont icon-xingzhuang-tuoyuanxing"></i>
							</div>
							<div class="icons" title="线段">
								<i class="iconfont icon-icon-line-graph"></i>
							</div>
							<div class="icons" title="点">
								<i class="iconfont icon-dian"></i>
							</div>
						</div>
					</el-submenu>
					<el-submenu index="1-4">
						<template slot="title">导入范围</template>
						<div class="timeSearch">
							<el-upload class="upload-demo" multiple>
								选择路径：
								<el-button size="small" type="primary">上传文件</el-button>
								<p style="margin-bottom: 0;line-height: 20px;">支持.zip文件(包括.dbf、.shp、.prj三类文件)</p>
							</el-upload>
							<div style="text-align: right;margin-top: 10px;">
								<el-button type="primary" size="mini">重置</el-button>
								<el-button type="primary" size="mini">确定</el-button>
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
							  :data="satelliteData"
							  show-checkbox
							  node-key="id"
							  :props="defaultProps">
							</el-tree>
						</div>
					</el-submenu>
					<el-submenu index="2-3">
						<template slot="title">级别</template>
						<div class="timeSearch">
							<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
							  <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
							    <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
							  </el-checkbox-group>
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
						</el-date-picker>至
						<el-date-picker
						      v-model="timeValue2"
						      type="date"
							   size="small"
						      placeholder="选择日期">
						</el-date-picker>
					</div>
				</el-submenu>
			</el-menu>
		</div>
		<div class="rightIcon">
			<i class="el-icon-shopping-cart-2" title="待下载" @click="showNotDownload"></i>
			<i class="el-icon-download" title="已下载" @click="showDownload"></i>
		</div>
		<!-- 未下载弹框 -->
		<div class="downloadList" v-if="notDownload">
			<i class="el-icon-close" title="关闭" @click="notDownload = false"></i>
			<p class="title">待下载</p>
			<div class="btns">
				<span>共{{total}}景</span>
				<div class="btn">
					<el-button type="primary" size="mini">删除</el-button>
					<el-button type="primary" size="mini">清空选择</el-button>
				</div>
			</div>
			<div class="tableMain">
				<el-table :data="tableData" border :header-cell-style="{ 'text-align': 'center' }"
					:cell-style="{ 'text-align': 'center' }"
					style="width: 100%;max-height:calc(100vh - 500px) ;overflow: auto;">
					<el-table-column type="selection"></el-table-column>
					<el-table-column prop="smallPic" label="缩略图">
						<template slot-scope="scope">
							<el-image :src="scope.row.smallPic" :preview-src-list="scope.row.srcList"
								style="width:50px; height:50px;">
							</el-image>
						</template>
					</el-table-column>
					<el-table-column prop="satellite" sortable label="卫星"></el-table-column>
					<el-table-column prop="sensor" sortable label="传感器"></el-table-column>
					<el-table-column prop="GSD" sortable label="分辨率"></el-table-column>
					<el-table-column prop="acquisitionTime" sortable label="采集时间"></el-table-column>
					<el-table-column prop="cloudCover" sortable label="云量"></el-table-column>
					<el-table-column fixed="right" label="操作">
						<template slot-scope="scope">
							<el-button type="text" size="small" @click="notDownloadDetail">详情</el-button>
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
						<el-upload class="upload-demo" multiple>
							<el-button size="small" type="primary">点击上传</el-button>
							<p style="margin-bottom: 0;line-height: 20px;">{{form.path}}</p>
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
				<span>共{{downloadTotal}}景</span>
				<div class="btn">
					<el-button type="primary" size="mini">删除记录</el-button>
				</div>
			</div>
			<div class="tableMain">
				<el-table :data="downloadTableData" border :header-cell-style="{ 'text-align': 'center' }"
					:cell-style="{ 'text-align': 'center' }"
					style="width: 100%;max-height:calc(100vh - 500px) ;overflow: auto;">
					<el-table-column type="selection"></el-table-column>
					<el-table-column prop="smallPic" label="缩略图">
						<template slot-scope="scope">
							<el-image :src="scope.row.smallPic" :preview-src-list="scope.row.srcList"
								style="width:50px; height:50px;">
							</el-image>
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
						<el-upload class="upload-demo" multiple>
							<el-button size="small" type="primary">点击上传</el-button>
							<p style="margin-bottom: 0;line-height: 20px;">{{form.path}}</p>
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
			<el-descriptions  :column="2" border v-model="dataList" class="dialogDetail">
			   <el-descriptions-item :label="item.name" v-for="item in dataList">后台获取数据</el-descriptions-item>
			</el-descriptions>
			<div class="btnRight">
				<el-button size="small" @click="dialogDataDetail = false">关闭</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	const Options = ['level1', 'level2', 'level3', 'level4'];
	export default {
		data() {
			return {
				checkAll: false,
				checkedCities: [],
				cities: Options,
				isIndeterminate: true,
				satelliteData:[{
					id:1,
					label:'高分系列',
					children:[{
						id:1-1,
						label:'高分3号',
						children:[{
							id:1-1-1,
							label:'SL'
						},{
							id:1-1-2,
							label:'UFS'
						},{
							id:1-1-3,
							label:'FSI'
						}]
					}]
				},{
					id:2,
					label:'资源系列',
					children:[{
						id:2-1,
						label:'资源1号',
						children:[{
							id:2-1-1,
							label:'ZY1-1'
						},{
							id:2-1-2,
							label:'ZY1-2'
						},{
							id:2-1-3,
							label:'ZY1-3'
						}]
					}]
				}],
				defaultProps: {
				    children: 'children',
				    label: 'label'
				},
				
				timeValue1:'',
				timeValue2:'',
				dialogDataDetail:false,
				dataList:[
					{property:'SatelliteID',name:'卫星ID'},
					{property:'SensorID',name:'传感器ID'},
					{property:'ReceiveStationID',name:'接收站ID'},
					{property:'ReceiveTime',name:'接收时间'},
					{property:'ProduceTime',name:'生产时间'},
					{property:'OrbitID',name:'轨道ID'},
					{property:'POrbitID',name:'轨道圈号'},
					{property:'OrbitType',name:'轨道类型'},
					{property:'AttType',name:'姿态类型'},
					{property:'StripID',name:'条带ID'},
					{property:'ProduceType',name:'产品类型'},
					{property:'SceneID',name:'景序列号'},
					{property:'ProductID',name:'产品序列号'},
					{property:'ProductLevel',name:'产品级别'},
					{property:'ProductQuality',name:'产品质量'},
					{property:'ProductFormat',name:'产品格式'},
					{property:'Bands',name:'产品谱段'},
					{property:'BandsID',name:'产品谱段编号'},
					{property:'ScenePath',name:'景Path'},
					{property:'SceneRow',name:'景Row'},
				],
				notDownload: false,
				download: false,
				activeIndex2: '1',
				total: '12',
				downloadTotal: '1',
				form: {
					type: [],
					path: "E:/aaa2022vega/codeHeGongye"
				},
				tableData: [{
					smallPic: 'suoluetu1.png',
					srcList: ['suoluetu1.png'],
					satellite: 'GF',
					sensor: '传感器',
					GSD: '分辨率',
					acquisitionTime: '2022-1-20',
					cloudCover: '10'
				}, {
					smallPic: 'suoluetu1.png',
					srcList: ['suoluetu1.png'],
					satellite: 'GF',
					sensor: '传感器',
					GSD: '分辨率',
					acquisitionTime: '2022-1-20',
					cloudCover: '10'
				}, {
					smallPic: 'suoluetu1.png',
					srcList: ['suoluetu1.png'],
					satellite: 'GF',
					sensor: '传感器',
					GSD: '分辨率',
					acquisitionTime: '2022-1-20',
					cloudCover: '10'
				}, ],
				downloadTableData: [{
					smallPic: 'suoluetu1.png',
					srcList: ['suoluetu1.png'],
					satellite: 'GF',
					sensor: '传感器',
					GSD: '分辨率',
					downloadPeople: 'nasa',
					downloadTime: '2022-1-20'
				}]
			}
		},
		methods: {
			handleCheckAllChange(val) {
			    this.checkedCities = val ? Options : [];
			    this.isIndeterminate = false;
			},
			handleCheckedCitiesChange(value) {
			    let checkedCount = value.length;
			    this.checkAll = checkedCount === this.cities.length;
			    this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
			},
			
			showNotDownload() {
				this.notDownload = true
				if (this.download = true) {
					this.download = false
				}
			},
			showDownload() {
				this.download = true
				if (this.notDownload = true) {
					this.notDownload = false
				}
			},
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			},
			notDownloadDetail(){
				this.dialogDataDetail = true
			},
			notDownloadDelete(){
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
			downloadDetail(){
				this.dialogDataDetail = true
			},
			downloadDelete(){
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
	.huizhi{
		display: flex;
		.icons{
			width:40px;
			height: 40px;
			margin: 0 5px;
			border-radius: 50%;
			background:linear-gradient(315deg,#6772FF 0,#00F9E5 100%);
			text-align: center;line-height: 40px;
			cursor: pointer;
			i{
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
	.timeSearch{
		padding: 10px;
		color:#fff;
		p{
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

	.tableMain {
		margin-top: 10px;
	}
</style>
