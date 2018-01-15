<template>
  <div id="app">
    <header-content></header-content>
    <router-view></router-view>
    <footer-content></footer-content>
  </div>
</template>

<script>
  // import './assets/css/style.css'
  import headerContent from './components/header'
  import footerContent from './components/footer'
  export default {
    name: 'project',
    components: {
      headerContent, 
      footerContent
    },
    mounted () {
      this.$store.dispatch('GET_USER_INFO')
    }
  }
</script>

<style>
  /* CSS */
</style>
