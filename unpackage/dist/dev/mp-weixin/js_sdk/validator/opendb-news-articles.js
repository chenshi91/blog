"use strict";
const validator = {
  "user_id": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      }
    ],
    "title": "发布者",
    "defaultValue": {
      "$env": "uid"
    },
    "label": "发布者"
  },
  "title": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      }
    ],
    "label": "标题",
    "title": "标题"
  },
  "article_status": {
    "rules": [
      {
        "format": "int"
      },
      {
        "range": [
          {
            "value": 0,
            "text": "草稿箱"
          },
          {
            "value": 1,
            "text": "已发布"
          }
        ]
      }
    ],
    "title": "文章状态",
    "defaultValue": 0,
    "label": "文章状态"
  },
  "last_modify_date": {
    "rules": [
      {
        "format": "timestamp"
      }
    ],
    "title": "最后修改时间",
    "defaultValue": {
      "$env": "now"
    },
    "label": "最后修改时间"
  },
  "last_modify_ip": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "defaultValue": {
      "$env": "clientIP"
    }
  },
  "mode": {
    "rules": [
      {
        "format": "number"
      }
    ],
    "title": "排版显示模式",
    "label": "排版显示模式"
  }
};
const enumConverter = {
  "article_status_valuetotext": {
    "0": "草稿箱",
    "1": "已发布"
  }
};
exports.enumConverter = enumConverter;
exports.validator = validator;
