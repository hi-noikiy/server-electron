<template>
			<!-- 中间内容 -->
			<div class="no-drag content">
				<left-content></left-content>	
				<div style="height:100%;">
					<router-view></router-view>
					<router-view name="right"></router-view>
				</div>
			</div> 
</template>
<script>
import leftContent from './index/left-content'
export default {
  name: 'contents',
   	components: {leftContent}
}
</script>

<style>
.content{
	height: 100%;
	width:100%;
	position: absolute;
	background: #ffffff;
	box-sizing: border-box;
	padding-bottom: 95px;
	top:45px;
}
</style>