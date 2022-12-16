<template>
  <div id="app">
    <!-- <SanPhamVue/> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import SanPhamVue from './view/SanPham.vue';
export default {
  name: 'App',
  components: {
    // SanPhamVue
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
