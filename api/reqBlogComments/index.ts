import { TBlogComment } from "../../type/Comment";


let commentsList : TBlogComment[] = []
export const reqBlogComments=(articleId : string, pageNo : number, pageSize : number)=>{
	return new Promise<any>((resolve,reject)=>{
		
		if(articleId==""){
			console.error("article_id is null! ");
			reject("article_id is null! ")
			return
		}
		// console.log("当前articleId=",articleId);
		uniCloud.database().collection("blog-comments").where({article_id :articleId}).skip((pageNo-1)*pageSize).limit(pageSize).get({
			getTree:true
		}).then(res=>{
			// console.log("blog-comments res=",res);
			// resolve(res.result.data)
			commentsList.splice(0)
			getCommentsListFromOld(res.result.data)
			resolve({data:commentsList,"total":res.result.data.length})
		}).catch(err=>reject(err))
		
	})
}



function getCommentsListFromOld(params : TBlogComment[]) {
	params.forEach(item => {
		const { children } = item
		item.id = item._id
		if (children.length != 0) {
			item.children = []
			commentsList.push(item)
			getCommentsListFromOld(children)
			return
		}
		commentsList.push(item)
	})
}

export const addBlogComment=(comment:TBlogComment)=>{
	return new Promise<any>((resolve,reject)=>{
		uniCloud.database().collection("blog-comments").add(comment).then(res=>resolve(res)).catch(err=>reject(err))
	})
}

export const deleteCommentsByIds=(ids:string[])=>{
	return new Promise<any>((resolve,reject)=>{
		uniCloud.database().collection("blog-comments").where({
			_id:uniCloud.database().command.in(ids)
		}).remove().then(res=>resolve(res)).catch(err=>reject(err))
	})
}

export const clickedLike=(id:string,like_count:number)=>{
	// likeOrNo=likeOrNo||true
	const cmd=uniCloud.database().command
	return new Promise<any>((resolve,reject)=>{
		let update={like_count}
		// if(likeOrNo){
		// 	//点赞操作
		// 	update={
		// 		like_count:cmd.inc(1)
		// 	}
		// }else{
		// 	//取消点赞
		// 	update={
		// 		like_count:cmd.inc(-1)
		// 	}
		// }
		uniCloud.database().collection("blog-comments").where({_id:id}).update(update).then(res=>resolve(res)).catch(err=>reject(err))
	})
}