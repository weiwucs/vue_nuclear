define(["./when-229515d6","./PrimitivePipeline-fc641e41","./createTaskProcessorWorker","./Transforms-98f274e1","./Matrix2-f2da41d4","./RuntimeError-ffe03243","./ComponentDatatype-17b06483","./WebGLConstants-4e26b85a","./combine-8ce3f24b","./GeometryAttribute-b56d2c5c","./GeometryAttributes-b253752a","./GeometryPipeline-899fb23a","./AttributeCompression-0af3c035","./EncodedCartesian3-d4f305ce","./IndexDatatype-b10faa0b","./IntersectionTests-e957f3a3","./Plane-0421a8be","./WebMercatorProjection-d69cec15"],(function(e,r,t,n,i,o,a,s,f,c,u,b,d,m,l,p,y,P){"use strict";var v={};function k(r){var t=v[r];return e.defined(t)||("object"==typeof exports?v[t]=t=require("Workers/"+r):require(["Workers/"+r],(function(e){v[t=e]=e}))),t}return t((function(t,n){for(var i=t.subTasks,o=i.length,a=new Array(o),s=0;s<o;s++){var f=i[s],c=f.geometry,u=f.moduleName;if(e.defined(u)){var b=k(u);a[s]=b(c,f.offset)}else a[s]=c}return e.when.all(a,(function(e){return r.PrimitivePipeline.packCreateGeometryResults(e,n)}))}))}));
