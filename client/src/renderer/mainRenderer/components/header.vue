<template>
        <div class="header" style="-webkit-app-region:drag">
			<div class="title">
				<span class="titleIcon">
					<img src="./../assets/img/icon/img.png" />
				</span>
				<span class="titleBar">{{name}}</span>
			</div>
            <div class="no-drag btn">
                <span></span>
                <span></span>
                <span></span>
            </div>
		</div>
</template>

<script>
    export default {
        data(){
            return{
                name:'你好! xx老师'
            }
        }
        
    }
</script>

<style scoped>
.header{
    position: absolute;
    width: 100%;
    z-index: 10;
    color:#F1F2F2;
    -webkit-app-region:drag;
	background: #084677;
}
.header .titleIcon{
	float: left;
	height: 35px;
	width: 45px;
	padding: 5px;
	text-align: center;
	display: inline-block;
}
.header .titleBar{
	height: 45px;
	display: inline-block;
	line-height: 45px;
	padding-left: 4px;
	font-size:14px;
	color: #F1F2F2;
	opacity: .5;
	filter: alpha(opacity=50);
} 
.btn{
    position: absolute;
    top:0;
    right: 0;
    height: 100%;
    width: 150;   
}
.btn span{
    display:inline-block;
    width: 45px;
    height: 100%;
    text-align: center;
    cursor: pointer;
}
.btn span:nth-child(1){
    background:url('./../assets/img/icon/narrow.png') center center no-repeat;
}
.btn span:nth-child(2){
    background:url('./../assets/img/icon/restore.png') center center no-repeat;
}
.btn span:nth-child(3){
    background:url('./../assets/img/icon/checkClose.png') center center no-repeat;
   
}
</style>