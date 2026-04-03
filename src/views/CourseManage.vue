<script setup>
import Header from '../components/Header.vue'
import Navigation from '../components/Navigation.vue'
import { ref } from 'vue'

const tableHeaders = ref(['ID', '课程名称', '学分', '任课教师', '上课时间'])
const courses = ref([
  { id: 1, name: '计算机科学导论', credits: 3, instructor: '张教授', schedule: '周一 9:00-11:00' },
  { id: 2, name: '数据结构与算法', credits: 4, instructor: '李教授', schedule: '周二 14:00-16:00' },
  { id: 3, name: '操作系统原理', credits: 4, instructor: '王教授', schedule: '周三 10:00-12:00' },
  { id: 4, name: '数据库系统概论', credits: 3, instructor: '赵教授', schedule: '周四 13:00-15:00' },
  { id: 5, name: '计算机网络', credits: 3, instructor: '钱教授', schedule: '周五 9:00-11:00' },
  { id: 6, name: '人工智能基础', credits: 4, instructor: '孙教授', schedule: '周一 14:00-16:00' },
  { id: 7, name: '软件工程导论', credits: 3, instructor: '周教授', schedule: '周二 9:00-11:00' },
  { id: 8, name: '编译原理', credits: 4, instructor: '吴教授', schedule: '周三 14:00-16:00' },
  { id: 9, name: '计算机安全', credits: 3, instructor: '郑教授', schedule: '周四 10:00-12:00' },
  { id: 10, name: '人机交互设计', credits: 3, instructor: '冯教授', schedule: '周五 13:00-15:00' }
])
</script>

<template>
  <div class="container">
    <h1>学生课程管理系统</h1>
    <table>
      <thead>
        <tr>
          <th v-for="header in tableHeaders" :key="header">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="course in courses" :key="course.id">
          <td>{{ course.id }}</td>
          <td>{{ course.name }}</td>
          <td>{{ course.credits }}</td>
          <td>{{ course.instructor }}</td>
          <td>{{ course.schedule }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
h1 {
  font-size: 35px;
  font-weight: bold;
  margin-bottom: 20px;
  color: black;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

table {
  width: 80%;
  border-collapse: collapse;
}


table {
  td {
    border: 2px solid #ccc;
    padding: 10px;
    text-align: center;
    transition: all 0.3s ease;

    &:hover {
      background-color: rgb(255, 196, 255);
      transform: scale(1.2);
      transition: all 0.3s ease;
    }

  }
  
  tr {
    &:nth-child(2n+1) {
      background-color: #f4fdff;
    }
  }

  th {
    border: 2px solid #ccc;
    padding: 10px;
    background-color: #f2f2f2;
  }
}

</style>