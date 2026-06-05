<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <Navbar />
  <main>
    <router-view />
  </main>
  <Footer />
</template>

<style scoped>
main {
  min-height: 100vh;
  padding-top: 64px;
}
</style>
