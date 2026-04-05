<script setup>
import Header from '@/components/Header.vue'
import Navigation from '@/components/Navigation.vue'
import { getCourses } from '@/api/course'
import { ref, onMounted } from 'vue'

const tableHeaders = ref(['ID', '课程名称', '学分', '任课教师', '上课时间'])
const courses = ref([])

const fetchCourses = async () => {
  try {
    courses.value = await getCourses()
  } catch (error) {
    console.error('获取课程数据失败:', error)
  }
}

onMounted(() => {
  fetchCourses()
})
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