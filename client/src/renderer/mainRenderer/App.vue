<template>
  <div id="app">
    <!-- <router-view></router-view> -->
    <header-content></header-content>
    <content-content></content-content>
    <footer-content></footer-content>
  </div>
</template>

<script>
  // import './assets/css/style.css'
  import headerContent from './components/header'
  import contentContent from './components/content/content'
  import footerContent from './components/footer'
  export default {
    name: 'project',
    components: {headerContent,contentContent,footerContent},
  }
</script>

<style>
  /* CSS */
</style>
