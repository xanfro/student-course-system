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
    <span>
      <span>
        课程名称：
        <input type="text" v-model="courseName" placeholder="请输入课程名称" />
      </span>
      <span>
        学分：
        <input type="number" v-model="credits" placeholder="请输入学分" />
      </span>
      <span>
        任课教师：
        <input type="text" v-model="instructor" placeholder="请输入任课教师" />
      </span>
      <span>
        上课时间：
        <input type="text" v-model="schedule" placeholder="请输入上课时间" />
      </span>
      <button @click="handleAddCourse" class="add-button">添加课程</button>
      <button @click="deleteSelectedCourses" class="delete-button">删除选中课程</button>
    </span>
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

.checkbox {
  width: 20px;
  height: 20px;
}

.delete-button {
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.add-button {
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

span input {
  margin-right: 5px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>