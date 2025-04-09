import replyAndPushMsg  from "./modules/replyAndPushMsg"
import likeAndPushMsg  from "./modules/likeAndPushMsg"

export default function(){
	return {
		replyAndPushMsg,
		likeAndPushMsg
	}
}

replyAndPushMsg({
	"name":"sd",
	"address":"hehhh",
	"push_client_id":"hhyyyy223"
})