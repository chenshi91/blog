<template>
  <view class="uni-container">
    <uni-forms ref="form" :model="formData" validate-trigger="submit" err-show-type="toast">
      <uni-forms-item name="user_id" label="" required>
        <uni-easyinput placeholder="文章作者ID， 参考`uni-id-users` 表" v-model="formData.user_id"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="category_id" label="分类">
        <uni-data-picker v-model="formData.category_id" collection="opendb-news-categories" field="name as text, _id as value"></uni-data-picker>
      </uni-forms-item>
      <uni-forms-item name="title" label="标题" required>
        <uni-easyinput placeholder="标题" v-model="formData.title" trim="both"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="desc" label="文章摘要">
        <uni-easyinput placeholder="文章摘要" v-model="formData.desc" trim="both"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="content" label="文章内容" required>
        <uni-easyinput placeholder="文章内容" v-model="formData.content" trim="right"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="excerpt" label="文章摘录">
        <uni-easyinput placeholder="文章摘录" v-model="formData.excerpt" trim="both"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="article_status" label="文章状态">
        <uni-data-checkbox v-model="formData.article_status" :localdata="formOptions.article_status_localdata"></uni-data-checkbox>
      </uni-forms-item>
      <uni-forms-item name="view_count" label="阅读数量">
        <uni-easyinput placeholder="阅读数量" type="number" v-model="formData.view_count"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="like_count" label="">
        <uni-easyinput placeholder="喜欢数、点赞数" type="number" v-model="formData.like_count"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="is_sticky" label="是否置顶">
        <switch @change="binddata('is_sticky', $event.detail.value)" :checked="formData.is_sticky"></switch>
      </uni-forms-item>
      <uni-forms-item name="is_essence" label="阅读加精">
        <switch @change="binddata('is_essence', $event.detail.value)" :checked="formData.is_essence"></switch>
      </uni-forms-item>
      <uni-forms-item name="comment_status" label="开放评论">
        <uni-data-checkbox v-model="formData.comment_status" :localdata="formOptions.comment_status_localdata"></uni-data-checkbox>
      </uni-forms-item>
      <uni-forms-item name="comment_count" label="">
        <uni-easyinput placeholder="评论数量" type="number" v-model="formData.comment_count"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="last_comment_user_id" label="">
        <uni-easyinput placeholder="最后回复用户 id，参考`uni-id-users` 表" v-model="formData.last_comment_user_id"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="avatar" label="封面大图">
        <uni-data-checkbox :multiple="true" v-model="formData.avatar"></uni-data-checkbox>
      </uni-forms-item>
      <uni-forms-item name="publish_date" label="发表时间">
        <uni-datetime-picker return-type="timestamp" v-model="formData.publish_date"></uni-datetime-picker>
      </uni-forms-item>
      <uni-forms-item name="publish_ip" label="发布文章时IP地址">
        <uni-easyinput placeholder="发表时 IP 地址" v-model="formData.publish_ip"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="last_modify_date" label="最后修改时间">
        <uni-datetime-picker return-type="timestamp" v-model="formData.last_modify_date"></uni-datetime-picker>
      </uni-forms-item>
      <uni-forms-item name="last_modify_ip" label="">
        <uni-easyinput placeholder="最后修改时 IP 地址" v-model="formData.last_modify_ip"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="mode" label="排版显示模式">
        <undefined v-model="formData.mode"></undefined>
      </uni-forms-item>
      <view class="uni-button-group">
        <button type="primary" class="uni-button" @click="submit">提交</button>
      </view>
    </uni-forms>
  </view>
</template>

<script>
  import { validator } from '../../js_sdk/validator/blog-articles.js';

  const db = uniCloud.database();
  const dbCollectionName = 'blog-articles';

  function getValidator(fields) {
    let result = {}
    for (let key in validator) {
      if (fields.indexOf(key) > -1) {
        result[key] = validator[key]
      }
    }
    return result
  }

  

  export default {
    data() {
      let formData = {
        "user_id": "",
        "category_id": "",
        "title": "",
        "desc": "",
        "content": "",
        "excerpt": "",
        "article_status": 0,
        "view_count": 22,
        "like_count": 0,
        "is_sticky": null,
        "is_essence": null,
        "comment_status": null,
        "comment_count": 0,
        "last_comment_user_id": "",
        "avatar": [],
        "publish_date": null,
        "publish_ip": "",
        "last_modify_date": null,
        "last_modify_ip": "",
        "mode": null
      }
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
          ],
          "comment_status_localdata": [
            {
              "value": 0,
              "text": "关闭"
            },
            {
              "value": 1,
              "text": "开放"
            }
          ]
        },
        rules: {
          ...getValidator(Object.keys(formData))
        }
      }
    },
    onReady() {
      this.$refs.form.setRules(this.rules)
    },
    methods: {
      
      /**
       * 验证表单并提交
       */
      submit() {
        uni.showLoading({
          mask: true
        })
        this.$refs.form.validate().then((res) => {
          return this.submitForm(res)
        }).catch(() => {
        }).finally(() => {
          uni.hideLoading()
        })
      },

      /**
       * 提交表单
       */
      submitForm(value) {
        // 使用 clientDB 提交数据
        return db.collection(dbCollectionName).add(value).then((res) => {
          uni.showToast({
            icon: 'none',
            title: '新增成功'
          })
          this.getOpenerEventChannel().emit('refreshData')
          setTimeout(() => uni.navigateBack(), 500)
        }).catch((err) => {
          uni.showModal({
            content: err.message || '请求服务失败',
            showCancel: false
          })
        })
      }
    }
  }
</script>

<style>
  .uni-container {
    padding: 15px;
  }

  .uni-input-border,
  .uni-textarea-border {
    width: 100%;
    font-size: 14px;
    color: #666;
    border: 1px #e5e5e5 solid;
    border-radius: 5px;
    box-sizing: border-box;
  }

  .uni-input-border {
    padding: 0 10px;
    height: 35px;

  }

  .uni-textarea-border {
    padding: 10px;
    height: 80px;
  }

  .uni-button-group {
    margin-top: 50px;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    justify-content: center;
  }

  .uni-button {
    width: 184px;
  }
</style>
