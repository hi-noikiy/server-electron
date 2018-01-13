<template>
  <div>
      <h1 class="title">管理系统</h1>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-header"
        mode="horizontal"
        @select="handleSelect">
        <el-menu-item index="index">首页</el-menu-item>
        <el-menu-item index="room">琴房管理</el-menu-item>
        <el-menu-item index="subject">课程管理</el-menu-item>
        <el-menu-item index="teacher">教师管理</el-menu-item>
        <el-menu-item index="student">学生管理</el-menu-item>
        <el-menu-item index="setting">设置</el-menu-item>
      </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: 'index'
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      this.$router.push({ path: key })
    }
  }
}
</script>
<style>
.title{
  text-align: center;
}
.head-amount{
  height: 90px;
  padding: 0 20px;
}
.el-menu-header li{
  -webkit-app-region: no-drag;
}
</style>

