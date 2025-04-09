"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "about",
  setup(__props) {
    let i = common_vendor.ref(10);
    let demo = common_vendor.ref("这是一个属于陈实的个人网站,数据用来做学习测试所用,不包含任何商业用途");
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(common_vendor.unref(demo)),
        b: _ctx.uniIDHasRole("admin")
      }, _ctx.uniIDHasRole("admin") ? {
        c: common_vendor.t(common_vendor.unref(i))
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-13a78ac6"]]);
wx.createPage(MiniProgramPage);
