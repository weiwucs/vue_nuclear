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
				this.$nextTick(() => {
					let myChart1 = this.$echarts.init(document.getElementById('homeEcharts1'));
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
							data: ['2017', '2018', '2019', '2020', '2021', '2022'],
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
							data: [12900, 15870, 12850, 14820, 21800, 17750],
							type: 'bar',
							// barWidth: '50',
							itemStyle: {
								normal: {
									color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
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
					let myChart2 = this.$echarts.init(document.getElementById('homeEcharts2'));
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
							data: ['2017', '2018', '2019', '2020', '2021', '2022'],
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
							data: [5000, 4100, 3000, 2200, 1500, 2800, 6050, 3026, 5099, 7895],
							type: 'bar',
							itemStyle: {
								normal: {
									color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
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
					let myChart3 = this.$echarts.init(document.getElementById('homeEcharts3'));
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
							data: [{
									value: 1048,
									name: '高分1号'
								},
								{
									value: 735,
									name: '高分2号'
								},
								{
									value: 1735,
									name: '高分3号'
								},
								{
									value: 2735,
									name: '高分4号'
								},
								{
									value: 1735,
									name: '高分5号'
								},
								{
									value: 2735,
									name: '高分6号'
								},
								{
									value: 1735,
									name: '高分7号'
								},
								{
									value: 1200,
									name: '资源1号'
								},
								{
									value: 1300,
									name: '资源2号'
								},
								{
									value: 1300,
									name: '资源3号'
								},
							],
						 emphasis: {
								itemStyle: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
								}
							}
						}],
					});
					let myChart4 = this.$echarts.init(document.getElementById('homeEcharts4'));
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
							data: [{
									value: 128,
									name: '高分1号'
								},
								{
									value: 735,
									name: '高分2号'
								},
								{
									value: 135,
									name: '高分3号'
								},
								{
									value: 225,
									name: '高分4号'
								},
								{
									value: 335,
									name: '高分5号'
								},
								{
									value: 425,
									name: '高分6号'
								},
								{
									value: 635,
									name: '高分7号'
								},
								{
									value: 180,
									name: '资源1号'
								},
								{
									value: 130,
									name: '资源2号'
								},
								{
									value: 170,
									name: '资源3号'
								},
							],
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
