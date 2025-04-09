import type { TBlogTypeDB } from "../type/HomeData";

export function reqHomeTypeList(pageNo:number=1,pageSize:number=10):Promise<TBlogTypeDB[]>{
	pageNo=pageNo||1;
	pageSize=pageSize||10;
	return new Promise<TBlogTypeDB[]>((resolve,reject)=>{
		uniCloud.database().collection("opendb-news-categories").where({status:true}).orderBy("sort","asc").get().then(({result:{data}})=>{
			// console.log("我获取到了type:",data);
			resolve(data);
		}).catch(err=>reject(err))
	})
}