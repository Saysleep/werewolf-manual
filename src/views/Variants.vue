<template>
  <div class="content">
    <div class="kicker">VARIANT ARCHIVE</div>
    <h1 class="page-title">版型大全</h1>
    <p class="page-lede">
      这里收录的均为 12 人标准局：以京城大师赛官方版型为主体，辅以最经典的基础板子。
      点击任意板子，查看完整配置、规则细节与各阵营的玩法攻略。
    </p>

    <div class="filters">
      <div class="filter-group">
        <span class="fg-label">类型</span>
        <button
          v-for="t in tagFilters"
          :key="t"
          class="filter-btn"
          :class="{ on: activeTag === t }"
          @click="activeTag = t"
        >{{ t }}</button>
      </div>
    </div>

    <div class="vlist">
      <RouterLink
        v-for="(v, i) in filtered"
        :key="v.id"
        :to="`/variants/${v.id}`"
        class="card vrow"
      >
        <div class="vrow-idx">{{ String(i + 1).padStart(2, '0') }}</div>
        <div class="vrow-main">
          <div class="vrow-head">
            <h3>{{ v.name }}</h3>
            <span class="vrow-en">{{ v.en }}</span>
          </div>
          <p>{{ v.summary }}</p>
          <div class="vrow-roles">
            <span
              v-for="c in v.config"
              :key="c.role"
              class="chip"
            >
              <i class="dot" :style="{ background: camps[roleMap[c.role].camp].color }"></i>
              {{ roleMap[c.role].name }} ×{{ c.count }}
            </span>
          </div>
        </div>
        <div class="vrow-side">
          <span class="players">{{ v.players }} 人</span>
          <span class="dots" title="难度"><i v-for="n in 5" :key="n" :class="{ on: n <= v.difficulty }"></i></span>
          <div class="vrow-tags"><span v-for="t in v.tags" :key="t" class="tag">{{ t }}</span></div>
        </div>
      </RouterLink>
    </div>

    <p v-if="!filtered.length" class="empty">没有符合条件的版型，换个筛选试试。</p>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { variants } from '../data/variants'
import { roleMap, camps } from '../data/roles'

const activeTag = ref('全部')

const tagFilters = ['全部', '大师赛官方', '经典', '新手入门', '功能狼', '守卫', '第三方', '特殊机制']

const filtered = computed(() =>
  variants.filter((v) => {
    if (activeTag.value === '全部') return true
    return v.tags.includes(activeTag.value)
  })
)
</script>

<style scoped>
.filters { margin-top: 40px; display: flex; flex-direction: column; gap: 14px; }
.filter-group { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.fg-label {
  font-family: var(--latin);
  font-size: 10.5px;
  letter-spacing: 0.25em;
  color: var(--ink-40);
  text-transform: uppercase;
  width: 44px;
}
.filter-btn {
  height: 32px;
  padding: 0 16px;
  border-radius: 999px;
  border: 1px solid var(--ink-14);
  background: transparent;
  color: var(--ink-60);
  font-size: 13px;
  font-family: var(--sans);
  cursor: pointer;
  transition: all 0.2s;
}
.filter-btn:hover { color: var(--ink); }
.filter-btn.on { color: var(--ink); border-color: var(--moon); background: var(--moon-dim); }

.vlist { margin-top: 36px; display: flex; flex-direction: column; gap: 16px; }

.vrow {
  display: grid;
  grid-template-columns: 48px 1fr 200px;
  gap: 24px;
  align-items: start;
}
.vrow-idx {
  font-family: var(--latin);
  font-size: 13px;
  letter-spacing: 0.15em;
  color: var(--ink-40);
  padding-top: 4px;
}
.vrow-head { display: flex; align-items: baseline; gap: 14px; flex-wrap: wrap; }
.vrow h3 { font-family: var(--serif); font-size: 21px; font-weight: 700; letter-spacing: 0.03em; }
.vrow-en { font-family: var(--latin); font-size: 10px; letter-spacing: 0.2em; color: var(--ink-40); text-transform: uppercase; }
.vrow p { margin-top: 6px; font-size: 13.5px; color: var(--ink-60); }
.vrow-roles { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 14px; }
.vrow-side { display: flex; flex-direction: column; align-items: flex-end; gap: 10px; }
.players { font-family: var(--latin); font-size: 11px; letter-spacing: 0.22em; color: var(--moon-bright); }
.vrow-tags { display: flex; gap: 6px; flex-wrap: wrap; justify-content: flex-end; }

.empty { margin-top: 48px; color: var(--ink-40); text-align: center; }

@media (max-width: 720px) {
  .vrow { grid-template-columns: 1fr; gap: 12px; }
  .vrow-side { align-items: flex-start; }
  .vrow-tags { justify-content: flex-start; }
}
</style>
