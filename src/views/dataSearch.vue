<!-- 数据检索 -->
<template>
	<div>
		<div class="dataSearchMenu">
			<el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
				background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
				<el-menu-item index="1">处理中心</el-menu-item>
				<el-submenu index="2">
					<template slot="title">我的工作台</template>
					<el-menu-item index="2-1">选项1</el-menu-item>
					<el-menu-item index="2-2">选项2</el-menu-item>
					<el-menu-item index="2-3">选项3</el-menu-item>
					<el-submenu index="2-4">
						<template slot="title">选项4</template>
						<el-menu-item index="2-4-1">选项1</el-menu-item>
			  	<el-menu-item index="2-4-2">选项2</el-menu-item>
						<el-menu-item index="2-4-3">选项3</el-menu-item>
					</el-submenu>
				</el-submenu>
				<el-menu-item index="3" disabled>消息中心</el-menu-item>
				<el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
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
			   <el-descriptions-item :label="item.name" v-for="(item,i) in dataList">后台获取数据</el-descriptions-item>
			</el-descriptions>
			<div class="btnRight">
				<el-button size="small" @click="dialogDataDetail = false">关闭</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
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
