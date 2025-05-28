<template>
	
	<uv-notice-bar :text="text" v-if="hasMsg"></uv-notice-bar>
	
</template>

<script setup lang="ts" >
	import {ref} from "vue"
	const text=ref<string>("")
	const hasMsg=ref<boolean>(false)
	setInterval(()=>{
		console.log("定时运行一下看有没有消息...");
		text.value=uni.getStorageSync("msg")
		if(text.value!=""){
			hasMsg.value=true
		}else{
			hasMsg.value=false
		}
	},5000)
</script>

<style>
</style>