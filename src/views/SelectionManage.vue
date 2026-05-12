<script setup>
import { computed, onMounted, ref } from 'vue'
import { addSelection, deleteSelectionById, getSelections } from '@/api/selection'
import { getCourses } from '@/api/course'
import { getStudents } from '@/api/student'

const tableHeaders = ['课程编号', '课程名称', '学院', '学号', '学生姓名', '操作']

const selections = ref([])
const courses = ref([])
const students = ref([])
const selectedCourse = ref('all')

const courseCode = ref('')
const courseName = ref('')
const college = ref('')
const studentNo = ref('')
const studentName = ref('')

const batchClassName = ref('')
const batchCourseCode = ref('')

const courseOptions = computed(() => {
  const names = new Set()
  selections.value.forEach((item) => {
    if (item?.courseName) {
      names.add(item.courseName)
    }
  })
  return Array.from(names)
})

const filteredSelections = computed(() => {
  if (selectedCourse.value === 'all') {
    return selections.value
  }
  return selections.value.filter((item) => item.courseName === selectedCourse.value)
})

const classOptions = computed(() => {
  const classes = new Set()
  students.value.forEach((student) => {
    if (student.className) {
      classes.add(student.className)
    }
  })
  return Array.from(classes)
})

const availableCourseOptions = computed(() => {
  return courses.value.map(course => ({
    code: course.id.toString(),
    name: course.name
  }))
})

const fetchSelections = async () => {
  try {
    const [selectionsData, coursesData, studentsData] = await Promise.all([
      getSelections(),
      getCourses(),
      getStudents()
    ])
    selections.value = selectionsData
    courses.value = coursesData
    students.value = studentsData
  } catch (error) {
    console.error('获取信息失败:', error)
  }
}

const handleAddSelection = async () => {
  if (!courseCode.value || !courseName.value || !college.value || !studentNo.value || !studentName.value) {
    alert('请填写完整的选课信息')
    return
  }

  try {
    await addSelection({
      courseCode: courseCode.value,
      courseName: courseName.value,
      college: college.value,
      studentNo: studentNo.value,
      studentName: studentName.value
    })
    alert('选课添加成功')
    courseCode.value = ''
    courseName.value = ''
    college.value = ''
    studentNo.value = ''
    studentName.value = ''
    fetchSelections()
  } catch (error) {
    console.error('添加选课失败:', error)
    alert('添加选课失败，请重试')
  }
}

const handleBatchAddSelection = async () => {
  if (!batchClassName.value || !batchCourseCode.value) {
    alert('请选择班级和课程')
    return
  }

  try {
    const targetCourse = courses.value.find(c => c.id.toString() === batchCourseCode.value)
    if (!targetCourse) {
      alert('未找到选定课程')
      return
    }

    const targetStudents = students.value.filter(s => s.className === batchClassName.value)
    if (targetStudents.length === 0) {
      alert('该班级暂无学生')
      return
    }

    const promises = targetStudents.map(student => 
      addSelection({
        courseCode: batchCourseCode.value,
        courseName: targetCourse.name,
        college: student.major || '未知学院',
        studentNo: student.studentNo || student.id?.toString(),
        studentName: student.name
      })
    )

    await Promise.all(promises)
    alert(`班级 ${batchClassName.value} 共 ${targetStudents.length} 名学生注册课程 ${targetCourse.name} 成功`)
    
    batchClassName.value = ''
    batchCourseCode.value = ''
    fetchSelections()
  } catch (error) {
    console.error('批量添加选课失败:', error)
    alert('批量添加选课失败，部分或全部学生可能已注册过该课程')
  }
}

const handleDeleteSelection = async (item) => {
  try {
    await deleteSelectionById(item?.id)
    alert('删除选课成功')
    fetchSelections()
  } catch (error) {
    console.error('删除选课失败:', error)
    console.error('id:', item.id)
    alert('删除选课失败，请重试')
  }
}

onMounted(() => {
  fetchSelections()
})
</script>

<template>
  <div class="container">
    <h1>选课管理系统</h1>
    <div class="main-content">
      <div class="sidebar">
        <div class="form-card">
          <h3>筛选与添加</h3>
          <div class="form-group">
            <label>课程筛选</label>
            <select v-model="selectedCourse">
              <option value="all">全部课程</option>
              <option v-for="code in courseOptions" :key="code" :value="code">
                {{ code }}
              </option>
            </select>
          </div>
          <hr class="divider" />
          <div class="form-group">
            <label>课程编号</label>
            <input type="text" v-model="courseCode" placeholder="请输入课程编号" />
          </div>
          <div class="form-group">
            <label>课程名称</label>
            <input type="text" v-model="courseName" placeholder="请输入课程名称" />
          </div>
          <div class="form-group">
            <label>学院</label>
            <input type="text" v-model="college" placeholder="请输入学院" />
          </div>
          <div class="form-group">
            <label>学号</label>
            <input type="text" v-model="studentNo" placeholder="请输入学号" />
          </div>
          <div class="form-group">
            <label>学生姓名</label>
            <input type="text" v-model="studentName" placeholder="请输入学生姓名" />
          </div>
          <div class="actions">
            <button class="add-button" @click="handleAddSelection">添加选课</button>
          </div>
          <hr class="divider" />
          <div class="batch-section">
            <h3>按班级注册</h3>
            <div class="form-group">
              <label>选择班级</label>
              <select v-model="batchClassName">
                <option value="">请选择班级</option>
                <option v-for="cls in classOptions" :key="cls" :value="cls">
                  {{ cls }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label>选择课程</label>
              <select v-model="batchCourseCode">
                <option value="">请选择课程</option>
                <option v-for="course in availableCourseOptions" :key="course.code" :value="course.code">
                  {{ course.name }}
                </option>
              </select>
            </div>
            <div class="actions">
              <button class="batch-button" @click="handleBatchAddSelection">批量注册</button>
            </div>
          </div>
        </div>
      </div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th v-for="header in tableHeaders" :key="header">{{ header }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredSelections" :key="item?.id || item?.studentNo + '-' + item?.courseCode">
              <td>{{ item?.courseCode }}</td>
              <td>{{ item?.courseName }}</td>
              <td>{{ item?.college }}</td>
              <td>{{ item?.studentNo }}</td>
              <td>{{ item?.studentName }}</td>
              <td>
                <button class="row-delete-button" @click="handleDeleteSelection(item)">删除</button>
              </td>
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
  border-bottom: 2px solid #4895ef;
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

.form-group input,
.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #4895ef;
  box-shadow: 0 0 0 2px rgba(72, 149, 239, 0.1);
}

.divider {
  border: 0;
  border-top: 1px solid #eee;
  margin: 20px 0;
}

.actions {
  margin-top: 25px;
}

.add-button {
  width: 100%;
  padding: 12px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.add-button:hover {
  background-color: #45a049;
  transform: translateY(-1px);
}

.batch-button {
  width: 100%;
  padding: 12px;
  background-color: #4895ef;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.batch-button:hover {
  background-color: #3f87e3;
  transform: translateY(-1px);
}

.batch-section {
  margin-top: 20px;
}

.batch-section h3 {
  border-bottom-color: #4caf50;
}

.row-delete-button {
  padding: 6px 12px;
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.row-delete-button:hover {
  background-color: #ff7875;
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
</style>
