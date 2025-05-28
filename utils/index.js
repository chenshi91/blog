export function f1(){
	console.log("woshi f1");
}
// import {createRequire} from 'module'
// const require=createRequire(import.meta.url)

// export const demo=require("demo.js")


export function getImgsFromString(str){
	var data = [];
	str.replace(/<img [^>]*src=['"]([^"]+)[^>]*>/g, 
		function (match, capture) {
			data.push(capture);
		}
	);
	// console.log(data)
	return data
}