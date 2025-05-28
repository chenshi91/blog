import {ref,reactive,watch} from "vue"
import { TBlogComment } from "@/type/Comment";
import { reqBlogComments,addBlogComment,deleteCommentsByIds,clickedLike } from "@/api/reqBlogComments";
import { store } from "@/uni_modules/uni-id-pages/common/store";
import { getUserAvaterFromCloud } from "@/api/reqUserAvater";



	

	
type user={
	user_id?:string,
	user_name?:string,
	user_avatar?:string
}




export default function(){
	let myInfo = reactive<user>({})
	let userInfo = reactive<user>({})
	const tableData=reactive<TBlogComment[]>([])
	let tableTotal = ref<number>(0); // 评论总数
	const pageNo=ref<number>(1)
	const pageSize=ref<number>(3)
	type loadMoreStatus = "nomore" | "loadmore" | "loading"
	const load_more_status = ref<loadMoreStatus>("loadmore")
	
	// 评论回调事件
	const article_id=ref<string>("")
	function replyFun({ params  }, callback) {
	  console.log("replyFun", params);
	  
	  // 当请求成功, 调用callback执行评论插入;
	  // if(!(params as TBlogComment).user_id){
		 //  (params as TBlogComment).user_id="68249946a9557e30cc86a329"
		 //  (params as TBlogComment).user_name="游客"
	  // }
	  //1，评论入表
	  let addComment:TBlogComment={article_id:article_id.value}
	  Object.assign(addComment,params)
	  Reflect.deleteProperty(addComment,"create_time")
	  Reflect.deleteProperty(addComment,"id")
	  Reflect.deleteProperty(addComment,"owner")
	  
	  console.log("addComment before:",addComment);
	  addBlogComment(addComment).then(res=>{
		  console.log("addBlogComment res=",res);
		  setTimeout(()=>{
			  callback({id:res.result.id})
			  //2,发送消息
			  uni.$emit("addComment",params)
		  },500)
	  }).catch(err=>console.log("addBlogComment err=",err))
	  
	  
	} 
	
	function loadBlogComments(id:string){
		if(load_more_status.value==="nomore"){
			console.log("没有更多评论数据了!");
			return
		}
		article_id.value=id
		console.log("当前第几页：",pageNo.value);
		load_more_status.value="loading"
		reqBlogComments(id, pageNo.value, pageSize.value).then(res => {
			// console.log("评论列表api=",res);
			// Object.assign(tableData, res.data)
			res.data.forEach(i=>tableData.push(i))
			// console.log("评论列表", tableData);
			tableTotal.value=tableData.length
			if(res.total==pageSize.value){
				load_more_status.value="loadmore"
				pageNo.value++
			}else{
				load_more_status.value="nomore"
			}
		})
		
	}
	
	/** 删除回调事件
	 * mode 删除模式
	 * -- bind: 当被删除的一级评论存在回复评论, 那么该用户评论内容变更显示为[当前用户评论内容已被移除]
	 * -- only: 仅删除当前评论(后端删除相关联的回复评论, 否则总数显示不对)
	 * -- all : 删除所有评论包括回复评论
	 */
	const deleteMode = ref("all");
	function deleteFun({ params, mode }, callback) {
	  console.log("deleteFun", { params, mode });
	  deleteCommentsByIds(params).then(res=>{
		  console.log("deleteComments res=",res);
	  })
	  // 当请求成功, 调用callback执行评论删除;
	  // Demo如下:
	  // axios.post("http://xxx/delete", { ids: params, mode }).then((res) => {
	  //   if (res.code === 0) {
	  //     callback(res);
	  //   }
	  // });
	  switch (mode) {
		case "bind":
		  // 逻辑: 调用接口进行用户评论内容修改 update
		  setTimeout(() => callback(), 500); // 目前为了展示效果, 直接执行callback
		  break;
		case "only":
		  // 逻辑: 调用接口删除一个评论 delete
		  setTimeout(() => callback(), 500); // 目前为了展示效果, 直接执行callback
		  break;
		default:
		  // all
		  // 逻辑: 调用接口删除多个评论 [delete]
		  setTimeout(() => callback(), 500); // 目前为了展示效果, 直接执行callback
		  break;
	  }
	}
	
	let ccRef = ref(null);
	// 唤起新评论弹框
	function openComment() {
	  ccRef.value.newCommentFun();
	}
	// 点赞回调事件
	function likeFun({ params }, callback) {
	  console.log("likeFun", params);
	  const {_id,like_count,user_id}=params
	  clickedLike(_id,like_count).then(res=>{
		  console.log("clickLike:",res);
		  uni.$emit("updateLike",user_id)
	  }).catch(err=>{
		  callback(err)
		  console.error("clickLike err:",err);
	  })
	  // 当请求失败, 调用callback重置点赞效果;
	  // Demo如下:
	  // axios.post("http://xxx/like", { id: params }).then((res) => {
	  //   if (res.code !== 0) {
	  //     callback(res);
	  //   }
	  // });
	}
	
	function loadUserInfo(){
		if(uniCloud.getCurrentUserInfo()!.tokenExpired>Date.now()){
			console.log("已经登录，更新评论组件里面当前用户信息",store);
			myInfo.user_id=store.userInfo._id
			myInfo.user_name=store.userInfo.nickname
			getUserAvaterFromCloud(store.userInfo?.avatar_file?.url).then(res=>{
				console.log("获取到头像地址：",res);
				myInfo.user_avatar=res
				console.log("当前登录用户信息 myInfo=",myInfo);
			})
		}else{
			//默认用户信息【匿名游客】
			myInfo.user_id="68249946a9557e30cc86a329"
			myInfo.user_name="游客"
		}
	}
	loadUserInfo()
	return {
		ccRef,openComment,likeFun,replyFun,deleteMode,deleteFun,pageNo,
		myInfo,userInfo,tableData,tableTotal,load_more_status,loadBlogComments
	}
}