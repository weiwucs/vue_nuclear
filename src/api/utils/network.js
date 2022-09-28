import axios from "axios";

let network = {};

network.getAsync = function (url) {
  let requestConfig = {
    method: "get",
    url: url,
  };
  return new Promise((resolve, reject) => {
    axios(requestConfig)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject();
        alert(error);
      });
  });
};

network.postAsync = function (url, data) {
  let requestConfig = {
    method: "post",
    url: url,
    data: data,
  };
  return new Promise((resolve, reject) => {
    axios(requestConfig)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject();
        alert(error);
      });
  });
};

network.patchAsync = function (url, data) {
  let requestConfig = {
    method: "patch",
    url: url,
    data: data,
  };
  return new Promise((resolve, reject) => {
    axios(requestConfig)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject();
        alert(error);
      });
  });
};

network.deleteAsync = function (url) {
  let requestConfig = {
    method: "delete",
    url: url,
  };
  return new Promise((resolve, reject) => {
    axios(requestConfig)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject();
        alert(error);
      });
  });
};

export default network;
