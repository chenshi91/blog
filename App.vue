<script>
	import pushUtil from './utils/pushUtil'
	import {usePushMsgAbout} from '@/store/usePushMsg.ts'
	import init from "./uni_modules/uni-id-pages/init.js"
	
	export default {
		onLaunch: function() {
			console.log('App Launch')
			init()
			// pushUtil()
			uni.onPushMessage(res=>{
				const {data:{payload:{userId,userName,userAvater,targetUserId,msg,createDate}}}=res
				console.log("我收到了推送消息:",res);
				// cosnt MyBlog=uniCloud.importObject("MyBlog")
				const store_pushMsg=usePushMsgAbout()
				store_pushMsg.addMsg({
					userId,
					userName,
					userAvater,
					msg,
					targetUserId,
					createDate
				})
				uni.setTabBarBadge({
					index:1,
					text:store_pushMsg.pushMsgList.length+""
				})
			})
			
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss" >
	
	/*每个页面公共css */
	@import url("static/font/iconfont.css");
	
	/*uview-plus*/
	@import "@/uni_modules/uview-plus/index.scss";
	
	@import "@/static/font2/iconfont.css"
	
	// *{
	// 	box-sizing: border-box;
	// 	padding: 0;
	// 	margin: 0;
	// 	font-size: 30rpx;
	// }
</style>
