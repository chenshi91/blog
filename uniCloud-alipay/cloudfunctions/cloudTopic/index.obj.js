// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
const db=uniCloud.database()
const dbName="topic"
module.exports = {
	_before: function () { // 通用预处理器

	},
	/**
	 * method1方法描述
	 * @param {string} param1 参数1描述
	 * @returns {object} 返回值描述
	 */
	async topicAdd(obj){
		return await db.collection(dbName).add(obj)
	},
	
	async topicList(){
		return await db.collection(dbName).get()
	},
	
	async topicWithUser(){
		// let topicTem= db.collection(dbName).doc("6644106262775b74150dd6ac").field({"title":String,"content":String,"userId":String,}).getTemp();
		// let userTem= db.collection("uni-id-users").field("{"_id":String,"nickname":String,"username":String,}").getTemp();
		// const res=await db.collection(topicTem,userTem).get()
		// return res
		
		return await  db.collection("topic").field({"title":String}).get()
	}
	
	
}
