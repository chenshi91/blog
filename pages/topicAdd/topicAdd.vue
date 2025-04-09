<template>
	<view class="content">
		<view class="title">
			<text>标题:</text>
			<input v-model="topic.title"/>
		</view>
		<view class="content">
			<text>内容:</text>
			<input v-model="topic.content"/>
		</view>
		<view class="btn">
			<button @click="topicAdd()">话题添加</button>
			<button @click="topicShow()">显示话题附表信息</button>
		</view>
		<uni-list>
			<uni-list-item v-for="obj in topicList" :title="obj.title" :note="obj.content" :right-text="obj.userId[0].nickname" :thumb="obj.userId[0].avatar_file?obj.userId[0].avatar_file.url:''" thumb-size="lg"></uni-list-item>
		</uni-list>
	</view>
</template>

<script setup>
import { reactive, ref, onMounted, onUpdated,} from 'vue';
import {onLoad,onShow,} from '@dcloudio/uni-app';

	let topic=reactive({
		title:null,
		content:null,
		userId:"6643695c09ffd1e89f05bd7b",
	})
	
	let topicList=reactive([])
	
	function topicAdd(){
		console.log(topic);
		cloudTopic.topicAdd(topic).then(res=>{
			console.log(res);
			if(res.id){
				uni.showToast({
					title:"话题添加成功!"
				})
			}
		}).catch(err=>{
			console.log(err);
			uni.showToast({
				title:err.message,
				icon:"error",
			})
		}).finally(()=>{
			console.log("end...");
			setTimeout(()=>{
				uni.hideToast()
			},2000)
		})
		//刷新页面
		
	}
	
	function getTopicList(){
		cloudTopic.topicList().then(res=>{
			console.log("topicList...",res);
			if(res.data.length){
				res.data.forEach(item=>{
					topicList.push(item)
				})
			}
			// topicList.forEach()
			// console.log(topicList);
		}).catch(err=>{
			console.log(err.message);
		})
	}
	
	function topicShow(){
		const db=uniCloud.database()
		// let topicTem= db.collection("topic").field({"title":String,"content":String,"userId":String,}).getTemp()
		// let userTem= db.collection("uni-id-users").field({"_id":String,"nickname":String,"username":String,}).getTemp()
		let topicTem= db.collection("topic").field("title,content,userId").getTemp()
		let userTem= db.collection("uni-id-users").field("_id,nickname,username,avatar_file").getTemp()
		db.collection(topicTem,userTem).get().then(res=>{
			console.log("xxx",res);
			if(res.result.data.length){
				res.result.data.forEach((item,index)=>{
					const id=item._id
					if(topicList.some(o=>o._id=id)){
						topicList.splice(index,1,item)
					}
				})
				console.log(topicList);
			}
		}).catch(err=>{
			console.log("err...",err.message);
		})
	}
	
	const cloudTopic=uniCloud.importObject("cloudTopic")
	
	
	onLoad(option=>{
		console.log("onload...");
		getTopicList()
	})
	
	onUpdated(()=>{
		console.log("update...");
	})
	onMounted(()=>{
		console.log("onMounted...");
	})
</script>

<style lang="scss" scoped>
	.content{
		padding: 10rpx;
		font-size: 40rpx;
		line-height: 60rpx;
		input{
			border: 1rpx solid #ccc;
			width: 40%;
			height: 50rpx;
		}
		.title,.content{
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
	
</style>
