export type Tparams={
	pageNo?:number,
	pageSize?:number,
	typeId?:string,
	_id?:string,
	userIds?:string[],
	articleId?:string
}
export type TreqCloudDB<T> = (params ?: Tparams) => Promise<T>

type TId = {
	_id : string,
	publish_date ?: number,
}

export type TBlogTypeDto = {
	name : string,
	badge : TBadge
} & TId

 type TBadge = {
	isDot ?: boolean,
	value ?: number
}

export type TBlogDto={
	category_id : string,
	content : string,
	excerpt : string,
	title : string,
	username : string,
	user_avater : string,
	user_roler : string,
	user_id:string,
	like_status:number,
	like_user_ids:string[],
	count : {
		view : number,
		like : number,
		dislike : number,
		comments : number
	}
} & TId