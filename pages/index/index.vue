<template>
	<view class="main">
		
		
		<div class="head">
			<uv-tabs :list="tabs" @click="typeIdExchange($event)" scrollable  line-width="58"
				:activeStyle="{fontWeight:'bolt',color:'#4cd964',transform:'scale(1.2)'}">
			</uv-tabs>
			<!-- #ifdef H5 -->
				<msgShow></msgShow>
			<!-- #endif -->
		</div>
		
		<scroll-view class="scrollView" :scroll-y="true" :refresher-enabled="true"
		 @scrolltolower="loadMoreBlogList" @refresherrefresh="refresherpulling">
			
			<!-- #ifdef H5 -->
				<msgShow></msgShow>
			<!-- #endif -->	
			<MyBlog ref="heihei" v-for="blog of blogList" :blog="blog" :key="blog._id"></MyBlog>
			<uv-load-more class="loadMore" :status="load_more_status"  loadmoreText="触底加载更多..."/>
		</scroll-view>
		<!-- <match-media :min-width="300" :max-width="960" >
		</match-media> -->
		<!-- <match-media :min-width="961">
			<HomeHead class="homeHead"></HomeHead>
			
			<HomeContent class="homeContent"></HomeContent>
			
			<HomeFooter class="homeFooter"></HomeFooter>
		</match-media> -->
		<!-- <HomeHead class="homeHead"></HomeHead>
		
			<HomeContent class="homeContent"></HomeContent>
		
		<HomeFooter class="homeFooter"></HomeFooter> -->

	</view>
</template>

<script setup lang="ts">
import useHomeHead from '@/hooks/usePageIndex/useHomeHead';
import useHomeContent from '@/hooks/usePageIndex/useHomeContent';
import MyBlog from "./components/MyBlog.vue"
import {ref,onMounted,watch} from "vue"

const {tabs,typeIdExchange,loadBlogTypeList,selectdTypeId}=useHomeHead()
const {blogList,loadBlogPageList,load_more_status,pageNo}=useHomeContent()
loadBlogTypeList()
loadBlogPageList((blogTotal:number)=>{
	tabs.find(i=>i._id=="").badge.value=blogTotal
})
// console.log("tabs=",tabs,blogList);
const scrollViewHeight=ref("")
onMounted(()=>{
	uni.getSystemInfo().then(res=>{
		// console.log("headHeight=",head.value.offsetHeight);
		scrollViewHeight.value=(res.windowHeight-50)+"px"
		// console.log("systemInfo",res,scrollViewHeight.value);
	})
})

function loadMoreBlogList(){
	console.log("触底加载更多...");
	pageNo.value++
	loadBlogPageList((blogTotal:number)=>tabs.find(i=>i._id==selectdTypeId.value).badge.value=blogTotal,selectdTypeId.value)
}
function refresherpulling(){
	console.log("@refresherpulling ok 下拉加載更多...");
	// uni.startPullDownRefresh({
	// 	complete() {
	// 		setTimeout(()=>{
	// 			console.log("2s后关闭下拉刷新动画");
	// 			uni.stopPullDownRefresh()
	// 		},2000)
	// 	}
	// })
	
}
watch(selectdTypeId,(newVal,oldVal)=>{
	console.log(newVal,oldVal);
	pageNo.value=1,
	load_more_status.value="loadmore"
	blogList.splice(0)
	tabs.find(i=>i._id==oldVal).badge.value=0
	loadBlogPageList((blogTotal:number)=>{
		tabs.find(i=>i._id==newVal).badge.value=blogTotal
	},newVal)
})
	
	
	
	
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
			// padding: 1vmin 3vmin;
			// height: 7vmin;
			// background-color: $chen-pink;
			// display: flex;
			// justify-content: space-between;
			//  li{
			// 	font-size:4vmin;
			// 	line-height: 7vmin;
			// 	text-decoration: $uni-bg-color-grey;
			// }
			// .uv-tabs__wrapper__nav__item{
			// 	font-size: 4vmin;
			// 	color: red;
			// }
		}
	}
	
	.scrollView{
		position: absolute;
		overflow-y: hidden;
		margin-top: 80rpx;
		height: v-bind(scrollViewHeight);
		
	}
	
	
</style>