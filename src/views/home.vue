<!-- 首页 -->
<template>
	<div>
		<div class="homecon homeLeft">
			<div class="homeLeftEchart homeLeftEchart1">
				<div class="xiaoxian"></div>
				<div class="xiaoxian zuoshang"></div>
				<div class="xiaoxian zuoxia"></div>
				<div class="xiaoxian youxia"></div>
				<div class="topTitle">
					<p>年度卫星影像总数</p>
				</div>
				<div class='echarts1' id="homeEcharts1"></div>
			</div>
			<div class="homeLeftEchart homeLeftEchart2">
				<div class="xiaoxian zuoxia"></div>
				<div class="xiaoxian youxia"></div>
				<div class="topTitle">
					<p>年度卫星影像数据量</p>
				</div>
				<div class='echarts1' id="homeEcharts2"></div>
			</div>
		</div>
		<div class="homecon homeRight">
			<div class="homeLeftEchart homeRightEchart1">
				<div class="xiaoxian"></div>
				<div class="xiaoxian zuoshang"></div>
				<div class="xiaoxian zuoxia"></div>
				<div class="xiaoxian youxia"></div>
				<div class="topTitle">
					<p>各类卫星影像总数</p>
				</div>
				<div class='echarts1' id="homeEcharts3"></div>
			</div>
			<div class="homeLeftEchart homeRightEchart2">
				<div class="xiaoxian zuoxia"></div>
				<div class="xiaoxian youxia"></div>
				<div class="topTitle">
					<p>各类卫星影像数据量</p>
				</div>
				<div class='echarts1' id="homeEcharts4"></div>
			</div>
		</div>
		<div class="homebottom">
			<div class="tongji">
				<p>111景</p>
				<p>今日新增景数</p>
				<img src="../assets/img/line.png" alt="" class="line">
				<img src="../assets/img/line.png" alt="" class="line2">
			</div>
			<div class="tongji">
				<p>451次</p>
				<p>今日下载量</p>
				<img src="../assets/img/line.png" alt="" class="line">
				<img src="../assets/img/line.png" alt="" class="line2">
			</div>
			<div class="tongji">
				<p>100106景</p>
				<p>景数统计</p>
				<img src="../assets/img/line.png" alt="" class="line">
				<img src="../assets/img/line.png" alt="" class="line2">
			</div>
			<div class="tongji">
				<p>9.85T</p>
				<p>数据量统计</p>
				<img src="../assets/img/line.png" alt="" class="line">
				<img src="../assets/img/line.png" alt="" class="line2">
			</div>
		</div>
	</div>
</template>

