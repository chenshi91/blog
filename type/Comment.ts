export type TUserInfo={
	user_id: string, // 用户id
	user_name: string, // 用户名
	user_avatar:string 
}

export type TTableData={
	id: string, // 评论id
	parent_id: null|string, // 评论父级的id
	reply_id: null|string, // 被回复评论的id
	reply_name: null|string, // 被回复人名称
	user_content: string, // 用户评论内容
	is_like: boolean, // 用户是否点赞
	like_count: number, // 点赞数统计
	create_time: string, // 创建时间
}&TUserInfo

export type TUserDB={
	_id:string,
	username:string,
	nickname?:string,
	avatar_file?:{
		url:string,
		name:string,
		extname:string
	}
}

export type TBlogComment = {
	_id?: string;
	id?: string;
	article_id: string;
	create_ip?: string;
	create_time?: number;
	is_like?: boolean;
	like_count?: number;
	parent_id?: string;
	reply_id?: string;
	reply_name?: string;
	user_content?: string;
	user_id?: string;
	user_name?:string,
	user_avatar?:string,
	children?: TBlogComment[];
}