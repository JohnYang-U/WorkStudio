<template>
  <div class="view-help">
    <div class="header">
      <div class="header-left">
        <h1 class="title">帮助中心</h1>
        <p class="breadcrumb">首页 / 帮助中心</p>
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
</template>

<script>
export default {
  name: 'Help'
}
</script>

<style scoped>
.view-help {
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

.help-content {
  padding: 32px;
}

.help-section {
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.help-section h3 {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 16px;
}

.help-section ul {
  list-style: none;
  padding: 0;
}

.help-section ul li {
  padding: 12px 16px;
  color: #4b5563;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.help-section ul li:hover {
  background: #f9fafb;
  color: #667eea;
}

.help-section ul li:before {
  content: '→';
  margin-right: 12px;
  color: #9ca3af;
}

.shortcut-list .shortcut-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-radius: 8px;
  background: #f9fafb;
}

.shortcut-list .shortcut-item:not(:last-child) {
  margin-bottom: 8px;
}

.shortcut-list .shortcut-item span:first-child {
  font-family: 'Courier New', monospace;
  font-size: 14px;
  color: #667eea;
  font-weight: 600;
  background: white;
  padding: 4px 12px;
  border-radius: 6px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.shortcut-list .shortcut-item span:last-child {
  color: #4b5563;
  font-size: 14px;
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
