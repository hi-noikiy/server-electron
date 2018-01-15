<template>
  <div id="wrapper">
      <div class="login-header-btn">
        <el-row>
          <el-col :span="4" :offset="21" class="no-drag">  
            <i @click='openDev' class="el-icon-edit ex_btn"></i>
            <i @click="changeView($event,'min')" class="el-icon-minus ex_btn"></i>
            <i @click="changeView($event,'close')" class="el-icon-close ex_btn"></i>
          </el-col>
        </el-row>
      </div>
      <el-row class="login-header"> 
         <el-col :span="24">
           <h1  v-text="titie"></h1>
        </el-col>
      </el-row>
        <el-container class="login-container no-drag">
          <el-aside width="220px" v-bind:class="{ 'login-sub-tran': isLogin }">
            <div class="login-logo" >
              <img src="./../assets/001.jpg" alt="">
            </div>
          </el-aside>
          <login-from 
              @userChange='userChange' 
              :password='password' 
              :account='account' 
              :autoLogin='autoLogin' 
              :remPw='remPw' 
              :clickSub='clickSub'
              :isLogin='isLogin'
              ></login-from>
        </el-container>
        <el-container class="login-container no-drag password-error"  v-bind:class="{ 'login-error': isPwTrue }">
          password error
        </el-container>
  </div>
</template>
<script>
  import '../../assets/base.css'
  import loginFrom from './loginFrom'
  import axios from 'axios'
  import md5 from 'js-md5'
  export default {
    name: 'login',
    components: {loginFrom},
    data () {
      return {
        titie: '管理系统',
        password: '3444',
        account: 'zhengchong1',
        autoLogin: false,
        remPw: false,
        isLogin: false,
        isPwTrue: true,
        win: null
      }
    },
    methods: {
      clickSub (data) {
        var account = {
          account: this.account,
          password: this.password,
          autoLogin: this.autoLogin,
          remPw: this.remPw
        }
        this.isLogin = !this.isLogin
        if (this.isLogin) {
          var url = this.$api.url + this.$api.auth + this.$api.version + this.$api.router + '/login'
          axios({
            method: 'post',
            url: url,
            data: {
              username: this.account,
              password: this.password, // md5(this.password),
              type: 1
            }
          }).then(data => {
            if (data.data && data.data.success) {
              this.$electron.ipcRenderer.send(this.$_IPC.LOGIN, {
                user: data.data.data,
                access_token: data.data.access_token,
                loginSetting: {
                  autoLogin: this.autoLogin,
                  remPw: this.remPw
                }
              })
              this.$electron.ipcRenderer.once(this.$_IPC.LOGIN, (event, arg) => {
                if (arg && arg.success) {
                  this.win.close()
                } else {
                  this.isLogin = !this.isLogin
                }
              })
            } else {
              this.isLogin = !this.isLogin
            }
          }).catch(data => {
            this.isLogin = !this.isLogin
          })
        }
      },

      userChange (account, password, autoLogin, remPw) {
        this.account = account
        this.password = password
        this.autoLogin = autoLogin
        this.remPw = remPw
      },

      changeView (ev, msg) {
        msg == 'min' && this.win.minimize()
        msg == 'close' && this.win.close()
      },
  
      openDev () {
        console.log('aa')
      }
    },
    mounted () {
      this.win = this.$electron.remote.getCurrentWindow()
  }
  }
</script>
<style>
  * {
    box-sizing: border-box;                                                                                                                                         
    margin: 0; 
    padding: 0;
  }

  #wrapper {
    background:rgba(255, 255, 255, 1) ;
    height: 100vh;
    width: 100vw;
    border-radius: 5px;
    overflow: hidden;
  }
  .login-header-btn{
    position: absolute;
    width: 100%;
    padding: 10px;
    z-index: 10;
  }
  .ex_btn{
    cursor: pointer;
  }
  .login-header{
    height:50vh;
    background: url('./../assets/head.jpg') left top;
    background-size: 460px 190px;
  }
  .login-header h1{
    text-align: center;
    padding: 50px 0;
  }
  .login-container{
    height: 50vh;
    background: #c6f2fd;
  }
  .login-logo-container{
    height: 100%;
  }
  .login-container aside{
    position: relative;
  }
  .login-logo{
    width: 100px;
    overflow: hidden;
    border-radius: 108px;
    height: 100px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -50px;
    margin-top: -50px;
  }
  .login-logo img{
    width: 100%;
  }
  .login-sub-tran{
    transform: translate3D(162px,-32PX,0);
    transition: 1s;
  }
  .password-error{
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  .login-error{
    display: none;
  }
</style>
