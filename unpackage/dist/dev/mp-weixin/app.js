"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const utils_pushUtil = require("./utils/pushUtil.js");
const uni_modules_uviewPlus_index = require("./uni_modules/uview-plus/index.js");
if (!Math) {
  "./pages/index/index.js";
  "./uni_modules/uni-id-pages/pages/userinfo/deactivate/deactivate.js";
  "./uni_modules/uni-id-pages/pages/userinfo/userinfo.js";
  "./uni_modules/uni-id-pages/pages/userinfo/bind-mobile/bind-mobile.js";
  "./uni_modules/uni-id-pages/pages/userinfo/cropImage/cropImage.js";
  "./uni_modules/uni-id-pages/pages/login/login-withoutpwd.js";
  "./uni_modules/uni-id-pages/pages/login/login-withpwd.js";
  "./uni_modules/uni-id-pages/pages/login/login-smscode.js";
  "./uni_modules/uni-id-pages/pages/register/register.js";
  "./uni_modules/uni-id-pages/pages/register/register-by-email.js";
  "./uni_modules/uni-id-pages/pages/retrieve/retrieve.js";
  "./uni_modules/uni-id-pages/pages/retrieve/retrieve-by-email.js";
  "./uni_modules/uni-id-pages/pages/common/webview/webview.js";
  "./uni_modules/uni-id-pages/pages/userinfo/change_pwd/change_pwd.js";
  "./uni_modules/uni-id-pages/pages/register/register-admin.js";
  "./uni_modules/uni-id-pages/pages/userinfo/set-pwd/set-pwd.js";
  "./uni_modules/uni-id-pages/pages/userinfo/realname-verify/realname-verify.js";
  "./pages/topicAdd/topicAdd.js";
  "./pages/topicList/topicList.js";
  "./pages/self/self.js";
  "./pages/edit/edit.js";
  "./pages/detail/detail.js";
  "./pages/blog-articles/add.js";
  "./pages/blog-articles/edit.js";
  "./pages/blog-articles/list.js";
  "./pages/blog-articles/detail.js";
  "./pages/blog-like/add.js";
  "./pages/blog-like/edit.js";
  "./pages/blog-like/list.js";
  "./pages/blog-like/detail.js";
  "./pages/demo/demo.js";
  "./pages/opendb-news-articles/add.js";
  "./pages/opendb-news-articles/edit.js";
  "./pages/opendb-news-articles/list.js";
  "./pages/opendb-news-articles/detail.js";
  "./pages/open-db-news-like/add.js";
  "./pages/open-db-news-like/edit.js";
  "./pages/open-db-news-like/list.js";
  "./pages/open-db-news-like/detail.js";
  "./uni_modules/uni-feedback/pages/opendb-feedback/opendb-feedback.js";
  "./pages/about/about.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
    utils_pushUtil.pushUtil();
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.use(uni_modules_uviewPlus_index.uviewPlus);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
