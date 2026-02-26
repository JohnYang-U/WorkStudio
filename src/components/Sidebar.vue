<template>
  <el-menu
    :default-active="$route.path"
    :router="true"
    class="sidebar-menu"
  >
    <div class="sidebar-header">
      <el-icon class="logo-icon"><Document /></el-icon>
      <div class="logo-text">
        <h1>Macro Studio</h1>
        <p>自动化任务管理</p>
      </div>
    </div>

    <div class="search-section">
      <el-input
        v-model="searchQuery"
        placeholder="搜索任务..."
        clearable
      >
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
    </div>

    <div class="menu-section">
      <div class="section-title">菜单</div>
      <router-link to="/dashboard">
        <el-menu-item index="/dashboard">
          <el-icon><DataBoard /></el-icon>
          <span>仪表盘</span>
        </el-menu-item>
      </router-link>
      <router-link to="/tasks">
        <el-menu-item index="/tasks">
          <el-icon><List /></el-icon>
          <span>任务列表</span>
        </el-menu-item>
      </router-link>
      <router-link to="/macrostool">
        <el-menu-item index="/macrostool">
          <el-icon><MagicStick /></el-icon>
          <span>工具管理</span>
        </el-menu-item>
      </router-link>
      <router-link to="/scripts">
        <el-menu-item index="/scripts">
          <el-icon><DocumentCopy /></el-icon>
          <span>脚本编辑器</span>
        </el-menu-item>
      </router-link>
      <router-link to="/templates">
        <el-menu-item index="/templates">
          <el-icon><Collection /></el-icon>
          <span>模板库</span>
        </el-menu-item>
      </router-link>
    </div>

    <div class="menu-section">
      <div class="section-title">设置</div>
      <router-link to="/settings">
        <el-menu-item index="/settings">
          <el-icon><Setting /></el-icon>
          <span>系统设置</span>
        </el-menu-item>
      </router-link>
      <router-link to="/help">
        <el-menu-item index="/help">
          <el-icon><QuestionFilled /></el-icon>
          <span>帮助中心</span>
        </el-menu-item>
      </router-link>
    </div>

    <div class="recent-section">
      <div class="section-title">最近访问</div>
      <div class="recent-list">
        <div
          v-for="item in recentItems"
          :key="item.id"
          class="recent-item"
          @click="handleRecentClick(item)"
        >
          <el-icon :class="item.icon"></el-icon>
          <div class="item-info">
            <div class="item-name">{{ item.name }}</div>
            <div class="item-time">{{ item.time }}</div>
          </div>
        </div>
      </div>
    </div>
  </el-menu>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      searchQuery: '',
      recentItems: [
        { id: 1, name: '数据处理宏', time: '2小时前', icon: 'MagicStick' },
        { id: 2, name: '网页自动化', time: '昨天', icon: 'Document' },
        { id: 3, name: '文件整理脚本', time: '3天前', icon: 'FolderOpened' },
        { id: 4, name: '批量重命名', time: '1周前', icon: 'Edit' }
      ]
    }
  },
  methods: {
    handleRecentClick(item) {
      this.$emit('recent-click', item)
    }
  }
}
</script>

<style scoped>
.sidebar-menu {
  border-right: none;
  height: 100%;
  background: #ffffff;
  padding: 0;
}

.sidebar-header {
  padding: 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e4e7ed;
  margin-bottom: 16px;
}

.logo-icon {
  font-size: 32px;
  color: #409eff;
  margin-right: 12px;
}

.logo-text h1 {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: #303133;
}

.logo-text p {
  font-size: 12px;
  margin: 0;
  color: #909399;
}

.search-section {
  padding: 0 16px;
  margin-bottom: 16px;
}

.menu-section {
  margin-bottom: 16px;
}

.section-title {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  color: #909399;
  padding: 8px 20px 8px;
  margin-bottom: 4px;
}

:deep(.el-menu-item) {
  height: 40px;
  line-height: 40px;
  margin: 4px 12px;
  border-radius: 6px;
}

:deep(.el-menu-item:hover) {
  background-color: #f5f7fa;
}

:deep(.el-menu-item.is-active) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

:deep(.el-menu-item.is-active .el-icon) {
  color: white;
}

.recent-section {
  padding: 0 12px;
  margin-top: 16px;
}

.recent-list {
  max-height: 200px;
  overflow-y: auto;
}

.recent-item {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 4px;
}

.recent-item:hover {
  background-color: #f5f7fa;
}

.recent-item .el-icon {
  font-size: 18px;
  color: #606266;
  margin-right: 12px;
}

.item-info {
  flex: 1;
}

.item-name {
  font-size: 13px;
  font-weight: 500;
  color: #303133;
  margin-bottom: 2px;
}

.item-time {
  font-size: 11px;
  color: #909399;
}

:deep(.el-input__wrapper) {
  border-radius: 6px;
}

::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #909399;
  border-radius: 2px;
}
</style>