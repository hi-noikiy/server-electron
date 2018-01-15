<template>
  <div class="login-form">
    <div v-bind:class="{'login-sub-tran-none':isLogin}">
        <el-row>
            <el-col :span='16'>
                <el-input  @change='change' size="small" class="user-account" v-model="userAccount" placeholder="请输入账号"></el-input>
            </el-col>
            <el-col :span="8">
                <a href="" class="login-btn">忘记密码</a>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span='16'>
                <el-input @change='change'  size="small" class="user-password" type="password" v-model="userPassword" placeholder="请输入密码"></el-input>
            </el-col>
            <el-col :span="8">
                <a href="" class="login-btn">注册账号</a>
            </el-col>
        </el-row>
        <el-row class="login-label">
            <el-col :span='16' >
            <label>
                <input type="checkbox" @change='change' name="rememberPw" id="rememberPw"  v-model="userRemPw"> 
                    记住密码
            </label>
            <label>
                <input type="checkbox" @change='change' name="autoLogin" id="autoLogin" v-model="userAutoLogin" > 
                    自动登陆
            </label>
            </el-col>
        </el-row>
    </div>
    <el-row>
        <el-col :span='16'>
           <el-button size="small"  type="primary" class="login-form-sub" @click='clickSub' v-text="isLogin?'取消':'登录'"></el-button>
        </el-col>
    </el-row>
  </div>
</template>
<script>

export default {
  name: 'loginFrom',
  props: ['account', 'password', 'clickSub', 'autoLogin', 'remPw', 'isLogin'],
  data () {
    return {
      radio: '1',
      userAccount: this.account,
      userPassword: this.password,
      userAutoLogin: this.autoLogin,
      userRemPw: this.remPw
    }
  },
  methods: {
    change () {
      this.$emit('userChange', this.userAccount, this.userPassword, this.userRemPw, this.userAutoLogin)
    }

  }
}
</script>
<style>
.login-form{
    width:100%;
    padding: 26px 10px;
}
.login-btn{
    font-size: 12px;
    color: #a09c9c;
    text-decoration: none; 
    padding-left: 10px;
    margin-top:10px;
    display: inline-block;
}
.user-account input{
    border-radius:5px 5px 0px 0px;
    border-bottom: 0;
    padding: 0 5px;
}
.user-account input:focus{
    border-bottom: 1px solid;
    border-color: #409EFF;
}
.user-password input{
    border-radius:0px 0px 5px 5px;
    padding: 0 5px;
}
.login-label{
    margin:10px;
}
.login-label label{
    font-size:12px;
    margin-right:10px; 
    color: #8e8e8e;
}
.login-label input {
    vertical-align: middle;
}
.login-form-sub{
    width:100%;
    font-size:14px; 
}
 .login-sub-tran-none{
    visibility: hidden;
  }
</style>


