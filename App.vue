<script>
	import pushUtil from './utils/pushUtil'
	import {usePushMsgAbout} from '@/store/usePushMsg.ts'
	const uniIdCo = uniCloud.importObject('uni-id-co', {
	  customUI: true
	})
	export default {
		onLaunch: function() {
			console.log('App Launch')
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
			uni.getPushClientId({
				success(res) {
					console.log("获取pushClientId ok:res=",res);
				}
			})
			uniCloud.onRefreshToken(() => {
			  console.log('onRefreshToken');
			  if (uni.getPushClientId) {
			    uni.getPushClientId({
			      success: async function (e) {
			        // console.log(e)
			        const pushClientId = e.cid
			        // console.log(pushClientId);
			        const res = await uniIdCo.setPushCid({
			          pushClientId
			        })
			        // console.log('getPushClientId', res);
			      },
			      fail (e) {
			        // console.log(e)
			      }
			    })
			  }
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
