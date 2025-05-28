

export const reqUserAvaters=(userIds:string[]=[])=>{
	// console.log("reqUserAvaters:",params);
	return new Promise<string[]>((resolve,reject)=>{
		
		// console.log(userIds);
		if(!userIds||userIds.length==0){
			console.log("userIds is null");
			resolve([])
			return
		}
		uniCloud.database().collection("uni-id-users").where({
			_id:uniCloud.database().command.in(userIds)
		}).field("_id,avatar_file").get().then((res)=>{
			// console.log("res=",res);
			if(res.result.data.length==0){
				resolve([])
				return
			}
			const urlArr:string[]=res.result.data.map(i=>i.avatar_file.url)
			
			Promise.all(urlArr.map(url=>getUserAvaterFromCloud(url))).then(res=>{
				// console.log("p all=",res);
				resolve(res)
			})
		}).catch(err=>{
			reject(err)
		})
	})
}



export function getUserAvaterFromCloud(avaterUrl : string) : Promise<string> {
	return new Promise<string>((resolve, reject) => {
		if (!avaterUrl) {
			console.log("avaterUrl为空,不请求cloud了");
			resolve("")
			return
		}
		if (avaterUrl.length != 0 && avaterUrl.substring(0, 8) == "cloud://") {
			uniCloud.getTempFileURL({
				fileList: [avaterUrl]
			}).then((res) => {
				// console.log('res=====', res);
				const avaterFile = res.fileList[0].tempFileURL
				resolve(avaterFile)
			}).catch((err : any) => reject(err))
		}
	})

}