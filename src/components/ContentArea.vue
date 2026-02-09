<template>
  <div class="content-area">
    <!-- 仪表盘 -->
    <div v-if="currentView === 'dashboard'" class="view-dashboard">
      <div class="header">
        <div class="header-left">
          <h1 class="title">{{ viewConfig.dashboard.title }}</h1>
          <p class="breadcrumb">{{ viewConfig.dashboard.breadcrumb }}</p>
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

    <!-- 任务列表 -->
    <div v-else-if="currentView === 'tasks'" class="view-tasks">
      <div class="header">
        <div class="header-left">
          <h1 class="title">{{ viewConfig.tasks.title }}</h1>
          <p class="breadcrumb">{{ viewConfig.tasks.breadcrumb }}</p>
        </div>
        <div class="header-right">
          <button class="btn btn-primary" @click="createTask">
            <span>+</span> 新建任务
          </button>
        </div>
      </div>
      <div class="empty-state">
        <div class="empty-icon">📋</div>
        <h3>任务列表</h3>
        <p>管理您的自动化任务</p>
        <button class="btn btn-primary" @click="createTask">创建第一个任务</button>
      </div>
    </div>

    <!-- 宏管理 -->
    <div v-else-if="currentView === 'macros'" class="view-macros">
      <div class="header">
        <div class="header-left">
          <h1 class="title">{{ viewConfig.macros.title }}</h1>
          <p class="breadcrumb">{{ viewConfig.macros.breadcrumb }}</p>
        </div>
        <div class="header-right">
          <button class="btn btn-primary" @click="createMacro">
            <span>+</span> 新建宏
          </button>
        </div>
      </div>
      <div class="empty-state">
        <div class="empty-icon">✨</div>
        <h3>宏管理</h3>
        <p>创建和管理自动化宏命令</p>
        <button class="btn btn-primary" @click="createMacro">创建第一个宏</button>
      </div>
    </div>

    <!-- 脚本编辑器 -->
    <div v-else-if="currentView === 'scripts'" class="view-scripts">
      <div class="header">
        <div class="header-left">
          <h1 class="title">{{ viewConfig.scripts.title }}</h1>
          <p class="breadcrumb">{{ viewConfig.scripts.breadcrumb }}</p>
        </div>
        <div class="header-right">
          <button class="btn btn-primary" @click="createScript">
            <span>+</span> 新建脚本
          </button>
        </div>
      </div>
      <div class="empty-state">
        <div class="empty-icon">📝</div>
        <h3>脚本编辑器</h3>
        <p>编写和编辑自动化脚本</p>
        <button class="btn btn-primary" @click="createScript">创建第一个脚本</button>
      </div>
    </div>

    <!-- 模板库 -->
    <div v-else-if="currentView === 'templates'" class="view-templates">
      <div class="header">
        <div class="header-left">
          <h1 class="title">{{ viewConfig.templates.title }}</h1>
          <p class="breadcrumb">{{ viewConfig.templates.breadcrumb }}</p>
        </div>
      </div>
      <div class="empty-state">
        <div class="empty-icon">📚</div>
        <h3>模板库</h3>
        <p>浏览和使用预置的自动化模板</p>
      </div>
    </div>

    <!-- 系统设置 -->
    <div v-else-if="currentView === 'settings'" class="view-settings">
      <div class="header">
        <div class="header-left">
          <h1 class="title">{{ viewConfig.settings.title }}</h1>
          <p class="breadcrumb">{{ viewConfig.settings.breadcrumb }}</p>
        </div>
      </div>
      <div class="settings-content">
        <div class="settings-section">
          <h3>通用设置</h3>
          <div class="setting-item">
            <label>主题</label>
            <select>
              <option>浅色模式</option>
              <option>深色模式</option>
              <option>跟随系统</option>
            </select>
          </div>
          <div class="setting-item">
            <label>语言</label>
            <select>
              <option>简体中文</option>
              <option>English</option>
            </select>
          </div>
        </div>
        <div class="settings-section">
          <h3>快捷键设置</h3>
          <div class="setting-item">
            <label>录制快捷键</label>
            <input type="text" value="Ctrl + R" readonly />
          </div>
          <div class="setting-item">
            <label>播放快捷键</label>
            <input type="text" value="Ctrl + P" readonly />
          </div>
        </div>
      </div>
    </div>

    <!-- 帮助中心 -->
    <div v-else-if="currentView === 'help'" class="view-help">
      <div class="header">
        <div class="header-left">
          <h1 class="title">{{ viewConfig.help.title }}</h1>
          <p class="breadcrumb">{{ viewConfig.help.breadcrumb }}</p>
        </div>
      </div>
      <div class="help-content">
        <div class="help-section">
          <h3>快速开始</h3>
          <ul>
            <li>如何录制宏操作</li>
            <li>如何编辑和播放宏</li>
            <li>如何创建自动化任务</li>
          </ul>
        </div>
        <div class="help-section">
          <h3>常见问题</h3>
          <ul>
            <li>宏无法播放怎么办？</li>
            <li>如何设置循环执行？</li>
            <li>如何导出和导入宏？</li>
          </ul>
        </div>
        <div class="help-section">
          <h3>快捷键参考</h3>
          <div class="shortcut-list">
            <div class="shortcut-item">
              <span>Ctrl + R</span>
              <span>开始/停止录制</span>
            </div>
            <div class="shortcut-item">
              <span>Ctrl + P</span>
              <span>播放宏</span>
            </div>
            <div class="shortcut-item">
              <span>Ctrl + S</span>
              <span>保存宏</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContentArea',
  props: {
    currentView: {
      type: String,
      default: 'dashboard'
    }
  },
  data() {
    return {
      viewConfig: {
        dashboard: {
          title: '仪表板',
          breadcrumb: '首页 / 仪表板'
        },
        tasks: {
          title: '任务列表',
          breadcrumb: '首页 / 任务列表'
        },
        macros: {
          title: '宏管理',
          breadcrumb: '首页 / 宏管理'
        },
        scripts: {
          title: '脚本编辑器',
          breadcrumb: '首页 / 脚本编辑器'
        },
        templates: {
          title: '模板库',
          breadcrumb: '首页 / 模板库'
        },
        settings: {
          title: '系统设置',
          breadcrumb: '首页 / 系统设置'
        },
        help: {
          title: '帮助中心',
          breadcrumb: '首页 / 帮助中心'
        }
      },
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
    createTask() {
      alert('创建新任务')
    },
    createMacro() {
      alert('创建新宏')
    },
    createScript() {
      alert('创建新脚本')
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
.content-area {
  padding: 0;
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

.header-left {
  .title {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 4px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .breadcrumb {
    color: #9ca3af;
    font-size: 14px;
  }
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

  &.btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
    }

    span {
      font-size: 18px;
    }
  }
}

.profile {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid #f3f4f6;
  transition: all 0.3s ease;

  &:hover {
    border-color: #667eea;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
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

  &:hover {
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

    .stat-value {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 4px;
      color: #1f2937;
    }

    .stat-label {
      font-size: 14px;
      color: #6b7280;
      margin-bottom: 4px;
    }

    .stat-change {
      font-size: 12px;
      font-weight: 500;

      &.positive {
        color: #10b981;
      }

      &.negative {
        color: #ef4444;
      }
    }
  }
}

.content-section {
  padding: 0 32px 32px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h2 {
    font-size: 20px;
    font-weight: 600;
    color: #1f2937;
  }
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

  &:hover {
    border-color: #667eea;
    color: #667eea;
  }

  &.active {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-color: transparent;
    color: white;
  }
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

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
  }

  .project-image {
    position: relative;
    height: 150px;
    overflow: hidden;

    img {
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

      &.active {
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      }

      &.completed {
        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      }

      &.pending {
        background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
      }
    }
  }

  .project-content {
    padding: 20px;

    h3 {
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

      .meta-item {
        font-size: 13px;
        color: #9ca3af;
      }
    }

    .project-progress {
      display: flex;
      align-items: center;
      gap: 12px;

      .progress-bar {
        flex: 1;
        height: 8px;
        background: #f3f4f6;
        border-radius: 4px;
        overflow: hidden;

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
          border-radius: 4px;
          transition: width 0.3s ease;
        }
      }

      .progress-text {
        font-size: 12px;
        font-weight: 600;
        color: #667eea;
      }
    }
  }
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

/* 新增页面样式 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 20px;
  text-align: center;

  .empty-icon {
    font-size: 80px;
    margin-bottom: 24px;
    opacity: 0.5;
  }

  h3 {
    font-size: 24px;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 12px;
  }

  p {
    font-size: 16px;
    color: #6b7280;
    margin-bottom: 24px;
  }
}

/* 设置页面样式 */
.settings-content {
  padding: 32px;
}

.settings-section {
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  h3 {
    font-size: 18px;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 1px solid #e5e7eb;
  }
}

.setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;

  &:not(:last-child) {
    border-bottom: 1px solid #f3f4f6;
  }

  label {
    font-size: 14px;
    color: #374151;
    font-weight: 500;
  }

  select,
  input[type="text"] {
    padding: 8px 16px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 14px;
    color: #374151;
    background: white;
    min-width: 200px;
    cursor: pointer;

    &:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
  }

  input[type="text"] {
    cursor: default;
    background: #f9fafb;
  }
}

/* 帮助页面样式 */
.help-content {
  padding: 32px;
}

.help-section {
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  h3 {
    font-size: 18px;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 16px;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      padding: 12px 16px;
      color: #4b5563;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: #f9fafb;
        color: #667eea;
      }

      &:before {
        content: '→';
        margin-right: 12px;
        color: #9ca3af;
      }
    }
  }
}

.shortcut-list {
  .shortcut-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    border-radius: 8px;
    background: #f9fafb;

    &:not(:last-child) {
      margin-bottom: 8px;
    }

    span:first-child {
      font-family: 'Courier New', monospace;
      font-size: 14px;
      color: #667eea;
      font-weight: 600;
      background: white;
      padding: 4px 12px;
      border-radius: 6px;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }

    span:last-child {
      color: #4b5563;
      font-size: 14px;
    }
  }
}
</style>