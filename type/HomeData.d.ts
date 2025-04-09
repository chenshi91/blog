export type TBlogType = {
	_id : string,
	name : string,
	badge ?: {
		isDot ?: boolean,
		value ?: number
	}
}

export type TBlogTypeDB=TBlogType&{
	status ?: boolean,
	sort ?: number,
	create_date?:number
}