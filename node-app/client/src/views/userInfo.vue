<template>
  <div class="userInfo">
      <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="8" >
              <div class="userAvatar">
                  <img :src="user.avatar" alt="">
              </div>
          </el-col>
          <el-col :span="16">
              <div class="user">
                  <div class="user-item">
                      <i class="el-icon-mobile-phone"></i>
                      <span>{{user.name}}</span>
                  </div>
                  <div class="user-item">
                      <i class="el-icon-setting"></i>
                      <span>{{user.identity === 'manager' ? '管理员' : '员工'}}</span>
                  </div>
              </div>
          </el-col>
      </el-row>
  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
export default {
    name: 'userInfo',
    computed: {
        ...mapGetters(['user'])
    },
};
</script>

<style scoped>
.userInfo{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
}
.row-bg {
    width: 100%;
    height: 100%;
}
.userAvatar {
    text-align: center;
    position: relative;
    top: 20%;
}
.userAvatar img {
  width: 150px;
  border-radius: 50%;
}
.user {
    height: 100%;
    background-color: #eee;
}
.user-item {
    position: relative;
    top: 20%;
    padding: 22px;
    font-size: 20px;
    color: #333;
}
</style>
