<template>
  <div class="index">
    <HeadNav></HeadNav>
    <LeftMenu></LeftMenu>
    <div class="rightContainer">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import HeadNav from "../components/HeadNav";
import LeftMenu from "../components/leftMenu";
export default {
  name: "index",
  components: {
    HeadNav,
    LeftMenu
  },
  methods: {
    handle() {}
  }
};
</script>

<style scoped>
.index {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.rightContainer {
  position: relative;
  left: 200px;
  top: 0;
  overflow: auto;
  width: calc(100% - 180px);
  height: calc(100% - 62px);
}

</style>
