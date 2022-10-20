import common from "@/api/utils/common";

const earth = HXWEarth;

const entity = {

    lonLatToCartesian(longitude, latitude){
        return earth.Cartesian3.fromDegrees(parseFloat(longitude), parseFloat(latitude), 0);
    },

    cartesianToLonLat(cartesian){
        let cartographic = earth.Cartographic.fromCartesian(cartesian);
        let longitude = earth.Math.toDegrees(cartographic.longitude);
        let latitude = earth.Math.toDegrees(cartographic.latitude);
        return [longitude, latitude];
    },

    checkIntersection(rectA, rectB){
        //0,1,2,3 -- left,bottom,right,top -- west,south,east,north
        let nonIntersect = (rectB[2] < rectA[0]) || (rectB[0] > rectA[2]) ||
            (rectB[3] < rectA[1]) || (rectB[1] > rectA[3]);
        return !nonIntersect;
    },

    intersection(rectA, rectB){
        return earth.Rectangle.simpleIntersection(rectA, rectB);
    },

    rectContains(rect, position){
        return earth.Rectangle.contains(rect, new earth.Cartographic.fromCartesian(position));
    },

    showRectangle(layerId, objectId, positions){
        let material = earth.Color.fromCssColorString("#3388ff").withAlpha(0.5)
        let rect = earth.Rectangle.fromCartesianArray(positions)
        let bData = {
            layerId: layerId,
            objectId: objectId,
            shapeType: "Rectangle",
            rectangle: {
                coordinates: rect,
                material: material,
            },
        };
        return window.viewer.entities.add(bData);
    },

    showPolygon(layerId, objectId, positions){
        let material = earth.Color.fromCssColorString("#3388ff").withAlpha(0.5)
        let bData = {
            layerId: layerId,
            objectId: objectId,
            shapeType: "Polygon",
            polygon: new earth.PolygonGraphics({
                hierarchy: positions,
                asynchronous: false,
                // extrudedHeight: 0,
                // height: 3000,
                material: material,
            }),
        };
        return window.viewer.entities.add(bData);
    },

    computeCirclePolygon(positions){
        const tracker = new earth.HXGlobeTracker(window.viewer);
        return tracker.circleDrawer._computeCirclePolygon(positions);
    },

    showCircle(layerId, objectId, positions){
        const tracker = new earth.HXGlobeTracker(window.viewer);
        let material = earth.Color.fromCssColorString("#3388ff").withAlpha(0.5)
        let radiusMaterial = new earth.PolylineDashMaterialProperty({
            dashLength: 16,
            color: earth.Color.fromCssColorString("#00f").withAlpha(0.7),
        })
        let pnts = tracker.circleDrawer._computeCirclePolygon(positions)
        let dis = tracker.circleDrawer._computeCircleRadius3D(positions)
        if (!pnts) {
            return
        }
        dis = (dis / 1000).toFixed(3)
        let text = dis + "km"
        let bData = {
            layerId: layerId,
            objectId: objectId,
            shapeType: "Circle",
            position: positions[0],
            label: {
                text: text,
                font: "16px Helvetica",
                fillColor: earth.Color.SKYBLUE,
                outlineColor: earth.Color.BLACK,
                outlineWidth: 1,
                style: earth.LabelStyle.FILL_AND_OUTLINE,
                eyeOffset: new earth.ConstantProperty(new earth.Cartesian3(0, 0, -9000)),
                pixelOffset: new earth.Cartesian2(16, 16),
            },
            billboard: {
                image: earth.DrawToolImageBase64.dragCircleCcenter,
                eyeOffset: new earth.ConstantProperty(new earth.Cartesian3(0, 0, -500)),
                heightReference: earth.HeightReference.CLAMP_TO_GROUND,
            },
            polyline: {
                positions: positions,
                clampToGround: true,
                width: 2,
                material: radiusMaterial,
            },
            polygon: new earth.PolygonGraphics({
                hierarchy: pnts,
                asynchronous: false,
                material: material,
            }),
        }
        return window.viewer.entities.add(bData);
    },

    showPolyline(layerId, objectId, positions){
        let material = earth.Color.fromCssColorString("#3388ff").withAlpha(0.5)
        let bData = {
            layerId: layerId,
            objectId: objectId,
            shapeType: "Polyline",
            polyline: {
                positions: positions,
                clampToGround: true,
                width: 4,
                material: material,
            },
        };
        return window.viewer.entities.add(bData);
    },

    showPoint(layerId, objectId, position){
        let bData = {
            layerId: layerId,
            objectId: objectId,
            shapeType: "Point",
            position: position,
            billboard: {
                image: earth.DrawToolImageBase64.dragIconLight,
                eyeOffset: new earth.ConstantProperty(new earth.Cartesian3(0, 0, -500)),
                heightReference: earth.HeightReference.CLAMP_TO_GROUND,
            },
        };
        return window.viewer.entities.add(bData);
    },

    draw(geometryType, callback){
        const tracker = new earth.HXGlobeTracker(window.viewer);
        if(geometryType === 'Rectangle'){
            tracker.trackRectangle(callback);
        } else if(geometryType === 'Polygon'){
            tracker.trackPolygon(callback);
        } else if(geometryType === 'Circle'){
            tracker.trackCircle(callback);
        } else if(geometryType === 'Polyline'){
            tracker.trackPolyline(callback);
        } else if(geometryType === 'Point'){
            tracker.trackPoint(callback);
        }
    },

    computedPosition(L2W, x, y, z){
        return earth.Matrix4.multiplyByPoint(L2W, earth.Cartesian3.fromElements(x, y, z), new earth.Cartesian3());
    },

    createRectByCenter(center, width, height){
        //x -> east; y -> up, z -> south
        console.log(center, width, height);
        let L2W = earth.Transforms.localFrameToFixedFrameGenerator('east', 'up')(center);
        let LT = this.computedPosition(L2W, -width/2, 0, -height/2);
        let RB = this.computedPosition(L2W, width/2, 0, height/2);
        console.log(LT, RB);
        let leftTop = this.cartesianToLonLat(LT);
        let rightBottom = this.cartesianToLonLat(RB);
        return new earth.Rectangle(leftTop[0], rightBottom[1], rightBottom[0], leftTop[1]);
    }

}

export default entity;
