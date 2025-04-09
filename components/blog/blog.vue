<template>
	<view class="blog">
		<view class="head">
			<view class="left">
				
				<view v-show="item.user_id" class="userInfo">
					<cloud-avater :src="item.user_id[0]?.avatar_file?.url" ></cloud-avater> 
					<text>{{item.user_id[0]?.username}}</text>
				</view>
				<view v-show="!item.user_id" class="userInfo">
					<u-avatar></u-avatar>
					<text>匿名用户</text>
				</view>
				<uni-dateformat :date="item.publish_date" :threshold="[60000,3600000*24*30]" format="yyyy-MM-dd hh:mm:ss"></uni-dateformat>
			</view>
			<view class="righ">
				<text class="iconfont icon-gengduo1" @click="more()"></text>
			</view>
			
		</view>
		
		<view class="center" @click="toDetail(item._id,$event)">
			<view class="title" >
				<text data-index="title">{{item.title}}</text>
			</view>
			<view class="content" data-index="22">
				<text data-index="content">{{item.excerpt}}</text>
			</view>
			<view class="img">
				<cloud-image :src="img" mode="aspectFill" 
					width="200rpx" height="200rpx"
					v-for="img of item.avatar" 
					@click="showImg(item.avatar,img)">
				</cloud-image>
				<!-- <image src="../../static/logo.png" mode="aspectFill"@click="showImg(item.avatar,'../../static/logo.png')"></image> -->
			</view>
		</view>
		
		<view class="footer" @click="toLike($event)">
			<view class="readCount">
				<text class="iconfont icon-yueduliang1"></text>
				<text>{{item.view_count}}</text>
			</view>
			<view class="replaceCount">
				<text class="iconfont icon-pinglun"></text>
				<text>{{count.comment}}</text>
			</view>
			<view class="goodCount">
				<text :class="status.dislike?'iconfont icon-shit-o':'iconfont icon-quxiaodianzan'" data-index="dislike"></text>
				<text>{{count.dislike}} </text>
			</view>
			<view class="ungoodCount" >
				<text :class="status.like?'iconfont icon-dianzan_kuai':'iconfont icon-dianzan' " data-index="like"></text>
				<text>{{count.like}}</text>
			</view>
		</view>
		
		
		<u-action-sheet :actions="list" :title="title" cancelText="取消吧" :show="show"  @select="select($event)" @close="close()"></u-action-sheet>
		<!-- <up-button @click="show = true">打开ActionSheet</up-button> -->
	</view>
</template>

