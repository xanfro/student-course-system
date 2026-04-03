<script setup lang="ts">
import Footer from './components/Footer.vue';
import Header from './components/Header.vue'
import Navigation from './components/Navigation.vue'
import QRcode from './components/QRcode.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app-container">
    <Header />
    <Navigation />
    <main class="content">
      <RouterView />
    </main>
    <QRcode />
    <Footer />
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
  padding: 20px;
}
</style>
