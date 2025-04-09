export default function (){
	
	uni.getPushClientId({
		success(res) {
			console.log(res);
		}
	})
	
	uni.onPushMessage((res)=>{
		console.log(res);
		switch(res.type){
			case "receive":
				uni.createPushMessage({
					title:"你关注的up主更新了!",
					content:"大家好改电话费搞活动",
				})
			break
			case "click":
				// console.log(res);
				uni.navigateTo({
					url:"/pages/topicList/topicList"
				})
			break
		}
		
	})
}