import { reactive, ref, watch } from "vue"
import type { TBlogTypeDto } from "@/type/BlogDto"
import { reqBlogTypeList } from "@/api/reqBlogInfo"


export default function () {
	let tabs = reactive<TBlogTypeDto[]>([])
	let selectdTypeId = ref<string>("")
	

	tabs.unshift({ "name": "全部", "_id": "", "badge": { "isDot": false, "value": 0 } })
	function loadBlogTypeList() {
		reqBlogTypeList().then(res => {
			//Object.assign(tabs, res)
			res.forEach(i=>tabs.push(i))
		})
	}

	function typeIdExchange(blogTypeDto : TBlogTypeDto) {
		selectdTypeId.value = blogTypeDto._id
	}

	return {
		tabs,
		selectdTypeId,
		typeIdExchange,
		loadBlogTypeList
	}

}