<template>
  <div class="login">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">Sign up</span>
      </div>

      <el-form
        :model="loginUser"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="60px"
        class="loginForm"
      >

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="loginUser.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginUser.password" placeholder="请输入密码"></el-input>
        </el-form-item>

        <el-form-item class="btns">
          <el-button class="submit_btn" type="primary" @click="submitForm('loginForm')">登录</el-button>
        </el-form-item>

        <div class="tipsArea">
            <span>没有账号？点击<router-link to="/register">注册</router-link></span>
        </div>
      </el-form>
    </section>
  </div>
</template>

<script>
import {loginUser} from '../api/user.js'
import jwt_decode from 'jwt-decode'
import {mapActions} from 'vuex'
import isEmpty from '../libs/isempty.js'
export default {
  data() {
    return {
      loginUser: {
        email: "",
        password: "",
      },
      rules: {
        email: [
            {
                required: true,
                type: 'email',
                message: '邮箱格式不正确',
                trigger: 'blur'
            }
        ],
        password: [
            {
                required: true, 
                message: "密码不能为空", 
                trigger: "blur"
            },
            {
                pattern: '^[a-zA-Z0-9]',
                message: '只能由英文,数字组成',
                trigger: 'blur'
            },
            {
                min: 6,
                max: 20,
                message: '至少6位',
                trigger: 'blur'
            }
        ]
    }
};
},
  methods: {
      ...mapActions(['setIsAuthenticated','setUser']),
      submitForm(formName) {
          this.$refs[formName].validate(valid => {
              if(!valid) {
                  console.log('登录err')
                  return this.$message.error('请将表单填写完整！')
              }
                loginUser(this.loginUser).then(res => {
                    console.log('登录成功：',res)
                    let {token} = res.data
                    localStorage.setItem('elToken',token)

                    // 1. 解析Token
                    let decode = jwt_decode(token)

                    // 2. 把解析后的Token放入VueX
                    this.setIsAuthenticated(!isEmpty(decode))
                    this.setUser(decode)

                    // 3. 跳转页面
                    this.$router.push('/index')
                })
          })
      }
  },
};
</script>

<style scoped>
.login {
  background: url("../assets/bg.jpg") no-repeat center center;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  position: relative;
}
.form_container {
  width: 350px;
  height: 210px;
  text-align: center;
  border-radius: 5px;
  top: 10%;
  left: 34%;
  position: absolute;
  padding: 25px;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 22px;
  color: #fff;
}
.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccccc;
}
.submit_btn {
  width: 100%;
}
.tipsArea {
    text-align: right;
    font-size: 14px;
    color: #333;
}
.tipsArea span a {
  color: #409eff;
}
</style>
