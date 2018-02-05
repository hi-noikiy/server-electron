<template>
    <div class="listbox">
		<div class="patient" style="display:block;">
			<span class="listHeader">{{title}}
			    <span class="add"></span>
			</span>
			<div class="list">
						<div class="listCon">
							<input class="search1" type="text" name="search1">
							<span class="iconSear"></span>
									<div class="listTipSe">
									<span class="listTip">今日学生</span>
									<span class="listTip listTipAct">全部学生</span></div>
									<div class="zselect">
										<span class="selected">按姓名字母排序</span>
									    <ul class="ulList"> 
									       <li class="onSelected">按姓名字母排序</li>
									       <li>按预约时间排序</li>
									       <li>按更新时间排序</li>
									    </ul>
									</div> 
						</div>
						<div class="personList">
							<ul>
								<li>
									<span class="imgBar"><img src="./../../assets/img/icon/IMG-1.png"></span>
									<span class="nameBar">陈奕迅</span>
									<span class="time">昨天 16:00</span>
								</li>
								<li>
									<span class="imgBar"><img src="./../../assets/img/icon/IMG-2.png"></span>
									<span class="nameBar">王思聪</span>
									<span class="time">昨天 16:00</span>
								</li>
								<li>
									<span class="imgBar"><img src="./../../assets/img/icon/IMG-3.png"></span>
									<span class="nameBar">陈冠希</span>
									<span class="time">昨天 16:00</span>
								</li>
								<li>
									<span class="imgBar"><img src="./../../assets/img/icon/IMG-4.png"></span>
									<span class="nameBar">刘德华</span>
									<span class="time">昨天 16:00</span>
								</li>
								<li>
									<span class="imgBar"><img src="./../../assets/img/icon/IMG-5.png"></span>
									<span class="nameBar">刘亦菲</span>
									<span class="time">昨天 16:00</span>
								</li>
								<li>
									<span class="imgBar"><img src="./../../assets/img/icon/IMG-6.png"></span>
									<span class="nameBar">有点二</span>
									<span class="time">昨天 16:00</span>
								</li>
								<li>
									<span class="imgBar"><img src="./../../assets/img/icon/IMG-6.png"></span>
									<span class="nameBar">习大大</span>
									<span class="time">昨天 16:00</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
	</div>
</template>

<script>
    export default {
      data () {
        return {
          title: 'setting'
        }
      }
    }
</script>
<style scoped>

/*************************************
*  中间列表
*************************************/
/*****************
* 模拟下拉框样式
*****************/
.zselect{
	width:174px;
	height:28px;
	line-height:28px;
	position: relative;
	margin: 5px auto;
}
.zselect .selected{
	width:188px;
	height:30px;
	display: inline-block;
	background: #FFF;
	color: #92A5AD;
	padding-left: 6px;
	margin-left: -10px;
	transform: scale(.9,.9);
	-ms-transform: scale(.9,.9);	/* IE 9 */
	-webkit-transform: scale(.9,.9);	/* Safari 和 Chrome */
	-o-transform: scale(.9,.9);	/* Opera */
	-moz-transform: scale(.9,.9);	/* Firefox */
	cursor: pointer;
}
.zselect .selected:after{
	content: "";
	display: inline-block;
	position: absolute;
	top:12px;
	right: 10px;
	width: 0;
	height: 0;
	border:6px solid;
    border-color: #92A5AD transparent  transparent transparent;
    z-index: 99;
}
.zselect ul{
	position: absolute;
	z-index: 999;
	display: none;
}
.zselect ul li{
	width:169px;
	height:38px;
	font-size: 12px;
	line-height:38px;
	text-align:left;
	margin: 1px 0px;
	background: #FFF;
	cursor: pointer;
	padding-left: 5px;
	color: #FFF;
	background: #41A7E0;
	opacity: .6;
	filter: alpha(opacity=60);
}
.zselect .onSelected{
	background: #15558A;
	opacity: .9;
	filter: alpha(opacity=90);
}
.listbox{
    height: 100%;
    position: absolute;
    left: 50px;
    background: #FFF;
    padding-bottom: 95px;
    top: 0;
}
 .listbox>div{display: none;}
 .listbox .listHeader{
	width: 192px;
	height: 32px;
	background: rgb(33,93,143);
	display: inline-block;
	text-align: center;
	line-height: 28px;
	color: #FFF;
	font-size: 14px;
    position: relative;
    z-index: 2;
}
 .listbox .add{
	width: 13px;
	height: 13px;
	display: inline-block;
	position: absolute;
	background:url(./../../assets/img/icon/add.png) no-repeat;
	top:8px;
	right: 10px;
	cursor: pointer;
}
 .list{
	width: 192px;
    height: 100%;
    position: absolute;
    top: 0;
    padding-top: 32px;
    padding-bottom: 95px;
	background: url(./../../assets/img/icon/con-bg.png) top center ;
    background-size: cover;
}
 .list .listCon{
	background: #e4ebf1;
	position: relative;
	height: 126px;
}
 .list .search1{
	width: 164px;
	height: 20px; 
	border-radius: 25px;
	margin: 10px 15px 16px 10px;
	border: 0px;
	padding:5px;
	outline:none;
}
 .list .iconSear{
	position: absolute;
	width: 11px;
	height:11px;
	display: inline-block;
	background: url(./../../assets/img/icon/iconSear.png) no-repeat!important;
	top: 20px;
    right: 16px;
}
 .list .listTipSe{
	width: 174px;
	margin: 0 auto;
	padding-left: 8px;
}
 .list .listTip{
	width: 82px;
	color: #15558a;
	line-height:20px;
	font-size: 14px;
	display: inline-block;
	text-align: center;
	cursor: pointer;
	margin-left: -4px;
}
 .list .listTip:hover{
	border-bottom: 2px solid #A8C4DD ;
	height: 28px;
}
 .list .onSle{
	background: #c3d5e0;
}
 .list .listTipAct{
	border-bottom: 2px solid #557dba;
	height: 28px;
}
 .list .search2{
	width: 174px;
	height: 28px; 
	margin: 5px 15px 10px 10px;
	outline:none;
	border: 0px;
	font-family:"Microsoft YaHei"; 
	font-size: 12px;
	padding: 5px;
	display: inline-block;
}

 .list .personList{
	color: #215d8E;
}
 .personList li{
	width: 192px;
	height: 40px;
	margin-bottom: 5px;
	position: relative;
	cursor: pointer;
} 
 .personList li:hover{
	background: #eaeff3;
}
.list .personList .imgBar{
	display: inline-block;
	width: 31px;
	height: 31px;
	margin-left: 5px;
	padding: 5px;
}
.list .personList .nameBar{
	font-size: 12px;
	position: absolute;
	top:10px;
	margin-left: 5px;
}
.list .personList .time{
	position: absolute;
	right: 10px;
	color: #5c8f9b;
	font-size: 12px;
	top:14px;
	transform: scale(.8,.8);
	-ms-transform: scale(.8,.8);	/* IE 9 */
	-webkit-transform: scale(.8,.8);	/* Safari 和 Chrome */
	-o-transform: scale(.8,.8);	/* Opera */
	-moz-transform: scale(.8,.8);	/* Firefox */
}
</style>