<template>
  <el-config-provider :locale="zhCn">
    <div id="app">
      <div class="app-container">
        <Sidebar
          class="sidebar"
          :active-menu="currentView"
          @menu-change="handleMenuChange"
        />
        <ContentArea class="content" :current-view="currentView" />
      </div>
    </div>
  </el-config-provider>
</template>

<script>
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import Sidebar from './components/Sidebar.vue'
import ContentArea from './components/ContentArea.vue'

export default {
  name: 'App',
  components: {
    ElConfigProvider,
    Sidebar,
    ContentArea
  },
  data() {
    return {
      currentView: 'dashboard'
    }
  },
  methods: {
    handleMenuChange(viewName) {
      this.currentView = viewName
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  overflow: hidden;
}

.app-container {
  display: flex;
  height: 100%;
  background-color: #f0f2f5;
}

.sidebar {
  flex: 0 0 260px;
  background: #ffffff;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.content {
  flex: 1;
  overflow: hidden;
}
</style>