<script>
import loader from "../api/utils/loader"
	export default {
		data() {
			return {

			}
		},
		mounted() {
			this.drawLine()
		},
		methods: {
			drawLine() {
				let _ = this
				let satellite = []
				let radar_satellite = []
				let optical_satellite = []
				let pieTotal = {}
				let pieSize = {}
				let satelliteTime = []
				let satelliteNum = []
				let satelliteSize = []
				let classNum = []
				let classSize = []
				loader.load({class: 'radar_satellite'}, function (data) {
					radar_satellite = data
					loader.load({class: 'optical_satellite'}, function (data) {
						optical_satellite = data
						satellite = radar_satellite.concat(optical_satellite)
						satellite.forEach((item)=>{
							if(pieTotal[item.satellite]){
								pieTotal[item.satellite].num++
								pieTotal[item.satellite].dataSize += item.dataSize
							}else if(pieTotal[item.satelliteID]){
								pieTotal[item.satelliteID].num++
								pieTotal[item.satelliteID].dataSize += item.dataSize
							}else{
								if(item.satellite){
									pieTotal[item.satellite] = {}
									pieTotal[item.satellite].num = 1
									pieTotal[item.satellite].dataSize = item.dataSize
								}else if(item.satelliteID){
									pieTotal[item.satelliteID] = {}
									pieTotal[item.satelliteID].num = 1
									pieTotal[item.satelliteID].dataSize = item.dataSize
								}
							}
							if(item.centerTime){
								if(pieSize[item.centerTime.split('-')[0]]){
									pieSize[item.centerTime.split('-')[0]].num++
									pieSize[item.centerTime.split('-')[0]].dataSize += item.dataSize
								}else{
									pieSize[item.centerTime.split('-')[0]] = {}
									pieSize[item.centerTime.split('-')[0]].num = 1
									pieSize[item.centerTime.split('-')[0]].dataSize = item.dataSize
								}
							}
							

						})

						for(let key in pieSize){
							satelliteTime.push(key)
							satelliteNum.push(pieSize[key].num)
							satelliteSize.push(pieSize[key].dataSize)
						}
						for(let key in pieTotal){
							classNum.push({
								name: key,
								value: pieTotal[key].num
							})
							classSize.push({
								name: key,
								value: pieTotal[key].dataSize
							})
						}


						_.$nextTick(() => {
							let myChart1 = _.$echarts.init(document.getElementById('homeEcharts1'));
							myChart1.setOption({
								// title: {
								// 	text: '年度卫星影像总数',
								// 	textStyle:{
								// 		color:'#ffffff',
								// 	}
								// },
								tooltip: {
									trigger: 'axis',
									axisPointer: {
										type: 'cross',
										crossStyle: {
											color: '#999'
										}
									}
								},
								toolbox: {
									feature: {
										saveAsImage: {
											title: '保存图片',
											backgroundColor: '#0f2247',
											pixelRatio: 2,
										}
									}
								},
								legend: {
									orient: 'horizontal',
									x: 'center',
									y: '0',
									textStyle: {
										color: '#ffffff'
									},
								},
								xAxis: {
									type: 'category',
									data: satelliteTime,
									axisLabel: {
										show: true,
										interval: 0,
										rotate: 40,
										textStyle: {
											color: '#ffffff'
										}
									},
								},
								yAxis: [{
									type: 'value',
									axisLabel: {
										formatter: '{value}'
									},
									axisLabel: {
										show: true,
										textStyle: {
											color: '#ffffff'
										}
									},
								}],
								series: [{
									name: '数据景数(景)',
									tooltip: {
										valueFormatter: function(value) {
											return value;
										}
									},
									data: satelliteNum,
									type: 'bar',
									// barWidth: '50',
									itemStyle: {
										normal: {
											color: new _.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
												offset: 0,
												color: 'rgba(0, 226, 255, 0.8)'
											}, {
												offset: 1,
												color: 'rgba(0, 99, 191, 0.3)'
											}])
										},
									},
									label: {
										show: true,
										position: 'top',
										textStyle: {
											color: "#fff",
											fontSize: 14
										}
									}
								}]
							});
							let myChart2 = _.$echarts.init(document.getElementById('homeEcharts2'));
							myChart2.setOption({
								// title: {
								// 	text: '年度卫星影像数据量',
								// 	textStyle:{
								// 		color:'#ffffff'
								// 	}
								// },
								tooltip: {},
								toolbox: {
									feature: {
										saveAsImage: {
											title: '保存图片',
											backgroundColor: '#0f2247',
											pixelRatio: 2,
										}
									}
								},
								legend: {
									orient: 'horizontal',
									x: 'center',
									y: '0',
									textStyle: {
										color: '#ffffff'
									},
								},
								xAxis: {
									type: 'category',
									data: satelliteTime,
									axisLabel: {
										interval: 0,
										rotate: 40,
										show: true,
										textStyle: {
											color: '#ffffff'
										}
									},
									axisLine: {
										show: true, //是否显示刻度线
										lineStyle: {
											color: '#fff;' //刻度线颜色
										}
									}
								},
								yAxis: {
									type: 'value',
									axisLabel: {
										show: true,
										textStyle: {
											color: '#ffffff'
										}
									},
								},
								series: [{
									name: '数据量(G)',
									data: satelliteSize,
									type: 'bar',
									itemStyle: {
										normal: {
											color: new _.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
												offset: 0,
												color: 'rgba(0, 226, 255, 0.8)'
											}, {
												offset: 1,
												color: 'rgba(0, 99, 191, 0.3)'
											}])
										},
									},
									label: {
										show: true,
										position: 'top',
										textStyle: {
											color: "#fff",
											fontSize: 14
										}
									}
								}]
							});
							let myChart3 = _.$echarts.init(document.getElementById('homeEcharts3'));
							myChart3.setOption({
								// title: {
								// 	text:'性别分布情况',
								//     x: 'left',
								// 	textStyle: {
								// 		color: '#ffffff'
								// 	}
								//   },
								tooltip: {
									trigger: 'item',
								},
								toolbox: {
									feature: {
										saveAsImage: {
											title: '保存图片',
											backgroundColor: '#0f2247',
										}
									}
								},
								legend: {
								orient: 'horizontal',
									x: 'center',
									y: 'bottom',
									textStyle: {
										color: '#ffffff'
									}
								},
								series: [{
									name: '',
									type: 'pie',
									radius: '50%',
									center: ['50%', '40%'], //设置饼图的上下左右位置
									label: {
										normal: {
											show: true,
											formatter: '{b}: {c}景({d}%)', //自定义显示格式（b:name,c:value,d:%）
											textStyle: {
												color: "#fff",
												fontSize: 12
											}
										},
									},
									data: classNum,
								emphasis: {
										itemStyle: {
											shadowBlur: 10,
											shadowOffsetX: 0,
											shadowColor: 'rgba(0, 0, 0, 0.5)'
										}
									}
								}],
							});
							let myChart4 = _.$echarts.init(document.getElementById('homeEcharts4'));
							myChart4.setOption({
								tooltip: {
									trigger: 'item',
								},
								toolbox: {
									feature: {
										saveAsImage: {
											title: '保存图片',
											backgroundColor: '#0f2247',
										}
									}
								},
								legend: {
									orient: 'horizontal',
									x: 'center',
									y: 'bottom',
									textStyle: {
										color: '#ffffff'
									}
								},
								series: [{
									name: '',
									type: 'pie',
									radius: '50%',
									center: ['50%', '40%'], //设置饼图的上下左右位置
									label: {
										normal: {
											show: true,
											formatter: '{b}: {c}G({d}%)', //自定义显示格式（b:name,c:value,d:%）
											textStyle: {
												color: "#fff",
												fontSize: 12
											}
										},
									},
									data: classSize,
									emphasis: {
										itemStyle: {
											shadowBlur: 10,
											shadowOffsetX: 0,
											shadowColor: 'rgba(0, 0, 0, 0.5)'
										}
									}
								}],
							})
						})


					})
				})
				
				
				
				
			}

		}
	}
