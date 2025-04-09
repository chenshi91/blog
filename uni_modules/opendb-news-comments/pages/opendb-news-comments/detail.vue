<template>
  <view class="container">
    <unicloud-db ref="udb" v-slot:default="{data, loading, error, options}" :options="options" :collection="collectionList" :getone="true" :manual="true">
      <view v-if="error">{{error.message}}</view>
      <view v-else-if="loading">
        <uni-load-more :contentText="loadMore" status="loading"></uni-load-more>
      </view>
      <view v-else-if="data">
        <view>
          <text>评论的文章</text>
          <text>{{data.article_id && data.article_id[0] && data.article_id[0].text}}</text>
        </view>
        <view>
          <text>评论内容</text>
          <text>{{data.comment_content}}</text>
        </view>
        <view>
          <text>评论类型</text>
          <text>{{options.comment_type_valuetotext[data.comment_type]}}</text>
        </view>
        <view>
          <text>被回复的评论用户</text>
          <text>{{data.reply_user_id && data.reply_user_id[0] && data.reply_user_id[0].text}}</text>
        </view>
        <view>
          <text>被回复的评论</text>
          <text>{{data.reply_comment_id && data.reply_comment_id[0] && data.reply_comment_id[0].text}}</text>
        </view>
        <view>
          <text>状态值</text>
          <text>{{data.status == true ? '✅' : '❌'}}</text>
        </view>
        <view>
          <text>评论人</text>
          <text>{{data.user_id && data.user_id[0] && data.user_id[0].text}}</text>
        </view>
        <view>
          <text>comment_date</text>
          <uni-dateformat :threshold="[0, 0]" :date="data.comment_date"></uni-dateformat>
        </view>
      </view>
    </unicloud-db>
    <view class="btns">
      <button type="primary" @click="handleUpdate">修改</button>
      <button type="warn" class="btn-delete" @click="handleDelete">删除</button>
    </view>
  </view>
</template>

<script>
  // 由schema2code生成，包含校验规则和enum静态数据
  import { enumConverter } from '../../js_sdk/validator/opendb-news-comments.js'
  const db = uniCloud.database()

  export default {
    data() {
      return {
        queryWhere: '',
        collectionList: [ db.collection('opendb-news-comments').field('article_id,comment_content,comment_type,reply_user_id,reply_comment_id,status,user_id,comment_date').getTemp(),db.collection('opendb-news-articles').field('title as text,_id').getTemp(),db.collection('uni-id-users').field('username as text,_id').getTemp(),db.collection('uni-id-users').field('username as text,_id').getTemp(),db.collection('opendb-news-comments').field('comment_content as text,_id').getTemp() ],
        loadMore: {
          contentdown: '',
          contentrefresh: '',
          contentnomore: ''
        },
        options: {
          // 将scheme enum 属性静态数据中的value转成text
          ...enumConverter
        }
      }
    },
    onLoad(e) {
      this._id = e.id
    },
    onReady() {
      if (this._id) {
        this.collectionList = [ db.collection('opendb-news-comments').where('_id=="' + this._id + '"').field('article_id,comment_content,comment_type,reply_user_id,reply_comment_id,status,user_id,comment_date').getTemp(),db.collection('opendb-news-articles').field('title as text,_id').getTemp(),db.collection('uni-id-users').field('username as text,_id').getTemp(),db.collection('uni-id-users').field('username as text,_id').getTemp(),db.collection('opendb-news-comments').field('comment_content as text,_id').getTemp() ]
      }
    },
    methods: {
      handleUpdate() {
        // 打开修改页面
        uni.navigateTo({
          url: './edit?id=' + this._id,
          events: {
            // 监听修改页面成功修改数据后, 刷新当前页面数据
            refreshData: () => {
              this.$refs.udb.loadData({
                clear: true
              })
            }
          }
        })
      },
      handleDelete() {
        this.$refs.udb.remove(this._id, {
          success: (res) => {
            // 删除数据成功后跳转到list页面
            uni.navigateTo({
              url: './list'
            })
          }
        })
      }
    }
  }
</script>

<style>
  .container {
    padding: 10px;
  }

  .btns {
    margin-top: 10px;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: row;
  }

  .btns button {
    flex: 1;
  }

  .btn-delete {
    margin-left: 10px;
  }
</style>
