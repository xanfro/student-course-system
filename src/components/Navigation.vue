<script setup>
import { RouterLink } from 'vue-router'
const navItems = [
  { name: '首页', path: '/' },
  { name: '学生管理', path: '/student' },
  { name: '课程管理', path: '/course' }
]
</script>

<template>
  <nav class="navigation">
    <ul>
      <li v-for="(item, index) in navItems" :key="index">
        <RouterLink :to="item.path" active-class="active" class="item">
          {{ item.name }}
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.navigation {
  background-color: #ffffff;
  border-bottom: #383838 4px solid;
  padding: 25px;
  padding-left: 35px;
}

ul {
  display: flex;
  list-style: none;
  padding-left: 0px;
  gap: 30px;
}

li {
  font-size: 30px;
}

.item {
  text-decoration: none;
  color: #583892;
}

.active {
  font-weight: bold;
  border-bottom: #583892 4px solid;
}
</style>
  