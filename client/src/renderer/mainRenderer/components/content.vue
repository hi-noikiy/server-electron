<template>
			<!-- 中间内容 -->
			<div class="no-drag content">
				<left-content></left-content>	
				<div>
					<!-- 中间列表 -->
					<center-content></center-content>	
					<!-- 右边内容区 -->
					<right-content></right-content>
				</div>
			</div> 
</template>
<script>
import leftContent from './content/left-content'
import centerContent from './content/center-content'
import rightContent from './content/right-content'
export default {
	name:'content',
   	components: {leftContent, centerContent, rightContent}
}
</script>

<style scoped>
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