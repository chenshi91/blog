import {ref ,reactive} from "vue"
import type {TBlogDto, Tparams} from "@/type/index"
import  {reqBlog} from "@/api/reqBlogInfo"

type loadMoreStatus = "nomore" | "loadmore" | "loading"

export default function(){
	const pageNo = ref<number>(1)
	const pageSize = ref<number>(3)
	const load_more_status = ref<loadMoreStatus>("loadmore")
	const blogList = reactive<TBlogDto[]>([])
	
	function loadBlogPageList(callback:(blogTotal:number)=>void,slectdTypeId?:string){
		const typeId=slectdTypeId||""
		const params:Tparams={
			pageNo:pageNo.value,
			pageSize:pageSize.value,
			typeId
		}
		if(load_more_status.value=="nomore"){
			console.log("没有更多数据了");
			return
		}
		load_more_status.value="loading"
		reqBlog(params).then(res=>{
			if(res.length!=pageSize.value){
				load_more_status.value="nomore"
			}else{
				load_more_status.value="loadmore"
			}
			res.forEach(i=>blogList.push(i))
			
			callback(blogList.length)
		})
	}
	
	return {
		load_more_status,
		blogList,
		loadBlogPageList,
		pageNo
	}
}

