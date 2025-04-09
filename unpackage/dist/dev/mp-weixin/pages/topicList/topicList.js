"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_unicloud_db2 = common_vendor.resolveComponent("unicloud-db");
  (_easycom_uni_load_more2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_unicloud_db2)();
}
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_unicloud_db = () => "../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js";
if (!Math) {
  (_easycom_uni_load_more + _easycom_uni_list_item + _easycom_uni_list + _easycom_unicloud_db)();
}
const _sfc_main = {
  __name: "topicList",
  setup(__props) {
    common_vendor.ref("lst");
    let udb = common_vendor.ref(null);
    function getData() {
      console.log("手动加载收据...");
      udb.value.loadData();
      console.log(udb.value);
    }
    function topicAdd() {
      udb.value.add({
        "title": "你老婆好吗?",
        "content": "还是打好狡猾"
      });
    }
    function topicDelete(id) {
      udb.value.remove(id);
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => getData()),
        b: common_vendor.o(($event) => topicAdd()),
        c: common_vendor.o(($event) => topicDelete()),
        d: common_vendor.w(({
          data,
          loading,
          error,
          options
        }, s0, i0) => {
          return common_vendor.e({
            a: error
          }, error ? {
            b: common_vendor.t(error.message)
          } : {}, {
            c: loading
          }, loading ? {
            d: "a35d23f0-1-" + i0 + ",a35d23f0-0",
            e: common_vendor.p({
              status: "loading"
            })
          } : {
            f: common_vendor.f(data, (obj, k1, i1) => {
              return {
                a: common_vendor.o(($event) => topicDelete(obj._id)),
                b: "a35d23f0-3-" + i0 + "-" + i1 + "," + ("a35d23f0-2-" + i0),
                c: common_vendor.p({
                  title: obj.title,
                  note: obj.content,
                  ["right-text"]: obj.userId[0].nickname,
                  thumb: obj.userId[0].avatar_file ? obj.userId[0].avatar_file.url : "",
                  ["thumb-size"]: "lg",
                  clickable: true
                })
              };
            }),
            g: "a35d23f0-2-" + i0 + ",a35d23f0-0"
          }, {
            h: i0,
            i: s0
          });
        }, {
          name: "d",
          path: "d",
          vueId: "a35d23f0-0"
        }),
        e: common_vendor.sr(udb, "a35d23f0-0", {
          "k": "udb"
        }),
        f: common_vendor.p({
          collection: "topic,uni-id-users",
          field: "title,content,userId{nickname,avatar_file}",
          orderby: "_id desc",
          loadtime: "manual"
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
