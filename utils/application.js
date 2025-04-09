
//配置文件
export function getValue(key){
	let value=null
	switch(key){
		case "name":  value="xujl";  break;
		case "gaodeKey": value="5271bffc983efad7f332841436f495bb"; break;//高德地图配置key
		default : break;
	}
	return value 
}