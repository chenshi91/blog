<template>
	<view class="comment" @click="toCommentList($event)">
		
		
		<view class="userInfo">
			<cloud-avater :src="obj.user_id[0].avatar_file.url"></cloud-avater>
			<view class="info">
				<view class="top">
					<view class="left">
						<text> {{obj.user_id[0].username}}</text>
						<text > 副局长</text>
					</view>
					<view class="right">
						<text :class="status.hasDislike?'iconfont icon-shit-o':'iconfont icon-quxiaodianzan'" data-index="dislike">{{count.disLike}}</text>
						<text :class="status.hasLike?'iconfont icon-dianzan_kuai':'iconfont icon-dianzan' " data-index="like">{{count.like}}</text>
					</view>
				</view>
				<view class="bottom">
					<view><text> {{obj.city}}</text></view>
					<view><text data-index="phone"> iphone13 pro</text></view>
				</view>
				
				
			</view>
		</view>
		<view class="content">
			
			<text> {{obj.comment_content}}</text>
		</view>
		<view class="time">
			<view class="left">
				<text>第22楼</text>
				<text>
					<uni-dateformat  :date="obj?.comment_date ?? null" format="yyyy-MM-dd hh:mm:ss"  :threshold="[60000,3600000*24*30]"></uni-dateformat>
				</text>
				<text data-index="reply">回复</text>
				<text data-index="hotReply">11人热议</text>
			</view>
			<view class="right">
				<text class="iconfont icon-gengduo1"></text>
			</view>
		</view>
		<view class="end">
			
		</view>
		
	</view>
</template>

<script setup>
	import {defineProps,ref,reactive,inject,computed,watchEffect} from 'vue'
	import {onLoad,onShow} from '@dcloudio/uni-app'
	import {f1} from '@/utils/index.js'
	const props=defineProps({
		obj:Object
	})
	const emit=defineEmits(['showComments'])
	
	const status=reactive({
		hasLike:false,
		hasDislike:false,
	})
	const count=reactive({
		like:0,
		disLike:0,
	})
	const comment=computed(()=>{ return props.obj})
	const hasLogin=inject("hasLogin");
	const userInfo=inject("userInfo");
	onLoad(()=>{
		// console.log("组件comment加载成功",props.obj);
		f1()
		// demo.f2()
		
		
	})
	watchEffect(()=>{
		//评论的点赞状态,点赞统计等数据
		if(userInfo.value._id){
			uniCloud.database().collection("open-db-news-like").where(`comments_id=="${comment.value._id}"&&like_type==1&&status==0&&user_id=="${userInfo.value._id}"`).count().then(res=>{
				// console.log("count1",res);
				if(res.result.total>0){
					status.hasLike=true
				}
				// status.hasLike=true
			})
			uniCloud.database().collection("open-db-news-like").where(`comments_id=="${comment.value._id}"&&like_type==1&&status==2&&user_id=="${userInfo.value._id}"`).count().then(res=>{
				if(res.result.total>0){
					status.hasDislike=true
				}
				// status.hasDislike=true
			})
		}
		
		uniCloud.database().collection("open-db-news-like").where(`comments_id=="${comment.value._id}"&&like_type==1&&status==0`).count().then(res=>{
			// console.log("aaa",res);
			count.like=res.result.total
		})
		uniCloud.database().collection("open-db-news-like").where(`comments_id=="${comment.value._id}"&&like_type==1&&status==2`).count().then(res=>{
			count.disLike=res.result.total
		})
	})

	
	
	function toCommentList(e){
		// console.log(getCurrentPages()[0].route);
		const index=e.target.dataset?.index??""
		switch(index){
			case "like":
				console.log("执行点赞...");
				status.hasLike=!status.hasLike
				count.like++
				break;
			case "dislike":
				console.log("执行踩一下...");
				status.hasDislike=!status.hasDislike
				count.disLike++
				break;
			case "reply":
				console.log("执行回复...");
				break;
			case "hotReply":
				console.log("执行热议...");
				break;
			default :
				console.log("执行跳评论列表...");
				emit("showComments",props.obj);
				break;
		}
		
	}
	
</script>

<style lang="scss" scoped>
	.comment{
		display: flex;
		justify-content: space-between;
		align-content: center;
		// border: 1rpx solid red;
		flex-wrap: wrap;
		font-size: 14rpx;
		font-weight: normal;
		
		.userInfo{
			display: flex;
			justify-content: space-between;
			align-items: center;
			// flex-wrap: wrap;
			// background-color: orange;
			width: 100%;
			.info{
				display: flex;
				justify-content: center;
				align-content: center;
				flex-wrap: wrap;
				width: 100%;
				// margin-left: 100rpx;
				// background-color: blueviolet;
				view{
					width: 250rpx;
				}
				.top{
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					// background-color: orange;
					text{
						font-size: 35rpx;
						font-weight: bold;
					}
					.left{
						// background-color: green;
						display: flex;
						justify-content: space-between;
						align-items: center;
						width: 280rpx;
					}
					.right{
						// background-color: indianred;
						width: 150rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						text{
							font-weight: normal;
						}
					}
				}
				.bottom{
					width: 100%;
					display: flex;
					justify-content: start;
					align-items: center;
					view{
						// background-color: orange;
						width: 150rpx;
						margin-right: 25rpx;
					}
					text{
						white-space: nowrap;
						font-size: 20rpx;
						color: rgba(0, 0, 0, 0.5); /* 将颜色设置为黑色，透明度为50% */
					}
				}
				
				
				
				
				
				
				
			}
			
		}
		.content{
			display: flex;
			justify-content: space-between;
			align-items: center;
			// background-color: green;
			width: 100%;
			text{
				// background-color: coral;
				margin-left: 100rpx;
				font-size: 50rpx;
				// color: red;
				font-weight: normal;
			}
		}
		.time{
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			margin-top: 30rpx;
			// background-color: orchid;
			.left{
				width: 70%;
				margin-left: 100rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				flex-wrap: nowrap;
				// background-color: red;
				text{
					white-space: nowrap;
					font-size: 30rpx;
					// margin-right: 60rpx;
					color: rgba(0, 0, 0, 0.5); /* 将颜色设置为黑色，透明度为50% */
				}
				text:nth-of-type(3){
					color: blue;
				}
				text:nth-of-type(3):hover{
					// color: red;
					text-decoration: underline;
				}
			}
		}
		.end{
			width: 97%;
			margin-left: 100rpx;
			border-bottom: 1rpx solid darkgray;
		}
		// text:nth-of-type(1){
		// 	font-size: 15px;
		// 	font-weight: bold;
		// }
		// text:nth-of-type(2){
		// 	color: green;
		// 	// border: 1rpx solid orange;
		// 	margin-right: 60%;
		// 	margin-left: 10rpx;
		// }
		// text:nth-of-type(3){
		// 	margin-right:15rpx;
		// }
		// text:nth-of-type(5){
		// 	font-size: 10rpx;
		// 	margin-left: 1%;
		// }
		// text:nth-of-type(6){
		// 	color: blueviolet;
		// 	margin-right: 65%;
		// 	font-size: 10rpx;
		// }
	}
</style>