import {ref,reactive} from 'vue'
import type{TUserInfo,TTableData} from '@/type/Comment.d.ts'

const demo=ref<string>("duck *****")
const f1=(val:string='sd')=>{
	console.log(val);
}

const db = uniCloud.database()
const collectionList=reactive([ db.collection('opendb-news-comments').field('_id,article_id,comment_content,comment_type,reply_user_id,reply_comment_id,status,user_id,comment_date').getTemp(),
								db.collection('opendb-news-articles').field('title ,_id').getTemp(),
								db.collection('uni-id-users').field('username,nickname,avatar_file,_id').getTemp(),
								db.collection('open-db-news-like').field('_id,user_id,comments_id,status').getTemp()]) 
								
const loadCommentList=(res,noMore)=>{
	console.log("loadCommentList:",res,noMore);
	res.forEach(item=>{
		const demo:TTableData={
			...item,
			id:item._id._value,
			reply_id:item.reply_id[0]?._id,
			reply_name:item.reply_id[0]?.username,
			user_id:item.user_id[0]._id,
			user_name:item.user_id[0]?.username??'wuming',
			user_avatar:"https://env-00jxgsabub39.normal.cloudstatic.cn/"+item.user_id[0]?.avatar_file?.url.split("cloud://env-00jxgsabub39")[1],
			is_like:false,
			like_count:item._id["open-db-news-like"].length,
		}
		item._id["open-db-news-like"].forEach(item=>{
			if(item.comments_id===demo.id){
				demo.is_like=true
			}
		})
		// console.log(demo);
		tableData.value.push(demo)
	})
	tableTotal.value=tableData.value.length
}
// 当前登录用户信息
const myInfo:TUserInfo={
  user_id: "dsd", // 用户id
  user_name: "xujiali", // 用户名
  user_avatar: "https://img0.du.com/it/u=2836960144,3650263035&fm=253&fmt=auto&app=138&f=JPEG?w=474&h=474", // 用户头像地址
}
// 文章作者信息
const userInfo=reactive<TUserInfo>({
  user_id: "", // 用户id
  user_name: "xujiali", // 用户名
  user_avatar: "https://img0.du.com/it/u=2836960144,3650263035&fm=253&fmt=auto&app=138&f=JPEG?w=474&h=474", // 用户头像地址
}) 
let tableTotal = ref<number>(0)  // 评论总数
let tableData = ref<TTableData[]>([
	  {
	    id: 120, // 评论id
	    parent_id: null, // 评论父级的id
	    reply_id: null, // 被回复评论的id
	    reply_name: null, // 被回复人名称
	    user_id: 2, // 用户id
	    user_name: "ikun", // 用户名
	    user_avatar: "https://pic1.zhimg.com/80/v2-a79071a705f55c5d88f6c74e6111fe84_720w.webp", // 用户头像地址
	    user_content: "唱,跳,rap,篮球", // 用户评论内容
	    is_like: false, // 用户是否点赞
	    like_count: 120, // 点赞数统计
	    create_time: "2025-02-19 09:16", // 创建时间
	  },
	  {
	    id: 130,
	    parent_id: 120, // 评论父级的id
	    reply_id: 120, // 被回复评论的id
	    reply_name: "ikun", // 被回复人名称
	    user_id: 3, // 用户id
	    user_name: "小黑子", // 用户名
	    user_avatar: "https://pic2.zhimg.com/80/v2-06eade66ec837713d765b1557bf20b25_720w.webp", // 用户头像地址
	    user_content: "姬霓太美~祝自己生日快乐~~", // 用户评论内容
	    is_like: false, // 用户是否点赞
	    like_count: 67, // 点赞数统计
	    create_time: "2025-03-07 00:06", // 创建时间
	  },
	  {
	    id: 140,
	    parent_id: 120, // 评论父级的id
	    reply_id: 130, // 被回复评论的id
	    reply_name: "小黑子", // 被回复人名称
	    user_id: 4, // 用户id
	    user_name: "守护宗主维护宗门", // 用户名
	    user_avatar: "https://pic3.zhimg.com/80/v2-244696a62fa750b8570cf56bfaa5b26a_720w.webp", // 用户头像地址
	    user_content: "你露出鸡脚了", // 用户评论内容
	    is_like: false, // 用户是否点赞
	    like_count: 16, // 点赞数统计
	    create_time: "2025-05-10 17:08", // 创建时间
	  },
	  {
	    id: 150,
	    parent_id: null, // 评论父级的id
	    reply_id: null, // 被回复评论的id
	    reply_name: null, // 被回复人名称
	    user_id: 5, // 用户id
	    user_name: "音乐制作人", // 用户名
	    user_avatar: "https://pic2.zhimg.com/80/v2-88ec6f8c6d3305122664dd18a28730e5_720w.webp", // 用户头像地址
	    user_content:
	      "只因你太美baby 只因你太美baby 只因你实在是太美baby 只因你太美baby 迎面走来的你让我如此蠢蠢欲动 这种感觉我从未有 Cause I got a crush on you who you 你是我的 我是你的 谁 再多一眼看一眼就会爆炸 再近一点靠近点快被融化", // 用户评论内容
	    is_like: true, // 用户是否点赞
	    like_count: 8, // 点赞数统计
	    create_time: "2025-12-21 00:45", // 创建时间
	  },
	]) //评论信息

// 唤起新评论弹框
let ccRef = ref(null);
function openComment(p1) {
  console.log("新的评论：",p1);	
  ccRef.value.newCommentFun();
}

// 点赞回调事件
function likeFun({ params }, callback) {
  console.log("likeFun", params);
  // 当请求失败, 调用callback重置点赞效果;
  // Demo如下:
  // axios.post("http://xxx/like", { id: params }).then((res) => {
  //   if (res.code !== 0) {
  //     callback(res);
  //   }
  // });
}

// 评论回调事件
function replyFun({ params }, callback) {
  console.log("replyFun", params);
  const{user_content,reply_id,parent_id}=params
  console.log(user_content,reply_id,parent_id);
  // 当请求成功, 调用callback执行评论插入;
  // Demo如下:
  // axios.post("http://xxx/reply", { ...params }).then((res) => {
  //   if (res.code === 0) {
  //     callback(res);
  //   }
  // });
  uni.showToast({
  	title:"评论成功！"
  })
  const res = { id: Math.random() }; // 很重要的回参! 必须拿到后端返回评论id! 删除需要!
  setTimeout(() => callback(res), 500); // 目前为了展示效果, 直接执行callback
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

export function useComments(){
	
	
	return {
		collectionList,loadCommentList,
		ccRef,likeFun,replyFun,openComment,
		myInfo,userInfo2:userInfo,tableTotal,tableData,
		demo,f1
	}
}