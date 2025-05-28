<template>
	<view class="content_blog" @tap="toBolgDetail">
		<uni-card :v-for="10" :isFull="true">
			<template v-slot:title>
				<uni-list>
					<uni-list-chat :avatar-circle="true" :title="username" note="站长" :avatar="avaterImg">
						<view class="headRight">
							<uni-dateformat :date="publish_date" :threshold="[6000000,36000000000]"></uni-dateformat>
							<uni-icons :size="28" type="more"></uni-icons>
						</view>
					</uni-list-chat>
					<!-- <uni-list-item title="chenshi"  note="shuaigeyimei" rightText="nihaoya" :showExtraIcon="true" thumb="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"></uni-list-item> -->
				</uni-list>
			</template>
			<view class="">{{title}}</view>
			<image style="width: 100%;" v-for="i of imgs" :src="i" @tap.stop="showImg(i)"></image>
			<text class="uni-body uni-mt-5">{{excerpt}}</text>
			<view slot="actions" class="card-actions">
				<view class="card-actions-item" @click="actionsClick('阅读')">
					<uni-icons type="heart" size="18" color="#999"></uni-icons>
					<text class="card-actions-item-text">阅读{{view}}</text>
				</view>
				<view class="card-actions-item" @click="actionsClick('评论')">
					<uni-icons type="heart" size="18" color="#999"></uni-icons>
					<text class="card-actions-item-text">评论{{comments}}</text>
				</view>
				<view class="card-actions-item" @click="actionsClick('踩踩')">
					<uni-icons type="chatbubble" size="18" color="#999"></uni-icons>
					<text class="card-actions-item-text">踩踩{{dislike}}</text>
				</view>
				<view class="card-actions-item" @click="actionsClick('点赞')">
					<uni-icons type="chatbubble" size="18" color="#999"></uni-icons>
					<text class="card-actions-item-text">点赞{{like}}</text>
				</view>
			</view>
		</uni-card>
		<!-- <uv-gap height="40" bgColor="#bbb"></uv-gap> -->
	</view>
</template>

<script setup lang="ts" name="blog223">
	import type { TBlogDto } from '@/type/BlogDto';
	import { onMounted, reactive, ref } from 'vue';
	// import { getUserAvater } from '@/hooks/userAbout';
	import { getUserAvaterFromCloud } from '../../../api/reqUserAvater';
	import { getImgsFromString } from "@/utils"

	let avaterImg = ref("")
	const props = defineProps<{
		blog : TBlogDto
	}>()
	// console.log("blog-props=", props);
	let { _id, title, content, username, user_id, publish_date, user_avater, excerpt, like_status, like_user_ids, count: { view, comments, dislike, like } } = props.blog

	function actionsClick(p : string) {
		console.log("点赞。。。", p);
		view++
		props.blog.count.view++
	}
	getUserAvaterFromCloud(user_avater).then(res => {
		// console.log("获取到了头像：", res);
		avaterImg.value = res
	})

	let imgs = reactive<string[]>([])
	Object.assign(imgs, getImgsFromString(content))
	if (imgs.length > 2) {
		imgs.splice(1, imgs.length - 2)
	}

	function showImg(i : string) {
		// console.log(e,i);
		uni.previewImage({
			urls: imgs,
			current: i
		})
	}

	function toBolgDetail() {
		// console.log("toblogdetail...");
		if (!_id) {
			console.error("_id is null");
		}
		uni.navigateTo({
			url: `/pages/detail/detail`,
			success: (res) => {
				// console.log("sss：",res);
				res.eventChannel.emit("selectBlogById", { _id, title, publish_date, username, user_id, userAvater: avaterImg.value, like_status, like_user_ids })

			}
		})
	}
</script>

<style lang="scss" scoped>
	.content_blog {
		.headRight {
			// width: 200rpx;
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: space-between;
			align-items: center;
			// border: red solid 3rpx;
		}

		.card-actions {
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			align-items: center;
			height: 45px;
			border-top: 1px #eee solid;

			.card-actions-item {
				display: flex;
				flex-direction: row;
				align-items: center;

				.card-actions-item-text {
					font-size: 12px;
					color: #666;
					margin-left: 5px;
				}
			}
		}
	}
</style>