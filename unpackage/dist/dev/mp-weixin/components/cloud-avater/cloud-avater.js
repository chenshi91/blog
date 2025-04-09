"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "cloud-image",
  emits: ["click"],
  props: {
    mode: {
      type: String,
      default() {
        return "widthFix";
      }
    },
    src: {
      // type:String,
      default() {
        return "";
      }
    },
    width: {
      type: String,
      default() {
        return "100rpx";
      }
    },
    height: {
      type: String,
      default() {
        return "100rpx";
      }
    }
  },
  watch: {
    src: {
      handler(src) {
        if (src && src.substring(0, 8) == "cloud://") {
          common_vendor.Vs.getTempFileURL({
            fileList: [src]
          }).then((res) => {
            this.cSrc = res.fileList[0].tempFileURL;
          });
        } else {
          this.cSrc = src;
        }
      },
      immediate: true
    }
  },
  methods: {
    onClick() {
      this.$emit("click");
    }
  },
  data() {
    return {
      cSrc: false
    };
  }
};
if (!Array) {
  const _easycom_u_avatar2 = common_vendor.resolveComponent("u-avatar");
  _easycom_u_avatar2();
}
const _easycom_u_avatar = () => "../../uni_modules/uview-plus/components/u-avatar/u-avatar.js";
if (!Math) {
  _easycom_u_avatar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.cSrc
  }, $data.cSrc ? {
    b: $props.width,
    c: $props.height,
    d: common_vendor.p({
      src: $data.cSrc,
      mode: $props.mode
    })
  } : {}, {
    e: common_vendor.o((...args) => $options.onClick && $options.onClick(...args)),
    f: $props.width,
    g: $props.height
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
