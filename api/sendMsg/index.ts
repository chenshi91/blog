import { reactive } from "vue"


type TParams={
	targetUserId:string,
	userName:string,
	userAvater:string,
	msg:string,
	title:string
}

export const  sendMsg=(params:TParams)=>{
	return new Promise<any>((resolve,reject)=>{
		const {targetUserId,userName,userAvater,msg,title}=params
		const push_clientids=reactive<string[]>([])
		uniCloud.database().collection("uni-id-device").where({user_id:targetUserId}).field("push_clientid").get({getCount:true}).then(res=>{
			// console.log("查询目标设备id：",res);
			Object.assign(push_clientids,res?.result?.data.map(i=>i.push_clientid))
			if(push_clientids.length==0){
				//当前推送用户不在线，则存表定时轮询检测，当用户上线后再推消息
				resolve("当前用户不在线，存表本次消息记录")
				return
			}
			console.log("sendMsg开始调用...");
			const blogClodObj=uniCloud.importObject("MyBlog",{
				customUI:true
			})
			const params2={
				"appId":"__UNI__2C0A11F",
				"push_clientid": push_clientids, 	//填写上一步在uni-app客户端获取到的客户端推送标识push_clientid
				"title": title,	
				"content": "【固定】通知栏显示的内容",
				"payload": {
					"text":"体验一下uni-push2.0",
					"userAvater":userAvater,
					"userName":userName,
					"msg":msg,
					"targetUserId":targetUserId,
					"createDate":Date.now()
				}
			}
			console.log("params2="+JSON.stringify(params2));
			blogClodObj.pushMsg(params2).then(res=>{
				// console.log("消息发送，res=",res);
				resolve(res)
			}).catch(err=>reject("消息出错了："+err))
		})
		
		
		
	})
}