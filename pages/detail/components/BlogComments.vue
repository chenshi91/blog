
<template>
	<view class="commentArea">
		评论区
	</view>
	<unicloud-db :collection="collectionList" v-slot:default="{data, loading, error, options}"  ref="udb" 
	@load="loadCommentList" >
		<view v-if="error">{{error.message}}</view>
		<view v-if="loading"><uni-load-more status="loading"></uni-load-more></view>
		<view v-else-if="data" class="commetList">
			<CComment
			  ref="ccRef"
			  v-model:myInfo="myInfo"
			  v-model:userInfo="userInfo"
			  v-model:tableData="tableData"
			  v-model:tableTotal="tableTotal"
			  :deleteMode="deleteMode"
			  @likeFun="likeFun"
			  @replyFun="replyFun"
			  @deleteFun="deleteFun"
			></CComment>
			<view class="btn" @tap="openComment">发表新评论</view>
		</view>
				
	</unicloud-db>
  
</template>

<script setup lang="ts">
import CComment from "@/components/cc-comment/cc-comment.vue";
import { ref,defineProps,reactive } from "vue";
import dayjs from "dayjs";
import {store} from "@/uni_modules/uni-id-pages/common/store.js";
import type{TUserInfo,TTableData} from '@/type/Comment.d.ts'
import type{TResponseResult,TComments} from '@/type/TableFields.d.ts'


const props=defineProps<{
	article_id:string,
	autherInfo:TUserInfo,
	name?:string,
	
}>()



const db=uniCloud.database()
const collectionList=reactive([ 
	db.collection('opendb-news-comments').where({article_id:props.article_id}).field('_id,article_id,user_content,reply_id,parent_id,status,user_id,create_time').getTemp(),
	db.collection('opendb-news-articles').field('title ,_id,user_id').getTemp(),
	db.collection('uni-id-users').field('username,nickname,avatar_file,_id').getTemp(),
	db.collection('open-db-news-like').field('_id,user_id,comments_id,status').getTemp()]) 

const loadCommentList=(res:TComments[],noMore:boolean)=>{
	console.log("loadCommentList:",res,noMore);
	
	res.forEach(item=>{
		const demo:TTableData={
			id:item._id._value,
			parent_id:item?.parent_id??null,
			reply_id:item?.reply_id??null,
			reply_name:item.reply_id,
			user_id:item.user_id[0]?._id.substring(0,5),
			user_name:item.user_id[0]?.nickname??item.user_id[0]?.username??'无名者',
			user_avatar:"https://env-00jxgsabub39.normal.cloudstatic.cn/"+item.user_id[0]?.avatar_file?.url.split("cloud://env-00jxgsabub39")[1],
			user_content:item.user_content,
			is_like:false,
			like_count:item._id["open-db-news-like"].length,
			create_time:dayjs(item.create_time).format("YYYY-MM-DD HH:mm:ss"),
		}
		item._id["open-db-news-like"].forEach(item=>{
			if(item.comments_id===demo.id){
				demo.is_like=true
			}
		})
		// console.log(demo);
		tableData.value.push(demo)
	})
	console.log("tableData=",tableData.value);
	tableTotal.value=tableData.value.length
	
	//reply_name  fix
	let reply_id_arr=res.filter(item=>{return typeof(item.reply_id)=="string"&&item.reply_id.length!=0}).map(item=>{
		return item.reply_id
	})
	reply_id_arr=Array.from(new Set(reply_id_arr))
	console.log("reply_id_arr=",reply_id_arr);
	const dbCmd=db.command
	const commentTemp=db.collection("opendb-news-comments").where({
		_id:dbCmd.in(reply_id_arr)
	}).getTemp()
	const userTemp=db.collection("uni-id-users").field("_id,nickname,username").getTemp()
	db.collection(commentTemp,userTemp).get().then(res=>{
		// console.log("reply_name_res=",res);
		const reply_name_arr=res.result.data.map(item=>{
			return {
				reply_id:item._id,
				reply_name:item.user_id[0]?.nickname??item.user_id[0]?.username
			}
		})
		// console.log("reply_name_res2=",reply_name_arr);
		tableData.value.forEach(item1=>{
			reply_name_arr.forEach(item2=>{
				if(item1.reply_id==item2.reply_id){
					item1.reply_name=item2.reply_name
				}
			})
		})
	})
}
// 唤起新评论弹框
let ccRef = ref(null);
function openComment() {
  ccRef.value.newCommentFun();
}



