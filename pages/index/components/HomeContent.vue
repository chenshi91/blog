<template>
	<view class="content">
		
		<unicloud-db :collection="data2.collection" page-data="add" :page-current="data2.pageNo"
			:page-size="data2.pageSize" :where="where" orderby="publish_date desc"
			v-slot:default="{data, pagination, loading, error}" @load="load" ref="dbRef">
			<view v-if="error">
				{{error.message}}
			</view>
			<view v-else-if="loading">
				<u-skeleton rows="3" title loading avatar animate v-for="(item,index) of 5" :key="index"></u-skeleton>
			</view>
			<view v-else>
				<scroll-view scroll-y >
				<BlogCard v-for="obj of data2.newsList" :item="obj" nickname="chenshi"></BlogCard>
				</scroll-view>
			</view>
		</unicloud-db>
		
		<uni-load-more :status="data2.hasMoreData"></uni-load-more>
	</view>
</template>

<script setup lang="ts">
	import BlogCard from './BlogCard.vue'
	import { ref, reactive, onMounted, onUnmounted, toRef, computed, watch } from 'vue'
	import eventBus from '@/utils/eventBus'
	import { onReachBottom } from '@dcloudio/uni-app'
	import type { TNews, TStatus } from '@/type/TableFields.d.ts'
	import { store } from '@/uni_modules/uni-id-pages/common/store'
	import useUtils from '@/hooks/useUtils.ts'
	import {useLikeAbout} from '@/hooks/likeAbout.ts'
	
	const { extractImages } = useUtils()
	const {addLike}=useLikeAbout()

	const db = uniCloud.database()
	const dbRef = ref()
	const data2 = reactive({
		collection: [
			db.collection("opendb-news-articles").getTemp(),
			db.collection("uni-id-users").field("_id,username,avatar_file").getTemp(),
			db.collection("open-db-news-record").field("_id,article_id,publish_ip").getTemp(),
			db.collection("open-db-news-like").where("status!=1").field("_id,like_type,status,article_id,user_id").getTemp(),
			db.collection("opendb-news-comments").field("_id,article_id,user_id,comment_content").getTemp()
		],
		pageNo: 1,
		pageSize: 5,
		newsList: [] as TNews[],
		hasMoreData: true,

	})

	// const newsList=toRef(data2.newsList)

	let where = ref("article_status==1")
	let udb = ref()

	//博客列表数据
	let blogList = reactive([])

	eventBus.on("searchBlog", (obj) => {
		const [blogTypeId, name, value] = (obj as string[])
		console.log("收到了全局事件总线的消息:", blogTypeId, name, value);
		where.value = "article_status==1"
		if (typeof value === 'string' && value.length > 0) {
			where.value += "&&title=='" + value + "'"
			console.log("@xianzai where=", where.value);
			return
		}
		if ('全部' != name) {
			where.value += "&&category_id=='" + blogTypeId + "'"
			console.log("xianzai where=", where.value);
		}
	})

	onUnmounted(() => {
		console.log("eventBus off:searchBlog");
		eventBus.off("searchBlog")
	})

	

	const load = (dataDB, onMore) : void => {
		console.log("dataDB=", dataDB, onMore)
		dataDB.forEach(item => {
			data2.newsList.push(item)
		})

		if (onMore) {
			data2.hasMoreData = false
		}
		uni.setTabBarBadge({
			index:0,
			text:data2.newsList.length+""
		})
	}

	onReachBottom(() => {
		// console.log("触底加载更多。。。");
		if (data2.hasMoreData) {
			dbRef.value.loadMore()
		} else {
			console.log("触底加载更多数据:现在没有数据了！");
		}

	})
</script>

<style scoped>
	
</style>