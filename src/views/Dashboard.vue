<template>
  <div class="view-dashboard">
    <div class="header">
      <div class="header-left">
        <h1 class="title">仪表板</h1>
        <p class="breadcrumb">首页 / 仪表板</p>
      </div>
      <div class="header-right">
        <button class="btn btn-primary" @click="createNew">
          <span>+</span> 新建项目
        </button>
        <div class="profile">
          <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23667eea'/%3E%3Ctext x='20' y='28' text-anchor='middle' fill='white' font-size='16' font-family='Arial'%3E👤%3C/text%3E%3C/svg%3E" alt="Profile" />
        </div>
      </div>
    </div>

    <div class="stats-grid">
      <div v-for="stat in stats" :key="stat.id" class="stat-card">
        <div class="stat-icon" :style="{ background: stat.color }">
          <span>{{ stat.icon }}</span>
        </div>
        <div class="stat-info">
          <h3 class="stat-value">{{ stat.value }}</h3>
          <p class="stat-label">{{ stat.label }}</p>
          <p class="stat-change" :class="stat.change > 0 ? 'positive' : 'negative'">
            {{ stat.change > 0 ? '↑' : '↓' }} {{ Math.abs(stat.change) }}%
          </p>
        </div>
      </div>
    </div>

    <div class="content-section">
      <div class="section-header">
        <h2>项目列表</h2>
        <div class="filter-buttons">
          <button
            v-for="filter in filters"
            :key="filter.id"
            :class="['filter-btn', activeFilter === filter.id ? 'active' : '']"
            @click="activeFilter = filter.id"
          >
            {{ filter.label }}
          </button>
        </div>
      </div>

      <div class="projects-grid">
        <div
          v-for="project in projects"
          :key="project.id"
          class="project-card"
          @click="openProject(project)"
        >
          <div class="project-image">
            <img :src="project.image" :alt="project.name" />
            <div class="project-status" :class="project.status">
              {{ getStatusText(project.status) }}
            </div>
          </div>
          <div class="project-content">
            <h3>{{ project.name }}</h3>
            <p class="project-description">{{ project.description }}</p>
            <div class="project-meta">
              <span class="meta-item">📅 {{ project.date }}</span>
              <span class="meta-item">👥 {{ project.team }}</span>
            </div>
            <div class="project-progress">
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: project.progress + '%' }"></div>
              </div>
              <span class="progress-text">{{ project.progress }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      stats: [
        {
          id: 1,
          icon: '📁',
          value: '24',
          label: '总项目数',
          change: 12,
          color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        },
        {
          id: 2,
          icon: '⚡',
          value: '8',
          label: '进行中',
          change: 5,
          color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        },
        {
          id: 3,
          icon: '✅',
          value: '12',
          label: '已完成',
          change: -3,
          color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
        },
        {
          id: 4,
          icon: '⏰',
          value: '4',
          label: '待处理',
          change: 8,
          color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
        }
      ],
      filters: [
        { id: 'all', label: '全部' },
        { id: 'active', label: '进行中' },
        { id: 'completed', label: '已完成' },
        { id: 'recent', label: '最近更新' }
      ],
      activeFilter: 'all',
      projects: [
        {
          id: 1,
          name: '用户管理系统',
          description: '全功能的用户权限管理和数据统计系统',
          image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="150" viewBox="0 0 300 150"%3E%3Crect width="300" height="150" fill="%23667eea"/%3E%3Ctext x="150" y="80" text-anchor="middle" fill="white" font-size="40" font-family="Arial"%3E👥%3C/text%3E%3C/svg%3E',
          status: 'active',
          date: '2024-01-15',
          team: '3 人',
          progress: 75
        },
        {
          id: 2,
          name: '数据可视化平台',
          description: '实时数据监控和可视化分析工具',
          image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="150" viewBox="0 0 300 150"%3E%3Crect width="300" height="150" fill="%23EC4899"/%3E%3Ctext x="150" y="80" text-anchor="middle" fill="white" font-size="40" font-family="Arial"%3E📊%3C/text%3E%3C/svg%3E',
          status: 'active',
          date: '2024-01-12',
          team: '5 人',
          progress: 60
        },
        {
          id: 3,
          name: '移动端适配',
          description: '响应式设计和移动端优化项目',
          image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="150" viewBox="0 0 300 150"%3E%3Crect width="300" height="150" fill="%2310B981"/%3E%3Ctext x="150" y="80" text-anchor="middle" fill="white" font-size="40" font-family="Arial"%3E📱%3C/text%3E%3C/svg%3E',
          status: 'completed',
          date: '2024-01-10',
          team: '2 人',
          progress: 100
        },
        {
          id: 4,
          name: 'API 网关',
          description: '统一的API请求管理和路由系统',
          image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="150" viewBox="0 0 300 150"%3E%3Crect width="300" height="150" fill="%23F59E0B"/%3E%3Ctext x="150" y="80" text-anchor="middle" fill="white" font-size="40" font-family="Arial"%3E🔗%3C/text%3E%3C/svg%3E',
          status: 'pending',
          date: '2024-01-08',
          team: '4 人',
          progress: 30
        },
        {
          id: 5,
          name: '安全审计系统',
          description: '全面的系统安全监控和日志审计',
          image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="150" viewBox="0 0 300 150"%3E%3Crect width="300" height="150" fill="%23EF4444"/%3E%3Ctext x="150" y="80" text-anchor="middle" fill="white" font-size="40" font-family="Arial"%3E🛡️%3C/text%3E%3C/svg%3E',
          status: 'active',
          date: '2024-01-05',
          team: '6 人',
          progress: 45
        },
        {
          id: 6,
          name: '消息推送服务',
          description: '实时消息通知和推送功能模块',
          image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="150" viewBox="0 0 300 150"%3E%3Crect width="300" height="150" fill="%238B5CF6"/%3E%3Ctext x="150" y="80" text-anchor="middle" fill="white" font-size="40" font-family="Arial"%3E📢%3C/text%3E%3C/svg%3E',
          status: 'completed',
          date: '2024-01-03',
          team: '2 人',
          progress: 100
        }
      ]
    }
  },
  methods: {
    createNew() {
      alert('创建新项目')
    },
    openProject(project) {
      console.log('打开项目:', project.name)
    },
    getStatusText(status) {
      const statusMap = {
        active: '进行中',
        completed: '已完成',
        pending: '待处理'
      }
      return statusMap[status] || status
    }
  }
}
</script>