// 点赞回调事件
function likeFun({ params }, callback) {
  console.log("likeFun", params);
  const {id,is_like}=params
  console.log(id,is_like);
  const hasLogin=store.hasLogin
  if(!hasLogin){
	  uni.showToast({
	  	title:"请先登录！"
	  })
	  uni.navigateTo({
	  	url:"uni_modules/uni-id-pages/pages/login/login-withpwd"
	  })
  }
  const user_id=store.userInfo._id
  console.log(user_id);
  db.collection("open-db-news-like").where({
	  user_id,comments_id:id
  }).get().then(res=>{
	  const {result:{data}}=res
	  console.log("点赞表：",data);
	  if(data.length==0){
		  //新增
		  db.collection("open-db-news-like").add({
			  user_id,comments_id:id,status:is_like?0:1
		  }).then(res=>{
			  console.log("新增点赞ok：",res);
		  }).catch(err=>{
			  console.log("新增点赞err：",err);
			  callback(err)
		  })
	  }else{
		  //修改
		  db.collection("open-db-news-like").doc(data[0]._id).update({
			  status:is_like?0:1
		  }).then(res=>{
			  console.log("修改点赞状态ok：",res,is_like?0:1);
		  }).catch(err=>{
			  console.log("修改点赞err:",err);
			  callback(err)
		  })
	  }
  })
  // 当请求失败, 调用callback重置点赞效果;
  // Demo如下:
  // axios.post("http://xxx/like", { id: params }).then((res) => {
  //   if (res.code !== 0) {
  //     callback(res);
  //   }
  // });
}

// 评论回调事件
function replyFun({ params }, callback) {
  console.log("replyFun", params);
  const{user_content,reply_id,parent_id}=params
  console.log(user_content,parent_id,reply_id);
  db.collection('opendb-news-comments').add({
	  article_id:props.article_id,user_id:myInfo.value.user_id,
	  user_content,parent_id,reply_id
  }).then(res=>{
	  const{result:{id,message},requestId}=res
	  console.log("replyFun ok=",res);
	  // console.log(id,message);
	  
	  setTimeout(() => callback({ id }), 500); // 目前为了展示效果, 直接执行callback
  }).catch(err=>{
	  console.log("replyFun err:",err);
  })
  
  // const res = { id: Math.random() }; // 很重要的回参! 必须拿到后端返回评论id! 删除需要!
  // setTimeout(() => callback(res), 500); // 目前为了展示效果, 直接执行callback
}

/** 删除回调事件
 * mode 删除模式
 * -- bind: 当被删除的一级评论存在回复评论, 那么该用户评论内容变更显示为[当前用户评论内容已被移除]
 * -- only: 仅删除当前评论(后端删除相关联的回复评论, 否则总数显示不对)
 * -- all : 删除所有评论包括回复评论
 */
const deleteMode = ref("all");
function deleteFun({ params, mode }, callback) {
  console.log("deleteFun", { params, mode });
  // 当请求成功, 调用callback执行评论删除;
  // Demo如下:
  // axios.post("http://xxx/delete", { ids: params, mode }).then((res) => {
  //   if (res.code === 0) {
  //     callback(res);
  //   }
  // });
  switch (mode) {
    case "bind":
      // 逻辑: 调用接口进行用户评论内容修改 update
      setTimeout(() => callback(), 500); // 目前为了展示效果, 直接执行callback
      break;
    case "only":
      // 逻辑: 调用接口删除一个评论 delete
      setTimeout(() => callback(), 500); // 目前为了展示效果, 直接执行callback
      break;
    default:
      // all
      // 逻辑: 调用接口删除多个评论 [delete]
      setTimeout(() => callback(), 500); // 目前为了展示效果, 直接执行callback
      break;
  }
}

// ----模拟数据------模拟数据------模拟数据----
// 当前登录用户信息(提示: 一般来自localstorage, 如果是实时获取的话, 那么获取到数据后再v-if显示评论组件)
let myInfo = ref({
  user_id: store.userInfo?._id, // 用户id
  user_name: store.userInfo?.nickname??store.userInfo?.username??"匿名", // 用户名
  user_avatar: "https://env-00jxgsabub39.normal.cloudstatic.cn/"+store.userInfo.avatar_file?.url.split("cloud://env-00jxgsabub39")[1], // 用户头像地址
});
// 文章作者信息(提示: 一般来自localstorage, 如果是实时获取的话, 那么获取到数据后再v-if显示评论组件)
let userInfo =ref({
  user_id: props.autherInfo?._id, // 用户id
  user_name: props.autherInfo?.nickname??props.autherInfo?.username??'无名氏', // 用户名
  user_avatar: "https://env-00jxgsabub39.normal.cloudstatic.cn/"+props.autherInfo?.avatar_file?.url.split("cloud://env-00jxgsabub39")[1], // 用户头像地址
});
// console.log("myInfo=",myInfo);
// console.log("userInfo=",userInfo);
let tableTotal = ref(0); // 评论总数
let tableData = ref([]); // 评论表
</script>

<style lang="scss" scoped>
	.commentArea{
		font-size: 88rpx;
		font-weight: 888;
		border: 10rpx solid black;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 30rpx;
		
	}
	.btn {
	  text-align: center;
	  color: #fff;
	  padding: 20rpx;
	  margin: 50rpx;
	  border-radius: 20rpx;
	  background-color: #2979ff;
	}

</style>