"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_uniIdPages_common_store = require("../../uni_modules/uni-id-pages/common/store.js");
if (!Array) {
  const _easycom_cloud_avater2 = common_vendor.resolveComponent("cloud-avater");
  const _easycom_u_avatar2 = common_vendor.resolveComponent("u-avatar");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_cloud_image2 = common_vendor.resolveComponent("cloud-image");
  const _easycom_u_action_sheet2 = common_vendor.resolveComponent("u-action-sheet");
  (_easycom_cloud_avater2 + _easycom_u_avatar2 + _easycom_uni_dateformat2 + _easycom_cloud_image2 + _easycom_u_action_sheet2)();
}
const _easycom_cloud_avater = () => "../cloud-avater/cloud-avater.js";
const _easycom_u_avatar = () => "../../uni_modules/uview-plus/components/u-avatar/u-avatar.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_cloud_image = () => "../../uni_modules/uni-id-pages/components/cloud-image/cloud-image.js";
const _easycom_u_action_sheet = () => "../../uni_modules/uview-plus/components/u-action-sheet/u-action-sheet.js";
if (!Math) {
  (_easycom_cloud_avater + _easycom_u_avatar + _easycom_uni_dateformat + _easycom_cloud_image + _easycom_u_action_sheet)();
}
const _sfc_main = {
  __name: "blog",
  props: {
    item: Object
  },
  setup(__props) {
    let count = common_vendor.reactive({
      comment: 0,
      like: 0,
      dislike: 0
    });
    let status = common_vendor.reactive({
      dislike: false,
      like: false
    });
    let id = common_vendor.reactive({
      like: "",
      articles: "",
      favorite: ""
    });
    let list = common_vendor.reactive([
      {
        name: "收藏"
      },
      {
        name: "删除",
        color: "red",
        disabled: true
      },
      {
        name: "编辑",
        disabled: true
      }
    ]);
    const title = common_vendor.ref();
    let show = common_vendor.ref(false);
    const props = __props;
    const hasLogin = common_vendor.computed(() => {
      return uni_modules_uniIdPages_common_store.store.hasLogin;
    });
    const userInfo = common_vendor.computed(() => {
      return uni_modules_uniIdPages_common_store.store.userInfo;
    });
    common_vendor.onLoad(() => {
      id.articles = props.item._id;
    });
    common_vendor.onShow(() => {
      countLoad();
      likeLoad();
    });
    function countLoad() {
      const item = common_vendor.toRaw(props.item);
      const { _id } = item;
      common_vendor.Vs.database().collection("opendb-news-comments").where({
        article_id: _id,
        comment_type: 0,
        status: true
      }).count().then((res) => {
        count.comment = res.result.total;
      });
      common_vendor.Vs.database().collection("open-db-news-like").where({
        article_id: _id,
        like_type: 0,
        status: 0
      }).count().then((res) => {
        count.like = res.result.total;
      });
      common_vendor.Vs.database().collection("open-db-news-like").where({
        article_id: _id,
        like_type: 0,
        status: 2
      }).count().then((res) => {
        count.dislike = res.result.total;
      });
    }
    function likeLoad() {
      if (hasLogin.value) {
        common_vendor.Vs.database().collection("open-db-news-like").where(`article_id=='${props.item._id}'&&user_id=='${userInfo.value._id}'&&like_type==0`).get().then((res) => {
          console.log("hhhhhhhhhh", res.result.data);
          if (res.result.data.length > 0) {
            const statusRes = res.result.data[0].status;
            id.like = res.result.data[0]._id;
            if (0 == statusRes) {
              status.like = true;
            } else if (2 == statusRes) {
              status.dislike = true;
            }
          }
        });
      }
    }
    function showImg(imgs, img) {
      console.log(imgs, img);
      common_vendor.index.previewImage({
        "urls": imgs,
        "current": img,
        "loop": true
      });
    }
    function toDetail(id2, e) {
      console.log(e);
      console.log(id2, e.target.dataset.index);
      if ("title" == e.target.dataset.index || "content" == e.target.dataset.index) {
        console.log("要跳转详情页了...");
        common_vendor.index.navigateTo({
          url: "/pages/detail/detail?id=" + id2
        });
      }
    }
    function more() {
      show.value = true;
      const currentUserInfo = common_vendor.Vs.getCurrentUserInfo();
      if (currentUserInfo.uid == props.item.user_id[0]._id || "web_admin" == currentUserInfo.role || "admin" == currentUserInfo.role) {
        list.forEach((o) => o.disabled = false);
      }
    }
    function select(e) {
      if (!hasLogin.value) {
        common_vendor.index.showToast({
          title: "前先登录!",
          icon: "fail"
        });
        return;
      }
      switch (e.name) {
        case "收藏":
          console.log("t收藏...");
          common_vendor.Vs.database().collection("opendb-news-favorite").add({
            "article_id": props.item._id,
            "user_id": userInfo.value._id
          }).then((res) => {
            common_vendor.index.showToast({
              title: "收藏成功!",
              icon: "success"
            });
          }).catch((err) => {
            common_vendor.index.showToast({
              title: err.message,
              icon: "error"
            });
          });
          break;
        case "删除":
          console.log("t删除...");
          break;
        case "编辑":
          console.log("t编辑...");
          break;
        default:
          console.log("default...");
          break;
      }
    }
    function toLike(e) {
      var _a;
      const index = ((_a = e.target.dataset) == null ? void 0 : _a.index) ?? "unkonw";
      if (!hasLogin.value) {
        common_vendor.index.showToast({
          title: "请先登陆!",
          icon: "error"
        });
        return;
      }
      if (id.like == "" || id.like == null) {
        common_vendor.Vs.database().collection("open-db-news-like").add({
          "article_id": id.articles,
          "like_type": 0,
          "status": 1,
          "user_id": userInfo.value._id
        }).then((res) => {
          console.log("新增一条点赞记录", res);
          id.like = res.result.id;
        });
      }
      switch (index) {
        case "like":
          console.log(index);
          status.like = !status.like;
          if (status.like) {
            common_vendor.Vs.database().collection("open-db-news-like").doc(id.like).update({ "status": 0 }).then((res) => {
              console.log("like成功", res);
            });
            count.like++;
          } else {
            common_vendor.Vs.database().collection("open-db-news-like").doc(id.like).update({ "status": 1 }).then((res) => {
              console.log("取消like成功", res);
            });
            count.like--;
          }
          break;
        case "dislike":
          console.log(index);
          status.dislike = !status.dislike;
          if (status.dislike) {
            common_vendor.Vs.database().collection("open-db-news-like").doc(id.like).update({ "status": 2 }).then((res) => {
              console.log("dislike成功", res);
            });
            count.dislike++;
          } else {
            common_vendor.Vs.database().collection("open-db-news-like").doc(id.like).update({ "status": 1 }).then((res) => {
              console.log("取消dislike成功", res);
            });
            count.dislike--;
          }
          break;
      }
    }
    function close() {
      show.value = false;
    }
    return (_ctx, _cache) => {
      var _a, _b, _c;
      return {
        a: common_vendor.p({
          src: (_b = (_a = __props.item.user_id[0]) == null ? void 0 : _a.avatar_file) == null ? void 0 : _b.url
        }),
        b: common_vendor.t((_c = __props.item.user_id[0]) == null ? void 0 : _c.username),
        c: __props.item.user_id,
        d: !__props.item.user_id,
        e: common_vendor.p({
          date: __props.item.publish_date,
          threshold: [6e4, 36e5 * 24 * 30],
          format: "yyyy-MM-dd hh:mm:ss"
        }),
        f: common_vendor.o(($event) => more()),
        g: common_vendor.t(__props.item.title),
        h: common_vendor.t(__props.item.excerpt),
        i: common_vendor.f(__props.item.avatar, (img, k0, i0) => {
          return {
            a: common_vendor.o(($event) => showImg(__props.item.avatar, img)),
            b: "22c012e8-3-" + i0,
            c: common_vendor.p({
              src: img,
              mode: "aspectFill",
              width: "200rpx",
              height: "200rpx"
            })
          };
        }),
        j: common_vendor.o(($event) => toDetail(__props.item._id, $event)),
        k: common_vendor.t(__props.item.view_count),
        l: common_vendor.t(common_vendor.unref(count).comment),
        m: common_vendor.n(common_vendor.unref(status).dislike ? "iconfont icon-shit-o" : "iconfont icon-quxiaodianzan"),
        n: common_vendor.t(common_vendor.unref(count).dislike),
        o: common_vendor.n(common_vendor.unref(status).like ? "iconfont icon-dianzan_kuai" : "iconfont icon-dianzan"),
        p: common_vendor.t(common_vendor.unref(count).like),
        q: common_vendor.o(($event) => toLike($event)),
        r: common_vendor.o(($event) => select($event)),
        s: common_vendor.o(($event) => close()),
        t: common_vendor.p({
          actions: common_vendor.unref(list),
          title: title.value,
          cancelText: "取消吧",
          show: common_vendor.unref(show)
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-22c012e8"]]);
wx.createComponent(Component);
