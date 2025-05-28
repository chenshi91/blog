import useHomeContent from "./useHomeContent";
import useHomeHead from "./useHomeHead";

export default function(){
	const {tabs,typeIdExchange,loadBlogTypeList,selectdTypeId}=useHomeHead()
	const {blogList,loadBlogPageList,load_more_status,pageNo}=useHomeContent()
	
	return {
		tabs,typeIdExchange,loadBlogTypeList,selectdTypeId,
		blogList,load_more_status,loadBlogPageList,pageNo
	}
}