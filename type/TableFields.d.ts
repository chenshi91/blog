type TBaseBean = {
	_id : string | TIdObject,
	publish_ip ?: string
	publish_date ?: number,
	last_modify_ip ?: string,
	last_modify_date ?: number
	user_id ?: string | Tuser[]
}
type TIdObject = {
	_value : string,
	"open-db-news-record" ?: TRecord[],
	"open-db-news-like" ?: TLike[],
	"opendb-news-comments"?:TComments[],
}
export type TLike = {
	_id : string,
	like_type ?: TlikeType,
	status ?: TStatus,
	article_id ?: string,
	article_id2 ?: string,
	user_id : string
}

export type TStatus = 0 | 1 | 2
export type TlikeType = 0 | 1

export type Tuser = {
	_id : string,
	nickname ?: string,
	username ?: string,
	avatar_file?:{
		url:string,
		extname:string,
		name:string
	}
}

export type TRecord = {
	_id : string,
	article_id ?: string,
	publish_ip ?: string
}

export type TNews = {
	article_status : TStatus,
	category_id : string,
	comment_status : boolean,
	content : string,
	excerpt : string,
	last_modify_date ?: number,
	last_modify_ip ?: string,
	title : string,

} & TBaseBean

export type TComments={
	user_content?:string,
	article_id?:string,
	reply_id?:string,
	reply_name?:string,
	parent_id?:string,
	create_time:number,
	create_ip:number,
	city:string
}& TBaseBean

export type TResponseResult<T> = {
	code : number,
	message : string,
	errCode : number,
	errMessage : string,
	systemInfo : [],
	updated ?: number,
	id ?: string,
	data?:T | T[]
}