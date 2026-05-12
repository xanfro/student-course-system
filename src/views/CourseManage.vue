<script setup>
import Header from '@/components/Header.vue'
import Navigation from '@/components/Navigation.vue'
import { getCourses } from '@/api/course'
import { ref, onMounted } from 'vue'
import { deleteCourseByIds, addCourse } from '@/api/course'

const tableHeaders = ref([ '选择', 'ID', '课程名称', '学分', '任课教师', '上课时间' ])
const courses = ref([])
const selectedCourses = ref([])
const courseName = ref('')
const credits = ref(0)
const instructor = ref('')
const schedule = ref('')

const fetchCourses = async () => {
  try {
    courses.value = await getCourses()
  } catch (error) {
    console.error('获取课程数据失败:', error)
  }
}

const deleteSelectedCourses = async () => {
  if (selectedCourses.value.length === 0) {
    alert('请至少选择一门课程进行删除')
    return
  }

  try {
    await deleteCourseByIds(selectedCourses.value)
    alert('选中课程删除成功')
    fetchCourses()
  } catch (error) {
    console.error('删除课程失败:', error)
    alert('删除课程失败，请重试')
  }
}

const handleAddCourse = async () => {
  if (!courseName.value || !credits.value || !instructor.value || !schedule.value) {
    alert('请填写完整的课程信息')
    return
  }

  try {
    await addCourse({
      name: courseName.value,
      credits: credits.value,
      instructor: instructor.value,
      schedule: schedule.value
    })
    alert('课程添加成功')
    fetchCourses()
  } catch (error) {
    console.error('添加课程失败:', error)
    alert('添加课程失败，请重试')
  }
}

onMounted(() => {
  fetchCourses()
})
</script>

<template>
  <div class="container">
    <h1>学生课程管理系统</h1>
    <div class="main-content">
      <div class="sidebar">
        <div class="form-card">
          <h3>添加课程</h3>
          <div class="form-group">
            <label>课程名称</label>
            <input type="text" v-model="courseName" placeholder="请输入课程名称" />
          </div>
          <div class="form-group">
            <label>学分</label>
            <input type="number" v-model="credits" placeholder="请输入学分" />
          </div>
          <div class="form-group">
            <label>任课教师</label>
            <input type="text" v-model="instructor" placeholder="请输入任课教师" />
          </div>
          <div class="form-group">
            <label>上课时间</label>
            <input type="text" v-model="schedule" placeholder="请输入上课时间" />
          </div>
          <div class="actions">
            <button @click="handleAddCourse" class="add-button">添加课程</button>
            <button @click="deleteSelectedCourses" class="delete-button">删除选中</button>
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
            <tr v-for="course in courses" :key="course.id">
              <td>
                <input type="checkbox" v-model="selectedCourses" :value="course.id" class="checkbox" />
              </td>
              <td>{{ course.id }}</td>
              <td>{{ course.name }}</td>
              <td>{{ course.credits }}</td>
              <td>{{ course.instructor }}</td>
              <td>{{ course.schedule }}</td>
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