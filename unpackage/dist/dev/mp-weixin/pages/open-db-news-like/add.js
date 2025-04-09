"use strict";
const common_vendor = require("../../common/vendor.js");
const js_sdk_validator_openDbNewsLike = require("../../js_sdk/validator/open-db-news-like.js");
const db = common_vendor.Vs.database();
const dbCollectionName = "open-db-news-like";
function getValidator(fields) {
  let result = {};
  for (let key in js_sdk_validator_openDbNewsLike.validator) {
    if (fields.indexOf(key) > -1) {
      result[key] = js_sdk_validator_openDbNewsLike.validator[key];
    }
  }
  return result;
}
const _sfc_main = {
  data() {
    let formData = {
      "article_id": "",
      "comments_id": "",
      "like_type": null,
      "status": null,
      "user_id": "",
      "create_date": null
    };
    return {
      formData,
      formOptions: {
        "like_type_localdata": [
          {
            "text": "文章的点赞",
            "value": 0
          },
          {
            "text": "评论的点赞",
            "value": 1
          }
        ],
        "status_localdata": [
          {
            "text": "赞一下",
            "value": 0
          },
          {
            "text": "不表态",
            "value": 1
          },
          {
            "text": "踩一下",
            "value": 2
          }
        ]
      },
      rules: {
        ...getValidator(Object.keys(formData))
      }
    };
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
      return db.collection(dbCollectionName).add(value).then((res) => {
        common_vendor.index.showToast({
          icon: "none",
          title: "新增成功"
        });
        this.getOpenerEventChannel().emit("refreshData");
        setTimeout(() => common_vendor.index.navigateBack(), 500);
      }).catch((err) => {
        common_vendor.index.showModal({
          content: err.message || "请求服务失败",
          showCancel: false
        });
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_data_picker2 = common_vendor.resolveComponent("uni-data-picker");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_data_picker2 + _easycom_uni_forms_item2 + _easycom_uni_data_checkbox2 + _easycom_uni_datetime_picker2 + _easycom_uni_forms2)();
}
const _easycom_uni_data_picker = () => "../../uni_modules/uni-data-picker/components/uni-data-picker/uni-data-picker.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_data_checkbox = () => "../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_datetime_picker = () => "../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_data_picker + _easycom_uni_forms_item + _easycom_uni_data_checkbox + _easycom_uni_datetime_picker + _easycom_uni_forms)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.formData.article_id = $event),
    b: common_vendor.p({
      collection: "opendb-news-articles",
      field: "title as text, _id as value",
      modelValue: $data.formData.article_id
    }),
    c: common_vendor.p({
      name: "article_id",
      label: "文章"
    }),
    d: common_vendor.o(($event) => $data.formData.comments_id = $event),
    e: common_vendor.p({
      collection: "opendb-news-comments",
      field: "comment_content as text, _id as value",
      modelValue: $data.formData.comments_id
    }),
    f: common_vendor.p({
      name: "comments_id",
      label: "评论"
    }),
    g: common_vendor.o(($event) => $data.formData.like_type = $event),
    h: common_vendor.p({
      localdata: $data.formOptions.like_type_localdata,
      modelValue: $data.formData.like_type
    }),
    i: common_vendor.p({
      name: "like_type",
      label: "点赞类型"
    }),
    j: common_vendor.o(($event) => $data.formData.status = $event),
    k: common_vendor.p({
      localdata: $data.formOptions.status_localdata,
      modelValue: $data.formData.status
    }),
    l: common_vendor.p({
      name: "status",
      label: "点赞状态"
    }),
    m: common_vendor.o(($event) => $data.formData.user_id = $event),
    n: common_vendor.p({
      collection: "uni-id-users",
      field: "username as text,_id as value",
      modelValue: $data.formData.user_id
    }),
    o: common_vendor.p({
      name: "user_id",
      label: "用户"
    }),
    p: common_vendor.o(($event) => $data.formData.create_date = $event),
    q: common_vendor.p({
      ["return-type"]: "timestamp",
      modelValue: $data.formData.create_date
    }),
    r: common_vendor.p({
      name: "create_date",
      label: ""
    }),
    s: common_vendor.o((...args) => $options.submit && $options.submit(...args)),
    t: common_vendor.sr("form", "6e831b74-0"),
    v: common_vendor.p({
      model: $data.formData,
      ["validate-trigger"]: "submit",
      ["err-show-type"]: "toast"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
