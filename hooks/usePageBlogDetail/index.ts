import useComment from "./useComment"

export default function(){
	const {ccRef,openComment,likeFun,replyFun,deleteMode,deleteFun,myInfo,userInfo,
	tableData,tableTotal,load_more_status,loadBlogComments,pageNo}=useComment()
	
	
	return {
		ccRef,openComment,likeFun,replyFun,deleteMode,deleteFun,myInfo,userInfo,
		tableData,tableTotal,load_more_status,loadBlogComments,pageNo
	}
}