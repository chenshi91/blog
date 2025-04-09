<template>
	<view class="detail">
		
		<unicloud-db v-slot:default="{data, loading, error, options}"  ref="udbBlog"
		:collection="collectionDB" loadtime="manual"   getone   @load="loadDB" @error="errorDB">
			<view v-if="error">{{error.message}}</view>
			<view v-else-if="loading">
				<!-- 正在加载数据... -->
				<u-skeleton rows="10" avatar ></u-skeleton>
			</view>
			<view v-else>
				<uni-nav-bar fixed :border="false"   leftIcon="left" @clickLeft="clickLeft">
					<view style="font-size: 55rpx;font-weight: 800;width: 100%;display: flex;align-items: center;justify-content: center;">
						<text v-if="data?.title.length<6">{{data?.title}}</text>
						<text v-else>{{data?.title?.substring(0,6)+'...'}}</text>
					</view>
				</uni-nav-bar>
				<uni-card isFull>
					<template v-slot:title>
						<uni-list>
							<uni-list-chat :avatar="data?.user_id[0].avatar_file?.url" :title="data?.user_id[0].username ?? '匿名'"  note="发布于湖南省" avatar-circle >
								<view>
									<uni-dateformat :date="data?.publish_date" format="yyyy-MM-dd hh:mm:ss"></uni-dateformat>
								</view>
							</uni-list-chat>
						</uni-list>
					</template>
					<view class="testView">
						<!-- <text>sdghsgd和建设工地施工的计划十多个sdghsgd和建设工地施工的计划十多个sdghsgd和建设工地施工的计划十多个
						sdghsgd和建设工地施工的计划十多个sdghsgd和建设工地施工的计划十多个sdghsgd和建设工地施工的计划十多个</text> -->
						<uv-parse :content="data?.content"></uv-parse>
					</view>
					<template v-slot:actions>
						<view class="other" :class="data2?.hasLike?'active':''"  @click="clickLike(data._id._value)">
							<text class="iconfont icon-dianzan"></text>
							<text >{{data2?.likeAvatarGroup.length}}</text>
						</view>
						<view class="avaterGroup">
							<unicloud-db collection="uni-id-users" v-slot:default="{loading, data, error, options}" ref="userRef"
							 :where="data2.where_user" field="_id,username,nickname,avatar_file" @load="loadDB_user">
								<uv-avatar-group :urls="data2?.likeAvatarGroup" size="35" gap="0.4"></uv-avatar-group>
							</unicloud-db>
							
						</view>
						<BlogComments :article_id="data?._id?._value" name="chenshiW" :autherInfo="data?.user_id[0]" ref="commentRef"></BlogComments>
					</template>
				</uni-card>
				
			
				
			</view>
		</unicloud-db>
		
		<unicloud-db collection="open-db-news-like" ref="likeDB"></unicloud-db>

	</view>
</template>

<script setup lang="ts">
import { reactive, ref,nextTick,computed,onMounted ,provide,watchEffect, getCurrentInstance, Ref, toRefs} from 'vue';
import {onLoad,onReady,onShow,onReachBottom,onPageScroll} from '@dcloudio/uni-app'
import pageJson from '@/pages.json'
import { store,mutations} from '../../uni_modules/uni-id-pages/common/store.js'
import {getCityByIP,getCity} from '@/utils/tools.js'
import {useLikeAbout} from '@/hooks/likeAbout.ts'
import useUtils from '@/hooks/useUtils.ts';
import { number, string } from '../../uni_modules/uview-plus/libs/function/test.js';
import BlogComments from './components/BlogComments.vue';
import type {TLike,Tuser,TResponseResult} from '@/type/TableFields.d.ts'
import {usePushMsg} from '@/hooks/usePushMsg'
const {xu,getName,addLike} =useLikeAbout()
const {getUserAvaterWithJpg}=useUtils()
const {sendMsgByUserId} =usePushMsg()

