<template>
  <div>
        <el-row  class="login-header-btn">
          <el-col :span="3" :offset="21">  
            <i @click='openDev' class="el-icon-edit ex_btn no-drag"></i>
            <i @click="changeView($event,'min')" class="el-icon-minus ex_btn no-drag"></i>
            <i @click="changeView($event,'close')" class="el-icon-close ex_btn no-drag"></i>
          </el-col>
        </el-row>
      </div>
</template>
<script>
export default {
  data(){
    return {
      win:null
    }
  },
  methods:{
    openDev(){
        console.log('dev')
    },
    changeView(ev,type){
      type=='min'  && this.win.minimize();
      if(type =='close'){
        var msg = {
          close:true
        };
        this.$electron.ipcRenderer.send(this.$_IPC.CLOSE, msg);
        this.win.close();
      }
    }
  },
   mounted(){
      this.win = this.$electron.remote.getCurrentWindow();
    }
}
</script>
<style>
  .login-header-btn{
    position: absolute;
    width: 100%;
    z-index: 10;
        top: 0;
    text-align: right;
    -webkit-app-region: drag;
  }
  .ex_btn{
    cursor: pointer;
  }

</style>

