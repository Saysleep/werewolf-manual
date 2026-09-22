<template>
  <div class="content" v-if="v">
    <RouterLink to="/variants" class="back">← 返回版型大全</RouterLink>

    <div class="head">
      <div class="kicker">{{ v.en }}</div>
      <h1 class="page-title">{{ v.name }}</h1>
      <div class="meta">
        <span class="meta-item"><em>{{ v.players }}</em> 名玩家</span>
        <span class="meta-item">难度 <span class="dots"><i v-for="n in 5" :key="n" :class="{ on: n <= v.difficulty }"></i></span></span>
        <span v-for="t in v.tags" :key="t" class="tag">{{ t }}</span>
      </div>
      <p class="page-lede">{{ v.summary }}</p>
    </div>

    <!-- 阵营配置 -->
    <section class="config">
      <div v-for="group in configByCamp" :key="group.camp" class="camp-block" :style="{ '--cc': camps[group.camp].color }">
        <div class="camp-name">{{ camps[group.camp].name }}<span>{{ group.total }} 人</span></div>
        <div class="camp-roles">
          <div v-for="c in group.items" :key="c.role" class="role-pill">
            <RoleIcon :name="roleMap[c.role].icon" :size="20" />
            <b>{{ roleMap[c.role].name }}</b>
            <i>×{{ c.count }}</i>
          </div>
        </div>
      </div>
    </section>

    <!-- 夜间流程 -->
    <section v-if="v.nightFlow && v.nightFlow.length" class="night-sec">
      <h2 class="sub-title">夜间流程</h2>
      <div class="night-chart">
        <div v-for="(step, i) in v.nightFlow" :key="i" class="nc-step">
          <div class="nc-idx">{{ i + 1 }}</div>
          <div v-if="i < v.nightFlow.length - 1" class="nc-line"></div>
          <div class="nc-name">{{ step }}</div>
        </div>
      </div>
      <p class="night-note">夜晚环节由法官依次唤醒，顺序以当场法官宣告为准；标注「首夜」「次夜起」的环节按标注执行。</p>
    </section>

    <!-- 选项卡：规则 / 玩法 -->
    <div class="tabs">
      <button class="tab" :class="{ on: tab === 'rules' }" @click="tab = 'rules'">版型规则</button>
      <button class="tab" :class="{ on: tab === 'guide' }" @click="tab = 'guide'">查看版型玩法</button>
      <span class="tab-line" :style="{ transform: tab === 'rules' ? 'translateX(0)' : 'translateX(100%)' }"></span>
    </div>

    <Transition name="fade" mode="out-in">
      <!-- 规则 -->
      <section v-if="tab === 'rules'" key="rules" class="tab-body">
        <h2 class="sub-title">特殊规则</h2>
        <ul class="rule-list">
          <li v-for="r in v.rules" :key="r">{{ r }}</li>
        </ul>
      </section>

      <!-- 玩法攻略 -->
      <section v-else key="guide" class="tab-body">
        <div v-for="g in v.guide" :key="g.title" class="guide-block">
          <h2 class="sub-title">{{ g.title }}</h2>
          <div class="guide-points">
            <div v-for="(p, i) in g.points" :key="i" class="gp">
              <span class="gp-idx">{{ String(i + 1).padStart(2, '0') }}</span>
              <p>{{ p }}</p>
            </div>
          </div>
        </div>
      </section>
    </Transition>

    <hr class="rule-hr" />

    <!-- 上下版型导航 -->
    <nav class="prev-next">
      <RouterLink v-if="prev" :to="`/variants/${prev.id}`" class="pn card">
        <span class="pn-dir">← 上一个</span>
        <b>{{ prev.name }}</b>
      </RouterLink>
      <span v-else></span>
      <RouterLink v-if="next" :to="`/variants/${next.id}`" class="pn card right">
        <span class="pn-dir">下一个 →</span>
        <b>{{ next.name }}</b>
      </RouterLink>
    </nav>
  </div>

  <div class="content" v-else>
    <h1 class="page-title">版型不存在</h1>
    <p class="page-lede">这个板子不在手册里，<RouterLink to="/variants" style="color: var(--moon-bright)">回到版型大全</RouterLink>看看？</p>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { variants, variantMap } from '../data/variants'
import { roleMap, camps } from '../data/roles'
import RoleIcon from '../components/RoleIcon.vue'

const route = useRoute()
const tab = ref('rules')

const v = computed(() => variantMap[route.params.id])
const idx = computed(() => variants.findIndex((x) => x.id === route.params.id))
const prev = computed(() => (idx.value > 0 ? variants[idx.value - 1] : null))
const next = computed(() => (idx.value < variants.length - 1 ? variants[idx.value + 1] : null))

const campOrder = ['wolf', 'god', 'folk', 'third']
const configByCamp = computed(() => {
  if (!v.value) return []
  return campOrder
    .map((camp) => {
      const items = v.value.config.filter((c) => roleMap[c.role].camp === camp)
      return { camp, items, total: items.reduce((s, c) => s + c.count, 0) }
    })
    .filter((g) => g.items.length)
})

