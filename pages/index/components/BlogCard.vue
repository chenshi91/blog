<template>
	<view class="content">
		<uni-card >
			<!-- @click="toDetail(typeof item._id=='object'?item._id._value:item._id)" -->
			<template v-slot:title>
				<uni-list>
					<uni-list-chat :avatar-circle="true"
						:title="typeof item.user_id=='object'? item.user_id[0]?.username:'匿名'" note="站长"
						:avatar="typeof item.user_id=='object'? item.user_id[0]?.avatar_file.url:''">
						<view class="headRight">
							<uni-dateformat :date="item.publish_date"
								:threshold="[6000000,36000000000]"></uni-dateformat>
							<uni-icons :size="22" type="more"></uni-icons>
		
						</view>
					</uni-list-chat>
					<!-- <uni-list-item title="chenshi"  note="shuaigeyimei" rightText="nihaoya" :showExtraIcon="true" thumb="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"></uni-list-item> -->
				</uni-list>
			</template>
			<view class="carTitle" @click.once="toDetail(typeof item._id=='object'?item._id._value:item._id)">
				<text>{{item.title}}</text>
			</view>
			<!-- <cloud-avater  :src="item.user_id[0].avatar_file.url"></cloud-avater> -->
			<!-- <u-image width="100%" v-for="(imgUrl,index) of item.imgList" :src="imgUrl" :key="index" @click="showImg($event)"></u-image> -->
			<view v-if="imgList.length==1">
				<u-image width="100%" :src="imgList[0]" @click="showImg(imgList)"></u-image>
			</view>
			<view v-if="imgList.length>1">
				<u-image :src="imgList[0]" @click="showImg(imgList)"></u-image>
				<u-image :src="imgList[1]" @click="showImg(imgList)"></u-image>
			</view>
			<!-- <image :width="100%" src="https://extstorage.chenshi.work/blog/img/2024-08-15/360截图20240807201000.png"></image> -->
			<view @click.once="toDetail(typeof item._id=='object'?item._id._value:item._id)">{{item.excerpt}}</view>
			<template v-slot:actions>
				<view class="cardFooter">
					<view class="carItem">
						<!-- <text class="iconfont icon-yueduliang1"></text> -->
						<uni-icons customPrefix="iconfont" type="icon-yueduliang1" size="30"></uni-icons>
						<text>{{viewCount}}</text>
					</view>
					<view class="carItem">
						<!-- <text class="iconfont icon-pinglun"></text> -->
						<uni-icons customPrefix="iconfont" type="icon-pinglun" size="30"></uni-icons>
						<text v-if="replyCount">{{replyCount}}</text>
						<text v-else>评论</text>
					</view>
					<view class="carItem" @click="addLikeBlog('dislike')">
						<!-- <text :class="status.dislike?'iconfont icon-shit-o':'iconfont icon-quxiaodianzan'" data-index="dislike"></text> -->
						<uni-icons customPrefix="iconfont"
							:type="likeStatus==2?'icon-shit-o':'icon-quxiaodianzan'" size="30"></uni-icons>
						<text v-if="disLikeCount">{{disLikeCount}}</text>
						<text v-else>踩踩</text>
					</view>
					<view class="carItem" @click="addLikeBlog('like')">
						<!-- <text :class="status.like?'iconfont icon-dianzan_kuai':'iconfont icon-dianzan' " data-index="like"></text> -->
						<uni-icons customPrefix="iconfont"
							:type="likeStatus==0?'icon-dianzan_kuai':'icon-dianzan'" size="30"></uni-icons>
						<text v-if="likeCount">{{likeCount}}</text>
						<text v-else>点赞</text>
					</view>
				</view>
		
			</template>
		</uni-card>
	</view>
</template>

<script setup lang="ts">
	import type { TNews, TStatus } from '@/type/TableFields.d.ts'
	import {useLikeAbout} from '@/hooks/likeAbout.ts'
import { computed, watch } from 'vue'
import { store } from '@/uni_modules/uni-id-pages/common/store'
import useUtils from '@/hooks/useUtils.ts'
import {usePushMsg} from '@/hooks/usePushMsg'

