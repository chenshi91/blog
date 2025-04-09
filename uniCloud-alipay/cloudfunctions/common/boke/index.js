class Result{
	constructor(code,msg,data){
		this.code=code;
		this.msg=msg;
		this.data=data;
	}
}

function resultSuccess(data){
	return	new Result("200","ok",data)
}

function resultError(data){
	return	new Result("400","error",data)
}

function resultErrorWithBody(data){
	return	new Result("401","body参数有误",data)
}

function resultErrorWithNet(data){
	return	new Result("405","网络错误",data)
}

module.exports = {
	// 公用模块用法请参考 https://uniapp.dcloud.io/uniCloud/cf-common
	resultSuccess,
	resultError,
	resultErrorWithBody,
	resultErrorWithNet
}
