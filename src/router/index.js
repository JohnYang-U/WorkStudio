import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { title: '仪表板', icon: 'DataBoard' }
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: () => import('../views/Tasks.vue'),
    meta: { title: '任务列表', icon: 'List' }
  },
  {
    path: '/macrostool',
    name: 'MacrosTool',
    component: () => import('../views/MacrosTool.vue'),
    meta: { title: '工具管理', icon: 'MagicStick' }
  },
  {
    path: '/scripts',
    name: 'Scripts',
    component: () => import('../views/Scripts.vue'),
    meta: { title: '脚本编辑器', icon: 'DocumentCopy' }
  },
  {
    path: '/templates',
    name: 'Templates',
    component: () => import('../views/Templates.vue'),
    meta: { title: '模板库', icon: 'Collection' }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue'),
    meta: { title: '系统设置', icon: 'Setting' }
  },
  {
    path: '/help',
    name: 'Help',
    component: () => import('../views/Help.vue'),
    meta: { title: '帮助中心', icon: 'QuestionFilled' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
