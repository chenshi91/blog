<template>
  <view class="uni-container">
    <uni-forms ref="form" :model="formData" validate-trigger="submit" err-show-type="toast">
      <uni-forms-item name="article_id" label="文章">
        <uni-data-picker v-model="formData.article_id" collection="opendb-news-articles" field="title as text, _id as value"></uni-data-picker>
      </uni-forms-item>
      <uni-forms-item name="comments_id" label="评论">
        <uni-data-picker v-model="formData.comments_id" collection="opendb-news-comments" field="comment_content as text, _id as value"></uni-data-picker>
      </uni-forms-item>
      <uni-forms-item name="like_type" label="点赞类型">
        <uni-data-checkbox v-model="formData.like_type" :localdata="formOptions.like_type_localdata"></uni-data-checkbox>
      </uni-forms-item>
      <uni-forms-item name="status" label="点赞状态">
        <uni-data-checkbox v-model="formData.status" :localdata="formOptions.status_localdata"></uni-data-checkbox>
      </uni-forms-item>
      <uni-forms-item name="user_id" label="用户">
        <uni-data-picker v-model="formData.user_id" collection="uni-id-users" field="username as text,_id as value"></uni-data-picker>
      </uni-forms-item>
      <uni-forms-item name="create_date" label="">
        <uni-datetime-picker return-type="timestamp" v-model="formData.create_date"></uni-datetime-picker>
      </uni-forms-item>
      <view class="uni-button-group">
        <button type="primary" class="uni-button" @click="submit">提交</button>
      </view>
    </uni-forms>
  </view>
</template>

<script>
  import { validator } from '../../js_sdk/validator/open-db-news-like.js';

  const db = uniCloud.database();
  const dbCollectionName = 'open-db-news-like';

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
        "article_id": "",
        "comments_id": "",
        "like_type": null,
        "status": null,
        "user_id": "",
        "create_date": null
      }
      return {
        formData,
        formOptions: {
          "like_type_localdata": [
            {
              "text": "文章的点赞",
              "value": 0
            },
            {
              "text": "评论的点赞",
              "value": 1
            }
          ],
          "status_localdata": [
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
