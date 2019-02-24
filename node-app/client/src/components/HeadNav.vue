<template>
  <header class="head-Nav">
    <el-row class="sss">
      <el-col :span="6" class="logo-container">
        <router-link to="/index">
          <img src="../assets/logo.png" alt class="logo" >
          <span class="title">在线资金管理系统</span>
        </router-link>
      </el-col>
      <el-col :span="6" class="user">
        <div class="userinfo">
          <img :src="user.avatar" alt class="avatar">
          <div class="welcome">
            <p class="name comename">欢迎</p>
            <p class="name avatarname">{{user.name}}</p>
          </div>
          <el-dropdown @command="setDialogInfo">
            <span class="el-dropdown-link">
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="info">个人信息</el-dropdown-item>
              <el-dropdown-item command="logout">注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </header>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "HeadNav",
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    ...mapActions(["clearCurrent"]),
    setDialogInfo(item) {
      switch (item) {
        case "info":
          this.getUserInfo();
          break;
        case "logout":
          this.logoutUser();
          break;
      }
    },
    getUserInfo() {
      this.$router.push("/userInfo");
    },
    logoutUser() {
      this.clearCurrent();
      localStorage.removeItem("elToken");
      this.$router.push("/login");
    },
    toIndex() {
      this.$router.push("/index");
    }
  }
};
</script>
<style scoped>
.sss{
  height: 100%;
}
.head-Nav {
  width: 100%;
  height: 60px;
  background: #324057;
  color: #fff;
  min-width: 600px;
  border-bottom: 1px solid #1f2d3d;
}
.logo-container {
  min-width: 400px;
}
.logo {
  width: 50px;
  height: 50px;
  margin-right: 5px;
  vertical-align: middle;
}
.title {
  vertical-align: middle;
  font-size: 20px;
  font-family: "Microsoft YaHei";
  letter-spacing: 3px;
  line-height: 60px;
}
.user {
  text-align: right;
  float: right;
  padding-right: 10px;
  line-height: 60px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}
.welcome {
  vertical-align: middle;
  display: inline-block;
  padding: 0 5px;
}
.name {
  line-height: 20px;
  text-align: center;
  font-size: 13px;
}
.avatarname {
  color: #409eff;
  font-weight: bolder;
}
.el-dropdown-link {
  color: #fff;
}
a{
  text-decoration: none;
  color: #fff
}
</style>