// console.log("setup,getCurrentInstance=",getCurrentInstance());
const data2=reactive({
	// id:'',
	// collection:[
	// 	db.collection("opendb-news-articles").field("_id,title,user_id,content,article_status").getTemp(),
	// 	// db.collection("open-db-news-like").field("_id,status,article_id,user_id").getTemp(),
	// 	// db.collection("uni-id-users").field("_id,username,nickname,avatar_file").getTemp()
	// ],
	// avatarGroup:['https://cdn.uviewui.com/uview/album/1.jpg',
	// 	'https://cdn.uviewui.com/uview/album/2.jpg'],
	pageNo:1,
	pageSize:5,
	targetUserId:"",
	title:"",
	statu_like:true,
	where_user:{},
	hasLike:false,
	like_user_ids:[] as string[],
	likeAvatarGroup:[] as string[],
	open_db_news_like:[] as TLike[],
	
	
})


const udbBlog=ref(null)
const id=ref<string>()
const db=uniCloud.database()
const dbCmd=db.command
const collectionDB=reactive([])
const likeDB=ref(null)
const loadDB=(res,noMore)=>{
	const {_id}=res
	console.log("loadDB:",res,noMore);
	data2.open_db_news_like=res?._id["open-db-news-like"]
	data2.like_user_ids=data2.open_db_news_like.map(item=>{
		return item.user_id
	})
	data2.hasLike=data2.like_user_ids.includes(userInfo.value?._id)
	// console.log(data2.like_user_ids);
	data2.where_user={
		_id:dbCmd.in(data2.like_user_ids)
	}
	data2.targetUserId=res?.user_id[0]?._id
	data2.title=res?.title
}
const loadDB_user=(res,noMore)=>{
	// console.log("userDB load:",res,noMore);
	data2.likeAvatarGroup=res.map(item=>{
		if(item?.avatar_file?.url){
			return "https://env-00jxgsabub39.normal.cloudstatic.cn/"+item?.avatar_file?.url.split("cloud://env-00jxgsabub39")[1]
		}else{//默认头像
			return 'https://cdn.uviewui.com/uview/album/1.jpg'
		}
	})
	// console.log("头像组:",data2.likeAvatarGroup);
}
const errorDB=(p1,p2)=>{
	console.log("5555555555,",p1,p2);
}

	
	const clickLeft=()=>{
		uni.navigateBack()
	}
	
// const {_id,nickname,avatar_file:{url}}=store?.userInfo
	
