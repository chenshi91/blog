"use strict";
const validator = {
  "article_id": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      }
    ]
  },
  "publish_date": {
    "rules": [
      {
        "format": "timestamp"
      }
    ],
    "title": "发表时间",
    "defaultValue": {
      "$env": "now"
    },
    "label": "发表时间"
  },
  "user_id": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      }
    ]
  }
};
const enumConverter = {};
exports.enumConverter = enumConverter;
exports.validator = validator;