</script>

<style scoped lang="scss">
	.echarts1 {
		// border:1px solid red;
		width: 94%;
		height: 95%;
		padding-top: 50px;
		margin-left: 3%;

	}

	.homecon {
		position: absolute;
		z-index: 5555;
		top: 60px;
		width: 20vw;
		height: calc(100vh - 100px);
	}

	.homeLeft {
		left: 0;
	}

	.homeLeftEchart {
		background-color: rgba(23, 49, 71, 0.5);
		width: 100%;
		height: 50%;
		position: relative;
		border-right: 2px solid #00a4ff;
		border-left: 2px solid #00a4ff;

		.xiaoxian {
			width: 20px;
			height: 2px;
			background-color: #00a4ff;
		}

		.zuoshang {
			position: absolute;
			top: 0px;
			right: 0px;
		}

		.zuoxia {
			position: absolute;
			bottom: 0px;
			left: 0px;
		}

		.youxia {
			position: absolute;
			bottom: 0px;
			right: 0px;
		}

		.topTitle {
			width: 200px;
			height: 40px;
			background-color: #00a4ff;
			background: -moz-linear-gradient(top, #00a4ff, rgba(23, 49, 71, 0.1));
			background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#00a4ff), to(rgba(23, 49, 71, 0.1)));
			border-bottom-left-radius: 30px;
			border-bottom-right-radius: 30px;
			position: absolute;
			top: 0px;
			left: 50%;
			margin-left: -100px;

			p {
				text-align: center;
				color: #fff;
				font-weight: bold;
				line-height: 35px;
			}
		}
	}

	.homeRight {
		right: 0;
	}


	.homebottom {
		position: absolute;
		bottom: 40px;
		width: 60vw;
		height: 10vh;
		left: 20vw;
		display: flex;

		.tongji {
			width: 25%;
			padding-top: 20px;
			text-align: center;
			background-color: rgba(23, 49, 71, 0.5);
			position: relative;

			// border:1px solid red;
			p {
				color: #fff;
				margin: 0;
			}

			p:first-child {
				color: yellow;
				font-size: 26px;
				font-weight: bold;
			}

			img.line {
				width: 100%;
				position: absolute;
				left: 0;
				height: 2px;
				top: 0;
			}

			img.line2 {
				width: 100%;
				position: absolute;
				left: 0;
				bottom: 0;
				height: 2px;
			}
		}
	}
</style>
