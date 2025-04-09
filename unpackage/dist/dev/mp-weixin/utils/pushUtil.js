"use strict";
const common_vendor = require("../common/vendor.js");
function pushUtil() {
  common_vendor.index.getPushClientId({
    success(res) {
      console.log(res);
    }
  });
  common_vendor.index.onPushMessage((res) => {
    console.log(res);
    switch (res.type) {
      case "receive":
        common_vendor.index.createPushMessage({
          title: "你关注的up主更新了!",
          content: "大家好改电话费搞活动"
        });
        break;
      case "click":
        common_vendor.index.navigateTo({
          url: "/pages/topicList/topicList"
        });
        break;
    }
  });
}
exports.pushUtil = pushUtil;
