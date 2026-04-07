<script setup>
import Header from '@/components/Header.vue'
import Navigation from '@/components/Navigation.vue'
import { getStudents, deleteStudentByIds, addStudent } from '@/api/student'
import { ref, onMounted } from 'vue'

const tableHeaders = ['选择', 'ID', '姓名', '年龄', '性别', '专业', '年级', 'GPA']

const students = ref([])
const selectedStudents = ref([])
const name = ref('')
const age = ref(0)
const gender = ref('')
const major = ref('')
const grade = ref('')
const gpa = ref(0)

const fetchStudents = async () => {
  try {
    students.value = await getStudents()
    console.log("学生数据:", students.value)
  } catch (error) {
    console.error('获取学生数据失败:', error)
  }
}

const deleteSelectedStudents = async () => {
  if (selectedStudents.value.length === 0) {
    alert('请至少选择一名学生进行删除')
    return
  }

  try {
    await deleteStudentByIds(selectedStudents.value)
    alert('选中学生删除成功')
    fetchStudents()
  } catch (error) {
    console.error('删除学生失败:', error)
    alert('删除学生失败，请重试')
  }
}

const handleAddStudent = async () => {
  if (!name.value || !age.value || !gender.value || !major.value || !grade.value || !gpa.value) {
    alert('请填写完整的学生信息')
    return
  }

  try {
    await addStudent({
      name: name.value,
      age: age.value,
      gender: gender.value,
      major: major.value,
      grade: grade.value,
      gpa: gpa.value
    })
    alert('学生添加成功')
    fetchStudents()
  } catch (error) {
    console.error('添加学生失败:', error)
    alert('添加学生失败，请重试')
  }
}

onMounted(() => {
  fetchStudents()
})

</script>

<template>
  <div class="container">
    <h1>学生信息管理系统</h1>
      <div class="filter-bar">
        <span>
          姓名：
          <input type="text" v-model="name" placeholder="请输入姓名" />
        </span>
        <span>
          年龄：
          <input type="number" v-model="age" placeholder="请输入年龄" />
        </span>
        <span>
          性别：
          <input type="text" v-model="gender" placeholder="请输入性别" />
        </span>
        <span>
          专业：
          <input type="text" v-model="major" placeholder="请输入专业" />
        </span>
        <span>
          年级：
          <input type="text" v-model="grade" placeholder="请输入年级" />
        </span>
        <span>
          GPA：
          <input type="number" step="0.1" v-model="gpa" placeholder="请输入GPA" />
        </span>
        <button @click="handleAddStudent" class="add-button">添加学生</button>
        <button @click="deleteSelectedStudents" class="delete-button">删除选中学生</button>
      </div>
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
          <td>
            <input type="checkbox" v-model="selectedStudents" :value="student.id" class="checkbox" />
          </td>
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

.filter-bar {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2px;
  margin-bottom: 20px;
}

.filter-bar span {
  display: flex;
  align-items: center;
}

.filter-bar input {
  margin-left: 1px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100px;
}

.add-button {
  padding: 5px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.delete-button {
  padding: 5px 15px;
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.checkbox {
  width: 20px;
  height: 20px;
}

</style>