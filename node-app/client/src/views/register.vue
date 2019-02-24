<template>
  <div class="register">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">贤哥后台管理系统</span>
      </div>

      <el-form
        :model="registerUser"
        status-icon
        :rules="rules"
        ref="registerForm"
        label-width="80px"
        class="registerForm"
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="registerUser.name" placeholder="请输入用户名"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="registerUser.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="registerUser.password" placeholder="请输入密码"></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="registerUser.checkPass" placeholder="请确认密码"></el-input>
        </el-form-item>

        <el-form-item label="选择身份" prop="identity">
          <el-select v-model="registerUser.identity" placeholder="请选择身份">
            <el-option label="管理员" value="manager"></el-option>
            <el-option label="员工" value="employee"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="btns">
          <el-button class="submit_btn" type="primary" @click="submitForm('registerForm')">注册</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
import { register } from "../api/user.js";
export default {
  data() {
    let checkPassword = (rule, value, callback) => {
      if (this.registerUser.password !== value) {
        return callback(new Error("两次输入的密码不一致"));
      }
      return callback();
    };
    return {
      registerUser: {
        name: "",
        email: "",
        password: "",
        checkPass: "",
        identity: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          },
          {
            pattern: "^[\u4e00-\u9fa5_a-zA-Z0-9]",
            message: "只能是中英文字符、数字、下划线组成",
            trigger: "blur"
          },
          {
            min: 2,
            max: 10,
            message: "长度为2-10个字符",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            type: "email",
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          },
          {
            pattern: "^[a-zA-Z0-9]",
            message: "只能由英文,数字组成",
            trigger: "blur"
          },
          {
            min: 6,
            max: 20,
            message: "至少6位",
            trigger: "blur"
          }
        ],
        checkPass: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          },
          {
            validator: checkPassword,
            trigger: "blur"
          }
        ],
        identity: [
          {
            required: true,
            message: "必须选择身份",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          console.log("注册err");
          return this.$message.error("请将表单填写完整！");
        }
        register(this.registerUser)
          .then(res => {
            this.$message({
              message: "账号注册成功",
              type: "success"
            });
            this.$router.push("/login");
          })
      });
    }
  }
};
</script>

<style scoped>
.register {
  background: url("../assets/bg.jpg") no-repeat center center;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  position: relative;
}
.form_container {
  width: 370px;
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
.registerForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccccc;
}
.submit_btn {
  width: 100%;
}
</style>
