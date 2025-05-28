<template>
	<view>
		<!-- #ifdef H5 -->
			<msgShow></msgShow>
		<!-- #endif -->
		<uni-nav-bar fixed :border="false" leftIcon="left" @clickLeft="clickLeft">
			<view
				style="font-size: 55rpx;font-weight: 800;width: 100%;display: flex;align-items: center;justify-content: center;">
				<text v-if="title.length<6">{{title}}</text>
				<text v-else>{{title?.substring(0,6)+'...'}}</text>
			</view>
		</uni-nav-bar>
		<uni-card isFull>
			<template v-slot:title>
				<uni-list>
					<uni-list-chat :avatar="userAvater" :title="username ?? '匿名'" note="发布于湖南省" avatar-circle>
						<view>
							<text>发布时间:</text>
							<uni-dateformat :date="publish_date" format="yyyy-MM-dd hh:MM:ss"></uni-dateformat>
						</view>
					</uni-list-chat>
				</uni-list>
			</template>
			<view class="testView">
				<!-- <text>sdghsgd和建设工地施工的计划十多个sdghsgd和建设工地施工的计划十多个sdghsgd和建设工地施工的计划十多个
				sdghsgd和建设工地施工的计划十多个sdghsgd和建设工地施工的计划十多个sdghsgd和建设工地施工的计划十多个</text> -->
				<uv-parse :content="content"></uv-parse>
			</view>
			<template v-slot:actions>
				<view class="other" :class="hasLike?'active':''" @click="clickLike(_id)">
					<!-- <text class="iconfont icon-dianzan"></text> -->
					<uni-icons type="hand-up" size="50"></uni-icons>
					<text>{{likedUserAvaters.length}}</text>
				</view>
				<view class="avaterGroup">
					<uv-avatar-group :urls="likedUserAvaters" size="35" gap="0.4"></uv-avatar-group>
				</view>
				<!-- <BlogComments :article_id="data?._id?._value" name="chenshiW" :autherInfo="data?.user_id[0]" ref="commentRef"></BlogComments> -->
			</template>
		</uni-card>
		<CComment ref="ccRef" v-model:myInfo="myInfo" v-model:userInfo="userInfo" v-model:tableData="tableData"
			v-model:tableTotal="tableTotal" :deleteMode="deleteMode" @likeFun="likeFun" @replyFun="replyFun"
			@deleteFun="deleteFun"></CComment>
			<uv-load-more class="loadMore" :status="load_more_status"  loadmoreText="触底加载更多评论..."/>
			<view class="btn" @tap="openComment">发表新评论</view>
	</view>
</template>

