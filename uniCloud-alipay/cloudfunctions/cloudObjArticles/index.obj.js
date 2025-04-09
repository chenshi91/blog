const db=uniCloud.database()
const dbCmd=db.command
// const tableArticles="blog-articles"
module.exports = {
	_before: function () { // 通用预处理器

	},

	/**修改云数据库内容
	 * @param {Object} tableName
	 * @param {Object} id
	 * @param {Object} key
	 * @param {Object} value
	 */
	async   update(tableName,id,key,value){
		let obj={}
		obj[key]=dbCmd.inc(value)
		return await db.collection(tableName).doc(id).update(obj)
	},
	
	/**修改点赞数量(+1,-1)
	 * @param {Object} id
	 * @param {Object} num
	 */
	async likeCountInc(id,num){
		return await db.collection("blog-articles").doc(id).update({
			"like_count":dbCmd.inc(num)
		})
	}
	
	
	
	// async updateBlogView_count(id,num){
		
	// 	return await update2("blog-articles",id,"view_count",num)
	// },
	
	// function update2(tableName,id,key,value){
	// 	let obj={}
	// 	obj[key]=dbCmd.inc(value)
	// 	return  db.collection(tableName).doc(id).update(obj)
	// },

	
}
