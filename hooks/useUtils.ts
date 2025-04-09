const getUserAvaterWithJpg=(avaterFileUrl:string):string=>{
	return "https://env-00jxgsabub39.normal.cloudstatic.cn/"+avaterFileUrl.split("cloud://env-00jxgsabub39")[1]
}

/**
 * 提取富文本里面的图片
 * @param {any} richTextContent 
 * @return 
 */ 
function extractImages(richTextContent) {
  // 创建一个新的DOM解析器
  const parser = new DOMParser();
  // 解析富文本内容为DOM
  const doc = parser.parseFromString(richTextContent, 'text/html');
  // 查询所有的img标签
  const images = doc.querySelectorAll('img'); 
  // 将img标签转换为数组，并提取其src属性
  return Array.from(images).map(img => img.src);
}

export default function(){
	return {
		getUserAvaterWithJpg,extractImages
	}
}