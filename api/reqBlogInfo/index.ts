import { TBlogTypeDB } from "@/type/TableFields";

import type { TBlogTypeDto,TBlogDto, TreqCloudDB} from "@/type/index"
import type { TLikeDB,TIdObject,TCommentsDB,TRecordDB,TUserDB, TBlogDB } from "../../type/TableFields"

// 博客类型列表
export const reqBlogTypeList : TreqCloudDB<TBlogTypeDto[]> = () => {
	return new Promise<TBlogTypeDto[]>((resolve, reject) => {
		uniCloud.databaseForJQL().collection("opendb-news-categories").where({ status: true }).get().then((res ) => {
			// console.log(res);
			let data:TBlogTypeDto[]=[] as TBlogTypeDto[]
			(res.data as TBlogTypeDB[]).forEach(i=>{
				const item:TBlogTypeDto={
					"_id":i._id,
					"name":i.name,
					"badge":{
						isDot:false,
						value:0
					}
				}
				data.push(item)
			})
			 
			resolve(data)
		}).catch((err ) => {
			reject(err)
		})
	})
}

// 博客列表
export const reqBlog:TreqCloudDB<TBlogDto[]> = (params) => {
	params=params||{}
	let {typeId,pageNo,pageSize}=params
	// console.log("...",typeId,pageNo,pageSize);
	typeId = typeId || ''
	pageNo = pageNo || 1
	pageSize = pageSize || 3
	// console.log("...2",typeId,pageNo,pageSize);
	let newsDB_temp = {}
	if (typeId == '' || typeId == null) {
		newsDB_temp = uniCloud.databaseForJQL().collection("opendb-news-articles").where({ "article_status": 1 }).orderBy("publish_date","desc").skip((pageNo - 1) * pageSize).limit(pageSize).getTemp()
	} else {
		newsDB_temp = uniCloud.databaseForJQL().collection("opendb-news-articles").where({ "article_status": 1, "category_id": typeId }).orderBy("publish_date","desc").skip((pageNo - 1) * pageSize).limit(pageSize).getTemp()
	}
	const userDB_temp = uniCloud.databaseForJQL().collection("uni-id-users").field("_id,username,nickname,avatar_file").getTemp()
	const recordDB_temp = uniCloud.databaseForJQL().collection("open-db-news-record").getTemp()
	const likeDB_temp = uniCloud.databaseForJQL().collection("open-db-news-like").where("status!=1").field("_id,like_type,status,article_id,user_id").getTemp()
	const commentDB_temp = uniCloud.databaseForJQL().collection("opendb-news-comments").field("_id,article_id,user_id,comment_content").getTemp()
	return new Promise<TBlogDto[]>((resolve, reject) => {
		uniCloud.databaseForJQL().collection(newsDB_temp, userDB_temp, recordDB_temp, likeDB_temp, commentDB_temp).get().then((res ) => {
			// console.log("reqCloud:",res);
			const data:TBlogDto[]=[]
			res.data.forEach((i : TBlogDB) => {
				data.push({
					"_id": ((i._id) as TIdObject)._value,
					"title": i.title,
					"content": i.content,
					"excerpt": i.excerpt,
					"category_id": i.category_id,
					"publish_date": i.publish_date,
					"username": (i.user_id as TUserDB[])[0]?.nickname ?? (i.user_id as TUserDB[])[0]?.username ?? '匿名',
					"user_avater": ((i.user_id as TUserDB[])[0]?.avatar_file?.url as string),
					"user_roler": "",
					"user_id": (i.user_id as TUserDB[])[0]._id as string,
					"like_status": 1,
					"like_user_ids":((i._id as TIdObject)["open-db-news-like"] as Array<TLikeDB>).map(i=>{if(i.status==0) return i.user_id}),
					"count": {
						"view": ((i._id as TIdObject)["open-db-news-record"] as Array<TRecordDB>)?.length,
						"comments": ((i._id as TIdObject)["opendb-news-comments"] as Array<TCommentsDB>)?.length,
						"dislike": ((i._id as TIdObject)["open-db-news-like"] as Array<TLikeDB>).filter(i=>i.status==2).length,
						"like": ((i._id as TIdObject)["open-db-news-like"] as Array<TLikeDB>).filter(i=>i.status==0).length
					}
				})
			})
			resolve(data )
		}).catch((err) => {
			reject(err)
		})
	})
}


/**
 * 查询博客内容
 */
export const reqBlogContent=(id:string)=>{
	id=id||""
	return new Promise<string>((resolve,reject)=>{
		if(id===""){
			reject("_id不能为空")
			return
		}
		uniCloud.database().collection("opendb-news-articles").doc(id).field("_id,content").get({getOne:true}).then(res=>{
			// console.log("res=",res);
			resolve(res?.result?.data?.content)
		}).catch(err=>{reject(err)})
	})
}