<style scoped>
.view-dashboard {
  height: 100%;
  overflow-y: auto;
  background: transparent;
}

.header {
  background: white;
  padding: 24px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.header-left .title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 4px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.header-left .breadcrumb {
  color: #9ca3af;
  font-size: 14px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.btn.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
}

.btn.btn-primary span {
  font-size: 18px;
}

.profile {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid #f3f4f6;
  transition: all 0.3s ease;
}

.profile:hover {
  border-color: #667eea;
}

.profile img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  padding: 32px;
}

.stat-card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.stat-info {
  flex: 1;
}

.stat-info .stat-value {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 4px;
  color: #1f2937;
}

.stat-info .stat-label {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 4px;
}

.stat-info .stat-change {
  font-size: 12px;
  font-weight: 500;
}

.stat-info .stat-change.positive {
  color: #10b981;
}

.stat-info .stat-change.negative {
  color: #ef4444;
}

.content-section {
  padding: 0 32px 32px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-header h2 {
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
}

.filter-buttons {
  display: flex;
  gap: 8px;
}

.filter-btn {
  padding: 8px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-btn:hover {
  border-color: #667eea;
  color: #667eea;
}

.filter-btn.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: transparent;
  color: white;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
}

.project-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
}

.project-image {
  position: relative;
  height: 150px;
  overflow: hidden;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-status {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  color: white;
}

.project-status.active {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.project-status.completed {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.project-status.pending {
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
}

.project-content {
  padding: 20px;
}

.project-content h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #1f2937;
}

.project-description {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 16px;
  line-height: 1.5;
}

.project-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.meta-item {
  font-size: 13px;
  color: #9ca3af;
}

.project-progress {
  display: flex;
  align-items: center;
  gap: 12px;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background: #f3f4f6;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 12px;
  font-weight: 600;
  color: #667eea;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}
</style>
