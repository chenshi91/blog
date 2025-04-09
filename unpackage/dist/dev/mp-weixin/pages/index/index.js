"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_u_skeleton2 = common_vendor.resolveComponent("u-skeleton");
  const _easycom_u_tabs2 = common_vendor.resolveComponent("u-tabs");
  const _easycom_unicloud_db2 = common_vendor.resolveComponent("unicloud-db");
  const _easycom_blog2 = common_vendor.resolveComponent("blog");
  (_easycom_u_skeleton2 + _easycom_u_tabs2 + _easycom_unicloud_db2 + _easycom_blog2)();
}
const _easycom_u_skeleton = () => "../../uni_modules/uview-plus/components/u-skeleton/u-skeleton.js";
const _easycom_u_tabs = () => "../../uni_modules/uview-plus/components/u-tabs/u-tabs.js";
const _easycom_unicloud_db = () => "../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js";
const _easycom_blog = () => "../../components/blog/blog.js";
if (!Math) {
  (_easycom_u_skeleton + _easycom_u_tabs + _easycom_unicloud_db + _easycom_blog)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    let where = common_vendor.ref("article_status==1");
    let udb = common_vendor.ref();
    function tabsFun(e) {
      if ("全部" == e.name) {
        where.value = "article_status==1";
        return;
      }
      where.value = "article_status==1&&category_id=='" + e._id + "'";
    }
    let statu_load = common_vendor.ref(true);
    common_vendor.ref(false);
    let blogList = common_vendor.reactive([]);
    const db = common_vendor.Vs.database();
    common_vendor.onLoad(() => {
      reqBlogList("publish_date");
    });
    common_vendor.onReady(() => {
      console.log(" read udb=", udb.value);
      udb.value.dataList.unshift({
        id: "001",
        name: "全部",
        status: true
      });
    });
    function reqBlogList(oderProperties) {
      blogList.splice(0);
      const blogTem = db.collection("blog-articles").field("title,content,desc,user_id,publish_date,avatar,comment_count,like_count,view_count").orderBy(oderProperties, "desc").getTemp();
      const userTem = db.collection("uni-id-users").field("_id,nickname,username,avatar_file").getTemp();
      db.collection(blogTem, userTem).get().then((res) => {
        console.log(res);
        res.result.data.forEach((item) => {
          blogList.push(item);
        });
        statu_load.value = false;
        console.log(blogList);
      }).catch((err) => {
        console.log(err.message);
        common_vendor.index.showToast({
          title: err.message,
          icon: error
        });
      }).finally(() => {
        console.log("...end");
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.w(({
          data,
          pagination,
          loading,
          error: error2
        }, s0, i0) => {
          return common_vendor.e({
            a: error2
          }, error2 ? {
            b: common_vendor.t(error2.message)
          } : loading ? {
            d: common_vendor.f(7, (obj, k1, i1) => {
              return {
                a: "1cf27b2a-1-" + i0 + "-" + i1 + ",1cf27b2a-0"
              };
            }),
            e: common_vendor.p({
              rows: "5",
              title: true,
              loading: true,
              avatar: true,
              animate: true
            })
          } : {
            f: common_vendor.o(($event) => tabsFun($event)),
            g: "1cf27b2a-2-" + i0 + ",1cf27b2a-0",
            h: common_vendor.p({
              list: data,
              activeStyle: {
                fontWeight: "bolt",
                color: "#4cd964",
                transform: "scale(1.2)"
              }
            })
          }, {
            c: loading,
            i: i0,
            j: s0
          });
        }, {
          name: "d",
          path: "a",
          vueId: "1cf27b2a-0"
        }),
        b: common_vendor.sr(udb, "1cf27b2a-0", {
          "k": "udb"
        }),
        c: common_vendor.p({
          collection: "opendb-news-categories",
          field: "name,sort,status",
          where: "status==true",
          orderby: "sort desc"
        }),
        d: common_vendor.w(({
          data,
          pagination,
          loading,
          error: error2
        }, s0, i0) => {
          return common_vendor.e({
            a: error2
          }, error2 ? {
            b: common_vendor.t(error2.message)
          } : loading ? {
            d: "1cf27b2a-4-" + i0 + ",1cf27b2a-3",
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
                b: "1cf27b2a-5-" + i0 + "-" + i1 + ",1cf27b2a-3",
                c: common_vendor.p({
                  item
                })
              };
            })
          }, {
            c: loading,
            g: i0,
            h: s0
          });
        }, {
          name: "d",
          path: "d",
          vueId: "1cf27b2a-3"
        }),
        e: common_vendor.p({
          collection: "opendb-news-articles,uni-id-users",
          field: "title,content,category_id,excerpt,view_count,publish_date,user_id{username,_id,avatar_file}",
          where: common_vendor.unref(where),
          orderby: "publish_date desc"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
