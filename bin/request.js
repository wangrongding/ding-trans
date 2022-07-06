const axios = require("axios");
// 创建axios实例
const service = axios.create({
  timeout: 200000, // 请求超时时间
});
// request请求拦截器
service.interceptors.request.use(
  (config) => {
    const { data = {}, method } = config;
    if (method === "post") {
      config.data = data.data;
    }
    // get请求转参数key为params
    if (method === "get" || method === "delete") {
      config.params = data;
    }
    if (method === "put") {
      config.data = { ...data.data };
    }
    return config;
  },
  (error) => error
);

// 请求成功回调
function successCallback(response) {
  return Promise.resolve(response.data);
}
// 请求错误回调
function errorCallback(error) {
  console.log(error);
  return Promise.reject(error);
}
// response返回拦截器
service.interceptors.response.use(successCallback, errorCallback);

exports.axios = service;
