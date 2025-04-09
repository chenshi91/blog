"use strict";
const common_vendor = require("../../common/vendor.js");
const js_sdk_validator_blogLike = require("../../js_sdk/validator/blog-like.js");
const db = common_vendor.Vs.database();
const dbCollectionName = "blog-like";
function getValidator(fields) {
  let result = {};
  for (let key in js_sdk_validator_blogLike.validator) {
    if (fields.indexOf(key) > -1) {
      result[key] = js_sdk_validator_blogLike.validator[key];
    }
  }
  return result;
}
const _sfc_main = {
  data() {
    let formData = {
      "article_id": "",
      "publish_date": null,
      "user_id": ""
    };
    return {
      formData,
      formOptions: {},
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
      db.collection(dbCollectionName).doc(id).field("article_id,publish_date,user_id").get().then((res) => {
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
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_datetime_picker2 + _easycom_uni_forms2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_datetime_picker = () => "../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_datetime_picker + _easycom_uni_forms)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.formData.article_id = $event),
    b: common_vendor.p({
      placeholder: "文章ID",
      modelValue: $data.formData.article_id
    }),
    c: common_vendor.p({
      name: "article_id",
      label: "",
      required: true
    }),
    d: common_vendor.o(($event) => $data.formData.publish_date = $event),
    e: common_vendor.p({
      ["return-type"]: "timestamp",
      modelValue: $data.formData.publish_date
    }),
    f: common_vendor.p({
      name: "publish_date",
      label: "发表时间"
    }),
    g: common_vendor.o(($event) => $data.formData.user_id = $event),
    h: common_vendor.p({
      placeholder: "评论者ID，参考`uni-id-users` 表",
      modelValue: $data.formData.user_id
    }),
    i: common_vendor.p({
      name: "user_id",
      label: "",
      required: true
    }),
    j: common_vendor.o((...args) => $options.submit && $options.submit(...args)),
    k: common_vendor.sr("form", "1ce3e52c-0"),
    l: common_vendor.p({
      model: $data.formData,
      ["validate-trigger"]: "submit",
      ["err-show-type"]: "toast"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
