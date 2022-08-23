import HXWEarth from "../HXWEarth/HXWEarth.js";

var ProbingPrimitive = function (option) {
    if(!option.viewer){
        throw new DeveloperError("options viewer is required.");
    }

    this.viewer = option.viewer;
    this.length = option.length || 400000.0;
    this.center = option.center || HXWEarth.Cartesian3.fromDegrees(116.39, 39.9);
    this.color = option.color || new HXWEarth.Color(1.0, 1.0, 1.0, 0.8);
    this.repeat = option.repeat || 30.0;
    this.offset = option.offset || 0.0;
    this.thickness = option.thickness || 0.3;
    this.bottom = option.bottom || 1000;
    this.top = option.top || 0.0;
    this.radar = undefined;

    this.build()
}

ProbingPrimitive.prototype.build = function () {
    var cylinderGeometry = new HXWEarth.CylinderGeometry({
        length: this.length,
        topRadius: this.top,
        bottomRadius: this.bottom,
        vertexFormat: HXWEarth.MaterialAppearance.MaterialSupport.TEXTURED.vertexFormat
    }), cone = new HXWEarth.GeometryInstance({
        geometry: cylinderGeometry,
        modelMatrix: this.getModelMatrix()
    }), appearance = new HXWEarth.MaterialAppearance({
        material: this.getMaterial(),
        faceForward: false,
        closed: true
    }), _this = this;
    this.radar = this.viewer.scene.primitives.add(
        new HXWEarth.Primitive({
            geometryInstances: [cone],
            appearance: appearance
        })
    )
    this.viewer.scene.preUpdate.addEventListener(function () {
        var offset = _this.radar.appearance.material.uniforms.offset;
        offset -= 0.001;
        if(offset > 1.0){
            offset = 0.0;
        }
        _this.radar.appearance.material.uniforms.offset = offset;
    })
}

ProbingPrimitive.prototype.getModelMatrix = function () {
    return HXWEarth.Matrix4.multiplyByTranslation(
        HXWEarth.Transforms.eastNorthUpToFixedFrame(this.center),
        new HXWEarth.Cartesian3(0.0, 0.0, this.length * 0.5),
        new HXWEarth.Matrix4()
    );
}

ProbingPrimitive.prototype.getMaterial = function () {
    var materialSource = `
        uniform vec4 color; 
        uniform float repeat; 
        uniform float offset; 
        uniform float thickness;

        czm_material czm_getMaterial(czm_materialInput materialInput){
            czm_material material = czm_getDefaultMaterial(materialInput);
            float sp = 1.0/repeat;
            vec2 st = materialInput.st;
            float dis = distance(st, vec2(0.5));
            float m = mod(dis + offset, sp);
            float a = step(sp*(1.0-thickness), m); 

            material.diffuse = color.rgb;
            material.alpha = a * color.a;
            return material;
        }`;
    return new HXWEarth.Material({
        fabric: {
            type: 'radarPrimitive',
            uniforms: {
                color: this.color,
                repeat: this.repeat,
                offset: this.offset,
                thickness: this.thickness
            },
            source: materialSource
        },
        translucent: false
    });
}

ProbingPrimitive.prototype.remove = function () {
    if(this.radar){
        this.viewer.scene.primitives.remove(this.radar);
    }
}
export default ProbingPrimitive;