const clickLike=(id_blog:string)=>{
	// console.log("点赞：",id_blog,data2.hasLike);
	data2.hasLike=!data2.hasLike
	// console.error("cuowu err");
	addLike("blog",id_blog,data2.hasLike?0:1).then(res =>{
		// console.log("addLike ok,res=",res);
		//头像组的联动+消息推送
		const userAvater=getUserAvaterWithJpg(userInfo.value?.avatar_file?.url)
		if(res?.id){
			//新增
			// console.log("新增点赞ok，图像组联动...");
			data2.likeAvatarGroup.unshift(userAvater)
			//消息
			const msg=nickname+"给你的文章<<"+data2.title+">>点赞了!"
			sendMsgByUserId(_id,nickname,getUserAvaterWithJpg(url),msg,data2.targetUserId).then(res=>{
				console.log("消息发送ok:",res);
			}).catch(err=>{
				console.log("消息发送失败:",err);
			})
		}else if(res?.updated==1&&data2.hasLike){
			//点赞
			// console.log("重新点赞ok，图像组联动...");
			data2.likeAvatarGroup.unshift(userAvater)
			//消息
			const msg=nickname+"给你的文章<<"+data2.title+">>重新点赞了!"
			sendMsgByUserId(_id,nickname,getUserAvaterWithJpg(url),msg,data2.targetUserId).then(res=>{
				console.log("消息发送ok:",res);
			}).catch(err=>{
				console.log("消息发送失败:",err);
			})
		}else if(res?.updated==1&&!data2.hasLike){
			//取消点赞
			console.log("取消点赞ok，图像组联动...");
			data2.likeAvatarGroup=data2.likeAvatarGroup.filter(item=>{
				return item!=userAvater
			})
			//消息
			const msg=nickname+"给你的文章<<"+data2.title+">>取消点赞了!"
			sendMsgByUserId(_id,nickname,getUserAvaterWithJpg(url),msg,data2.targetUserId).then(res=>{
				console.log("消息发送ok:",res);
			}).catch(err=>{
				console.log("消息发送失败:",err);
			})
		}
	}).catch(err=>{
		console.log("addLike err:",err);
	})
	
	
	
}

	
	const userInfo=computed(()=>{return store.userInfo})
	const hasLogin=computed(()=>{return store.hasLogin})
	
	
	
	
	onPageScroll((e)=>{
		// scrollTop.value=e.scrollTop
		// console.log(e.scrollTop);
	})
	onLoad((ops)=>{
		
		console.log("detail-onload.id=",ops);
		if(!ops||!ops.id){
			console.log("id为空跳转到首页");
			uni.navigateTo({
				url:"/pages/index/index"
			}).then(res=>{
				console.log(res);
			}).catch(err=>{
				console.log(err.message);
			})
			return
		}
		// data.id=ops.id
		// Reflect.set(data2.where,"_id",ops.id)
		//id到位开始加载数据
		id.value=ops.id
		
		collectionDB.push(db.collection("opendb-news-articles").where(`_id=='${id.value}'`).field("_id,title,user_id,content,article_status,publish_date").getTemp())
		collectionDB.push(db.collection('open-db-news-like').where("status!=1").field('_id,user_id,article_id,status').getTemp())
		collectionDB.push(db.collection("uni-id-users").field("_id,username,nickname,avatar_file").getTemp())
		nextTick(()=>{
			// getCurrentInstance().proxy.$refs.udbBlog.loadData()
			udbBlog.value.loadData()
		})
		// data2.where={_id:ops.id}
		//viewCount++
		db.collection("open-db-news-record").add({
			article_id:id.value,
			user_id:userInfo.value?._id
		}).then(({result:{id}})=>{
			console.log("add record ok:",id);
			if(id){
				db.collection("open-db-news-record").doc(id).get({getOne:true}).then(({result:{data}})=>{
					console.log("res=",data);
					if(data){
						const {publish_ip}=data
						getCityByIP(publish_ip).then(city=>{
							console.log("拿到了city=",city);
							db.collection("open-db-news-record").doc(id).update({
								city
							}).then(({result})=>{
								console.log("修改city 成功!",result);
							}).catch(err=>{
								console.error("修改城市失败了:",err);
							})
						})
					}
				})
			}
		})
		
	})
	
	onReachBottom(()=>{
		console.log("我触底了...");	
	})
	
	onMounted(()=>{
		console.log("moutend..:",id.value);
		// console.log("kankna :",udbBlog.value);
		// udbBlog.value.loadData()
		// console.log(getCurrentInstance());
	})
	onReady(()=>{
		
	})
	
</script>

<style lang="scss" scoped>
	.detail{
		// padding: 10rpx;
		.title{
			font-size: 50rpx;
			font-weight: bold;
		}
		.userInfo{
			display: flex;
			justify-content: start;
			align-items: center;
			margin-bottom: 20rpx;
			.left{
				width: 100rpx;
				height: 100rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.right{
				margin-left: 20rpx;
				
				text:first-of-type{
					// color: red;
					padding-right: 20rpx;
				}
			}
		}
		.richContent{
			margin-left: 120rpx;
		}
		.other{
			width: 300rpx;
			height: 120rpx;
			background-color: #ccc;
			border-radius: 60rpx;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			margin: 20rpx auto;
			text{
				font-size: 60rpx;
				color: white;
			}
		}
		.active{
			background-color: springgreen;
		}
		.other2{
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			image{
				width: 50rpx;
				height: 50rpx;
				border-radius: 50%;
			}
		}
		.addComment{
			margin-top: 100rpx;
		}
		.end{
			width: 100%;
			height: 300rpx;
			// background-color: orange;
		}
		
	}
	
	.testView{
		// border: 1rpx solid pink;
		font-size: 44rpx;
		color: black;
	}
	.avaterGroup{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	
</style>