watch(() => route.params.id, () => { tab.value = 'rules' })
</script>

<style scoped>
.back { font-size: 13px; color: var(--ink-40); transition: color 0.2s; }
.back:hover { color: var(--ink); }

.head { margin-top: 28px; }
.meta { display: flex; align-items: center; gap: 18px; flex-wrap: wrap; margin-top: 20px; }
.meta-item { font-size: 13.5px; color: var(--ink-60); display: inline-flex; align-items: center; gap: 8px; }
.meta-item em { font-family: var(--latin); font-style: normal; font-size: 20px; font-weight: 700; color: var(--moon-bright); }

/* 阵营配置 */
.config { margin-top: 40px; display: flex; flex-direction: column; gap: 14px; }
.camp-block {
  border: 1px solid var(--hairline);
  border-left: 3px solid var(--cc);
  border-radius: 12px;
  background: var(--bg-soft);
  padding: 18px 22px;
  display: grid;
  grid-template-columns: 130px 1fr;
  gap: 18px;
  align-items: center;
}
.camp-name { font-family: var(--serif); font-weight: 700; font-size: 15.5px; color: var(--cc); letter-spacing: 0.05em; }
.camp-name span { display: block; font-family: var(--latin); font-size: 11px; color: var(--ink-40); font-weight: 400; margin-top: 2px; letter-spacing: 0.1em; }
.camp-roles { display: flex; gap: 10px; flex-wrap: wrap; }
.role-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 10px;
  background: var(--ink-07);
  color: var(--cc);
  font-size: 13.5px;
}
.role-pill b { color: var(--ink); font-weight: 500; }
.role-pill i { font-family: var(--latin); font-style: normal; font-size: 12px; color: var(--ink-40); }

/* 选项卡 */
.tabs {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 52px;
  border-bottom: 1px solid var(--hairline);
}
.tab {
  padding: 16px 0;
  background: none;
  border: none;
  color: var(--ink-40);
  font-size: 15px;
  font-family: var(--serif);
  font-weight: 700;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: color 0.2s;
}
.tab.on { color: var(--ink); }
.tab-line {
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 50%;
  height: 2px;
  background: var(--moon);
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.tab-body { padding-top: 36px; }
.sub-title { font-family: var(--serif); font-size: 19px; font-weight: 700; letter-spacing: 0.05em; }

.rule-list { margin-top: 18px; display: flex; flex-direction: column; }
.rule-list li {
  list-style: none;
  padding: 14px 0 14px 26px;
  border-top: 1px solid var(--hairline);
  font-size: 14.5px;
  color: var(--ink-60);
  position: relative;
}
.rule-list li:last-child { border-bottom: 1px solid var(--hairline); }
.rule-list li::before {
  content: '';
  position: absolute;
  left: 4px;
  top: 22px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--moon);
}

.night-chart { margin-top: 20px; display: flex; flex-direction: column; }
.nc-step {
  position: relative;
  display: grid;
  grid-template-columns: 28px 1fr;
  gap: 16px;
  padding-bottom: 16px;
}
.nc-step:last-child { padding-bottom: 0; }
.nc-idx {
  width: 28px; height: 28px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, var(--moon-bright), var(--moon));
  color: #0a0a12;
  font-family: var(--latin);
  font-size: 12.5px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 12px rgba(110, 123, 255, 0.35);
}
.nc-line {
  position: absolute;
  left: 14px;
  top: 28px;
  bottom: 0;
  width: 1px;
  background: linear-gradient(rgba(110, 123, 255, 0.55), rgba(110, 123, 255, 0.08));
}
.nc-name { font-size: 14.5px; line-height: 28px; color: var(--ink); }

.night-sec { margin-top: 44px; }
.night-note { margin-top: 14px; font-size: 12.5px; color: var(--ink-40); }

/* 攻略 */
.guide-block + .guide-block { margin-top: 44px; }
.guide-points { margin-top: 16px; }
.gp { display: grid; grid-template-columns: 44px 1fr; gap: 16px; padding: 14px 0; border-top: 1px solid var(--hairline); align-items: baseline; }
.gp:last-child { border-bottom: 1px solid var(--hairline); }
.gp-idx { font-family: var(--latin); font-size: 11px; letter-spacing: 0.15em; color: var(--moon-bright); }
.gp p { font-size: 14.5px; color: var(--ink-60); }

/* 上下导航 */
.prev-next { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.pn { padding: 20px 24px; }
.pn.right { text-align: right; }
.pn.right::after { left: auto; right: 24px; transform-origin: right; }
.pn-dir { display: block; font-size: 12px; color: var(--ink-40); margin-bottom: 6px; }
.pn b { font-family: var(--serif); font-size: 17px; letter-spacing: 0.04em; }

@media (max-width: 720px) {
  .camp-block { grid-template-columns: 1fr; gap: 12px; }
  .prev-next { grid-template-columns: 1fr; }
  .pn.right { text-align: left; }
}
</style>
