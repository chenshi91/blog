<template>
	<view class="self">
		<!-- <up-icon name="photo"></up-icon> -->
		<!-- #ifdef H5 -->
			<msgShow></msgShow>
		<!-- #endif -->
		<view class="head" @click="toUserInfo($event)">
			<view class="left">
				<cloud-avater :src="userInfo?.avatar_file?.url??'../../static/logo.png'" mode="aspectFill"></cloud-avater>  
				<view class="userInfo" >
					<view>{{userInfo?.username}}</view>
					<view v-if="hasLogin">
						<!-- <uni-dateformat :date="register_date" ></uni-dateformat> -->
						<uni-dateformat :date="userInfo?.register_date" :threshold="[60000,3600000*24*30]" format="yyyy-MM-dd hh:mm:ss"></uni-dateformat>
						<text>注册</text>
					</view>
					<view v-else><text>点击登陆</text></view>
				</view>
			</view>
			<view class="right" >
				<text class="iconfont icon-fangxiang-xiangyou" data-index="44"></text>
			</view>
		</view>
		
		<view class="count">
			<view class="detail">
				<text>评论{{count.comments}}</text>
				<text>点赞{{count.likes}}</text>
				<text>收藏{{count.favorite}}</text>
				<text>历史{{count.records}}</text>
			</view>
			<view class="item" @click="toItem($event)">
				<view class="left">
					<text class="iconfont icon-a-bianzu451x" data-index="changwen"></text>
					<text data-index="changwen">我的长文</text>
				</view>
				<view class="right">
					<text class="iconfont icon-fangxiang-xiangyou" data-index="changwen"></text>
				</view>
				<view class="left">
					<text class="iconfont icon-dianzan" data-index="dianzan"></text>
					<text data-index="dianzan">我的点赞</text>
				</view>
				<view class="right">
					<text class="iconfont icon-fangxiang-xiangyou" data-index="dianzan"></text>
				</view>
				<view class="left">
					<text class="iconfont icon-pinglun" data-index="reply"></text>
					<text data-index="reply">评论过的</text>
				</view>
				<view class="right">
					<text class="iconfont icon-fangxiang-xiangyou" data-index="reply"></text>
				</view>
				<view class="hui"></view>
				
				<view class="left">
					<text class="iconfont icon-guanyu" data-index="about"></text>
					<text data-index="about">关于网站</text>
				</view>
				<view class="right">
					<text class="iconfont icon-fangxiang-xiangyou" data-index="about"></text>
				</view>
				<view class="left">
					<text class="iconfont icon-yijian" data-index="suggest"></text>
					<text data-index="suggest">意见反馈</text>
				</view>
				<view class="right">
					<text class="iconfont icon-fangxiang-xiangyou" data-index="suggest"></text>
				</view>
				<view class="hui"></view>
				
				<view class="left" @click="logout()">
					<text class="iconfont icon-tuichudenglu"></text>
					<text>退出登陆</text>
				</view>
				<view class="right">
					<text class="iconfont icon-fangxiang-xiangyou"></text>
				</view>
			</view>
			
			
			
		</view>
		
				
		
	</view>
	
	
</template>

<script setup>
import { computed, ref, reactive} from 'vue';
import {onLoad,onShow} from '@dcloudio/uni-app'
import {store,mutations} from '@/uni_modules/uni-id-pages/common/store.js'	