<script setup lang="ts">
import { onMounted, getCurrentInstance, onUnmounted, ref, reactive, toRefs, computed } from "vue"
import { onLoad,onReachBottom } from "@dcloudio/uni-app"
import CComment from "@/components/cc-comment/cc-comment.vue"
import { reqBlogContent } from "@/api/reqBlogInfo"
import { reqUserAvaters } from "@/api/reqUserAvater"
import usePageBlogDetail from "@/hooks/usePageBlogDetail"
import { sendMsg } from "../../api/sendMsg"

	
	
	const _id=ref<string>("")
	const title=ref<string>("")
	const username=ref<string>("")
	const userAvater=ref<string>("")
	const publish_date=ref<string>("")
	const content=ref<string>("")
	let likedUserAvaters=reactive<string[]>([])
	const like_status=ref<number>(0)
	const authUserId=ref<string>("")
	
	const {ccRef,deleteMode,deleteFun,replyFun,likeFun,openComment,myInfo,userInfo,tableData,tableTotal,load_more_status,loadBlogComments} =usePageBlogDetail()

	const hasLike = computed<boolean>({
		get: () => {
			return like_status.value == 0 ? true : false
		},
		set: () => {

		}
	})
	// console.log("hasLike=", hasLike);

	
	onMounted(() => {

		const instance = getCurrentInstance().proxy
		const eventChannel = instance.getOpenerEventChannel();
		eventChannel.on("selectBlogById", (params) => {
			// console.log("blogDetail eventChannel 收到了 emit:selectBlogById2", params);
			_id.value=params._id
			title.value=params.title
			username.value=params.username
			userAvater.value=params.userAvater
			publish_date.value=params.publish_date
			like_status.value=params.like_status
			authUserId.value=params?.user_id
			
			reqUserAvaters(params.like_user_ids).then(res => {
				Object.assign(likedUserAvaters,res)
				// console.log("user", userAvaters.value);
			}).catch((err) => console.error("getUserAvaters err:", err))
			// console.log("现在的id:",_id.value);
			if(_id.value==""||_id.value==null){
				return
			}
			reqBlogContent(_id.value).then(res => {
				// console.log("content=",res);
				content.value = res
			}).catch((err) => console.error("getBlogContent err:", err))
			loadBlogComments(_id.value)
			userInfo.user_avatar = userAvater.value
			userInfo.user_name = username.value
			userInfo.user_id = params?.user_id
			console.log("userInfo:",userInfo);
		})


	})

	function clickLeft() {
		uni.reLaunch({
			url:"/pages/index/index"
		})
	}
	function clickLike(_id : string) {
		console.log("like add...");
	}
	function getLikeAbout(_id : string) {

	}
	
	onReachBottom(()=>{
		console.log("触底加载更多评论...");
		
		loadBlogComments(_id.value)
	})
	uni.$on("addComment",(params)=>{
		console.log("开始发送消息...",params);
		sendMsg({
			targetUserId:authUserId.value,
			userAvater:params?.user_avatar,
			userName:params?.user_name,
			title:"你有新的评论",
			msg:`评论了你的文章【${title.value}】`
		}).then(res=>{
			console.log("res=",res);
		})
	})
	uni.$on("updateLike",user_id=>{
		sendMsg({
			targetUserId:user_id,
			title:"你有新的点赞",
			msg:`${myInfo.user_name}点赞了你的评论`,
			userAvater:myInfo.user_avatar,
			userName:myInfo.user_name,
		}).then(res=>{
			console.log("点赞msg=",res);
		})
	})
	onUnmounted(()=>{
		//销毁事件
		uni.$off(["addComment","deleteComment","updateLike"])
	})
	
	
</script>

<style lang="scss" scoped>
	.active {
		background-color: springgreen;
	}
	.btn {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 95%;
	  text-align: center;
	  color: #fff;
	  padding: 20rpx;
	  // margin: 50rpx;
	  border-radius: 30rpx;
	  background-color: #2979ff;
	}

	.detail {

		// padding: 10rpx;
		.title {
			font-size: 50rpx;
			font-weight: bold;
		}

		.userInfo {
			display: flex;
			justify-content: start;
			align-items: center;
			margin-bottom: 20rpx;

			.left {
				width: 100rpx;
				height: 100rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.right {
				margin-left: 20rpx;

				text:first-of-type {
					// color: red;
					padding-right: 20rpx;
				}
			}
		}

		.richContent {
			margin-left: 120rpx;
		}



		.other2 {
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;

			image {
				width: 50rpx;
				height: 50rpx;
				border-radius: 50%;
			}
		}

		.addComment {
			margin-top: 100rpx;
		}

		.end {
			width: 100%;
			height: 300rpx;
			// background-color: orange;
		}

	}

	.testView {
		// border: 1rpx solid pink;
		font-size: 44rpx;
		color: black;
	}

	.avaterGroup {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.other {
		width: 300rpx;
		height: 120rpx;
		background-color: #ccc;
		border-radius: 60rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 20rpx auto;
		border: 5rpx solid deeppink;

		text {
			font-size: 30rpx;
			color: white;
		}
	}
</style>