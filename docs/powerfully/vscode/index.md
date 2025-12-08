<script setup>
import MyDataTable from './components/MyDataTable.vue'
import { tsTable, editTable } from './data.ts'


</script>

# Visual Studio Code 配置

## 插件

### 编辑器 相关

<MyDataTable v-bind='editTable' />

### TypeScript 相关

<MyDataTable v-bind='tsTable' />
