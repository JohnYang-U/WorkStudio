<template>
  <div class="view-settings">
    <div class="header">
      <div class="header-left">
        <h1 class="title">系统设置</h1>
        <p class="breadcrumb">首页 / 系统设置</p>
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
</template>

<script>
export default {
  name: 'Settings'
}
</script>

<style scoped>
.view-settings {
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

.settings-content {
  padding: 32px;
}

.settings-section {
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.settings-section h3 {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e5e7eb;
}

.setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
}

.setting-item:not(:last-child) {
  border-bottom: 1px solid #f3f4f6;
}

.setting-item label {
  font-size: 14px;
  color: #374151;
  font-weight: 500;
}

.setting-item select,
.setting-item input[type="text"] {
  padding: 8px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  color: #374151;
  background: white;
  min-width: 200px;
  cursor: pointer;
}

.setting-item select:focus,
.setting-item input[type="text"]:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.setting-item input[type="text"] {
  cursor: default;
  background: #f9fafb;
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
