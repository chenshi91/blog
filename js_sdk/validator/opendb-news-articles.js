// 表单校验规则由 schema2code 生成，不建议直接修改校验规则，而建议通过 schema2code 生成, 详情: https://uniapp.dcloud.net.cn/uniCloud/schema


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
  "category_id": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "title": "分类",
    "label": "分类"
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
  "content": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      }
    ],
    "label": "文章内容",
    "title": "文章内容"
  },
  "excerpt": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "摘要",
    "title": "文章摘录"
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
  "view_count": {
    "rules": [
      {
        "format": "int"
      }
    ],
    "title": "阅读数量",
    "defaultValue": 0,
    "label": "阅读数量"
  },
  "comment_status": {
    "rules": [
      {
        "format": "bool"
      }
    ],
    "title": "开放评论",
    "defaultValue": true,
    "label": "开放评论"
  },
  "last_comment_user_id": {
    "rules": [
      {
        "format": "string"
      }
    ]
  },
  "avatar": {
    "rules": [
      {
        "format": "file"
      }
    ],
    "label": "封面大图",
    "title": "封面大图"
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
  },
  "publish_date": {
    "rules": [
      {
        "format": "timestamp"
      }
    ],
    "title": "发表时间",
    "label": "发表时间"
  }
}

const enumConverter = {
  "article_status_valuetotext": {
    "0": "草稿箱",
    "1": "已发布"
  }
}

function filterToWhere(filter, command) {
  let where = {}
  for (let field in filter) {
    let { type, value } = filter[field]
    switch (type) {
      case "search":
        if (typeof value === 'string' && value.length) {
          where[field] = new RegExp(value)
        }
        break;
      case "select":
        if (value.length) {
          let selectValue = []
          for (let s of value) {
            selectValue.push(command.eq(s))
          }
          where[field] = command.or(selectValue)
        }
        break;
      case "range":
        if (value.length) {
          let gt = value[0]
          let lt = value[1]
          where[field] = command.and([command.gte(gt), command.lte(lt)])
        }
        break;
      case "date":
        if (value.length) {
          let [s, e] = value
          let startDate = new Date(s)
          let endDate = new Date(e)
          where[field] = command.and([command.gte(startDate), command.lte(endDate)])
        }
        break;
      case "timestamp":
        if (value.length) {
          let [startDate, endDate] = value
          where[field] = command.and([command.gte(startDate), command.lte(endDate)])
        }
        break;
    }
  }
  return where
}

export { validator, enumConverter, filterToWhere }
