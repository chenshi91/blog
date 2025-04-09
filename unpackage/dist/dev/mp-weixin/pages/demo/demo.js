"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_u_skeleton2 = common_vendor.resolveComponent("u-skeleton");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_unicloud_db2 = common_vendor.resolveComponent("unicloud-db");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  (_easycom_u_skeleton2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_unicloud_db2 + _easycom_u_button2 + _easycom_u_icon2)();
}
const _easycom_u_skeleton = () => "../../uni_modules/uview-plus/components/u-skeleton/u-skeleton.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_unicloud_db = () => "../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js";
const _easycom_u_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
const _easycom_u_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
if (!Math) {
  (_easycom_u_skeleton + _easycom_uni_list_item + _easycom_uni_list + _easycom_unicloud_db + _easycom_u_button + _easycom_u_icon)();
}
const _sfc_main = {
  __name: "demo",
  setup(__props) {
    common_vendor.ref("hello");
    return (_ctx, _cache) => {
      return {
        a: common_vendor.w(({
          data,
          pagination,
          loading,
          error
        }, s0, i0) => {
          return common_vendor.e({
            a: error
          }, error ? {
            b: common_vendor.t(error.message)
          } : loading ? {
            d: "e0ddb0e8-1-" + i0 + ",e0ddb0e8-0",
            e: common_vendor.p({
              rows: "3",
              title: true,
              loading: true,
              avatar: true,
              animate: true
            })
          } : {
            f: common_vendor.f(data, (item, k1, i1) => {
              return {
                a: item._id,
                b: "e0ddb0e8-3-" + i0 + "-" + i1 + "," + ("e0ddb0e8-2-" + i0),
                c: common_vendor.p({
                  note: item.desc,
                  title: item.title,
                  rightText: item.user_id[0].username
                })
              };
            }),
            g: "e0ddb0e8-2-" + i0 + ",e0ddb0e8-0"
          }, {
            c: loading,
            h: i0,
            i: s0
          });
        }, {
          name: "d",
          path: "a",
          vueId: "e0ddb0e8-0"
        }),
        b: common_vendor.p({
          collection: "blog-articles,uni-id-users",
          field: "title,content,user_id{_id,username}"
        }),
        c: common_vendor.p({
          text: "按钮"
        }),
        d: common_vendor.p({
          name: "photo",
          width: "200",
          height: "300"
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
