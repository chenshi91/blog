<template>
	<view>
		<uni-title type="h1" title="消息信息" align="center"></uni-title>
		<uni-list>
	
			<uni-list-chat v-for="item of pushMsgList" title="biao标题" :note="item.msg" 
				badgeText="1" avatarCircle="true" :time="dayjs(item.createDate).format('YYYY-MM-DD HH:mm:ss')" 
				:avatar="item.userAvater">
			</uni-list-chat>
		</uni-list>
	</view>
</template>

<script setup lang="ts" name="push-msg-test">
	import { ref } from "vue"
	import {storeToRefs} from 'pinia'
	import dayjs from "dayjs";
	import {usePushMsgAbout} from "@/store/usePushMsg.ts"
import { store } from "../../uni_modules/uni-id-pages/common/store";
	let msg=ref("lailailai")
	const store_pushMsg=usePushMsgAbout()
	
	const {pushMsgList}=storeToRefs(store_pushMsg)
	// console.log("@@@@",store_pushMsg);
	
	
	
	
</script>

<style>

</style>
