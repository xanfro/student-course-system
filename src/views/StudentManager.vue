<script setup>
import Header from '../components/Header.vue'
import Navigation from '../components/Navigation.vue'
import { ref } from 'vue'

const tableHeaders = ['ID', '姓名', '年龄', '性别', '专业', '年级', 'GPA']

const students = ref([
  { id: 1, name: '张三', age: 20, gender: '男', major: '计算科学', grade: '大三', gpa: 3.5 },
  { id: 2, name: '李四', age: 21, gender: '女', major: '软件工程', grade: '大二', gpa: 3.7 },
  { id: 3, name: '王五', age: 22, gender: '男', major: '人工智能', grade: '大四', gpa: 3.8 },
  { id: 4, name: '赵六', age: 19, gender: '女', major: '数据科学', grade: '大一', gpa: 3.6 },
  { id: 5, name: '钱七', age: 20, gender: '男', major: '网络安全', grade: '大三', gpa: 3.4 },
  { id: 6, name: '孙八', age: 21, gender: '女', major: '信息安全', grade: '大二', gpa: 3.6 },
  { id: 7, name: '周九', age: 22, gender: '男', major: '计算机科学', grade: '大四', gpa: 3.9 },
  { id: 8, name: '吴十', age: 19, gender: '女', major: '软件工程', grade: '大一', gpa: 3.5 },
  { id: 9, name: '郑十一', age: 20, gender: '男', major: '网络工程', grade: '大三', gpa: 3.6 },
  { id: 10, name: '冯十二', age: 21, gender: '女', major: '数据科学', grade: '大二', gpa: 3.7 },
  { id: 11, name: '陈十三', age: 22, gender: '男', major: '人工智能', grade: '大四', gpa: 3.8 }
])
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
        <tr v-for="student in students" :key="student.id">
          <td>{{ student.id }}</td>
          <td>{{ student.name }}</td>
          <td>{{ student.age }}</td>
          <td>{{ student.gender }}</td>
          <td>{{ student.major }}</td>
          <td>{{ student.grade }}</td>
          <td>{{ student.gpa }}</td>
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