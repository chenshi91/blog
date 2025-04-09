<template>
	<view class="content">
		
		{{demo}}
		<text v-if="uniIDHasRole('admin')">管理员才能看到{{i}}</text>
		
	</view>
</template>

<script setup>
import { ref, } from 'vue';
	let i=ref(10)
	let  demo=ref("这是一个属于陈实的个人网站,数据用来做学习测试所用,不包含任何商业用途")
	
</script>

<style lang="scss" scoped>
	.content{
		font-size: 3ex;
		font-weight: bold;
	}
	
</style>
