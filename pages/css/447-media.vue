<template>
	<view>
		<p class="demo">media screen</p>
	</view>
</template>

<script setup>
	
</script>

<style scoped lang="scss">
		$hehe:pink;
	 
	 
		 @media screen and(min-width:300px) {
		 	.demo{
				background-color: $hehe;
				font-size: 16px;
			}
		 }
		 
		 @media screen and(min-width:800px){
			 .demo{
			 	background-color: palegreen;
				font-size: 28px;
			 }
		 	
		 }
		 
		 @media screen and (min-width: 1200px){
		 	.demo{
		 		background-color: orange;
				font-size: 35px;
		 	}
		 }
		   
		
</style>
