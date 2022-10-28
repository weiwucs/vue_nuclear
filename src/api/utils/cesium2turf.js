import * as turf from '@turf/turf';
import entity from "@/api/utils/entity";

const earth = HXWEarth;

export default {

    cartesianToPoint(cartesian3) {
        return turf.point(entity.cartesianToLonLat(cartesian3));
    },

    polylineToLine(polyline) {
        let polylinePositions = polyline.positions.getValue();
        let positions = [];
        polylinePositions.forEach(function (position) {
            positions.push(entity.cartesianToLonLat(position));
        })
        return turf.lineString(positions, {name: 'line'});
    },

    polygonToTurfPolygon(polygon) {
        let hierarchy = polygon.hierarchy.getValue();
        let polygonPositions = hierarchy.positions;
        let positions = [];
        polygonPositions.forEach(function (position) {
            positions.push(entity.cartesianToLonLat(position));
        })
        positions.push(entity.cartesianToLonLat(polygonPositions[0]));
        return turf.polygon([positions], {name: 'polygon'});
    },

    rectangleToTurfPolygon(rectangle) {
        let positions = [[earth.Math.toDegrees(rectangle.west), earth.Math.toDegrees(rectangle.north)],
            [earth.Math.toDegrees(rectangle.east), earth.Math.toDegrees(rectangle.north)],
            [earth.Math.toDegrees(rectangle.east), earth.Math.toDegrees(rectangle.south)],
            [earth.Math.toDegrees(rectangle.west), earth.Math.toDegrees(rectangle.south)],
            [earth.Math.toDegrees(rectangle.west), earth.Math.toDegrees(rectangle.north)]];
        return turf.polygon([positions], {name: 'rectangle'});
    },

    booleanContains(cartesian3, rectangle) {
        let point = this.cartesianToPoint(cartesian3);
        let polygon = this.rectangleToTurfPolygon(rectangle);
        return turf.booleanPointInPolygon(point, polygon);
    },

    polylineIntersect(rectangle, polyline){
        let feature1 = this.rectangleToTurfPolygon(rectangle);
        let feature2 = this.polylineToLine(polyline);
        return this.booleanIntersects(feature1, feature2);
    },

    polygonIntersect(rectangle, polygon) {
        let feature1 = this.rectangleToTurfPolygon(rectangle);
        let feature2 = this.polygonToTurfPolygon(polygon);
        return this.booleanIntersects(feature1, feature2);
    },

    booleanIntersects(feature1, feature2) {
        return turf.booleanIntersects(feature1, feature2);
    }

}