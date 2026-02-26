<template>
  <div class="view-macros">
    <div class="header">
      <div class="header-left">
        <h1 class="title">工具管理</h1>
        <p class="breadcrumb">首页 / 工具管理</p>
      </div>
      <div class="header-right">
        <button class="btn btn-primary" @click="createMacro">
          <span>+</span> 新建工具
        </button>
      </div>
    </div>
    <div class="empty-state">
      <div class="empty-icon">✨</div>
      <h3>工具管理</h3>
      <p>创建和管理自动化工具</p>
      <button class="btn btn-primary" @click="createMacro">创建第一个工具</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MacrosTool', // Updated to match the route name
  methods: {
    createMacro() {
      alert('创建新工具')
    }
  },
  created() {
    console.log('MacrosTool component has been created.')
  },
  mounted() {
    console.log('MacrosTool component has been mounted.')
  }
}
</script>

<style scoped>
.view-macros {
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

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 20px;
  text-align: center;
}

.empty-state .empty-icon {
  font-size: 80px;
  margin-bottom: 24px;
  opacity: 0.5;
}

.empty-state h3 {
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 12px;
}

.empty-state p {
  font-size: 16px;
  color: #6b7280;
  margin-bottom: 24px;
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
