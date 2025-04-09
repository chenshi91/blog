"use strict";
const uni_modules_uviewPlus_libs_config_props = require("../../libs/config/props.js");
const props = {
  props: {
    bgColor: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.defProps.statusBar.bgColor
    }
  }
};
exports.props = props;
