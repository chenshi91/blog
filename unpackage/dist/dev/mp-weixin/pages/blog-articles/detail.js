"use strict";
const common_vendor = require("../../common/vendor.js");
const js_sdk_validator_blogArticles = require("../../js_sdk/validator/blog-articles.js");
const db = common_vendor.Vs.database();
const _sfc_main = {
  data() {
    return {
      queryWhere: "",
      collectionList: [db.collection("blog-articles").field("user_id,category_id,title,desc,content,excerpt,article_status,view_count,like_count,is_sticky,is_essence,comment_status,comment_count,last_comment_user_id,avatar,publish_date,publish_ip,last_modify_date,last_modify_ip,mode").getTemp(), db.collection("opendb-news-categories").field("name as text, _id").getTemp()],
      loadMore: {
        contentdown: "",
        contentrefresh: "",
        contentnomore: ""
      },
      options: {
        // 将scheme enum 属性静态数据中的value转成text
        ...js_sdk_validator_blogArticles.enumConverter
      }
    };
  },
  onLoad(e) {
    this._id = e.id;
  },
  onReady() {
    if (this._id) {
      this.collectionList = [db.collection("blog-articles").where('_id=="' + this._id + '"').field("user_id,category_id,title,desc,content,excerpt,article_status,view_count,like_count,is_sticky,is_essence,comment_status,comment_count,last_comment_user_id,avatar,publish_date,publish_ip,last_modify_date,last_modify_ip,mode").getTemp(), db.collection("opendb-news-categories").field("name as text, _id").getTemp()];
    }
  },
  methods: {
    handleUpdate() {
      common_vendor.index.navigateTo({
        url: "./edit?id=" + this._id,
        events: {
          // 监听修改页面成功修改数据后, 刷新当前页面数据
          refreshData: () => {
            this.$refs.udb.loadData({
              clear: true
            });
          }
        }
      });
    },
    handleDelete() {
      this.$refs.udb.remove(this._id, {
        success: (res) => {
          common_vendor.index.navigateTo({
            url: "./list"
          });
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_unicloud_db2 = common_vendor.resolveComponent("unicloud-db");
  (_easycom_uni_load_more2 + _easycom_uni_dateformat2 + _easycom_unicloud_db2)();
}
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_unicloud_db = () => "../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js";
if (!Math) {
  (_easycom_uni_load_more + _easycom_uni_dateformat + _easycom_unicloud_db)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.w(({
      data,
      loading,
      error,
      options
    }, s0, i0) => {
      return common_vendor.e({
        a: error
      }, error ? {
        b: common_vendor.t(error.message)
      } : loading ? {
        d: "6ad9c86a-1-" + i0 + ",6ad9c86a-0",
        e: common_vendor.p({
          contentText: $data.loadMore,
          status: "loading"
        })
      } : data ? {
        g: common_vendor.t(data.user_id),
        h: common_vendor.t(data.category_id && data.category_id[0] && data.category_id[0].text),
        i: common_vendor.t(data.title),
        j: common_vendor.t(data.desc),
        k: common_vendor.t(data.content),
        l: common_vendor.t(data.excerpt),
        m: common_vendor.t(options.article_status_valuetotext[data.article_status]),
        n: common_vendor.t(data.view_count),
        o: common_vendor.t(data.like_count),
        p: common_vendor.t(data.is_sticky == true ? "✅" : "❌"),
        q: common_vendor.t(data.is_essence == true ? "✅" : "❌"),
        r: common_vendor.t(options.comment_status_valuetotext[data.comment_status]),
        s: common_vendor.t(data.comment_count),
        t: common_vendor.t(data.last_comment_user_id),
        v: common_vendor.t(data.avatar),
        w: "6ad9c86a-2-" + i0 + ",6ad9c86a-0",
        x: common_vendor.p({
          threshold: [0, 0],
          date: data.publish_date
        }),
        y: common_vendor.t(data.publish_ip),
        z: "6ad9c86a-3-" + i0 + ",6ad9c86a-0",
        A: common_vendor.p({
          threshold: [0, 0],
          date: data.last_modify_date
        }),
        B: common_vendor.t(data.last_modify_ip),
        C: common_vendor.t(data.mode)
      } : {}, {
        c: loading,
        f: data,
        D: i0,
        E: s0
      });
    }, {
      name: "d",
      path: "a",
      vueId: "6ad9c86a-0"
    }),
    b: common_vendor.sr("udb", "6ad9c86a-0"),
    c: common_vendor.p({
      options: $data.options,
      collection: $data.collectionList,
      getone: true,
      manual: true
    }),
    d: common_vendor.o((...args) => $options.handleUpdate && $options.handleUpdate(...args)),
    e: common_vendor.o((...args) => $options.handleDelete && $options.handleDelete(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
