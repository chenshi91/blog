"use strict";
const common_vendor = require("../../common/vendor.js");
const js_sdk_validator_opendbNewsArticles = require("../../js_sdk/validator/opendb-news-articles.js");
const db = common_vendor.Vs.database();
const dbCollectionName = "opendb-news-articles";
function getValidator(fields) {
  let result = {};
  for (let key in js_sdk_validator_opendbNewsArticles.validator) {
    if (fields.indexOf(key) > -1) {
      result[key] = js_sdk_validator_opendbNewsArticles.validator[key];
    }
  }
  return result;
}
const _sfc_main = {
  data() {
    let formData = {
      "user_id": "",
      "title": "",
      "article_status": 0,
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
      db.collection(dbCollectionName).doc(id).field("user_id,title,article_status,last_modify_date,last_modify_ip,mode").get().then((res) => {
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
  const _easycom_uni_data_picker2 = common_vendor.resolveComponent("uni-data-picker");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  const _component_undefined = common_vendor.resolveComponent("undefined");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_data_picker2 + _easycom_uni_forms_item2 + _easycom_uni_easyinput2 + _easycom_uni_data_checkbox2 + _easycom_uni_datetime_picker2 + _component_undefined + _easycom_uni_forms2)();
}
const _easycom_uni_data_picker = () => "../../uni_modules/uni-data-picker/components/uni-data-picker/uni-data-picker.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_data_checkbox = () => "../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_datetime_picker = () => "../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_data_picker + _easycom_uni_forms_item + _easycom_uni_easyinput + _easycom_uni_data_checkbox + _easycom_uni_datetime_picker + _easycom_uni_forms)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.formData.user_id = $event),
    b: common_vendor.p({
      collection: "uni-id-users",
      field: "username as text,_id as value",
      modelValue: $data.formData.user_id
    }),
    c: common_vendor.p({
      name: "user_id",
      label: "发布者",
      required: true
    }),
    d: common_vendor.o(($event) => $data.formData.title = $event),
    e: common_vendor.p({
      placeholder: "标题",
      trim: "both",
      modelValue: $data.formData.title
    }),
    f: common_vendor.p({
      name: "title",
      label: "标题",
      required: true
    }),
    g: common_vendor.o(($event) => $data.formData.article_status = $event),
    h: common_vendor.p({
      localdata: $data.formOptions.article_status_localdata,
      modelValue: $data.formData.article_status
    }),
    i: common_vendor.p({
      name: "article_status",
      label: "文章状态"
    }),
    j: common_vendor.o(($event) => $data.formData.last_modify_date = $event),
    k: common_vendor.p({
      ["return-type"]: "timestamp",
      modelValue: $data.formData.last_modify_date
    }),
    l: common_vendor.p({
      name: "last_modify_date",
      label: "最后修改时间"
    }),
    m: common_vendor.o(($event) => $data.formData.last_modify_ip = $event),
    n: common_vendor.p({
      placeholder: "最后修改时 IP 地址",
      modelValue: $data.formData.last_modify_ip
    }),
    o: common_vendor.p({
      name: "last_modify_ip",
      label: ""
    }),
    p: common_vendor.o(($event) => $data.formData.mode = $event),
    q: common_vendor.p({
      modelValue: $data.formData.mode
    }),
    r: common_vendor.p({
      name: "mode",
      label: "排版显示模式"
    }),
    s: common_vendor.o((...args) => $options.submit && $options.submit(...args)),
    t: common_vendor.sr("form", "47a2e5c4-0"),
    v: common_vendor.p({
      model: $data.formData,
      ["validate-trigger"]: "submit",
      ["err-show-type"]: "toast"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
