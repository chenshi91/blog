"use strict";
const common_vendor = require("../common/vendor.js");
function getBlogList() {
  return new Promise((resolve, rejuct) => {
    const temBlogList = common_vendor.index.getStorageSync("temBlogList");
    if (temBlogList) {
      resolve(temBlogList);
      return;
    }
    common_vendor.index.showLoading({
      title: "正在请求网络..."
    });
    common_vendor.index.request({
      url: ""
    }).then((res) => {
      console.log("网络请求获取到数据...", res);
      resolve(res);
    }).catch((err) => {
      console.log(err.message);
      rejuct(err);
      common_vendor.index.showToast({
        title: "网络请求错误!",
        icon: "error"
      });
    }).finally(() => {
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.hideToast();
      }, 2e3);
    });
  });
}
function getCityByIP(ip) {
  return new Promise((resolve, reject) => {
    const storange_city = common_vendor.index.getStorageSync(ip);
    if (storange_city) {
      const { name, time } = storange_city;
      const diff_time = Date.now() - time;
      if (diff_time > 0 && diff_time < 1e3 * 60 * 60 * 2) {
        resolve(name);
        return;
      }
      common_vendor.index.removeStorageSync(ip);
    }
    common_vendor.index.request({
      url: "https://restapi.amap.com/v3/ip?key=5271bffc983efad7f332841436f495bb&ip=" + ip
    }).then((res) => {
      const { province, city } = res.data;
      const obj = {
        name: province + city,
        time: Date.now()
      };
      if (obj.name == null || obj.name == "") {
        obj.name = "火星";
      }
      common_vendor.index.setStorageSync(ip, obj);
      resolve(obj.name);
    }).catch((err) => {
      reject(err);
    });
  });
}
async function getCity() {
  const res = await common_vendor.index.request({
    url: "https://restapi.amap.com/v3/ip?key=5271bffc983efad7f332841436f495bb"
  });
  let pc = "火星";
  const { province, city } = res.data;
  if (province || city) {
    pc = province + city;
  }
  return pc;
}
exports.getBlogList = getBlogList;
exports.getCity = getCity;
exports.getCityByIP = getCityByIP;
