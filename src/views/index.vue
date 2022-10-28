<template>
  <div id="container" class="box">
    <div id="cesiumContainer"></div>
    <topMenu></topMenu>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <rightMenu @flyToHome="flyToHome" @zoomIn="zoomIn" @zoomOut="zoomOut" @convertDim="convertDim"></rightMenu>
    <div class="footer">
      <div class="footerLeft">
        <div class="scale-container">
          <div class="scale-label">{{ distanceLabel || "暂无数据" }}</div>
          <div v-if="barWidth" class="scale-bar" :style="{ width: barWidth + 'px' }"></div>
        </div>
      </div>
      <div class="footerRight">
        <div>经度：{{ longitude }}</div>
        <div>纬度：{{ latitude }}</div>
        <div>高度：{{ height }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import rightMenu from '../components/rightMenu.vue'
import topMenu from '../components/topMenu.vue'

const Cesium = HXWEarth;

export default {
  components: {rightMenu, topMenu},
  data() {
    return {
      longitude: '',
      latitude: '',
      height: '',
      eyeHeight: '',
      distanceLabel: undefined,
      barWidth: undefined,
      currentScreenSpaceEvent: 0,
      eventType: {
        NONE: 0,
        DRAW_MEASURE: 1,
        DELETE: 2,
        DRAG_MOVEMENT: 3,
        POLYLINE_PATH_DRAW: 4,
        POLYLINE_PATH_EDIT: 5,
        BIM_3DTILES_PICK: 6
      },
    }
  },
  created() {
  },
  mounted() {
    this.initialize()
  },
  methods: {
    initialize() {
      const viewer = new Cesium.HexiViewer('cesiumContainer', {
        shouldAnimate: true,
        timeline: true,
      })
      window.viewer = viewer

      viewer.scene.debugShowFramesPerSecond = false
      viewer.scene.globe.depthTestAgainstTerrain = false

      viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(114.295314, 13.03, 20000000.0),
      })
      viewer.timeline.container.style.display = "none"

      this.showLongLatHeight()
      this.navigation()
    },
    zoomIn() {
      const viewer = window.viewer
      let cameraPos = viewer.camera.position
      let ellipsoid = viewer.scene.globe.ellipsoid
      let cartographic = ellipsoid.cartesianToCartographic(cameraPos)
      let centerLon = parseFloat(Cesium.Math.toDegrees(cartographic.longitude).toFixed(8))
      let centerLat = parseFloat(Cesium.Math.toDegrees(cartographic.latitude).toFixed(8))
      let height = cartographic.height
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(centerLon, centerLat, height / 1.8),
        duration: 1.0
      })
    },
    zoomOut() {
      const viewer = window.viewer
      let cameraPos = viewer.camera.position
      let ellipsoid = viewer.scene.globe.ellipsoid
      let cartographic = ellipsoid.cartesianToCartographic(cameraPos)
      let centerLon = parseFloat(Cesium.Math.toDegrees(cartographic.longitude).toFixed(8))
      let centerLat = parseFloat(Cesium.Math.toDegrees(cartographic.latitude).toFixed(8))
      let height = cartographic.height
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(centerLon, centerLat, height * 1.8),
        duration: 1.0
      })
    },
    convertDim(flag) {
      const viewer = window.viewer
      if (flag) {
        viewer.scene.morphTo2D(0)
      } else {
        viewer.scene.morphTo3D(0)
      }
    },
    flyToHome() {
      const viewer = window.viewer
      viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(114.295314, 13.03, 20000000.0),
      })
    },
    showLongLatHeight() {
      const viewer = window.viewer
      let _this = this
      let ellipsoid = viewer.scene.globe.ellipsoid
      let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
      handler.setInputAction(function (movement) {
        let position = movement.endPosition //screen position
        if (!Cesium.defined(position)) {
          return
        }
        let cartesian = viewer.scene.pickPosition(position)
        if (!Cesium.defined(cartesian)) {
          return
        }
        let cartographic = Cesium.Cartographic.fromCartesian(cartesian)
        let longitude = Cesium.Math.toDegrees(cartographic.longitude)   //radian convert to degrees
        let latitude = Cesium.Math.toDegrees(cartographic.latitude)
        let height = viewer.scene.globe.getHeight(cartographic)
        let eyeheight = Math.ceil(viewer.camera.positionCartographic.height) //camera height
        _this.longitude = longitude.toFixed(6)
        _this.latitude = latitude.toFixed(6)
        _this.height = height.toFixed(6)
        _this.eyeHeight = eyeheight
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
    },
    navigation() {
      const viewer = window.viewer
      let distances = [
        1,
        2,
        3,
        5,
        10,
        20,
        30,
        50,
        100,
        200,
        300,
        500,
        1000,
        2000,
        3000,
        5000,
        10000,
        20000,
        30000,
        50000,
        100000,
        200000,
        300000,
        500000,
        1000000,
        2000000,
        3000000,
        5000000,
        10000000,
        20000000,
        30000000,
        50000000
      ]
      viewer.scene.postRender.addEventListener(() => {
        // Find the distance between two pixels at the bottom center of the screen.
        let scene = viewer.scene
        let width = scene.canvas.clientWidth
        let height = scene.canvas.clientHeight
        let left = scene.camera.getPickRay(new Cesium.Cartesian2((width / 2) | 0, height - 1))
        let right = scene.camera.getPickRay(new Cesium.Cartesian2((1 + width / 2) | 0, height - 1))
        let globe = scene.globe
        let leftPosition = globe.pick(left, scene)
        let rightPosition = globe.pick(right, scene)
        if (!Cesium.defined(leftPosition) || !Cesium.defined(rightPosition)) {
          this.barWidth = undefined
          this.distanceLabel = undefined
          return
        }
        let geodesic = new Cesium.EllipsoidGeodesic()
        let leftCartographic = globe.ellipsoid.cartesianToCartographic(leftPosition)
        let rightCartographic = globe.ellipsoid.cartesianToCartographic(rightPosition)
        geodesic.setEndPoints(leftCartographic, rightCartographic)
        let pixelDistance = geodesic.surfaceDistance

        // Find the first distance that makes the scale bar less than 100 pixels.
        let maxBarWidth = 100
        let distance
        for (let i = distances.length - 1; !Cesium.defined(distance) && i >= 0; --i) {
          if (distances[i] / pixelDistance < maxBarWidth) {
            distance = distances[i]
          }
        }
        if (Cesium.defined(distance)) {
          let label = distance >= 1000 ? (distance / 1000).toString() + "km" : distance.toString() + "m"
          this.barWidth = (distance / pixelDistance) | 0
          this.distanceLabel = label
        } else {
          this.barWidth = undefined
          this.distanceLabel = undefined
        }
      })
    },
  }
}
</script>
<style lang="scss" scoped>
#cesiumContainer {
  width: 100vw;
  height: 100vh;
  margin: 0px;
  padding: 0px;
  overflow: hidden;
}

.footer {
  height: 40px;
  width: 100vw;
  background-color: rgba($color: #000, $alpha: 0.5);
  position: absolute;
  bottom: 0;
  left: 0;
  color: #fff;

  .scale-label {
    position: absolute;
    top: 10px;
    left: 20px;
  }

  .footerRight {
    display: flex;
    justify-content: flex-end; //对下面盒子模型按各种规则排列展示
    position: absolute;
    bottom: 8px;
    right: 0px;

    div {
      margin-right: 20px;
    }
  }
}
</style>

