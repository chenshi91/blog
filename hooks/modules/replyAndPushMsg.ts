import {addReply} from "../lib/addReply"

function replyAndPushMsg(params:TParams):number{
	addReply({})
	
	
	return 100
}

type TParams={
	name:string,
	address:string,
	push_client_id:string
}

export default replyAndPushMsg