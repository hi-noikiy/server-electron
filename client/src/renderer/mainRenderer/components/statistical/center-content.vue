<template>
  <div class="listbox">
		<el-row class="el-memu-box">
      <el-col :span="24">
        <el-menu default-active="/statistical/today"  class="el-memu-list" :router='true'> 
          <el-menu-item index="/statistical/today">
            <i class="el-icon-menu"></i>
            <span slot="title">今日课表</span>
          </el-menu-item>
          <el-menu-item index="/statistical/teacher">
            <i class="el-icon-menu"></i>
            <span slot="title">老师课表</span>
          </el-menu-item>
          <el-menu-item index="/statistical/class">
            <i class="el-icon-setting"></i>
            <span slot="title">班级课表</span>
          </el-menu-item>
          <el-menu-item index="/statistical/awaitDo">
            <i class="el-icon-setting"></i>
            <span slot="title">待排课</span>
          </el-menu-item>
          <el-menu-item index="/statistical/awaitDeal">
            <i class="el-icon-setting"></i>
            <span slot="title">待处理</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
	</div>
</template>
<script>
    export default {
        data () {
          return {
                title: 'statistical',
                isCollapse: true
          }
        }
    }
</script>
<style scoped>


.listbox{
    height: 100%;
    position: absolute;
    left: 50px;
    background: #FFF;
    padding-bottom: 95px;
    top: 0;
	width: 200px;
}
.el-memu-box,
.el-memu-box>div{
  height: 100%;
}
.el-memu-list{
  height: 100%;
}
</style>