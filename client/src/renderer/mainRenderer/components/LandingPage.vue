<template>
  <div id="wrapper">
    <el-container class="el-container">
      <el-header class="header" height='110px'>
        <header-btn></header-btn> 
        <p-head></p-head>
      </el-header>
      <el-container class="container">
        <router-view></router-view>
      </el-container>
    </el-container>
  </div>
</template>
<script>
  import headerBtn from './headerBtn'
  import pHead from './phead'
  export default {
    name: 'landing-page',
    components: {headerBtn,pHead},
    methods: {
     
    }
  }
</script>

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  #app{
    width: 100%;
    height: 100%;
  }
  body{
    -webkit-app-region: no-drag;
    padding: 1px;
    height: 100vh;
    width: 100vw;
  }
  #wrapper {
    width: 100%;
    height: 100%;
    background: #fff;
    border-radius: 5px;
  }
  .header{
    padding: 0;
    position: relative;
    padding-top: 20px;
    -webkit-app-region: drag;
  }
  
  .el-container,
  .container div,
  .container{
    height: 100%;
    width: 100%;
  }
</style>