<script setup>
import { reactive,ref,toRaw,computed } from 'vue';
import {onLoad,onShow} from '@dcloudio/uni-app'
import {store,mutations} from '@/uni_modules/uni-id-pages/common/store.js'
	
	let count=reactive({
		comment:0,
		like:0,
		dislike:0,
	})
	
	let status=reactive({
		dislike:false,
		like:false
	})
	let id=reactive({
		like:'',
		articles:'',
		favorite:'',
	})
	
	let list=reactive([
		{
			name:"收藏",
		},
		{
			name:"删除",
			color:"red",
			disabled:true
		},
		{
			name:"编辑",
			disabled:true
		},
	])
	const title=ref();
	let show=ref(false);
	
	
	const props=defineProps({
		item:Object,
	})
	// console.log("sdsd...",df);
	
	const hasLogin=computed(()=>{return store.hasLogin})
	const userInfo=computed(()=>{return store.userInfo})
	
	onLoad(()=>{
		// console.log("blog=",props);
		id.articles=props.item._id
	})
	
	onShow(()=>{
		countLoad()
		likeLoad()
	})
	
	function countLoad(){
		const item=toRaw(props.item)
		const {_id}=item
		// console.log("id=",_id);
		uniCloud.database().collection("opendb-news-comments").where({
			article_id:_id,
			comment_type:0,
			status:true
		}).count().then(res=>{
			// console.log("count",res);
			count.comment=res.result.total
		})
		uniCloud.database().collection("open-db-news-like").where({
			article_id:_id,
			like_type:0,
			status:0
		}).count().then(res=>{
			// console.log("count",res);
			count.like=res.result.total
		})
		uniCloud.database().collection("open-db-news-like").where({
			article_id:_id,
			like_type:0,
			status:2
		}).count().then(res=>{
			// console.log("count",res);
			count.dislike=res.result.total
		})
	}
	
	function likeLoad(){
		// console.log(props.item);
		if(hasLogin.value){
			uniCloud.database().collection("open-db-news-like").where(`article_id=='${props.item._id}'&&user_id=='${userInfo.value._id}'&&like_type==0`).get().then(res=>{
				console.log("hhhhhhhhhh",res.result.data);
				if(res.result.data.length>0){
					// console.log("可以和规范化个");
					const statusRes=res.result.data[0].status
					id.like=res.result.data[0]._id
					if(0==statusRes){
						status.like=true
					}else if(2==statusRes){
						status.dislike=true
					}
				}
			})
		}
	}
	
	function showImg(imgs,img){
		console.log(imgs,img);
		uni.previewImage({
			"urls":imgs,
			"current":img,
			"loop":true
		})
	}
	
	function toDetail(id,e){
		console.log(e);
		console.log(id,e.target.dataset.index);
		if("title"==e.target.dataset.index||"content"==e.target.dataset.index){
			console.log("要跳转详情页了...");
			uni.navigateTo({
				url:"/pages/detail/detail?id="+id
			})
		}
	}
	
	function  more(){
		// console.log("t弹窗出现吧...");
		show.value=true
		// console.log("uid=",uniCloud.getCurrentUserInfo().uid);
		// console.log("props=",props.item.user_id[0]._id);
		const currentUserInfo=uniCloud.getCurrentUserInfo()
		if(currentUserInfo.uid==props.item.user_id[0]._id || "web_admin"==currentUserInfo.role ||"admin"==currentUserInfo.role){
			list.forEach(o=>o.disabled=false)
		}
	}
	
	function select(e){
		// console.log(e.name);
		if(!hasLogin.value){
			uni.showToast({
				title:"前先登录!",
				icon:'fail'
			})
			return
		}
		switch(e.name){
			case "收藏": 
				console.log("t收藏...");
				uniCloud.database().collection("opendb-news-favorite").add({
					"article_id":props.item._id,
					"user_id":userInfo.value._id
				}).then(res=>{
					uni.showToast({
						title:"收藏成功!",
						icon:'success'
					})
				}).catch(err=>{
					uni.showToast({
						title:err.message,
						icon:'error'
					})
				})
				break
			case "删除": console.log("t删除...");break
			case "编辑": console.log("t编辑...");break
			default :console.log("default..."); break
		}
		
	}
	
	function toLike(e){
		// console.log(e);
		const index=e.target.dataset?.index??"unkonw"
		if(!hasLogin.value){
			uni.showToast({
				title:"请先登陆!",
				icon:'error'
			})
			return
		}
		if(id.like==''||id.like==null){
			//新增一条点赞记录
			uniCloud.database().collection("open-db-news-like").add({
				"article_id":id.articles,
				"like_type":0,
				"status":1,
				"user_id":userInfo.value._id
			}).then(res=>{
				console.log("新增一条点赞记录",res);
				id.like=res.result.id
			})
		}
		switch(index){
			case "like": 
				console.log(index);
				status.like=!status.like
				if(status.like){
					uniCloud.database().collection("open-db-news-like").doc(id.like).update({"status":0}).then(res=>{ console.log("like成功",res);})
					count.like++
				}else{
					uniCloud.database().collection("open-db-news-like").doc(id.like).update({"status":1}).then(res=>{ console.log("取消like成功",res);})
					count.like--
				}
			break
			case "dislike":
				console.log(index);
				status.dislike=!status.dislike
				if(status.dislike){
					uniCloud.database().collection("open-db-news-like").doc(id.like).update({"status":2}).then(res=>{ console.log("dislike成功",res);})
					count.dislike++
				}else{
					uniCloud.database().collection("open-db-news-like").doc(id.like).update({"status":1}).then(res=>{ console.log("取消dislike成功",res);})
					count.dislike--
				}
			break
			default :
			break
		}
	}
	
	function close(){
		show.value=false
	}
	
</script>

<style lang="scss" scoped>
	.blog{
		padding: 10rpx;
		.head{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.left{
				// border: 1rpx solid red;
				width: 80%;
				display: flex;
				align-items: center;
				.userInfo{
					display: flex;
					align-items: center;
				}
				text{
					padding-left: 20rpx;
				}
			}
		}
		
		.center{
			.title{
				font-family: Verdana, Geneva, Tahoma, sans-serif;
				font-size: 60rpx;
				line-height: 60rpx;
				font-weight: bold;
				// border: 1rpx solid red;
			}
			.content{
				font-size: 30rpx;
				font-weight: 100;
				
			}
			.img{
				width: 100%;
				height: 200rpx;
				margin: 20rpx 0;
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				// justify-content: space-evenly;
				view{
					margin-right: 10rpx;
				}
				
			}
		}
		
		.footer{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 100rpx 20rpx 100rpx;
			border-bottom: 20rpx solid #c0c0c0;
			text{
				font-size: 50rpx;
			}
		}
	}
</style>