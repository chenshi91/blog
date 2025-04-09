// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129

const {resultSuccess,resultError,resultErrorWithBody}=require("boke")
const dbCmd=uniCloud.database().command
const pushManager=uniCloud.getPushManager({
	appId:"__UNI__6B2967D"
})
module.exports = {
	_before: function () { // 通用预处理器
		this.dateStart=Date.now()
		
	},
	_after:function(error,res){
		if(error){
			error.totalTime=Date.now()-this.dateStart
			throw error
		}
		res.totalTime=Date.now()-this.dateStart
		return res
	},
	
	
	async fun1(){
		const aa=await pushManager.sendMessage({
			"push_clientid": "ad9a1f1c97a539acb26f8ba09c86306f", 	//填写上一步在uni-app客户端获取到的客户端推送标识push_clientid
			"title": "通知栏显示的标题",	
			"content": "通知栏显示的内容",
			"payload": {
				"text":"体验一下uni-push2.0"
			}
		})
		return resultSuccess("你老婆好吗")
	},
	
	
	async  viewCountInc(id){
		return   await uniCloud.database().collection("opendb-news-articles").doc(id).update({
			"view_count":dbCmd.inc(1)
		})
		
		
		// return resultSuccess("数据纪录成功!")
	},
	
	
}