const hasLogin=computed(()=>store.hasLogin)
const userInfo=computed(()=>store.userInfo)
const count=reactive({
	likes:0,
	comments:0,
	favorite:0,
	records:0
})
let text=ref("我的个人信息")

	onLoad((ops)=>{
		// debugger
		
		
	})
	
	onShow(()=>{
		if(hasLogin.value){
			uni.setNavigationBarTitle({
				title:store.userInfo.username+'的个人信息'
			})
			//统计:点赞数,评论数,收藏数,记录数
			uniCloud.database().collection("open-db-news-like").where("status==0&&user_id==$cloudEnv_uid").count().then(res=>{count.likes=res.result.total})
			uniCloud.database().collection("opendb-news-favorite").where("user_id==$cloudEnv_uid").count().then(res=>{count.favorite=res.result.total})
			uniCloud.database().collection("open-db-news-record").where("user_id==$cloudEnv_uid").count().then(res=>{count.records=res.result.total})
		}
	})
	
	// const username=computed(()=>store.userInfo.username)
	// const user_id=computed(()=>store.userInfo._id)
	// const avatar_file=computed(()=>store.userInfo.avatar_file)
	// const register_date=computed(()=>store.userInfo.register_date)

	//跳转用户中心
	function toUserInfo(e){
		console.log(e?.target?.dataset?.index??"hehe");
		const route=getCurrentPages()
		const routePagenow=route[route.length-1].route
		if(!hasLogin.value){
			uni.navigateTo({
				url:"/uni_modules/uni-id-pages/pages/login/login-withpwd?uniIdRedirectUrl=/"+routePagenow
			})
			return
		}
		uni.navigateTo({
			url:"/uni_modules/uni-id-pages/pages/userinfo/userinfo"
		})
	}
	
	//跳转页面
	function toItem(e){
		// console.log(e?.target?.dataset?.index??'unkonw');
		console.log(store.userInfo);
		if(!hasLogin){
			uni.showToast({
				title:"请先登陆才能操作"
			})
			return
		}
		const index=e?.target?.dataset?.index??'unkonw'
		switch(index){
			case "changwen"://我的长文
				uni.navigateTo({
					url:"/pages/opendb-news-articles/list"
				})
			break;
			case "dianzan"://我的点赞
				console.log("点赞")
				uni.navigateTo({
					url:"/pages/open-db-news-like/list"
				})
			break;
			case "reply"://评论过的
				console.log("评论过的")
			break;
			case "about"://关于
				console.log("关于")
				uni.navigateTo({
					url:"/pages/about/about"
				})
			break;
			case "suggest"://意见反馈
				console.log("意见反馈")
				uni.navigateTo({
					url:"/uni_modules/uni-feedback/pages/opendb-feedback/opendb-feedback"
				});
			break;
			default :
			break;
		}
		
	}
	
	//退出登录
	function logout(){
		if(!hasLogin){
			return
		}
		uni.showModal({
			title:"是否退出登陆",
			
		}).then(res=>{
			// console.log(res);
			if(res.cancel) return
			mutations.logout().then(res=>{
				console.log(res);
			}).catch(err=>{
				console.log(err.message);
			})
			
		})
	}
</script>

<style lang="scss" scoped>
	.self{
		background-color: #ccc;
		// border: 1rpx solid red;
		box-sizing: border-box;
		.head{
			background-color: #ccc;
			height: 300rpx;
			padding: 0 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			image{
				width: 150rpx;
				height: 150rpx;
				border-radius: 50%;
			}
			.left{
				display: flex;
				align-items: center;
				.userInfo{
					margin-left: 20rpx;
					view:first-of-type{
						font-size: 50rpx;
						color: white;
					}
					view:last-of-type{
						// color: orange;
						font-weight: bold;
					}
				}
			}
			.right{
				text{
					font-size: 50rpx;
				}
			}
		}
		
		.count{
			padding: 0 20rpx;
			border-top-right-radius: 40rpx;
			border-top-left-radius: 40rpx;
			margin-top: -40rpx;
			background-color: white;
			.detail{
				margin: 20rpx 0 30rpx 0;
				display: flex;
				justify-content: space-evenly;
				align-items: center;
				text{
					font-size: 40rpx;
					margin-right: 10rpx;
				}
			}
			.item{
				// height: 300rpx;
				display: flex;
				justify-content: space-between;
				align-content: center;
				flex-wrap: wrap;
				.left{
					width: 87%;
					height: 90rpx;
					text{
						font-size: 50rpx;
					}
				}
				.right{
					height: 90rpx;
					text{
						font-size: 40rpx;
					}
				}
				.hui{
					background-color: #ccc;
					width: 100%;
					height: 10rpx;
					margin-bottom: 20rpx;
				}
			}
		}
		
		
		
		
	}
	
</style>
