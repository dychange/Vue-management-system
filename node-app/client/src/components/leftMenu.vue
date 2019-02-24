<template>
  <el-row class="leftMenu">
    <el-col>
      <el-menu
        default-active="index"
        class="el-menu-vertical-demo"
        mode="vertical"
        @open="handleOpen"
        @close="handleClose"
        background-color="#324057"
        text-color="#fff"
        active-text-color="#409eff"
      >
        <router-link to="/home">
          <el-menu-item index="index">
            <i class="fa-margin el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
        </router-link>

        <template v-for="(item) in items">
          <el-submenu :index="item.path" :key="item.path" v-if="item.children">
            <template slot="title">
              <i :class="'fa-margin ' + item.icon"></i>
              <span>{{item.name}}</span>
            </template>
            <router-link
              v-for="(child,childIndex) in item.children"
              :to="child.path"
              :key="childIndex"
            >
              <el-menu-item :index="child.path">{{child.name}}</el-menu-item>
            </router-link>
          </el-submenu>
        </template>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          icon: "el-icon-tickets",
          name: "资金管理",
          path: "fund",
          children: [
            {
              name: "资金流水",
              path: "fundList"
            }
          ]
        },
        {
          icon: "el-icon-setting",
          name: "信息管理",
          path: "infoManage",
          children: [
            {
              name: "个人信息",
              path: "userInfo"
            }
          ]
        }
      ]
    };
  },
  methods: {
    handleOpen(index, indexpath) {
      console.log("打开：", index, indexpath);
    },
    handleClose(index, indexpath) {
      console.log("关闭", index, indexpath);
    }
  }
};
</script>

<style scoped>
.leftMenu {
  position: fixed;
  min-height: 100%;
  left: 0;
  background-color: #324057;
  z-index: 99;
}
.fa-margin {
  margin-right: 5px;
}
a {
  text-decoration: none;
}
.el-menu-vertical-demo {
  width: 200px;
}
</style>
