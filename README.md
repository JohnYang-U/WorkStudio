
# Macro Studio Demo

一个基于 Electron + Vue 3 的桌面应用程序，采用现代化的左右布局设计。

## 功能特性

- 📱 左侧导航栏，包含菜单、搜索和最近访问
- 📊 右侧内容区，显示仪表板、统计数据和项目列表
- 🎨 现代化 UI 设计，使用 Element Plus 组件库
- 🔍 支持搜索功能
- 📈 数据统计卡片展示
- 📋 项目列表，包含进度条和状态显示

## 技术栈

- **Electron**: 桌面应用框架
- **Vue 3**: 前端框架
- **Vite**: 构建工具
- **Element Plus**: UI 组件库
- **Element Plus Icons**: 图标库

## 项目结构

```
MacroStudioDemo/
├── electron/          # Electron 主进程
│   └── main.js       # Electron 入口文件
├── src/              # Vue 源代码
│   ├── components/   # Vue 组件
│   │   ├── Sidebar.vue       # 左侧导航栏
│   │   └── ContentArea.vue   # 右侧内容区
│   ├── main.js       # Vue 入口文件
│   └── App.vue       # 根组件
├── index.html        # HTML 入口
├── vite.config.js    # Vite 配置
└── package.json      # 项目配置

```

## 安装依赖

```bash
npm install
```

## 开发模式

同时启动 Vue 开发服务器和 Electron：

```bash
npm run dev
```

## 构建应用

构建 Vue 项目并打包 Electron 应用：

```bash
npm run build
```

## 仅构建 Vue 项目

```bash
npm run build:vue
```

## 运行 Electron（生产模式）

```bash
npm start
```

## 使用说明

1. **左侧导航栏**:
   - Logo 和应用名称
   - 搜索框：支持搜索任务
   - 菜单选项：仪表盘、任务列表、宏管理等
   - 最近访问：显示最近打开的项目

2. **右侧内容区**:
   - 顶部标题栏
   - 统计卡片：显示项目统计数据
   - 项目列表：卡片式布局，显示项目进度和状态

## 快捷键

- `Ctrl/Cmd + N`: 新建项目
- `Ctrl/Cmd + O`: 打开文件
- `Ctrl/Cmd + S`: 保存文件
- `Ctrl/Cmd + Q`: 退出应用

## 许可证

MIT
=======
# WorkStudio
一个基于 Electron + Vue 3 的桌面应用程序，采用现代化的左右布局设计。

