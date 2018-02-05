<template>
  <div id="app">
    <header-content></header-content>
    <contents></contents>
    <footer-content></footer-content>
  </div>
</template>

<script>
  import '../assets/base.css'
  import headerContent from './components/header'
  import footerContent from './components/footer'
  import contents from './components/content'
  export default {
    name: 'project',
    components: {
      headerContent,
      footerContent,
      contents
    },
    mounted () {
      this.$store.dispatch('GET_USER_INFO')
    }
  }
</script>

<style>
  /* CSS */
</style>
