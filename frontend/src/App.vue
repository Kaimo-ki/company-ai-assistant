<script setup>
import Navbar from './components/Navbar.vue'
</script>

<template>
  <Navbar />
  <main>
    <router-view />
  </main>
</template>

<style scoped>
main {
  min-height: 100vh;
  padding-top: 60px; /* Offset for fixed navbar */
}
</style>
