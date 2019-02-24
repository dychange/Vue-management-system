<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import isEmpty from './libs/isempty.js'
import jwt_decode from 'jwt-decode'

export default {
  data(){
    return {

    }
  },
  created() {
    if(localStorage.elToken){
      let decode = jwt_decode(localStorage.elToken)
      this.$store.dispatch('setIsAuthenticated',!isEmpty(decode))
      this.$store.dispatch('setUser',decode)
    }
  },
}
</script>
<style>
  html,body,#app{
    width: 100%;
    height: 100%;
  }

</style>
