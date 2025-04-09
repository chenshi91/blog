<template>
	<view class="content">
		
		<h2>{{msg}}</h2>
		<h2>{{salary}}</h2>
		<h2>{{college}}</h2>
		<h2>{{idCard}}</h2>
		<h2></h2>
		<view style="margin-top: 20rpx;">
			<image src="https://extstorage.chenshi.work/xlzs.jpg"   style="width: 720rpx; height: 1600rpx;"></image>
		</view>
	</view>
</template>

<script setup>
import { ref, } from 'vue';
import {onLoad} from '@dcloudio/uni-app'
	
	let msg=ref("目前离职找工作,一周内可到岗")
	let salary=ref("期望薪资15K")
	let college=ref("学历是全日制统招本科,学信网可查,证书编号:131881201505001649")
	let idCard=ref("身份证编号:420821199107150936")
	
	onLoad(()=>{
		console.log("找工作页面加载了...");
	})
	
</script>

<style lang="scss" scoped>
	
	
</style>
