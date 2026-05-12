<script setup>
import { ref, onMounted } from 'vue'
import { getStudents } from '@/api/student'
import { getCourses } from '@/api/course'
import { getSelections } from '@/api/selection'
import { useRouter } from 'vue-router'

const router = useRouter()

const stats = ref({
  studentCount: 0,
  courseCount: 0,
  selectionCount: 0
})

const loading = ref(true)

const fetchStats = async () => {
  try {
    const [students, courses, selections] = await Promise.all([
      getStudents(),
      getCourses(),
      getSelections()
    ])
    stats.value.studentCount = students.length
    stats.value.courseCount = courses.length
    stats.value.selectionCount = selections.length
  } catch (error) {
    console.error('获取统计数据失败:', error)
  } finally {
    loading.value = false
  }
}

const navigateTo = (path) => {
  router.push(path)
}

onMounted(() => {
  fetchStats()
})
</script>

<template>
  <div class="container">
    <h1>教务管理数字化平台</h1>
    <div class="main-content">
      <div class="sidebar">
        <!-- Stats Section -->
        <div class="form-card">
          <h3>数据概览</h3>
          <div class="stat-item">
            <label>注册学生</label>
            <div class="stat-value">{{ stats.studentCount }} <span class="unit">人</span></div>
          </div>
          <div class="stat-item">
            <label>开设课程</label>
            <div class="stat-value">{{ stats.courseCount }} <span class="unit">门</span></div>
          </div>
          <div class="stat-item">
            <label>选课记录</label>
            <div class="stat-value">{{ stats.selectionCount }} <span class="unit">条</span></div>
          </div>
        </div>

        <!-- System Info -->
        <div class="form-card">
          <h3>系统状态</h3>
          <div class="status-indicator">
            <span class="dot"></span>
            运行正常
          </div>
          <p class="system-time">最后同步: {{ new Date().toLocaleTimeString() }}</p>
        </div>
      </div>

      <div class="table-container">
        <div class="welcome-header">
          <h2>业务模块导航</h2>
          <p>请选择下方模块进行日常教务管理</p>
        </div>
        
        <div class="nav-grid">
          <div class="nav-item" @click="navigateTo('/student')">
            <div class="nav-icon-placeholder student-theme">ST</div>
            <div class="nav-info">
              <h3>学生管理中心</h3>
              <p>维护学生档案详情，包括基本信息、学籍状态及学分绩点统计。</p>
            </div>
            <div class="nav-arrow">→</div>
          </div>

          <div class="nav-item" @click="navigateTo('/course')">
            <div class="nav-icon-placeholder course-theme">CO</div>
            <div class="nav-info">
              <h3>课程排布中心</h3>
              <p>统筹全校课程资源，配置任课教师、教学课时及学分权重。</p>
            </div>
            <div class="nav-arrow">→</div>
          </div>

          <div class="nav-item" @click="navigateTo('/selection')">
            <div class="nav-icon-placeholder selection-theme">SL</div>
            <div class="nav-info">
              <h3>选课事务中心</h3>
              <p>处理学生选课申请，监控选课容量，导出选课统计报表。</p>
            </div>
            <div class="nav-arrow">→</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 30px;
  background-color: #f8f9fa;
  min-height: 100vh;
  width: 100%;
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
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.table-container {
  flex: 1;
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.form-card {
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.form-card h3 {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 18px;
  color: #333;
  border-bottom: 2px solid #4caf50;
  padding-bottom: 10px;
}

.stat-item {
  margin-bottom: 15px;
}

.stat-item label {
  display: block;
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
}

.unit {
  font-size: 14px;
  font-weight: 400;
  color: #94a3b8;
  margin-left: 4px;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #4caf50;
  font-weight: 600;
  font-size: 15px;
}

.dot {
  width: 8px;
  height: 8px;
  background-color: #4caf50;
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgba(76, 175, 80, 0.2);
}

.system-time {
  margin-top: 10px;
  font-size: 13px;
  color: #94a3b8;
}

.welcome-header {
  margin-bottom: 40px;
}

.welcome-header h2 {
  font-size: 22px;
  color: #334155;
  margin-bottom: 8px;
}

.welcome-header p {
  color: #64748b;
  font-size: 15px;
}

.nav-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 24px;
  border: 1px solid #f1f5f9;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
}

.nav-item:hover {
  background-color: #f8fafc;
  border-color: #4caf50;
  transform: translateX(10px);
}

.nav-icon-placeholder {
  width: 54px;
  height: 54px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  margin-right: 20px;
  flex-shrink: 0;
}

.student-theme { background-color: #3b82f6; }
.course-theme { background-color: #10b981; }
.selection-theme { background-color: #f59e0b; }

.nav-info {
  flex: 1;
}

.nav-info h3 {
  margin: 0 0 6px 0;
  font-size: 18px;
  color: #1e293b;
}

.nav-info p {
  margin: 0;
  font-size: 14px;
  color: #64748b;
  line-height: 1.5;
}

.nav-arrow {
  font-size: 20px;
  color: #cbd5e1;
}

.nav-item:hover .nav-arrow {
  color: #4caf50;
}
</style>
