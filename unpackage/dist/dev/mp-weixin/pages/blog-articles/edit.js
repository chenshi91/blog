"use strict";
const common_vendor = require("../../common/vendor.js");
const js_sdk_validator_blogArticles = require("../../js_sdk/validator/blog-articles.js");
const db = common_vendor.Vs.database();
const dbCollectionName = "blog-articles";
function getValidator(fields) {
  let result = {};
  for (let key in js_sdk_validator_blogArticles.validator) {
    if (fields.indexOf(key) > -1) {
      result[key] = js_sdk_validator_blogArticles.validator[key];
    }
  }
  return result;
}
const _sfc_main = {
  data() {
    let formData = {
      "user_id": "",
      "category_id": "",
      "title": "",
      "desc": "",
      "content": "",
      "excerpt": "",
      "article_status": 0,
      "view_count": 22,
      "like_count": 0,
      "is_sticky": null,
      "is_essence": null,
      "comment_status": null,
      "comment_count": 0,
      "last_comment_user_id": "",
      "avatar": [],
      "publish_date": null,
      "publish_ip": "",
      "last_modify_date": null,
      "last_modify_ip": "",
      "mode": null
    };
    return {
      formData,
      formOptions: {
        "article_status_localdata": [
          {
            "value": 0,
            "text": "草稿箱"
          },
          {
            "value": 1,
            "text": "已发布"
          }
        ],
        "comment_status_localdata": [
          {
            "value": 0,
            "text": "关闭"
          },
          {
            "value": 1,
            "text": "开放"
          }
        ]
      },
      rules: {
        ...getValidator(Object.keys(formData))
      }
    };
  },
  onLoad(e) {
    if (e.id) {
      const id = e.id;
      this.formDataId = id;
      this.getDetail(id);
    }
  },
  onReady() {
    this.$refs.form.setRules(this.rules);
  },
  methods: {
    /**
     * 验证表单并提交
     */
    submit() {
      common_vendor.index.showLoading({
        mask: true
      });
      this.$refs.form.validate().then((res) => {
        return this.submitForm(res);
      }).catch(() => {
      }).finally(() => {
        common_vendor.index.hideLoading();
      });
    },
    /**
     * 提交表单
     */
    submitForm(value) {
      return db.collection(dbCollectionName).doc(this.formDataId).update(value).then((res) => {
        common_vendor.index.showToast({
          icon: "none",
          title: "修改成功"
        });
        this.getOpenerEventChannel().emit("refreshData");
        setTimeout(() => common_vendor.index.navigateBack(), 500);
      }).catch((err) => {
        common_vendor.index.showModal({
          content: err.message || "请求服务失败",
          showCancel: false
        });
      });
    },
    /**
     * 获取表单数据
     * @param {Object} id
     */
    getDetail(id) {
      common_vendor.index.showLoading({
        mask: true
      });
      db.collection(dbCollectionName).doc(id).field("user_id,category_id,title,desc,content,excerpt,article_status,view_count,like_count,is_sticky,is_essence,comment_status,comment_count,last_comment_user_id,avatar,publish_date,publish_ip,last_modify_date,last_modify_ip,mode").get().then((res) => {
        const data = res.result.data[0];
        if (data) {
          this.formData = data;
        }
      }).catch((err) => {
        common_vendor.index.showModal({
          content: err.message || "请求服务失败",
          showCancel: false
        });
      }).finally(() => {
        common_vendor.index.hideLoading();
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_data_picker2 = common_vendor.resolveComponent("uni-data-picker");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  const _component_undefined = common_vendor.resolveComponent("undefined");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_data_picker2 + _easycom_uni_data_checkbox2 + _easycom_uni_datetime_picker2 + _component_undefined + _easycom_uni_forms2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_data_picker = () => "../../uni_modules/uni-data-picker/components/uni-data-picker/uni-data-picker.js";
const _easycom_uni_data_checkbox = () => "../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_datetime_picker = () => "../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_data_picker + _easycom_uni_data_checkbox + _easycom_uni_datetime_picker + _easycom_uni_forms)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.formData.user_id = $event),
    b: common_vendor.p({
      placeholder: "文章作者ID， 参考`uni-id-users` 表",
      modelValue: $data.formData.user_id
    }),
    c: common_vendor.p({
      name: "user_id",
      label: "",
      required: true
    }),
    d: common_vendor.o(($event) => $data.formData.category_id = $event),
    e: common_vendor.p({
      collection: "opendb-news-categories",
      field: "name as text, _id as value",
      modelValue: $data.formData.category_id
    }),
    f: common_vendor.p({
      name: "category_id",
      label: "分类"
    }),
    g: common_vendor.o(($event) => $data.formData.title = $event),
    h: common_vendor.p({
      placeholder: "标题",
      trim: "both",
      modelValue: $data.formData.title
    }),
    i: common_vendor.p({
      name: "title",
      label: "标题",
      required: true
    }),
    j: common_vendor.o(($event) => $data.formData.desc = $event),
    k: common_vendor.p({
      placeholder: "文章摘要",
      trim: "both",
      modelValue: $data.formData.desc
    }),
    l: common_vendor.p({
      name: "desc",
      label: "文章摘要"
    }),
    m: common_vendor.o(($event) => $data.formData.content = $event),
    n: common_vendor.p({
      placeholder: "文章内容",
      trim: "right",
      modelValue: $data.formData.content
    }),
    o: common_vendor.p({
      name: "content",
      label: "文章内容",
      required: true
    }),
    p: common_vendor.o(($event) => $data.formData.excerpt = $event),
    q: common_vendor.p({
      placeholder: "文章摘录",
      trim: "both",
      modelValue: $data.formData.excerpt
    }),
    r: common_vendor.p({
      name: "excerpt",
      label: "文章摘录"
    }),
    s: common_vendor.o(($event) => $data.formData.article_status = $event),
    t: common_vendor.p({
      localdata: $data.formOptions.article_status_localdata,
      modelValue: $data.formData.article_status
    }),
    v: common_vendor.p({
      name: "article_status",
      label: "文章状态"
    }),
    w: common_vendor.o(($event) => $data.formData.view_count = $event),
    x: common_vendor.p({
      placeholder: "阅读数量",
      type: "number",
      modelValue: $data.formData.view_count
    }),
    y: common_vendor.p({
      name: "view_count",
      label: "阅读数量"
    }),
    z: common_vendor.o(($event) => $data.formData.like_count = $event),
    A: common_vendor.p({
      placeholder: "喜欢数、点赞数",
      type: "number",
      modelValue: $data.formData.like_count
    }),
    B: common_vendor.p({
      name: "like_count",
      label: ""
    }),
    C: common_vendor.o(($event) => _ctx.binddata("is_sticky", $event.detail.value)),
    D: $data.formData.is_sticky,
    E: common_vendor.p({
      name: "is_sticky",
      label: "是否置顶"
    }),
    F: common_vendor.o(($event) => _ctx.binddata("is_essence", $event.detail.value)),
    G: $data.formData.is_essence,
    H: common_vendor.p({
      name: "is_essence",
      label: "阅读加精"
    }),
    I: common_vendor.o(($event) => $data.formData.comment_status = $event),
    J: common_vendor.p({
      localdata: $data.formOptions.comment_status_localdata,
      modelValue: $data.formData.comment_status
    }),
    K: common_vendor.p({
      name: "comment_status",
      label: "开放评论"
    }),
    L: common_vendor.o(($event) => $data.formData.comment_count = $event),
    M: common_vendor.p({
      placeholder: "评论数量",
      type: "number",
      modelValue: $data.formData.comment_count
    }),
    N: common_vendor.p({
      name: "comment_count",
      label: ""
    }),
    O: common_vendor.o(($event) => $data.formData.last_comment_user_id = $event),
    P: common_vendor.p({
      placeholder: "最后回复用户 id，参考`uni-id-users` 表",
      modelValue: $data.formData.last_comment_user_id
    }),
    Q: common_vendor.p({
      name: "last_comment_user_id",
      label: ""
    }),
    R: common_vendor.o(($event) => $data.formData.avatar = $event),
    S: common_vendor.p({
      multiple: true,
      modelValue: $data.formData.avatar
    }),
    T: common_vendor.p({
      name: "avatar",
      label: "封面大图"
    }),
    U: common_vendor.o(($event) => $data.formData.publish_date = $event),
    V: common_vendor.p({
      ["return-type"]: "timestamp",
      modelValue: $data.formData.publish_date
    }),
    W: common_vendor.p({
      name: "publish_date",
      label: "发表时间"
    }),
    X: common_vendor.o(($event) => $data.formData.publish_ip = $event),
    Y: common_vendor.p({
      placeholder: "发表时 IP 地址",
      modelValue: $data.formData.publish_ip
    }),
    Z: common_vendor.p({
      name: "publish_ip",
      label: "发布文章时IP地址"
    }),
    aa: common_vendor.o(($event) => $data.formData.last_modify_date = $event),
    ab: common_vendor.p({
      ["return-type"]: "timestamp",
      modelValue: $data.formData.last_modify_date
    }),
    ac: common_vendor.p({
      name: "last_modify_date",
      label: "最后修改时间"
    }),
    ad: common_vendor.o(($event) => $data.formData.last_modify_ip = $event),
    ae: common_vendor.p({
      placeholder: "最后修改时 IP 地址",
      modelValue: $data.formData.last_modify_ip
    }),
    af: common_vendor.p({
      name: "last_modify_ip",
      label: ""
    }),
    ag: common_vendor.o(($event) => $data.formData.mode = $event),
    ah: common_vendor.p({
      modelValue: $data.formData.mode
    }),
    ai: common_vendor.p({
      name: "mode",
      label: "排版显示模式"
    }),
    aj: common_vendor.o((...args) => $options.submit && $options.submit(...args)),
    ak: common_vendor.sr("form", "93fc44f8-0"),
    al: common_vendor.p({
      model: $data.formData,
      ["validate-trigger"]: "submit",
      ["err-show-type"]: "toast"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