const {sendMsgByUserId}=usePushMsg()
// sendMsgByUserId("ds","sss","ss","sd","wwwww").then()	
	
	const {addLike}=useLikeAbout()
	const { extractImages,getUserAvaterWithJpg } = useUtils()
	
	const props=defineProps<{
		item:TNews,
		nickname?:string
	}>()
	
	// console.log("props=",props);
	
	// watch(()=>{return props.item},(newVal,oldVale)=>{
	// 	console.log("数据变化了",newVal,oldVale);
	// },{deep:true})
	
	const viewCount=computed(()=>{
		if(typeof props.item._id=='object'){
			return props.item._id['open-db-news-record'].length
		}else{
			return 0
		}
	})
	
	const replyCount=computed(()=>{
		if(typeof props.item._id=='object'){
			return props.item._id['opendb-news-comments'].length
		}else{
			return 0
		}
	})
	
	const likeCount=computed(()=>{
		if(typeof props.item._id=='object'){
			return props.item._id['open-db-news-like'].filter(item => { return item.status == 0 }).length
		}else{
			return 0
		}
	})
	
	const disLikeCount=computed(()=>{
		if(typeof props.item._id=='object'){
			return props.item._id['open-db-news-like'].filter(item => { return item.status == 2 }).length
		}else{
			return 0
		}
	})
	
	const likeStatus=computed<TStatus>({
		get(){
			let likeStatus:TStatus = 1
			if (store.hasLogin) {
				if(typeof props.item._id=='object'){
					props.item._id['open-db-news-like'].forEach(item_like => {
						if (item_like.user_id == store.userInfo._id) {
							likeStatus = item_like.status
						}
					})
				}
				
			}
			return likeStatus
		},
		set(val:TStatus){
			console.log("likeStatus的值被改了：",val);
			if (store.hasLogin) {
				if(typeof props.item._id=='object'){
					let hasLikeHistory=false
					props.item._id['open-db-news-like'].forEach(item_like => {
						if (item_like.user_id == store.userInfo._id) {
							item_like.status=val
							hasLikeHistory=true
						}
					})
					if(!hasLikeHistory){
						props.item._id['open-db-news-like'].push({
							_id:"112",
							like_type:0,
							user_id:store.userInfo._id,
							article_id:typeof props.item._id =="string"?props.item._id:"",
							status:val,
							// article_id2:"sdsd"
						})
					}
					//同步修改db
					if(typeof props.item._id=='object'){
						const likeId=props.item._id._value
						addLike("blog",likeId,val).then(res=>{
							console.log("addlike ok,res=",res);
							
						}).catch(err=>{
							console.log("add like err:",err);
						})
					}
					//消息
					const {nickname,_id,avatar_file:{url}}=store.userInfo
					let operate="未知操作"
					switch(val){
						case 0:
							operate="点赞"
							break;
						case 1:
							operate="取消点赞"
							break;
						case 2:
							operate="鄙视"
							break;
					}
					const msg=nickname+operate+"了你的文章<<"+props?.item?.title+">>!"
					let targetUserId=""
					if(typeof props?.item.user_id=='object'){
						targetUserId=props?.item.user_id[0]?._id
						sendMsgByUserId(_id,nickname,getUserAvaterWithJpg(url),msg,targetUserId).then(res=>{
							console.log("消息发送ok:",res);
						}).catch(err=>{
							console.log("消息发送失败:",err);
						})
					}
					
					
					
				}
				
			}else{
				uni.showToast({
					title:"请先登录再操作！"
				})
			}
		}
	})
	
	
	
	const imgList=computed(()=>{
		return extractImages(props.item.content)
	})
	// console.log("viewCount=",viewCount);
	
	const addLikeBlog=(status:"like"|"dislike"):void=>{
		
		//改变点赞icon
			if(status=="like"){
				likeStatus.value==0?likeStatus.value=1:likeStatus.value=0
				
			}else if(status=="dislike"){
				likeStatus.value==2?likeStatus.value=1:likeStatus.value=2
			}
		
		console.log("最后的likeStatus=",likeStatus.value);
		
	}
	// watch(()=>{return data2.newsList},(newValue,oldValue)=>{
	// 	console.log("数据变化了",newValue,oldValue);
	// },{deep:true})
	
	const showImg = (imgList) => {
		console.log("showimg", imgList);
		uni.previewImage({
			urls:imgList,
			success() {
				console.log("预览图片成功！");
			},
			fail() {
				console.log("预览图片失败！err");
			}
		})
	}
	
	const toDetail = id => {
		console.log("跳转detail：", id);
		uni.navigateTo({
			url: "/pages/detail/detail?id=" + id
		})
	}
</script>

<style scoped>
	.headRight {
		display: flex;
		flex-direction: column;
	
	}
	
	.carTitle {
		display: flex;
		justify-content: center;
		/* background-color: pink; */
		font-size: 40rpx;
		color: black;
		font-weight: 900;
		margin: 0 0 20rpx 0;
	}
	
	.cardFooter {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 45px;
		border-top: 1rpx #eee solid;
	
		.carItem {
			display: flex;
			flex-wrap: nowrap;
			justify-content: center;
			align-items: center;
		}
	}
</style>