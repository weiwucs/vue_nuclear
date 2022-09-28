import network from "./network.js";
import common from "./common.js";
import config from "./config.js";
import store from "../../store";

let loader = {};

/**
 * Reference MVC model, load model(similar to javabeans) data by cache
 * @param options
 * @returns {Array}
 */
loader.loadByCache = function (options) {
    if(!common.defined(options) || !common.defined(options.class)){
        throw new Error('options.class is required');
    }

    let clazz = options.class;
    let field = clazz + 's';
    let data = store.state[field];

    if(common.defined(data)){
        return data;
    } else {
        return null;
    }
};

/**
 * load model data by http request
 * @param options
 * @returns {Promise}
 */
loader.loadByAsync = function (options) {
    if(!common.defined(options) || !common.defined(options.class)){
        throw new Error('options.class is required');
    }

    let clazz = options.class;
    let field = clazz + 's';
    let object = common.getObjectFromArray(config.classRouteMapper, 'class', clazz);
    let promise = network.getAsync(object.url);
    promise.then(function (response) {
        store.state[field] = response.data;
    });

    return promise;
};

/**
 * check cache
 * @param options
 * @returns {boolean}
 */
loader.checkCache = function(options){
    if(!common.defined(options) || !common.defined(options.class)){
        throw new Error('options.class is required');
    }

    let clazz = options.class;
    let field = clazz + 's';
    let data = store.state[field];

    if(common.defined(data) && Array.isArray(data)){
        if(data.length > 0){
            return true;
        }
    }
    return false;
};

/**
 * load data by fastest method
 * @param options
 * @returns {Array}
 */
loader.load = function (options, callback0) {
    if(!common.defined(options) || !common.defined(options.class)){
        throw new Error('options.class is required');
    }

    if(typeof callback0 !== 'function'){
        return []
    }

    let clazz = options.class;
    let field = clazz + 's';
    let callback = callback0 ? callback0 : function (data) {return data;}
    if(common.defined(store.state[field])){
        let data = this.loadByCache(options)
        return callback(data);
    } else {
        this.loadByAsync(options).then(function (response) {
            return callback(response.data)
        })
    }
}

export default loader;
