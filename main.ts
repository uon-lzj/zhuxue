import './assets/main.css'
import './zhuxue/styles/main.scss'  // 助学平台样式
import './zhusai/styles/main.scss'  // 竞赛平台样式

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'  // 全量图标注册
import 'element-plus/dist/index.css'
import './zhusai/buct/styles/main.scss'  // 北化校内赛统一设计规范
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// 注册所有图标（助学平台需要）
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus, {
  locale: zhCn,
})
app.use(createPinia())
app.use(router)

app.mount('#app')
