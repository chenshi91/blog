<template>
	<view class="main">
		
		<match-media :min-width="300" :max-width="960" >
			<div class="head">
				<uv-tabs :list="list" @click="tabsFun($event)" scrollable  line-width="58"
					:activeStyle="{fontWeight:'bolt',color:'#4cd964',transform:'scale(1.2)'}">
				</uv-tabs>
				
			</div>
		</match-media>
		<match-media :min-width="961">
			<HomeHead class="homeHead"></HomeHead>
			
			<HomeContent class="homeContent"></HomeContent>
			
			<HomeFooter class="homeFooter"></HomeFooter>
		</match-media>
		<!-- <HomeHead class="homeHead"></HomeHead>
		
			<HomeContent class="homeContent"></HomeContent>
		
		<HomeFooter class="homeFooter"></HomeFooter> -->

	</view>
</template>

<script setup lang="uts">
	import {
		customRef,
		reactive,
		ref
	} from 'vue';
	import {
		onLoad,
		onReady,
		onReachBottom
	} from '@dcloudio/uni-app'
	import HomeHead from './components/HomeHead.vue';
	import HomeContent from './components/HomeContent.vue';
	import HomeFooter from './components/HomeFooter.vue';
	import {
		useComments
	} from '../../hooks/comment'
import { string } from '../../uni_modules/uview-plus/libs/function/test';
import { TBlogType,TBlogTypeDB } from '../../type/HomeData';
import { v4 as uuidV4 } from 'uuid'
import { reqHomeTypeList } from '../../api';

	const {
		f1,
		demo
	} = useComments()
	// f1("wangyi hello")

	onLoad(() => {
		// console.log("hellow  aaa...",getValue("gaodeKey"));

		// uni.getPushClientId({
		// 	success:res=>{
		// 		console.log("pushCID=",res);
		// 	}
		// })

		// uni.onPushMessage((res)=>{
		// 	console.log("onPushMsg=",res);
		// })
	})
	
	const data=ref({
		typeList:[],
		
	})
	
	let list=ref<TBlogType[]>(null)
	

	
	
	
	reqHomeTypeList(1,10).then(data=>{
		console.log("api-reqHomeTypeList:",data);
		list.value=data.map(res=>{return {_id:res._id,name:res.name}})
		list.value.unshift({_id:uuidV4(),name:"全部",badge:{value:5}})
	}).catch(err=>{
		console.error("api-reqHomeTypeList:",err);
	})
	
	const tabsFun=(event)=>{
		console.log("分类被点击了...");
	}
	
	
</script>

<style scoped lang="scss">
	$vmin:7vmin;
	$chen-pink:gray;
	.main {
		
		// height: 900px;
		// background-color: lightgray;
		// display: flex;
		// align-items: center;
		// justify-content: center;
		// flex-direction: column;
		// .homeContent{
		// 	flex:1
		// }
		.head {
			padding: 1vmin 3vmin;
			height: 7vmin;
			background-color: $chen-pink;
			display: flex;
			justify-content: space-between;
			 li{
				font-size:4vmin;
				line-height: 7vmin;
				text-decoration: $uni-bg-color-grey;
			}
			.uv-tabs__wrapper__nav__item{
				font-size: 4vmin;
				color: red;
			}
		}
	}
	
	
	
	
</style>