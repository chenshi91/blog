"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_index = require("../../utils/index.js");
if (!Array) {
  const _easycom_cloud_avater2 = common_vendor.resolveComponent("cloud-avater");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  (_easycom_cloud_avater2 + _easycom_uni_dateformat2)();
}
const _easycom_cloud_avater = () => "../cloud-avater/cloud-avater.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
if (!Math) {
  (_easycom_cloud_avater + _easycom_uni_dateformat)();
}
const _sfc_main = {
  __name: "comment",
  props: {
    obj: Object
  },
  emits: ["showComments"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const status = common_vendor.reactive({
      hasLike: false,
      hasDislike: false
    });
    const count = common_vendor.reactive({
      like: 0,
      disLike: 0
    });
    const comment = common_vendor.computed(() => {
      return props.obj;
    });
    common_vendor.inject("hasLogin");
    const userInfo = common_vendor.inject("userInfo");
    common_vendor.onLoad(() => {
      utils_index.f1();
    });
    common_vendor.watchEffect(() => {
      if (userInfo.value._id) {
        common_vendor.Vs.database().collection("open-db-news-like").where(`comments_id=="${comment.value._id}"&&like_type==1&&status==0&&user_id=="${userInfo.value._id}"`).count().then((res) => {
          if (res.result.total > 0) {
            status.hasLike = true;
          }
        });
        common_vendor.Vs.database().collection("open-db-news-like").where(`comments_id=="${comment.value._id}"&&like_type==1&&status==2&&user_id=="${userInfo.value._id}"`).count().then((res) => {
          if (res.result.total > 0) {
            status.hasDislike = true;
          }
        });
      }
      common_vendor.Vs.database().collection("open-db-news-like").where(`comments_id=="${comment.value._id}"&&like_type==1&&status==0`).count().then((res) => {
        count.like = res.result.total;
      });
      common_vendor.Vs.database().collection("open-db-news-like").where(`comments_id=="${comment.value._id}"&&like_type==1&&status==2`).count().then((res) => {
        count.disLike = res.result.total;
      });
    });
    function toCommentList(e) {
      var _a;
      const index = ((_a = e.target.dataset) == null ? void 0 : _a.index) ?? "";
      switch (index) {
        case "like":
          console.log("执行点赞...");
          status.hasLike = !status.hasLike;
          count.like++;
          break;
        case "dislike":
          console.log("执行踩一下...");
          status.hasDislike = !status.hasDislike;
          count.disLike++;
          break;
        case "reply":
          console.log("执行回复...");
          break;
        case "hotReply":
          console.log("执行热议...");
          break;
        default:
          console.log("执行跳评论列表...");
          emit("showComments", props.obj);
          break;
      }
    }
    return (_ctx, _cache) => {
      var _a;
      return {
        a: common_vendor.p({
          src: __props.obj.user_id[0].avatar_file.url
        }),
        b: common_vendor.t(__props.obj.user_id[0].username),
        c: common_vendor.t(count.disLike),
        d: common_vendor.n(status.hasDislike ? "iconfont icon-shit-o" : "iconfont icon-quxiaodianzan"),
        e: common_vendor.t(count.like),
        f: common_vendor.n(status.hasLike ? "iconfont icon-dianzan_kuai" : "iconfont icon-dianzan"),
        g: common_vendor.t(__props.obj.city),
        h: common_vendor.t(__props.obj.comment_content),
        i: common_vendor.p({
          date: ((_a = __props.obj) == null ? void 0 : _a.comment_date) ?? null,
          format: "yyyy-MM-dd hh:mm:ss",
          threshold: [6e4, 36e5 * 24 * 30]
        }),
        j: common_vendor.o(($event) => toCommentList($event))
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-dfd4a230"]]);
wx.createComponent(Component);
