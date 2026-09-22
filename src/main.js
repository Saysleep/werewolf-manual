import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import Home from './views/Home.vue'
import Rules from './views/Rules.vue'
import Roles from './views/Roles.vue'
import Variants from './views/Variants.vue'
import VariantDetail from './views/VariantDetail.vue'
import './style.css'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/rules', component: Rules },
    { path: '/roles', component: Roles },
    { path: '/variants', component: Variants },
    { path: '/variants/:id', component: VariantDetail },
  ],
  scrollBehavior: () => ({ top: 0 }),
})

createApp(App).use(router).mount('#app')
