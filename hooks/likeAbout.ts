import { getCurrentInstance ,ref} from "vue"
import { store,mutations} from '@/uni_modules/uni-id-pages/common/store.js'
import type {TResponseResult,TStatus} from "@/type/TableFields.d.ts"

type TLikeType="blog"|"comment"

const xu:string="xujiali"
const getName=():string=>{
	return "我叫李二狗"
}
const db=uniCloud.database()
const dbCmd=db.command
const addLike=(likeType:TLikeType,likeId:string='',status:TStatus):Promise<TResponseResult<Object>>=>{
	// console.log("我收到了：",likeType,likeId,status);
	
	if(!likeId){
		console.log("likeId ==''!");
		return
	}
	if(!store.hasLogin){
		console.log("请先登录！");
		uni.showToast({
			title:"请先登录"
		})
		return
	}
	return new Promise<TResponseResult<Object>>((resolve,reject)=>{
		let where={
			like_type:getStatus(likeType),
			user_id:store?.userInfo?._id
		}
		if(likeType=="blog"){
			Reflect.set(where,"article_id",likeId)
			Reflect.set(where,"like_type",0)
		}else if(likeType=="comment"){
			Reflect.set(where,"comments_id",likeId)
			Reflect.set(where,"like_type",1)
		}
		// console.log("where=",where);
		db.collection("open-db-news-like").where(where).get().then(({result:{data}})=>{
			// console.log("likeDB res=",data);
			if(data.length==0){
				insertDB("blog",likeId,0).then(res=>resolve(res)).catch(err=>reject(err))
			}else if(data.length==1){
				const {_id}=data[0]
				updateDB(_id,status).then(res=>resolve(res)).catch(err=>reject(err))
			}else{
				console.error("数据错误，同一用户有多条点赞记录");
			}
			
		}).catch(err=>{
			console.log("查询点赞DB err:",err);
			reject(err)
		})
	})
	//头像组联动
	
	
}

const insertDB=(type:TLikeType,likeId:string,status:TStatus):Promise<TResponseResult<Object>>=>{
	let body={
		status,
		user_id:store.userInfo?._id
	}
	if(type=="blog"){
		Reflect.set(body,"article_id",likeId)
		Reflect.set(body,"like_type",0)
	}else if(type=="comment"){
		Reflect.set(body,"comments_id",likeId)
		Reflect.set(body,"like_type",1)
	}
	// console.log("body=",body);
	return  new  Promise<any>((resolve,reject)=>{
		db.collection("open-db-news-like").add(body).then(res=>{
			// Reflect.set(res.result,"nextRemark",store.userInfo)
			// console.log("add like ok",res);
			resolve(res?.result)
		}).catch(err=>{
			console.error("add  like err",err);
			reject(err)
		})
	})
}
const updateDB=(_id:string,status:TStatus):Promise<TResponseResult<Object>>=>{
	// console.log("update:",_id,status);
	return new Promise<TResponseResult<Object>>((resolve,reject)=>{
		db.collection("open-db-news-like").where({_id}).update({
			// _id,
			status
		}).then((res)=>{
			const {result}=res
			// Reflect.set(result,"nextRemark",store.userInfo)
			// console.log("update like ok:",res,update);
			resolve(result)
		}).catch(err=>{
			console.error("update like err:",err);
			reject(err)
		})
	})
}

const getStatus=(likeType:TLikeType):TStatus=>{
	let status:TStatus=0
	if(likeType=="comment"){
		status=1
	}
	return status
}


export function useLikeAbout(){ 
	return {
		xu,getName,
		addLike	
	}
}