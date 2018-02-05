<template>
    <div class="footer">
			<div class="footer">
				<span class="footerIcon">
					<img src="./../assets/img/icon/logo.png" />
				</span>
				<span class="footerBar">{{title}} | {{desc}}</span>
			</div>
			<div class="footerRight">
				<span class="narrow">{{ad}}</span>
				<span class="close"></span>
			</div>
	</div>	
</template>

<script>
    export default {
      data () {
    return {
          title: 'XX',
          desc: '琴行管理系统',
          ad: '嘻嘻嘻'
    }
  }
    }
</script>

<style>
/***********************
*底部
**/
.footer{
	height: 52px;
    width:100%;
    position: absolute;
    bottom: 0;
	background: #282828;
	font-size:12px;
    color: rgb(126,183,216);
    z-index: 4;
}
.footer .footerIcon{
	float: left;
	height: 35px;
	width: 45px;
	padding: 10px 5px;
	text-align: center;
	display: inline-block;
}
.footer .footerBar{
	height: 52px;
	display: inline-block;
	line-height: 52px;
	padding-left: 4px;
	
} 
.footer .footerRight{
	position: absolute;
    right: 20px;
    z-index: 5;
}
.footer .narrow{
	height: 52px;
	padding-left: 40px;
	line-height: 52px;
	display: inline-block;
	margin-right: 100px;
	background: url("./../assets/img/icon/ad.png")left 15px no-repeat;
}
.footer .close{
	width: 17px;
	height: 17px;
	position: absolute;
	top:16px;
	right: 10px;
	display: inline-block;
	cursor: pointer;
	background: url("./../assets/img/icon/adclose.png")left top no-repeat;
}
</style>