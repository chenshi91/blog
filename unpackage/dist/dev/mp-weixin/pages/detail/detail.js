"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const uni_modules_uniIdPages_common_store = require("../../uni_modules/uni-id-pages/common/store.js");
const utils_tools = require("../../utils/tools.js");
if (!Array) {
  const _easycom_u_skeleton2 = common_vendor.resolveComponent("u-skeleton");
  const _easycom_cloud_avater2 = common_vendor.resolveComponent("cloud-avater");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_u_parse2 = common_vendor.resolveComponent("u-parse");
  const _easycom_u_empty2 = common_vendor.resolveComponent("u-empty");
  const _easycom_comment2 = common_vendor.resolveComponent("comment");
  const _easycom_u_search2 = common_vendor.resolveComponent("u-search");
  const _easycom_unicloud_db2 = common_vendor.resolveComponent("unicloud-db");
  const _easycom_u_popup2 = common_vendor.resolveComponent("u-popup");
  const _easycom_u_back_top2 = common_vendor.resolveComponent("u-back-top");
  (_easycom_u_skeleton2 + _easycom_cloud_avater2 + _easycom_uni_dateformat2 + _easycom_u_parse2 + _easycom_u_empty2 + _easycom_comment2 + _easycom_u_search2 + _easycom_unicloud_db2 + _easycom_u_popup2 + _easycom_u_back_top2)();
}
const _easycom_u_skeleton = () => "../../uni_modules/uview-plus/components/u-skeleton/u-skeleton.js";
const _easycom_cloud_avater = () => "../../components/cloud-avater/cloud-avater.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_u_parse = () => "../../uni_modules/uview-plus/components/u-parse/u-parse.js";
const _easycom_u_empty = () => "../../uni_modules/uview-plus/components/u-empty/u-empty.js";
const _easycom_comment = () => "../../components/comment/comment.js";
const _easycom_u_search = () => "../../uni_modules/uview-plus/components/u-search/u-search.js";
const _easycom_unicloud_db = () => "../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js";
const _easycom_u_popup = () => "../../uni_modules/uview-plus/components/u-popup/u-popup.js";
const _easycom_u_back_top = () => "../../uni_modules/uview-plus/components/u-back-top/u-back-top.js";
if (!Math) {
  (_easycom_u_skeleton + _easycom_cloud_avater + _easycom_uni_dateformat + _easycom_u_parse + _easycom_u_empty + _easycom_comment + _easycom_u_search + _easycom_unicloud_db + _easycom_u_popup + _easycom_u_back_top)();
}
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const id = common_vendor.ref();
    const udb = common_vendor.ref();
    common_vendor.Vs.importObject("cloudObjArticles", {
      customUI: true
      //取消交互动画
    });
    const cloudObjBoke = common_vendor.Vs.importObject("boke", { customUI: true });
    const db = common_vendor.Vs.database();
    db.command;
    const pageNo = common_vendor.ref(0);
    const pageSize = common_vendor.ref(5);
    common_vendor.ref();
    const userInfo = common_vendor.computed(() => {
      return uni_modules_uniIdPages_common_store.store.userInfo;
    });
    const hasLogin = common_vendor.computed(() => {
      return uni_modules_uniIdPages_common_store.store.hasLogin;
    });
    common_vendor.provide("hasLogin", hasLogin);
    common_vendor.provide("userInfo", userInfo);
    let count = common_vendor.reactive({
      like: 0,
      dislike: 0,
      comment: 0,
      favorite: 0,
      view: 0
    });
    let reply = common_vendor.reactive({
      article_id: "",
      reply_comment_id: "",
      comment_content: "",
      comment_type: 0,
      user_id: userInfo.value._id,
      city: ""
    });
    let placeholder = common_vendor.ref("评论此文章");
    const articel = common_vendor.computed(() => {
      var _a;
      return (_a = udb == null ? void 0 : udb.value) == null ? void 0 : _a.dataList;
    });
    let commentList = common_vendor.reactive([]);
    common_vendor.reactive([]);
    let show = common_vendor.reactive({
      commentList: false,
      hasNotCommentList: false
    });
    let scrollTop = common_vendor.ref(0);
    common_vendor.onPageScroll((e) => {
      scrollTop.value = e.scrollTop;
    });
    common_vendor.onLoad((ops) => {
      console.log("detail-onload.id=", ops);
      if (!ops || !ops.id) {
        console.log("id为空跳转到首页");
        common_vendor.index.navigateTo({
          url: "/pages/index/index"
        }).then((res) => {
          console.log(res);
        }).catch((err) => {
          console.log(err.message);
        });
        return;
      }
      id.value = ops.id;
      if (uni_modules_uniIdPages_common_store.store.hasLogin) {
        const userInfo2 = uni_modules_uniIdPages_common_store.store.userInfo;
        common_vendor.Vs.database().collection("open-db-news-like").where({
          "user_id": userInfo2._id,
          "article_id": ops.id,
          "like_type": 0,
          "status": 0
        }).count().then((res) => {
          if (res.result.total > 0) {
            statu_like.value = true;
          }
        });
      }
      cloudObjBoke.viewCountInc(id.value);
      addRecord();
      loadCommentList();
      console.log("aaa", articel);
    });
    common_vendor.onReachBottom(() => {
      console.log("我触底了...");
      if (pageNo.value == -1) {
        show.hasNotCommentList = true;
        return;
      }
      pageNo.value++;
      loadCommentList();
    });
    function addRecord() {
      var _a;
      common_vendor.Vs.database().collection("open-db-news-record").add({
        "article_id": id.value,
        "user_id": (_a = userInfo.value) == null ? void 0 : _a._id
      }).then((res) => {
        const { id: id2 } = res.result;
        common_vendor.Vs.database().collection("open-db-news-record").where({ "_id": id2 }).get().then((res2) => {
          const { _id, article_id, publish_ip } = res2.result.data[0];
          utils_tools.getCityByIP(publish_ip).then((res3) => {
            console.log("city=", res3);
            common_vendor.Vs.database().collection("open-db-news-record").doc(id2).update({
              "city": res3
            }).then((res4) => {
              console.log("修改city ok!");
            });
          });
        });
      });
    }
    function loadCommentList() {
      const likeTem = common_vendor.Vs.database().collection("open-db-news-like").where(`article_id=='${id.value}'&&like_type==0`).getTemp();
      const userTem = common_vendor.Vs.database().collection("uni-id-users").field("_id,username,avatar,avatar_file").getTemp();
      const commentTemp = common_vendor.Vs.database().collection("opendb-news-comments").where(`article_id=='${id.value}'&&comment_type==0&&status==true`).getTemp();
      common_vendor.Vs.database().collection(likeTem, userTem).get().then((res) => {
        if (res.result.data.length > 0) {
          count.like = res.result.data.length;
        }
      });
      common_vendor.Vs.database().collection(commentTemp, userTem).orderBy("comment_date desc").skip(pageNo.value * pageSize.value).limit(pageSize.value).get().then((res) => {
        console.log("afff", res);
        res.result.data.forEach((i) => {
          commentList.push(i);
        });
        if (res.result.data.length < pageSize.value) {
          pageNo.value = -1;
        }
      });
    }
    const tagStyle = common_vendor.reactive({
      // "color":"red",
      // p:'font-size:20rpx ',
      p: "color:black;font-size:8rpx;"
    });
    let statu_like = common_vendor.ref(false);
    let dataList_likeClick = [];
    function likeAdd() {
      console.log("点赞行为", id.value);
      dataList_likeClick.push(Date.now());
      if (dataList_likeClick.length > 1) {
        console.log("恶意点击判断...", dataList_likeClick);
        let data_start = dataList_likeClick[dataList_likeClick.length - 2];
        let data_end = dataList_likeClick[dataList_likeClick.length - 1];
        if (data_end - data_start < 1e3 * 1) {
          console.log("点击间隔<1s,属于恶意点击了!");
          return;
        }
      }
      if (!uni_modules_uniIdPages_common_store.store.hasLogin) {
        common_vendor.index.showModal({
          title: "未登录不能点赞,请先登陆",
          duration: 2e3,
          icon: "fail"
        }).then((res) => {
          console.log(res);
          if (res.cancel)
            return;
          common_vendor.index.navigateTo({
            url: "/" + common_vendor.pageJson.uniIdRouter.loginPage
          });
        });
        return;
      }
      const userInfo2 = uni_modules_uniIdPages_common_store.store.userInfo;
      let id_like = null;
      common_vendor.Vs.database().collection("open-db-news-like").where({
        "user_id": userInfo2._id,
        "article_id": id.value,
        "like_type": 1
      }).get().then((res) => {
        console.log("like id=", res.result);
        if (res.result.data.length > 0) {
          id_like = res.result.data[0]._id;
        }
        if (statu_like.value) {
          console.log("取消点赞开始...", userInfo2._id);
          if (id_like != null && id_like != "") {
            common_vendor.Vs.database().collection("open-db-news-like").doc(id_like).update({
              status: 1
            }).then((res2) => {
              console.log("取消点赞ok", res2);
              statu_like.value = false;
            });
          } else {
            console.log("点赞表id不存在,like_status肯定错了");
          }
          return;
        }
        if (id_like != null && id_like != "") {
          common_vendor.Vs.database().collection("open-db-news-like").doc(id_like).update({
            status: 0
          }).then((res2) => {
            console.log("点赞ok", res2);
            statu_like.value = true;
          });
        } else {
          common_vendor.Vs.database().collection("open-db-news-like").add({
            "user_id": userInfo2._id,
            "article_id": id.value,
            "like_type": 0,
            "status": 0
          }).then((res2) => {
            console.log("点赞ok", res2);
            statu_like.value = true;
          });
        }
      });
      dataList_likeClick.splice(0);
    }
    async function commentAdd() {
      if (!reply.comment_content || reply.comment_content == "") {
        return;
      }
      reply.article_id = articel.value._id;
      reply.city = await utils_tools.getCity();
      common_vendor.Vs.database().collection("opendb-news-comments").add(reply).then((res) => {
        common_vendor.index.showToast({
          title: "评论成功!",
          icon: "success"
        });
        console.log(res);
        commentList.push({
          "user_id": [
            {
              ...userInfo.value
            }
          ],
          "comment_content": reply.comment_content,
          "city": reply.city,
          "comment_date": Date.now()
        });
        reply.comment_content = "";
      });
    }
    function close() {
      show.commentList = false;
    }
    function PshowComments(p, p2) {
      show.commentList = true;
      console.log("w我接收到了", p, p2);
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.w(({
          data,
          loading,
          error,
          options
        }, s0, i0) => {
          var _a, _b;
          return common_vendor.e({
            a: error
          }, error ? {
            b: common_vendor.t(error.message)
          } : loading ? {
            d: "eca06f3c-1-" + i0 + ",eca06f3c-0",
            e: common_vendor.p({
              rows: "10",
              avatar: true
            })
          } : {
            f: common_vendor.t((data == null ? void 0 : data.title) ?? ""),
            g: "eca06f3c-2-" + i0 + ",eca06f3c-0",
            h: common_vendor.p({
              src: (_b = (_a = data.user_id[0]) == null ? void 0 : _a.avatar_file) == null ? void 0 : _b.url
            }),
            i: common_vendor.t((data == null ? void 0 : data.user_id[0].username) ?? ""),
            j: "eca06f3c-3-" + i0 + ",eca06f3c-0",
            k: common_vendor.p({
              date: (data == null ? void 0 : data.publish_date) ?? null,
              format: "yyyy-MM-dd hh:mm:ss"
            }),
            l: "eca06f3c-4-" + i0 + ",eca06f3c-0",
            m: common_vendor.p({
              content: data ? data.content : null,
              ["tag-style"]: tagStyle
            }),
            n: common_vendor.t(common_vendor.unref(statu_like) ? common_vendor.unref(count).like + 1 : common_vendor.unref(count).like),
            o: common_vendor.n(common_vendor.unref(statu_like) ? "active" : ""),
            p: common_vendor.o(($event) => likeAdd()),
            q: common_assets._imports_0$1,
            r: common_vendor.t((data == null ? void 0 : data.view_count) ?? null),
            s: "eca06f3c-5-" + i0 + ",eca06f3c-0",
            t: common_vendor.p({
              text: "所谓伊人，在水一方,wu和根深蒂固",
              mode: "list",
              show: "false"
            }),
            v: common_vendor.f(common_vendor.unref(commentList), (obj, k1, i1) => {
              return {
                a: obj._id,
                b: common_vendor.o(PshowComments, obj._id),
                c: "eca06f3c-6-" + i0 + "-" + i1 + ",eca06f3c-0",
                d: common_vendor.p({
                  obj
                })
              };
            }),
            w: "eca06f3c-7-" + i0 + ",eca06f3c-0",
            x: common_vendor.p({
              text: "没有评论了~",
              mode: "data",
              show: common_vendor.unref(show).hasNotCommentList
            }),
            y: common_vendor.o(($event) => commentAdd()),
            z: "eca06f3c-8-" + i0 + ",eca06f3c-0",
            A: common_vendor.o(($event) => common_vendor.unref(reply).comment_content = $event),
            B: common_vendor.p({
              placeholder: common_vendor.unref(placeholder),
              ["search-icon"]: "chat",
              shape: "square",
              ["border-color"]: "black",
              height: "80",
              ["action-text"]: "评论",
              modelValue: common_vendor.unref(reply).comment_content
            })
          }, {
            c: loading,
            C: i0,
            D: s0
          });
        }, {
          name: "d",
          path: "a",
          vueId: "eca06f3c-0"
        }),
        b: common_vendor.sr(udb, "eca06f3c-0", {
          "k": "udb"
        }),
        c: common_vendor.p({
          collection: "opendb-news-articles,uni-id-users",
          getone: true,
          where: `_id=='${id.value}'`,
          field: "_id,title,content,publish_date,publish_ip,view_count,user_id{username,nickname,avatar_file}"
        }),
        d: common_vendor.f(common_vendor.unref(commentList).slice(0, 3), (obj, k0, i0) => {
          return {
            a: obj._id,
            b: "eca06f3c-10-" + i0 + ",eca06f3c-9",
            c: common_vendor.p({
              obj
            })
          };
        }),
        e: common_vendor.o(($event) => commentAdd()),
        f: common_vendor.o(($event) => common_vendor.unref(reply).comment_content = $event),
        g: common_vendor.p({
          placeholder: common_vendor.unref(placeholder),
          ["search-icon"]: "chat",
          shape: "square",
          ["border-color"]: "black",
          height: "80",
          ["action-text"]: "评论",
          modelValue: common_vendor.unref(reply).comment_content
        }),
        h: common_vendor.o(($event) => close()),
        i: common_vendor.p({
          show: common_vendor.unref(show).commentList,
          mode: "bottom",
          closeIconPos: "top-right",
          closeable: true
        }),
        j: common_vendor.p({
          ["scroll-top"]: common_vendor.unref(scrollTop)
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-eca06f3c"]]);
_sfc_main.__runtimeHooks = 1;
wx.createPage(MiniProgramPage);
