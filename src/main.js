import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import Home from './views/Home.vue'
import Rules from './views/Rules.vue'
import Roles from './views/Roles.vue'
import Variants from './views/Variants.vue'
import VariantDetail from './views/VariantDetail.vue'
// 模拟对局暂时下线（首页入口与路由一并注释，代码保留）
// import Simulator from './views/Simulator.vue'
import { variantMap, initContent } from './data/content'
import './style.css'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/rules', component: Rules },
    { path: '/roles', component: Roles },
    { path: '/variants', component: Variants },
    { path: '/variants/:id', component: VariantDetail },
    // { path: '/simulator', component: Simulator }, // 模拟对局暂时下线，代码保留
  ],
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  if (to.path === '/') document.title = '狼人杀图鉴 · 规则与版型手册'
  else if (to.path === '/rules') document.title = '基础规则 · 狼人杀图鉴'
  else if (to.path === '/roles') document.title = '角色图鉴 · 狼人杀图鉴'
  else if (to.path === '/variants') document.title = '版型大全 · 狼人杀图鉴'
  else if (to.path.startsWith('/variants/')) {
    const v = variantMap[to.params.id]
    document.title = v ? `${v.name} · 版型大全 · 狼人杀图鉴` : '版型大全 · 狼人杀图鉴'
  }
})

// 先拉取角色与版型数据（后端 DB 可直改），失败或超时则使用内置兜底数据，再挂载应用
initContent().finally(() => createApp(App).use(router).mount('#app'))
