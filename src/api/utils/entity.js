import store from '../../store';

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

    showRectangle(layerId, objectId, positions){
        const viewer = store.state['viewer'];
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
        return viewer.entities.add(bData);
    },

    draw(geometryType, callback){
        const viewer = store.state['viewer'];
        const tracker = new earth.HXGlobeTracker(viewer);
        if(geometryType === 'Rectangle'){
            tracker.trackRectangle(callback);
        }
    },

}

export default entity;
