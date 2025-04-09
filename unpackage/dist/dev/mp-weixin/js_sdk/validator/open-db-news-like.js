"use strict";
const validator = {
  "article_id": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "title": "文章",
    "label": "文章"
  },
  "comments_id": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "title": "评论",
    "label": "评论"
  },
  "like_type": {
    "rules": [
      {
        "format": "int"
      },
      {
        "range": [
          {
            "text": "文章的点赞",
            "value": 0
          },
          {
            "text": "评论的点赞",
            "value": 1
          }
        ]
      }
    ],
    "title": "点赞类型",
    "label": "点赞类型"
  },
  "status": {
    "rules": [
      {
        "format": "int"
      },
      {
        "range": [
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
      }
    ],
    "title": "点赞状态",
    "label": "点赞状态"
  },
  "user_id": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "title": "用户",
    "label": "用户"
  },
  "create_date": {
    "rules": [
      {
        "format": "timestamp"
      }
    ],
    "defaultValue": {
      "$env": "now"
    }
  }
};
const enumConverter = {
  "like_type_valuetotext": {
    "0": "文章的点赞",
    "1": "评论的点赞"
  },
  "status_valuetotext": {
    "0": "赞一下",
    "1": "不表态",
    "2": "踩一下"
  }
};
exports.enumConverter = enumConverter;
exports.validator = validator;
