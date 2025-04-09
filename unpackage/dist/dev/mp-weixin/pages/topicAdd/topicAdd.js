"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list)();
}
const _sfc_main = {
  __name: "topicAdd",
  setup(__props) {
    let topic = common_vendor.reactive({
      title: null,
      content: null,
      userId: "6643695c09ffd1e89f05bd7b"
    });
    let topicList = common_vendor.reactive([]);
    function topicAdd() {
      console.log(topic);
      cloudTopic.topicAdd(topic).then((res) => {
        console.log(res);
        if (res.id) {
          common_vendor.index.showToast({
            title: "话题添加成功!"
          });
        }
      }).catch((err) => {
        console.log(err);
        common_vendor.index.showToast({
          title: err.message,
          icon: "error"
        });
      }).finally(() => {
        console.log("end...");
        setTimeout(() => {
          common_vendor.index.hideToast();
        }, 2e3);
      });
    }
    function getTopicList() {
      cloudTopic.topicList().then((res) => {
        console.log("topicList...", res);
        if (res.data.length) {
          res.data.forEach((item) => {
            topicList.push(item);
          });
        }
      }).catch((err) => {
        console.log(err.message);
      });
    }
    function topicShow() {
      const db = common_vendor.Vs.database();
      let topicTem = db.collection("topic").field("title,content,userId").getTemp();
      let userTem = db.collection("uni-id-users").field("_id,nickname,username,avatar_file").getTemp();
      db.collection(topicTem, userTem).get().then((res) => {
        console.log("xxx", res);
        if (res.result.data.length) {
          res.result.data.forEach((item, index) => {
            const id = item._id;
            if (topicList.some((o) => o._id = id)) {
              topicList.splice(index, 1, item);
            }
          });
          console.log(topicList);
        }
      }).catch((err) => {
        console.log("err...", err.message);
      });
    }
    const cloudTopic = common_vendor.Vs.importObject("cloudTopic");
    common_vendor.onLoad((option) => {
      console.log("onload...");
      getTopicList();
    });
    common_vendor.onUpdated(() => {
      console.log("update...");
    });
    common_vendor.onMounted(() => {
      console.log("onMounted...");
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(topic).title,
        b: common_vendor.o(($event) => common_vendor.unref(topic).title = $event.detail.value),
        c: common_vendor.unref(topic).content,
        d: common_vendor.o(($event) => common_vendor.unref(topic).content = $event.detail.value),
        e: common_vendor.o(($event) => topicAdd()),
        f: common_vendor.o(($event) => topicShow()),
        g: common_vendor.f(common_vendor.unref(topicList), (obj, k0, i0) => {
          return {
            a: "c9aeef78-1-" + i0 + ",c9aeef78-0",
            b: common_vendor.p({
              title: obj.title,
              note: obj.content,
              ["right-text"]: obj.userId[0].nickname,
              thumb: obj.userId[0].avatar_file ? obj.userId[0].avatar_file.url : "",
              ["thumb-size"]: "lg"
            })
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c9aeef78"]]);
wx.createPage(MiniProgramPage);
