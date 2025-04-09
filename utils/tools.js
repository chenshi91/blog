import { promise } from "../uni_modules/uview-plus/libs/function/test"

export function getBlogList(){
	return new Promise((resolve,rejuct)=>{
		const temBlogList=uni.getStorageSync("temBlogList")
		if(temBlogList){
			resolve(temBlogList)
			return
		}
		uni.showLoading({
			title:"正在请求网络...",
		})
		uni.request({
			url:"",
		}).then(res=>{
			console.log("网络请求获取到数据...",res);
			resolve(res)
		}).catch(err=>{
			console.log(err.message);
			rejuct(err)
			uni.showToast({
				title:"网络请求错误!",
				icon:"error"
			})
		}).finally(()=>{
			setTimeout(()=>{
				uni.hideLoading()
				uni.hideToast()
			},2000)
		})
		
	})
}

export  function getCityByIP(ip){
	return  new  Promise((resolve,reject)=>{
				
		const  storange_city=uni.getStorageSync(ip)
		if(storange_city){
			const {name,time}=storange_city
			const diff_time=Date.now()-time
			if(diff_time>0&&diff_time<1000*60*60*2){
				resolve(name)
				return
			}
			uni.removeStorageSync(ip)
		}
		
		uni.request({
			url:"https://restapi.amap.com/v3/ip?key=5271bffc983efad7f332841436f495bb&ip="+ip
		}).then(res=>{
			// console.log("高德地图接口:",res);
			const {province,city}=res.data
			const obj={
				name:province+city,
				time:Date.now()
			}
			if(obj.name==null||obj.name==''){
				obj.name="火星"
			}
			uni.setStorageSync(ip,obj)
			resolve(obj.name)
		}).catch(err=>{
			reject(err)
		})
		
	})
}

export async  function getCity(){
	const res=await uni.request({
		url:"https://restapi.amap.com/v3/ip?key=5271bffc983efad7f332841436f495bb"
	})
	let pc='火星'
	const {province,city}=res.data
	if(province||city){
		pc=province+city
	}
	return pc
}

export function getImg(str){
	var data = [];
	str.replace(/<img [^>]*src=['"]([^"]+)[^>]*>/g, 
		function (match, capture) {
			data.push(capture);
		}
	);
	console.log(data)
	return data
}

//生成随机数M~N,不包含边界值M,N
export function getRadomNum(M,N){
	
	return Math.floor(Math.random()*(M-N+1))+N
}