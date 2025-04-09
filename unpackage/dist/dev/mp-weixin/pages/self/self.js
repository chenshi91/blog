"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_uniIdPages_common_store = require("../../uni_modules/uni-id-pages/common/store.js");
if (!Array) {
  const _easycom_u_notice_bar2 = common_vendor.resolveComponent("u-notice-bar");
  const _easycom_cloud_avater2 = common_vendor.resolveComponent("cloud-avater");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  (_easycom_u_notice_bar2 + _easycom_cloud_avater2 + _easycom_uni_dateformat2)();
}
const _easycom_u_notice_bar = () => "../../uni_modules/uview-plus/components/u-notice-bar/u-notice-bar.js";
const _easycom_cloud_avater = () => "../../components/cloud-avater/cloud-avater.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
if (!Math) {
  (_easycom_u_notice_bar + _easycom_cloud_avater + _easycom_uni_dateformat)();
}
const _sfc_main = {
  __name: "self",
  setup(__props) {
    const hasLogin = common_vendor.computed(() => uni_modules_uniIdPages_common_store.store.hasLogin);
    const userInfo = common_vendor.computed(() => uni_modules_uniIdPages_common_store.store.userInfo);
    const count = common_vendor.reactive({
      likes: 0,
      comments: 0,
      favorite: 0,
      records: 0
    });
    common_vendor.onLoad((ops) => {
    });
    common_vendor.onShow(() => {
      if (hasLogin.value) {
        common_vendor.index.setNavigationBarTitle({
          title: uni_modules_uniIdPages_common_store.store.userInfo.username + "的个人信息"
        });
        common_vendor.Vs.database().collection("open-db-news-like").where("status==0&&user_id==$cloudEnv_uid").count().then((res) => {
          count.likes = res.result.total;
        });
        common_vendor.Vs.database().collection("opendb-news-favorite").where("user_id==$cloudEnv_uid").count().then((res) => {
          count.favorite = res.result.total;
        });
        common_vendor.Vs.database().collection("open-db-news-record").where("user_id==$cloudEnv_uid").count().then((res) => {
          count.records = res.result.total;
        });
      }
    });
    function toUserInfo(e) {
      var _a, _b;
      console.log(((_b = (_a = e == null ? void 0 : e.target) == null ? void 0 : _a.dataset) == null ? void 0 : _b.index) ?? "hehe");
      const route = getCurrentPages();
      const routePagenow = route[route.length - 1].route;
      if (!hasLogin.value) {
        common_vendor.index.navigateTo({
          url: "/uni_modules/uni-id-pages/pages/login/login-withpwd?uniIdRedirectUrl=/" + routePagenow
        });
        return;
      }
      common_vendor.index.navigateTo({
        url: "/uni_modules/uni-id-pages/pages/userinfo/userinfo"
      });
    }
    function toItem(e) {
      var _a, _b;
      console.log(uni_modules_uniIdPages_common_store.store.userInfo);
      if (!hasLogin) {
        common_vendor.index.showToast({
          title: "请先登陆才能操作"
        });
        return;
      }
      const index = ((_b = (_a = e == null ? void 0 : e.target) == null ? void 0 : _a.dataset) == null ? void 0 : _b.index) ?? "unkonw";
      switch (index) {
        case "changwen":
          common_vendor.index.navigateTo({
            url: "/pages/opendb-news-articles/list"
          });
          break;
        case "dianzan":
          console.log("点赞");
          common_vendor.index.navigateTo({
            url: "/pages/open-db-news-like/list"
          });
          break;
        case "reply":
          console.log("评论过的");
          break;
        case "about":
          console.log("关于");
          common_vendor.index.navigateTo({
            url: "/pages/about/about"
          });
          break;
        case "suggest":
          console.log("意见反馈");
          common_vendor.index.navigateTo({
            url: "/uni_modules/uni-feedback/pages/opendb-feedback/opendb-feedback"
          });
          break;
      }
    }
    function logout() {
      if (!hasLogin) {
        return;
      }
      common_vendor.index.showModal({
        title: "是否退出登陆"
      }).then((res) => {
        if (res.cancel)
          return;
        uni_modules_uniIdPages_common_store.mutations.logout().then((res2) => {
          console.log(res2);
        }).catch((err) => {
          console.log(err.message);
        });
      });
    }
    return (_ctx, _cache) => {
      var _a, _b, _c, _d;
      return common_vendor.e({
        a: common_vendor.p({
          mode: "horizontal",
          text: "个人信息展示"
        }),
        b: common_vendor.p({
          src: ((_b = (_a = userInfo.value) == null ? void 0 : _a.avatar_file) == null ? void 0 : _b.url) ?? "../../static/logo.png",
          mode: "aspectFill"
        }),
        c: common_vendor.t((_c = userInfo.value) == null ? void 0 : _c.username),
        d: hasLogin.value
      }, hasLogin.value ? {
        e: common_vendor.p({
          date: (_d = userInfo.value) == null ? void 0 : _d.register_date,
          threshold: [6e4, 36e5 * 24 * 30],
          format: "yyyy-MM-dd hh:mm:ss"
        })
      } : {}, {
        f: common_vendor.o(($event) => toUserInfo($event)),
        g: common_vendor.t(count.comments),
        h: common_vendor.t(count.likes),
        i: common_vendor.t(count.favorite),
        j: common_vendor.t(count.records),
        k: common_vendor.o(($event) => logout()),
        l: common_vendor.o(($event) => toItem($event))
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f94a969d"]]);
wx.createPage(MiniProgramPage);
