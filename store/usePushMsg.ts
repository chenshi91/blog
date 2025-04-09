import {defineStore} from "pinia"
import type {TMsgBody} from "@/type/PushMsg.d.ts"
import { store } from "@/uni_modules/uni-id-pages/common/store";

export const usePushMsgAbout=defineStore("pushMsg",{
	state(){
		return {
			person:"xujiali",
			pushMsgList:[ ] as TMsgBody[],
			demo:"welcome to pinia!"
		}
	},
	actions:{
		addMsg(param:TMsgBody){
			// console.log("@@@",state);
			this.pushMsgList.unshift(param)
		},
	},
	getters:{
		getMyMsg(state):TMsgBody[]{
			if(!store.hasLogin){
				return []
			}
			console.log("@@@",state);
			return state.pushMsgList.filter(msg=>msg.targetUserId==store.userInfo._id)
		},
		getMyMsg_like(state):TMsgBody[]{
			return []
		}
	}
})