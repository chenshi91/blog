<template>
	<view class="content">
		<button @click="getData()">手动加载数据</button>
		<button @click="topicAdd()">话题添加</button>
		<button @click="topicDelete()">话题删除</button>
		<unicloud-db v-slot:default="{data, loading, error, options}" collection="topic,uni-id-users"
		field="title,content,userId{nickname,avatar_file}"
		orderby="_id desc"
		loadtime="manual"
		ref="udb"
		>
			<view v-if="error">{{error.message}}</view>
			<view class="load" v-if="loading">
				<uni-load-more status="loading"></uni-load-more>
			</view>
			<view v-else>
				<uni-list >
					<uni-list-item v-for="obj in data" :title="obj.title" :note="obj.content" :right-text="obj.userId[0].nickname" :thumb="obj.userId[0].avatar_file?obj.userId[0].avatar_file.url:''" thumb-size="lg" @click="topicDelete(obj._id)" clickable></uni-list-item>
				</uni-list>
			</view>
		</unicloud-db>
	</view>
</template>

<script setup>
import { ref, } from 'vue';
	let i=ref("lst")
	let udb=ref(null)
	function getData(){
		console.log("手动加载收据...");
		udb.value.loadData()
		console.log(udb.value);
	}
	
	function topicAdd(){
		udb.value.add({
			"title":"你老婆好吗?",
			"content":"还是打好狡猾",
		})
	}
	
	function topicDelete(id){
		// console.log(id);
		udb.value.remove(id)
	}
</script>

<style lang="scss" scoped>
	
	
</style>
