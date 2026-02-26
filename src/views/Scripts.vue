<template>
  <div class="view-scripts">
    <div class="header">
      <div class="header-left">
        <h1 class="title">脚本编辑器</h1>
        <p class="breadcrumb">首页 / 脚本编辑器</p>
      </div>
      <div class="header-right">
        <button class="btn btn-primary" @click="createScript">
          <span>+</span> 新建脚本
        </button>
      </div>
    </div>
    <div class="file-input">
      <input type="text" v-model="filePath" placeholder="选择文件..." />
      <button class="btn btn-primary" @click="selectFile">选择文件</button>
    </div>
    <div class="empty-state">
      <div class="empty-icon">📝</div>
      <h3>脚本编辑器</h3>
      <p>编写和编辑自动化脚本</p>
      <button class="btn btn-primary" @click="createScript">创建第一个脚本</button>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'Scripts',
  data() {
    return {
      filePath: ''
    };
  },
  methods: {
    createScript() {
      alert('创建新脚本');
    },
    selectFile() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.xml'; // 限制文件类型为 XML
  input.onchange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const xmlContent = reader.result; // 获取 XML 文件内容
        this.parseXML(xmlContent); // 调用解析方法
      };
      reader.readAsText(file); // 以文本形式读取文件内容
    }
  };
  input.click();
},
parseXML(xmlContent) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlContent, 'application/xml');
  console.log(xmlDoc); // 输出解析后的 XML DOM 对象
  // 在这里操作 XML 数据，例如获取某些节点的值
  const exampleNode = xmlDoc.getElementsByTagName('example')[0];
  if (exampleNode) {
    console.log('Example Node Value:', exampleNode.textContent);
  }
}
  }
};
</script>

<style scoped>
.view-scripts {
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

.file-input {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 16px 0;
}

.file-input input {
  flex: 1;
  padding: 8px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
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
