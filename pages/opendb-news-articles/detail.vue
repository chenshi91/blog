<template>
  <view class="container">
    <unicloud-db ref="udb" v-slot:default="{data, loading, error, options}" :options="options" :collection="collectionList" :getone="true" :manual="true">
      <view v-if="error">{{error.message}}</view>
      <view v-else-if="loading">
        <uni-load-more :contentText="loadMore" status="loading"></uni-load-more>
      </view>
      <view v-else-if="data">
        <view>
          <text>发布者</text>
          <text>{{data.user_id && data.user_id[0] && data.user_id[0].text}}</text>
        </view>
        <view>
          <text>分类</text>
          <text>{{data.category_id && data.category_id[0] && data.category_id[0].text}}</text>
        </view>
        <view>
          <text>标题</text>
          <text>{{data.title}}</text>
        </view>
        <view>
          <text>文章内容</text>
          <text>{{data.content}}</text>
        </view>
        <view>
          <text>文章摘录</text>
          <text>{{data.excerpt}}</text>
        </view>
        <view>
          <text>文章状态</text>
          <text>{{options.article_status_valuetotext[data.article_status]}}</text>
        </view>
        <view>
          <text>阅读数量</text>
          <text>{{data.view_count}}</text>
        </view>
        <view>
          <text>开放评论</text>
          <text>{{data.comment_status == true ? '✅' : '❌'}}</text>
        </view>
        <view>
          <text>last_comment_user_id</text>
          <text>{{data.last_comment_user_id}}</text>
        </view>
        <view>
          <text>封面大图</text>
          <uni-file-picker v-if="data.avatar && data.avatar.fileType == 'image'" :value="data.avatar" :file-mediatype="data.avatar && data.avatar.fileType" return-type="object" readonly></uni-file-picker>
          <uni-link v-else-if="data.avatar" :href="data.avatar.url" :text="data.avatar.url"></uni-link>
          <text v-else></text>
        </view>
        <view>
          <text>最后修改时间</text>
          <uni-dateformat :threshold="[0, 0]" :date="data.last_modify_date"></uni-dateformat>
        </view>
        <view>
          <text>last_modify_ip</text>
          <text>{{data.last_modify_ip}}</text>
        </view>
        <view>
          <text>排版显示模式</text>
          <text>{{data.mode}}</text>
        </view>
        <view>
          <text>发表时间</text>
          <uni-dateformat :threshold="[0, 0]" :date="data.publish_date"></uni-dateformat>
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
  import { enumConverter } from '../../js_sdk/validator/opendb-news-articles.js'
  const db = uniCloud.database()

  export default {
    data() {
      return {
        queryWhere: '',
        collectionList: [ db.collection('opendb-news-articles').field('user_id,category_id,title,content,excerpt,article_status,view_count,comment_status,last_comment_user_id,avatar,last_modify_date,last_modify_ip,mode,publish_date').getTemp(),db.collection('uni-id-users').field('username as text,_id').getTemp(),db.collection('opendb-news-categories').field('name as text, _id').getTemp() ],
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
        this.collectionList = [ db.collection('opendb-news-articles').where('_id=="' + this._id + '"').field('user_id,category_id,title,content,excerpt,article_status,view_count,comment_status,last_comment_user_id,avatar,last_modify_date,last_modify_ip,mode,publish_date').getTemp(),db.collection('uni-id-users').field('username as text,_id').getTemp(),db.collection('opendb-news-categories').field('name as text, _id').getTemp() ]
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
