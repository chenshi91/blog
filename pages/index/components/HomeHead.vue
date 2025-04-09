<template>
	<view class="homeContent">
		<uni-nav-bar :right-width="150" left-icon="weibo" :left-width="18">
			<unicloud-db ref="udb" collection="opendb-news-categories" field="_id,name,sort,status" where="status==true"
				orderby="sort desc" v-slot:default="{data, pagination, loading, error}" @load="loadData">
				<view v-if="error">
					{{error.message}}
				</view>
				<view v-else-if="loading">
					<uni-load-more status="loading"></uni-load-more>
				</view>
				<view v-else>
					<uv-tabs :list="blogTypeList" @click="tabsFun($event)" scrollable
						:activeStyle="{fontWeight:'bolt',color:'#4cd964',transform:'scale(1.2)'}">
					</uv-tabs>	
				</view>
			</unicloud-db>
			<template v-slot:right>
				<uni-search-bar placeholder="请输入标题..." cancelButton="none" @confirm="searchBlog"></uni-search-bar>
			</template>
		</uni-nav-bar>
		

	</view>
</template>

<script setup lang="ts">
	import { v4 as uuidV4 } from 'uuid'
	import { ref } from 'vue';
	import { TBlogType } from '@/type/HomeData.d.ts'
	import eventBus from '../../../utils/eventBus';
	
	const id_new=uuidV4()
	const type_current=ref<{_id:string,name:string}>({_id:id_new,name:'全部'})
	const blogTypeList = ref<TBlogType[]>([])

	const emit = defineEmits(["changeIndex"])
	const tabsFun = (e) => {
		const { _id, name } = e
		// console.log("排序",e);
		type_current.value={_id,name}
		eventBus.emit("searchBlog", [_id,name])
	}


	const loadData = (data, noMore) => {
		// console.log("head:",data,noMore);
		
		blogTypeList.value.unshift({
			_id: id_new,
			name: "全部",
			badge:{
				isDot:true
			}
		})
		data.forEach(item => {
			blogTypeList.value.push({
				_id: item._id ,
				name: item.name ,
				status: item.status ,
				sort: item.sort ,
			})
		})
	}
	
	const searchBlog=({value})=>{
		value=(value as string).trim()
		const {_id,name}=type_current.value
		console.log("search title:",value,_id,name);
		eventBus.emit("searchBlog", [_id,name,value])
		value=''
	}
</script>

<style scoped>
	.homeContent {
		background-color: white;
		/* border: 1rpx solid pink; */
		width: 95%;
		/* border: 1rpx solid pink; */
	}
</style>