<template>
  <div class="progress" :style="{ width: progress + '%' }"></div>

  <!-- 移动端顶栏 -->
  <header class="topbar">
    <RouterLink to="/" class="mark">狼人杀图鉴</RouterLink>
    <nav>
      <RouterLink to="/">首页</RouterLink>
      <RouterLink to="/rules">规则</RouterLink>
      <RouterLink to="/roles">角色</RouterLink>
      <RouterLink to="/variants">版型</RouterLink>
    </nav>
  </header>

  <div class="shell">
    <aside class="sidebar">
      <RouterLink to="/" class="brand">
        <div class="mark">狼人杀图鉴</div>
        <div class="sub">WEREWOLF MANUAL</div>
      </RouterLink>

      <nav class="nav">
        <div class="nav-label">目录 / INDEX</div>
        <RouterLink to="/" exact-active-class="active">
          <span class="idx">01</span>入夜 · 首页
        </RouterLink>
        <RouterLink to="/rules" active-class="active">
          <span class="idx">02</span>规则 · 流程与胜负
        </RouterLink>
        <RouterLink to="/roles" active-class="active">
          <span class="idx">03</span>角色 · 图鉴速查
        </RouterLink>
        <RouterLink to="/variants" active-class="active">
          <span class="idx">04</span>版型 · 板子图鉴
        </RouterLink>
      </nav>

      <div class="foot">
        <div><span class="moon-mini"></span>天黑请闭眼</div>
        <div style="margin-top: 6px">狼人杀规则与版型手册 · 静态站点</div>
      </div>
    </aside>

    <main class="main">
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const progress = ref(0)
const onScroll = () => {
  const h = document.documentElement
  const max = h.scrollHeight - h.clientHeight
  progress.value = max > 0 ? (h.scrollTop / max) * 100 : 0
}
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>
