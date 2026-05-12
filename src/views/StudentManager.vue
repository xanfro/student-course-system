<script setup>
import Header from '@/components/Header.vue'
import Navigation from '@/components/Navigation.vue'
import { getStudents, deleteStudentByIds, addStudent } from '@/api/student'
import { ref, onMounted } from 'vue'

const tableHeaders = ['选择', 'ID', '姓名', '年龄', '性别', '专业', '班级', '年级', 'GPA']

const students = ref([])
const selectedStudents = ref([])
const name = ref('')
const age = ref(0)
const gender = ref('')
const major = ref('')
const className = ref('')
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
  if (!name.value || !age.value || !gender.value || !major.value || !className.value || !grade.value || !gpa.value) {
    alert('请填写完整的学生信息')
    return
  }

  try {
    await addStudent({
      name: name.value,
      age: age.value,
      gender: gender.value,
      major: major.value,
      className: className.value,
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
    <div class="main-content">
      <div class="sidebar">
        <div class="form-card">
          <h3>添加学生</h3>
          <div class="form-group">
            <label>姓名</label>
            <input type="text" v-model="name" placeholder="请输入姓名" />
          </div>
          <div class="form-group">
            <label>年龄</label>
            <input type="number" v-model="age" placeholder="请输入年龄" />
          </div>
          <div class="form-group">
            <label>性别</label>
            <input type="text" v-model="gender" placeholder="请输入性别" />
          </div>
          <div class="form-group">
            <label>专业</label>
            <input type="text" v-model="major" placeholder="请输入专业" />
          </div>
          <div class="form-group">
            <label>班级</label>
            <input type="text" v-model="className" placeholder="请输入班级" />
          </div>
          <div class="form-group">
            <label>年级</label>
            <input type="text" v-model="grade" placeholder="请输入年级" />
          </div>
          <div class="form-group">
            <label>GPA</label>
            <input type="number" step="0.1" v-model="gpa" placeholder="请输入GPA" />
          </div>
          <div class="actions">
            <button @click="handleAddStudent" class="add-button">添加学生</button>
            <button @click="deleteSelectedStudents" class="delete-button">删除选中</button>
          </div>
        </div>
      </div>
      <div class="table-container">
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
              <td>{{ student?.className }}</td>
              <td>{{ student?.grade }}</td>
              <td>{{ student?.gpa }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 30px;
  background-color: #f8f9fa;
  min-height: 100vh;
}

h1 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 30px;
  color: #2c3e50;
  text-align: center;
}

.main-content {
  display: flex;
  gap: 30px;
  max-width: 1400px;
  margin: 0 auto;
}

.sidebar {
  flex: 0 0 300px;
}

.table-container {
  flex: 1;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  overflow-x: auto;
}

.form-card {
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 20px;
}

.form-card h3 {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 18px;
  color: #333;
  border-bottom: 2px solid #4caf50;
  padding-bottom: 10px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #666;
  font-weight: 600;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #4caf50;
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.1);
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 25px;
}

.add-button, .delete-button {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.add-button {
  background-color: #4caf50;
  color: white;
}

.add-button:hover {
  background-color: #45a049;
  transform: translateY(-1px);
}

.delete-button {
  background-color: #ff4d4f;
  color: white;
}

.delete-button:hover {
  background-color: #ff7875;
  transform: translateY(-1px);
}

table {
  width: 100%;
  border-collapse: collapse;
}

table th {
  background-color: #f8f9fa;
  color: #333;
  font-weight: 600;
  padding: 15px;
  text-align: center;
  border-bottom: 2px solid #eee;
}

table td {
  padding: 12px;
  text-align: center;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.3s;
}

table tr:hover td {
  background-color: #f5faff;
}

.checkbox {
  width: 18px;
  height: 18px;
  cursor: pointer;
}
</style>