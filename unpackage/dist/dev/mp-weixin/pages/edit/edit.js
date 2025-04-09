"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_tools = require("../../utils/tools.js");
if (!Array) {
  const _easycom_u_input2 = common_vendor.resolveComponent("u-input");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  (_easycom_u_input2 + _easycom_u_button2)();
}
const _easycom_u_input = () => "../../uni_modules/uview-plus/components/u-input/u-input.js";
const _easycom_u_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (_easycom_u_input + _easycom_u_button)();
}
const _sfc_main = {
  __name: "edit",
  setup(__props) {
    common_vendor.ref(10);
    let iconShow = common_vendor.ref(false);
    let iconFocusNum = common_vendor.ref(100);
    let blog = common_vendor.reactive({
      title: "",
      content: "",
      desc: "",
      //封面大图
      avatar: []
    });
    common_vendor.onLoad(() => {
      console.log("onload...");
      const data = utils_tools.getBlogList();
      console.log(data);
    });
    function readyBlog() {
      console.log("readblog...");
      common_vendor.index.createSelectorQuery().select(".editBlog").context((res) => {
        this.editorCtx = res.context;
      }).exec();
    }
    function focusBlog() {
      console.log("focus...");
      iconShow.value = true;
    }
    function funIcon(e) {
      console.log("index:", e.target.dataset.index);
      const index = e.target.dataset.index;
      switch (index) {
        case "0":
          console.log("h...");
          if (iconFocusNum.value == 0) {
            iconFocusNum.value = 100;
            break;
          }
          iconFocusNum.value = 0;
          this.editorCtx.format("header", "H2");
          this.editorCtx.format("color", "#4cd964");
          break;
        case "1":
          console.log("倾斜...");
          if (iconFocusNum.value == 1) {
            iconFocusNum.value = 100;
            break;
          }
          iconFocusNum.value = 1;
          this.editorCtx.insertImage({
            src: "https://hbimg.b0.upaiyun.com/8a1321f1d5a9a04a7f8078497260e55fbd8894e19f268-d1Qqyd_fw658"
          });
          break;
        case "2":
          console.log("jiacu...");
          if (iconFocusNum.value == 2) {
            iconFocusNum.value = 100;
            break;
          }
          iconFocusNum.value = 2;
          break;
        case "4":
          if (iconFocusNum.value == 4) {
            iconFocusNum.value = 100;
            break;
          }
          iconFocusNum.value == 4;
          common_vendor.index.chooseImage({}).then((res) => {
            console.log("我现在看...", res);
            const imgList = res.tempFiles;
            imgList.forEach((img, index2) => {
              common_vendor.index.showLoading({
                title: "正在上传第" + (index2 + 1) + "张图片..."
              });
              common_vendor.Vs.uploadFile({
                // url:"https://u.object.cloudrun.cloudbaseapp.cn",
                filePath: img.path,
                cloudPath: img.name,
                fileType: "image",
                onUploadProgress(a, b) {
                  const res2 = (a.loaded / a.total * 100).toFixed(2) + "%";
                  common_vendor.index.showToast({
                    title: "正在上传第" + (index2 + 1) + "张图片,进度条:" + res2,
                    icon: "loading"
                  });
                }
              }).then((res2) => {
                console.log(res2);
                this.editorCtx.insertImage({
                  src: res2.fileID
                  // src:"http://u.object.cloudrun.cloudbaseapp.cn/env-00jxgsabub39/360截图20240410223221.png",
                  // src:"https://hbimg.b0.upaiyun.com/8a1321f1d5a9a04a7f8078497260e55fbd8894e19f268-d1Qqyd_fw658"
                });
                blog.avatar.push(res2.fileID);
              }).catch((err) => {
                console.log(err.message);
              }).finally(() => {
                common_vendor.index.showToast({
                  title: "图片上传ok!",
                  duration: 2e3
                });
                setTimeout(() => {
                  common_vendor.index.hideLoading();
                }, 2e3);
              });
            });
          });
      }
    }
    const db = common_vendor.Vs.database();
    function blogAdd() {
      this.editorCtx.getContents({
        success: (res) => {
          blog.content = res.html;
          blog.desc = res.text.slice(0, 30);
        }
      });
      console.log("blog add", blog);
      db.collection("blog-articles").add({
        ...blog
      }).then((res) => {
        common_vendor.index.showToast({
          "title": "文章发布成功",
          "duration": 2e3
        });
      }).catch((err) => {
        common_vendor.index.showToast({
          title: err.message,
          icon: "error"
        });
      }).finally(() => {
        setTimeout(() => {
          common_vendor.index.hideToast();
        }, 2e3);
      });
      common_vendor.index.reLaunch({
        url: "/pages/index/index"
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => common_vendor.unref(blog).title = $event),
        b: common_vendor.p({
          placeholder: "请输入标题...",
          modelValue: common_vendor.unref(blog).title
        }),
        c: common_vendor.o(($event) => focusBlog()),
        d: common_vendor.o(($event) => readyBlog()),
        e: common_vendor.o(($event) => blogAdd()),
        f: common_vendor.p({
          type: "primary",
          disabled: common_vendor.unref(blog).title == ""
        }),
        g: common_vendor.n(common_vendor.unref(iconFocusNum) == 0 ? "active" : ""),
        h: common_vendor.n(common_vendor.unref(iconFocusNum) == 1 ? "active" : ""),
        i: common_vendor.n(common_vendor.unref(iconFocusNum) == 2 ? "active" : ""),
        j: common_vendor.n(common_vendor.unref(iconFocusNum) == 3 ? "active" : ""),
        k: common_vendor.n(common_vendor.unref(iconFocusNum) == 4 ? "active" : ""),
        l: common_vendor.n(common_vendor.unref(iconFocusNum) == 5 ? "active" : ""),
        m: common_vendor.unref(iconShow),
        n: common_vendor.o(($event) => funIcon($event))
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2491cc6e"]]);
wx.createPage(MiniProgramPage);
