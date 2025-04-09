<template>
	<view class="edit">
		<view class="title">
			<u-input placeholder="请输入标题..." v-model="blog.title"></u-input>
		</view>
		<view class="editContent">
			<editor class="editBlog" 
				placeholder="输入一点东西吧..."
				show-img-size show-img-toolbar show-img-resize
				@focus="focusBlog()"
				@ready="readyBlog()"
			></editor>
		</view>
		<view class="btn">
			<u-button type="primary" :disabled="blog.title==''" @click="blogAdd()">确认发表</u-button>
		</view>
		<view class="icon" v-show="iconShow" @click="funIcon($event)" >
			<text class="iconfont icon-dianzan" data-index="0" :class="iconFocusNum==0?'active':''"></text>
			<text class="iconfont icon-dianzan" data-index="1" :class="iconFocusNum==1?'active':''"></text>
			<text class="iconfont icon-dianzan " data-index="2" :class="iconFocusNum==2?'active':''"></text>
			<text class="iconfont icon-dianzan" data-index="3" :class="iconFocusNum==3?'active':''"></text>
			<text class="iconfont icon-remen" data-index="4" :class="iconFocusNum==4?'active':''"></text>
			<text class="iconfont icon-dianzan_kuai" data-index="5" :class="iconFocusNum==5?'active':''"></text>
		</view>
	</view>
</template>

<script setup>
import { reactive, ref, } from 'vue';
import {onLoad} from '@dcloudio/uni-app'
import {getBlogList} from '@/utils/tools.js'
	let i=ref(10)
	let iconShow=ref(false)
	let iconFocusNum=ref(100)
	let blog=reactive({
		title:"",
		content:"",
		desc:"",
		//封面大图
		avatar:[]
	})
	onLoad(()=>{
		console.log("onload...");
		const data=getBlogList()
		console.log(data);
	})
	function readyBlog(){
		console.log("readblog...");
		//给editorCtx对象赋值
		uni.createSelectorQuery().select('.editBlog').context((res) => {
			// console.log("aaa",res);
			this.editorCtx = res.context
		}).exec()
	}
	function focusBlog(){
		console.log("focus...");
		iconShow.value=true
	}
	// function fun1(e){
	// 	console.log("111",e);
	// 	this.editorCtx.format("header", "H2")
	// 	this.editorCtx.format("color", "#4cd964")
	// }
	// function fun2(){
	// 	this.editorCtx.insertDivider()
	// 	this.editorCtx.insertImage({
	// 		src:"https://hbimg.b0.upaiyun.com/8a1321f1d5a9a04a7f8078497260e55fbd8894e19f268-d1Qqyd_fw658"
	// 	})
	// }
	function funIcon(e){
		console.log("index:",e.target.dataset.index);
		const index=e.target.dataset.index
		switch(index){
			case "0"://H
				console.log("h...");
				if(iconFocusNum.value==0){
					iconFocusNum.value=100
					break
				}
				iconFocusNum.value=0
				this.editorCtx.format("header", "H2")
				this.editorCtx.format("color", "#4cd964")
				break;
			case "1"://倾斜
				console.log("倾斜...");
				if(iconFocusNum.value==1){
					iconFocusNum.value=100
					break
				}
				iconFocusNum.value=1
				this.editorCtx.insertImage({
					src:"https://hbimg.b0.upaiyun.com/8a1321f1d5a9a04a7f8078497260e55fbd8894e19f268-d1Qqyd_fw658"
				})
				break;
			case "2"://加粗
				console.log("jiacu...");
				if(iconFocusNum.value==2){
					iconFocusNum.value=100
					break
				}
				iconFocusNum.value=2
				break;
			case "4"://上传图片
				if(iconFocusNum.value==4){
					iconFocusNum.value=100
					break
				}
				iconFocusNum.value==4
				uni.chooseImage({
					
				}).then(res=>{
					console.log("我现在看...",res);
					const imgList=res.tempFiles
					imgList.forEach((img,index)=>{
						uni.showLoading({
							title:"正在上传第"+(index+1)+"张图片..."
						})
						uniCloud.uploadFile({
							// url:"https://u.object.cloudrun.cloudbaseapp.cn",
							filePath:img.path,
							cloudPath:img.name,
							fileType:"image",
							onUploadProgress(a,b){
								const res=(a.loaded / a.total * 100).toFixed(2) + '%'
								// console.log("上传进度...",res);
								uni.showToast({
									title:"正在上传第"+(index+1)+"张图片,进度条:"+res,
									icon:'loading'
								})
							}
						}).then(res=>{
							// uni.hideLoading()
							console.log(res);
							this.editorCtx.insertImage({
								src:res.fileID,
								// src:"http://u.object.cloudrun.cloudbaseapp.cn/env-00jxgsabub39/360截图20240410223221.png",
								// src:"https://hbimg.b0.upaiyun.com/8a1321f1d5a9a04a7f8078497260e55fbd8894e19f268-d1Qqyd_fw658"
							})
							// this.editorCtx
							blog.avatar.push(res.fileID)
						}).catch(err=>{
							console.log(err.message);
						}).finally(()=>{
							uni.showToast({
								title:"图片上传ok!",
								duration:2000
							})
							setTimeout(()=>{
								uni.hideLoading()
							},2000)
							
						})
					})
				})
		}
	}
	const db=uniCloud.database()
	
	function blogAdd(){
		this.editorCtx.getContents({
			success:(res)=>{
				// console.log(res);
				blog.content=res.html
				blog.desc=res.text.slice(0,30)
			}
		})
		console.log("blog add",blog);
		db.collection("blog-articles").add({
			...blog
		}).then(res=>{
			// console.log(res);
			uni.showToast({
				"title":"文章发布成功",
				"duration":2000,
			})
		}).catch(err=>{
			// console.log(err.message);
			uni.showToast({
				title:err.message,
				icon:"error"
			})
		}).finally(()=>{
			// console.log("end ...");
			setTimeout(()=>{
				uni.hideToast()
			},2000)
		})
		uni.reLaunch({
			url:"/pages/index/index"
		})
	}
</script>

<style lang="scss" scoped>
	.edit{
		padding: 10rpx;
		height: 900rpx;
		.editContent{
			border: 1rpx solid #ccc;
			margin: 10rpx 0;
			height: 900rpx;
			.editBlog{
				height: 100%;
			}
		}
		.icon{
			display: flex;
			justify-content: space-around;
			align-items: center;
			margin-top: 15rpx;
			.iconfont{
				font-size: 40rpx;
				// font-weight: bold;
			}
			.active{
				color: green;
				scale: 1.3;
				font-weight: bold;
			}
		}
	}
	
</style>
