let common = {};

common.defined = function (object) {
  return object !== undefined && object !== null;
};

common.defaultValue = function (a, b) {
  if (a !== undefined && a !== null) {
    return a;
  }
  return b;
};

common.arrayIsEmpty = function (array) {
  if (!this.defined(array) || !Array.isArray(array)) {
    return false;
  }
  return array.length === 0;
};

common.getObjectFromArray = function (array, field, value) {
  if (!this.defined(array) || !Array.isArray(array)) {
    return;
  }

  for (let i = 0; i < array.length; i++) {
    let object = array[i];
    if (object[field] === value) {
      return object;
    }
  }
};

common.contains = function (array, value) {
  if (!this.defined(array) || !Array.isArray(array)) {
    return false;
  }
  for (let i = 0; i < array.length; i++) {
    if (array[i] === value) {
      return true;
    }
  }
  return false;
};

common.unique = function (array, uniId) {
  if (!this.defined(array) || !Array.isArray(array)) {
    return false;
  }
  const result = new Map();
  return array.filter(function (object) {
    return !result.has(object[uniId]) && result.set(object[uniId], 1);
  })
};

common.download = function (options) {
  if (!this.defined(options) || !this.defined(options.url)) {
    throw new Error("options.url is required");
  }
  window.location.href = options.url;
};

common.fixN =  function (number, precision) {
  let unit = 1;
  for (let i = 0; i < precision; i++) {
    unit *= 10;
  }

  return Math.floor(number * unit) / unit;
}

common.isNotEmptyStr = function (string) {
  if(common.defined(string) && typeof string == 'string' && string.length > 0){
    return true;
  }
  return false;
}

/**
 * object(defined)-group(& and |)-other(~)
 * @returns {string}
 */
common.uuid = function () {
  let d = new Date().getTime();
  let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      let r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
};

common.deepCopy = function (object) {
  if (!this.defined(object)) {
    return;
  }
  return JSON.parse(JSON.stringify(object));
};

/**
 * copy object to new object, The address reference will be reset
 * @param object
 * @returns {any}
 */
common.copyObjectToNewObject = function (object) {
  if (!this.defined(object) || typeof object !== "object") {
    throw new Error("object is required");
  }

  return Object.assign({}, object);
};

/**
 * copy object to new object, just copy content, not change address reference
 * @param object
 * @param anther
 */
common.copyObjectToAnther = function (object, anther) {
  if (!this.defined(object) || !this.defined(anther)) {
    throw new Error("object and anther old object is required");
  }

  for (let key in object) {
    anther[key] = object[key];
  }
};

common.ifDate = function (date) {
  if(this.defined(date) && date instanceof Date){
    return true;
  }
  return false;
};

common.compareDate = function (a, b) {
  if(!this.ifDate(a) || !this.ifDate(b)){
    return;
  }
  return a.getTime() - b.getTime() > 0;
};

common.ifInterval = function (period, date) {
  let begin = period[0], end = period[1];
  if(this.compareDate(date, begin) && this.compareDate(end, date)){
    return true;
  }
  return false;
};

export default common;
