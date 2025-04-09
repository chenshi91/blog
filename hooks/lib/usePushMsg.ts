
const MyBlog=uniCloud.importObject("MyBlog")
const db_uni_id_device=uniCloud.database().collection("uni-id-device")

function sendMsgByCid(pcid:string,userId:string,userName:string,userAvater:string,msg:string,targetUserId:string){
	
	return new Promise<object>((resolve,reject)=>{
		if(!pcid){
			reject("pcid不能为空")
			return
		}
		
		let params={
			"appId":"__UNI__6B2967D",
			"push_clientid": pcid, 	//填写上一步在uni-app客户端获取到的客户端推送标识push_clientid
			"title": "【固定】通知栏显示的标题pushid",	
			"content": "【固定】通知栏显示的内容",
			"payload": {
				"text":"体验一下uni-push2.0",
				"userId":userId,
				"userAvater":userAvater,
				"userName":userName,
				"msg":msg,
				"targetUserId":targetUserId,
				"createDate":Date.now()
			}
		}
		MyBlog.pushMsg(params).then(res=>{
			resolve(res)
		}).catch(err=>{
			reject(err)
		})
	})
}

function sendMsgByUserId(userId:string,userName:string,userAvater:string,msg:string,targetUserId:string){
	console.log("开始发送消息了...",targetUserId);
	return new Promise<object>((resolve,reject)=>{
		db_uni_id_device.where({
			user_id:targetUserId,
			appid:"__UNI__6B2967D"
		}).field("push_clientid").get({getOne:true}).then(res=>{
			console.log("查询uni-id-device表:",res);
			const pcid=res?.result?.data?.push_clientid??""
			sendMsgByCid(pcid,userId,userName,userAvater,msg,targetUserId).then(res=>{
				resolve(res)
			}).catch(err=>{ 
				reject(err)
			})
		}).catch(err=>{
			console.log("发送消息在查设备表uni_id_device的时候异常了");
			reject(err)
		})
	})
}

export  function usePushMsg(){
	return {
		sendMsgByCid,sendMsgByUserId
	}
}