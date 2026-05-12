<script setup>
import { ref } from 'vue'
const name = ref('向非洲')
const id = ref('5120235257')
</script>

<template>
  <div class="container">
    <div class="id">{{ id }}</div>
    <img src="../assets/prj2.png" alt="二维码展示处" class="QRcode" />
    <div class="name">{{ name }}</div>
  </div>
</template>

<style scoped>
.container {
  position: fixed;
  top: 5px;
  right: 5px;
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border: 1px solid #ccc;
  transform: scale(0.9);
}

.name {
  font-size: 20px;
  font-weight: bold;
  color: black;
  transform: translateY(-10px);
}

.QRcode {
  width: 250px;
  height: 250px;
}

.id {
  font-size: 20px;
  color: #000000;
  transform: translateY(10px);
  font-weight: bold;
}

</style>