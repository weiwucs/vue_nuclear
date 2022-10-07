import common from "./common";
import store from "../../store";

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

    clearEntityByLayerId(layerId){
        const viewer = store.state['viewer'];
        let entities = viewer.entities.values
        if (entities === null || entities.length < 1) {
            return
        }
        for (let i = 0; i < entities.length; i++) {
            let entity = entities[i]
            if (entity.layerId === layerId) {
                viewer.entities.remove(entity)
                i--
            }
        }
    },

    clearEntityById(layerId, objId) {
        const viewer = store.state['viewer'];
        let entities = viewer.entities.values
        if (entities === null || entities.length < 1) {
            return
        }
        for (let i = 0; i < entities.length; i++) {
            let entity = entities[i]
            if (entity.layerId === layerId && entity.objectId === objId) {
                viewer.entities.remove(entity)
                i--
            }
        }
    },

    rectangle(viewer, objectId, imageUrl, positions){
        let material = new earth.ImageMaterialProperty({ image: imageUrl })
        let rect = earth.Rectangle.fromDegrees(positions[0], positions[1], positions[2], positions[3])
        let bData = {
            layerId: 'rectangle',
            objectId: objectId,
            shapeType: "Rectangle",
            rectangle: {
                show: true,
                height: 0,
                coordinates: rect,
                material: material,
                fill: true,
                outline: true,
                outlineColor: earth.Color.BLUE,
                outlineWidth: 30.0,
            },
        };
        let entity = viewer.entities.add(bData)
        return entity;
    }

}
export default drawer;
