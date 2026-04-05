<script setup>
import Header from '@/components/Header.vue'
import Navigation from '@/components/Navigation.vue'
import { getStudents } from '@/api/student'
import { ref, onMounted } from 'vue'

const tableHeaders = ['ID', '姓名', '年龄', '性别', '专业', '年级', 'GPA']

const students = ref([])

const fetchStudents = async () => {
  try {
    students.value = await getStudents()
    console.log("学生数据:", students.value)
  } catch (error) {
    console.error('获取学生数据失败:', error)
  }
}
onMounted(() => {
  fetchStudents()
})

</script>

<template>
  <div class="container">
    <h1>学生信息管理系统</h1>
    <table>
      <thead>
        <tr>
          <th v-for="header in tableHeaders" :key="header">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in students" :key="student?.id">
          <td>{{ student?.id }}</td>
          <td>{{ student?.name }}</td>
          <td>{{ student?.age }}</td>
          <td>{{ student?.gender }}</td>
          <td>{{ student?.major }}</td>
          <td>{{ student?.grade }}</td>
          <td>{{ student?.gpa }}</td>
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