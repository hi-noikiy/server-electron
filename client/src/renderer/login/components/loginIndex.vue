<template>
  <div id="wrapper">
      <div class="login">
        <div class="login-header-btn">
          <div>
            <p class="no-drag">  
              <i @click="changeView($event,'close')" class="el-icon-closes ex_btn"></i>
            </p>
          </div>
        </div>
        <div class="loginLeft">
          
        </div>
        <div class="loginRight">
          <div class="loginTop">
            <span>{{title}} |</span>
            <span>{{desc}}</span>
          </div>
          <div class="no-drag loginIn">
            <div class="input-group userName">
              <span></span>
              <input type="text" class="form-control" placeholder="用户"  @change='userChange'  v-model="account" aria-describedby="basic-addon1">
            </div>
            <div class="input-group passWord">
              <span></span>
              <input type="password" class="form-control" placeholder="密码"  @change='userChange'  v-model="password" aria-describedby="basic-addon1">
            </div>
          </div>
          <div class="no-drag loginBottom">
            <button class="btn btn-primary" @click="clickSub">登录</button>
            <div class="btnFooter">
              <input  v-model="remPw" type="checkbox" name="">
              <span>记住密码</span>
              <input  v-model="autoLogin" type="checkbox" name="">
              <span>自动登陆</span>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
  import '../../assets/base.css'
  import loginFrom from './loginFrom'
  import axios from 'axios'
  // import md5 from 'js-md5'
  export default {
    name: 'login',
    components: {loginFrom},
    data () {
      return {
        title: '琴行管理系统',
        desc: 'XX琴行 | 教育机构管理系统',
        password: '1',
        account: 'zc',
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
            console.log(data)
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
    height: 100vh;
    width: 100vw;
    border-radius: 5px;
    overflow: hidden;
  }
  a{color: #000;}
	 .login{
			width: 530px;
			margin: 5px auto;
			height: 250px;
			position: relative;
      /*border: 1px solid #CCC;*/
      background: #FFF;
			border-radius: 2px;
			box-shadow: 0 0 8px 1px rgba(7, 25, 37, 0.5);
    }
    .login-header-btn{
      height: 28px;
      right: 5px;
      top: 5px;
      padding: 4px;
      position: absolute;
      z-index: 1999;
    }
    .login-header-btn p{
      width: 100%;
      height: 20px;
      text-align: right;
    }
    .login-header-btn p i{
      display: inline-block;
      width: 20px;
      height: 20px;
      background: red;
      cursor: pointer;
    }
    .login-header-btn p i.el-icon-closes{
      background: url('./../assets/img/icon/checkCloseHover.png') left top no-repeat!important;      
    }
		.login .loginLeft{
			width: 165px;
			height: 250px;
			background: url('./../assets/loginbg.png') left top no-repeat!important;
			overflow: hidden;
		}
		.login .loginRight{
			height: 250px;
			width: 364px;
			position: absolute;
			right: 0;
			top:0;
			padding: 20px 40px 30px 40px;
			box-sizing: border-box;
		}
		.login .loginRight .loginTop{
			margin-bottom: 18px;
		    color: #2B5A93;
		    position: relative;
		}
		.loginRight .loginTop span:first-child{
			font-size: 18px;
			padding: 2px 30px 2px 0;
			background: url('./../assets/img/icon/icon-1.png') right 2px no-repeat!important;
		}
		.loginRight .loginTop span:last-child{
			font-size: 12px;
			display: inline-block;
			height: 22px;
			line-height: 22px;
			position: absolute;
			/*letter-spacing:1px;*/
      transform: scale(.9,.9);
      overflow: hidden;
		}
		.login .loginRight .loginIn{
			margin-bottom: 22px;
		}
		.login .loginRight .loginIn>div {
			margin-bottom: 18px;
    	width: 284px;
    	border: 1px #8CABD1 solid;
			border-radius: 4px;
			position: relative;
		}
		.login .loginRight .loginIn input{
			height: 40px;
    	border: 0;
    	padding-left: 40px;
    	outline: none;
    	border-radius: 4px;
			background: #E4EFF7;
			width: 282px;
		}
		.loginRight .loginIn input::-webkit-input-placeholder { color:#8CABD1; font-size: 12px;}
		.loginIn span{
			width: 18px;
			height: 14px;
			display: inline-block;
			position: absolute;
			z-index: 99;
			top: 15px;
			left: 6px;
		}
		.loginIn .userName span{
			background: url('./../assets/img/icon/userName.png') right top no-repeat!important;
		}
		.loginIn .passWord span{
			background: url('./../assets/img/icon/userName.png') right top no-repeat!important;
		}
		.loginBottom{
			font-size: 12px;
		}
		.loginBottom .btnFooter{
			display: inline-block;
			vertical-align: middle;
			color: #58595B;
			position: relative;
		}
		.loginBottom button{
			width: 96px;
			height: 32px;
			background-color:#1c569b;
			border: 0;
			color: #FFF;
		}
		.loginBottom input{
			margin-left: 12px;
			vertical-align: sub;
		}
		.loginBottom .btnFooter a{
			color: #58595B;
			margin-left:20px;
		}
</style>
