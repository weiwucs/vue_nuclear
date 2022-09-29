import common from "./common";

const earth = HXWEarth

const drawer = {

    findEntityByObjId(viewer, objId){
        for(let entity of viewer.entities.values){
            if(entity.hasOwnProperty('objectId') && common.defined(entity.objectId)){
                if(entity.objectId === objId){
                    return entity;
                }
            }
        }
    },

    lonlatToCartesian(longitude, latitude){
        return earth.Cartesian3.fromDegrees(parseFloat(longitude), parseFloat(latitude), 0);
    },

    rectangle(viewer, objectId, imageUrl, positions){
        let material = new earth.ImageMaterialProperty({ image: imageUrl })
        let rect = earth.Rectangle.fromDegrees(positions[0], positions[1], positions[2], positions[3])
        let bData = {
            objectId: objectId,
            shapeType: "Rectangle",
            rectangle: {
                show: true,
                height: 0,
                coordinates: rect,
                material: material,
                fill: true,
                outline: true,
                outlineColor: earth.Color.RED,
                outlineWidth: 30.0,
            },
        };
        let entity = viewer.entities.add(bData)
        return entity;
    }

}
export default drawer;
