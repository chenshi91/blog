type TBaseBean = {
	_id : string | TIdObject,
	publish_ip ?: string
	publish_date ?: number,
	last_modify_ip ?: string,
	last_modify_date ?: number
	user_id ?: string | TUserDB[]
}
export type TIdObject = {
	_value : string,
	// [P:any]:[]
	// [k:TDataBaseTableName]: TRecordDB[]|any,
	"open-db-news-like" ?: TLikeDB[],
	"opendb-news-comments" ?: TCommentsDB[],
	"open-db-news-record" ?: TRecordDB[]
}
export type TLikeDB = {
	like_type ?: number,
	status ?: number,
	article_id ?: string,
	article_id2 ?: string,
	user_id : string
} & TBaseBean

export type TDataBaseTableName = "open-db-news-record" | "open-db-news-like" | "opendb-news-comments"

export type TUserDB = {
	nickname ?: string,
	username ?: string,
	avatar_file ?: {
		url : string,
		extname : string,
		name : string
	}
} & TBaseBean


export type TRecordDB = {
	article_id ?: string,
	publish_ip ?: string
} & TBaseBean

export type TBlogDB = {
	article_status : number,
	category_id : string,
	comment_status : boolean,
	content : string,
	excerpt : string,
	last_modify_date ?: number,
	last_modify_ip ?: string,
	title : string,
} & TBaseBean

export type TCommentsDB = {
	user_content ?: string,
	article_id ?: string,
	reply_id ?: string,
	reply_name ?: string,
	parent_id ?: string,
	create_time : number,
	create_ip : number,
	city : string
} & TBaseBean

export type TResponseResult<T> = {
	code : number,
	message : string,
	errCode : number,
	errMessage : string,
	systemInfo : [],
	updated ?: number,
	id ?: string,
	data ?: T
}

export type TBlogType = {
	_id : string,
	name : string,
	badge ?: TBadge
}

export type TBadge = {
	isDot : boolean,
	value ?: number
}

export type TBlogTypeDB = TBlogType & {
	status ?: boolean,
	sort ?: number,
	create_date ?: number
}