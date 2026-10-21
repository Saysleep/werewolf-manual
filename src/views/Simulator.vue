<template>
  <div class="content sim">
    <!-- 顶部 -->
    <header class="sim-head">
      <div>
        <div class="kicker">SIMULATED MATCH</div>
        <h1 class="page-title sim-title">预女猎白 · 模拟对局</h1>
      </div>
      <div class="sim-head-right">
        <label class="god-toggle" :class="{ on: godView }">
          <span class="gt-track"><span class="gt-thumb"></span></span>
          <input type="checkbox" v-model="godView" />
          上帝视角
        </label>
        <RouterLink to="/" class="back-link">← 返回首页</RouterLink>
      </div>
    </header>

    <!-- 阶段横幅 -->
    <div class="phase-banner" :class="step.phase">
      <RoleIcon :name="step.phase === 'night' ? 'moon' : step.phase === 'day' ? 'sun' : 'crystal'" :size="18" />
      <span>{{ bannerLabel }}</span>
    </div>

    <!-- 圆桌 -->
    <div class="table-wrap">
      <div class="table">
        <div
          v-for="p in simPlayers"
          :key="p.seat"
          class="seat"
          :class="{
            dead: isDead(p.seat),
            hi: isHi(p.seat),
            flipped: p.role === 'idiot' && step.state.idiotFlipped && !isDead(p.seat),
          }"
          :style="seatStyle(p.seat)"
        >
          <div class="seat-circle" :style="circleStyle(p)">
            <template v-if="isDead(p.seat)">
              <span class="seat-cross">✕</span>
            </template>
            <template v-else-if="showRole(p.seat)">
              <RoleIcon :name="iconOf(p)" :size="20" />
            </template>
            <template v-else>
              <span class="seat-q">?</span>
            </template>
            <span class="seat-no">{{ p.seat }}</span>
          </div>
          <span v-if="step.state.sheriff === p.seat" class="badge sheriff-badge">警</span>
          <span v-if="p.role === 'idiot' && step.state.idiotFlipped && !isDead(p.seat)" class="badge idiot-badge">免</span>
          <span v-if="showRole(p.seat)" class="seat-name" :style="{ color: nameColor(p) }">{{ nameOf(p) }}</span>
        </div>
        <div class="table-center">
          <b>{{ aliveCount }}</b>
          <span>存活</span>
        </div>
      </div>
    </div>

    <!-- 解说栏 -->
    <div class="narration" :key="idx">
      <div class="narration-top">
        <h3>{{ step.title }}</h3>
        <div class="potions">
          <span class="potion" :class="{ used: step.state.saveUsed }">
            <RoleIcon name="potion" :size="13" />解药 · {{ step.state.saveUsed ? '已用' : '未用' }}
          </span>
          <span class="potion poison" :class="{ used: step.state.poisonUsed }">
            <RoleIcon name="drop" :size="13" />毒药 · {{ step.state.poisonUsed ? '已用' : '未用' }}
          </span>
        </div>
      </div>
      <p>{{ step.text }}</p>
    </div>

    <!-- 控制条 -->
    <div class="controls">
      <div class="ctrl-btns">
        <button class="ctrl-btn" :disabled="idx === 0" @click="prev">← 上一步</button>
        <button class="ctrl-btn primary" @click="togglePlay">{{ playing ? '⏸ 暂停' : '▶ 播放' }}</button>
        <button class="ctrl-btn" :disabled="idx === simSteps.length - 1" @click="next">下一步 →</button>
        <span class="progress-text">第 {{ idx + 1 }} / {{ simSteps.length }} 步</span>
      </div>
      <div class="progress-segs">
        <button
          v-for="(s, i) in simSteps"
          :key="i"
          class="seg"
          :class="[s.phase, { done: i < idx, cur: i === idx }]"
          :title="`${i + 1}. ${s.title}`"
          @click="jump(i)"
        ></button>
      </div>
    </div>

    <!-- 版型配置（可折叠） -->
    <details class="config">
      <summary>版型配置 · 预女猎白（12 人）</summary>
      <div class="config-list">
        <div v-for="c in configList" :key="c.name" class="config-item" :style="{ '--camp': campColor(c.camp) }">
          <span class="ci-bar"></span>
          <b>{{ c.name }}</b>
          <span class="ci-count">× {{ c.count }}</span>
        </div>
      </div>
      <p class="config-note">屠边制：狼人杀光全部神职或全部平民获胜；好人放逐全部狼人获胜。女巫全程不可自救，双药各限一次、同一夜只能用一瓶；猎人被毒杀无法开枪；白痴被放逐时翻牌免死、此后失去投票权。</p>
    </details>
  </div>
</template>

<script setup>
import { computed, onUnmounted, ref } from 'vue'
import RoleIcon from '../components/RoleIcon.vue'
import { simSteps, simPlayers } from '../data/sim-yunvliebai'
import { camps } from '../data/roles'
import { variantMap, roleMap } from '../data/content'

const idx = ref(0)
const godView = ref(false)
const playing = ref(false)
let timer = null

const step = computed(() => simSteps[idx.value])

const isDead = (seat) => step.value.state.dead.includes(seat)
const isHi = (seat) => step.value.hi.includes(seat)
const showRole = (seat) => godView.value || !!step.value.state.reveal[seat]

const campOf = (p) => step.value.state.reveal[p.seat] || p.camp
const campColor = (camp) => (camps[camp] ? camps[camp].color : camps.folk.color)
const iconOf = (p) => (roleMap[p.role] && roleMap[p.role].icon) || p.icon
const nameOf = (p) => (roleMap[p.role] && roleMap[p.role].name) || p.name
const nameColor = (p) => campColor(campOf(p))

function circleStyle(p) {
  if (showRole(p.seat)) {
    const c = campColor(campOf(p))
    return { borderColor: c, color: c, boxShadow: isHi(p.seat) ? `0 0 18px ${c}` : 'none' }
  }
  return {}
}

// 圆桌椭圆定位
function seatStyle(seat) {
  const angle = ((seat - 1) / 12) * Math.PI * 2 - Math.PI / 2
  const x = 50 + 40 * Math.cos(angle)
  const y = 50 + 37 * Math.sin(angle)
  return { left: `${x}%`, top: `${y}%` }
}

const aliveCount = computed(() => 12 - step.value.state.dead.length)

// 阶段计数：phase 块切换时 +1
const phaseCount = computed(() => {
  let n = 0
  let d = 0
  for (let i = 0; i <= idx.value; i++) {
    const p = simSteps[i].phase
    const prev = i > 0 ? simSteps[i - 1].phase : null
    if (p === 'night' && prev !== 'night') n++
    if (p === 'day' && prev !== 'day') d++
  }
  return { n, d }
})

const bannerLabel = computed(() => {
  const { n, d } = phaseCount.value
  if (step.value.phase === 'night') return `第 ${n} 夜`
  if (step.value.phase === 'day') return `第 ${d} 天`
  if (step.value.phase === 'end') return '终局 · 复盘'
  return '开局 · 版型介绍'
})

// 版型配置：优先读 content.js 的 variantMap（后端可直改），读不到用 simPlayers 兜底
const configList = computed(() => {
  const v = variantMap['twelve-yunvliebai']
  if (v && Array.isArray(v.config) && v.config.length) {
    return v.config.map((c) => ({
      name: (roleMap[c.role] && roleMap[c.role].name) || c.role,
      count: c.count,
      camp: (roleMap[c.role] && roleMap[c.role].camp) || 'folk',
    }))
  }
  const m = {}
  for (const p of simPlayers) {
    if (!m[p.role]) m[p.role] = { name: p.name, count: 0, camp: p.camp }
    m[p.role].count++
  }
  return Object.values(m)
})

function stopPlay() {
  playing.value = false
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

function togglePlay() {
  if (playing.value) {
    stopPlay()
    return
  }
  if (idx.value >= simSteps.length - 1) idx.value = 0
  playing.value = true
  timer = setInterval(() => {
    if (idx.value >= simSteps.length - 1) stopPlay()
    else idx.value++
  }, 2500)
}

function prev() {
  stopPlay()
  if (idx.value > 0) idx.value--
}
function next() {
  stopPlay()
  if (idx.value < simSteps.length - 1) idx.value++
}
function jump(i) {
  stopPlay()
  idx.value = i
}

onUnmounted(stopPlay)
</script>

<style scoped>
.sim { padding-bottom: 96px; }

/* 顶部 */
.sim-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 24px;
  flex-wrap: wrap;
}
.sim-title { font-size: clamp(30px, 4vw, 48px); }
.sim-head-right { display: flex; align-items: center; gap: 22px; }
.back-link { font-size: 13.5px; color: var(--ink-40); transition: color 0.2s; }
.back-link:hover { color: var(--ink); }

.god-toggle {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 13.5px;
  color: var(--ink-60);
  cursor: pointer;
  user-select: none;
}
.god-toggle input { display: none; }
.gt-track {
  width: 38px;
  height: 21px;
  border-radius: 999px;
  border: 1px solid var(--ink-14);
  background: var(--ink-07);
  display: inline-flex;
  align-items: center;
  padding: 2px;
  transition: background 0.25s, border-color 0.25s;
}
.gt-thumb {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: var(--ink-40);
  transition: transform 0.25s, background 0.25s;
}
.god-toggle.on { color: var(--moon-bright); }
.god-toggle.on .gt-track { background: var(--moon-dim); border-color: var(--moon); }
.god-toggle.on .gt-thumb { transform: translateX(16px); background: var(--moon-bright); }

/* 阶段横幅 */
.phase-banner {
  margin-top: 32px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  border-radius: 10px;
  border: 1px solid var(--hairline);
  font-family: var(--serif);
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.12em;
}
.phase-banner.night {
  background: linear-gradient(120deg, #101226, #0a0b18);
  border-color: rgba(110, 123, 255, 0.35);
  color: var(--moon-bright);
}
.phase-banner.day {
  background: linear-gradient(120deg, #1c1a12, #12110c);
  border-color: rgba(255, 200, 87, 0.35);
  color: var(--third);
}
.phase-banner.intro,
.phase-banner.end { background: var(--bg-soft); color: var(--ink-60); }

/* 圆桌 */
.table-wrap { margin-top: 36px; display: flex; justify-content: center; }
.table {
  position: relative;
  width: min(540px, 94vw);
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(circle at 50% 42%, rgba(110, 123, 255, 0.07), transparent 62%),
    var(--bg-soft);
  border: 1px dashed var(--ink-14);
}
.table-center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: var(--ink-40);
}
.table-center b {
  display: block;
  font-family: var(--latin);
  font-size: 34px;
  color: var(--moon-bright);
  line-height: 1.1;
}
.table-center span { font-size: 11.5px; letter-spacing: 0.3em; }

.seat {
  position: absolute;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  transition: opacity 0.3s;
}
.seat-circle {
  position: relative;
  width: clamp(40px, 9.5vw, 54px);
  aspect-ratio: 1;
  border-radius: 50%;
  border: 1.5px solid var(--ink-14);
  background: var(--bg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--ink-40);
  transition: border-color 0.3s, color 0.3s, box-shadow 0.3s, filter 0.3s;
}
.seat.hi .seat-circle { border-width: 2px; }
.seat-no {
  position: absolute;
  bottom: -7px;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--latin);
  font-size: 10px;
  line-height: 1;
  padding: 2px 6px;
  border-radius: 999px;
  background: var(--bg-soft);
  border: 1px solid var(--hairline);
  color: var(--ink-60);
}
.seat-q { font-family: var(--latin); font-size: 16px; color: var(--ink-40); }
.seat-cross { font-size: 18px; color: var(--ink-40); }
.seat.dead .seat-circle { filter: grayscale(1) brightness(0.55); border-style: dashed; }
.seat.dead { opacity: 0.75; }
.seat-name { font-size: 11px; letter-spacing: 0.06em; white-space: nowrap; }

.badge {
  position: absolute;
  top: -7px;
  right: -7px;
  width: 19px;
  height: 19px;
  border-radius: 50%;
  font-size: 10.5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  z-index: 2;
}
.sheriff-badge { background: var(--third); color: #14120a; box-shadow: 0 0 10px rgba(255, 200, 87, 0.5); }
.idiot-badge { background: var(--moon); color: #0a0a12; }

/* 解说栏 */
.narration {
  margin-top: 36px;
  padding: 24px 26px;
  background: var(--bg-soft);
  border: 1px solid var(--hairline);
  border-left: 3px solid var(--moon);
  border-radius: 12px;
  animation: narr-in 0.3s ease;
}
@keyframes narr-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: none; }
}
.narration-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}
.narration h3 { font-family: var(--serif); font-size: 19px; letter-spacing: 0.04em; }
.narration p { margin-top: 10px; font-size: 14.5px; color: var(--ink-60); line-height: 1.9; }

.potions { display: flex; gap: 8px; }
.potion {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 26px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid var(--ink-14);
  font-size: 12px;
  color: var(--ink-60);
  white-space: nowrap;
}
.potion.used { border-color: rgba(255, 98, 77, 0.45); color: var(--wolf); }
.potion.poison.used { border-color: rgba(110, 123, 255, 0.5); color: var(--moon-bright); }

/* 控制条 */
.controls { margin-top: 26px; }
.ctrl-btns { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.ctrl-btn {
  height: 40px;
  padding: 0 20px;
  border-radius: 999px;
  border: 1px solid var(--ink-14);
  background: transparent;
  color: var(--ink-60);
  font-size: 13.5px;
  font-family: var(--sans);
  cursor: pointer;
  transition: all 0.2s;
}
.ctrl-btn:hover:not(:disabled) { border-color: var(--moon); color: var(--ink); }
.ctrl-btn:disabled { opacity: 0.35; cursor: not-allowed; }
.ctrl-btn.primary { background: var(--moon); border-color: var(--moon); color: #0a0a12; font-weight: 600; }
.ctrl-btn.primary:hover { background: var(--moon-bright); color: #0a0a12; }
.progress-text {
  margin-left: auto;
  font-family: var(--latin);
  font-size: 12.5px;
  letter-spacing: 0.12em;
  color: var(--ink-40);
}

.progress-segs { margin-top: 16px; display: flex; gap: 4px; }
.seg {
  flex: 1;
  height: 8px;
  border: none;
  border-radius: 4px;
  background: var(--ink-07);
  cursor: pointer;
  padding: 0;
  transition: background 0.2s, transform 0.15s;
}
.seg:hover { transform: scaleY(1.5); }
.seg.night.done, .seg.night.cur { background: var(--moon); }
.seg.day.done, .seg.day.cur { background: var(--third); }
.seg.intro.done, .seg.intro.cur, .seg.end.done, .seg.end.cur { background: var(--ink-40); }
.seg.cur { box-shadow: 0 0 8px rgba(230, 227, 218, 0.35); }

/* 版型配置 */
.config {
  margin-top: 36px;
  border: 1px solid var(--hairline);
  border-radius: 12px;
  background: var(--bg-soft);
  padding: 18px 22px;
}
.config summary {
  cursor: pointer;
  font-family: var(--serif);
  font-size: 15.5px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--ink-60);
  list-style: none;
}
.config summary::before { content: '▸ '; color: var(--moon-bright); }
.config[open] summary::before { content: '▾ '; }
.config-list {
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 10px;
}
.config-item {
  position: relative;
  display: flex;
  align-items: baseline;
  gap: 8px;
  padding: 10px 14px;
  border: 1px solid var(--hairline);
  border-radius: 8px;
  background: var(--bg);
  overflow: hidden;
}
.ci-bar { position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: var(--camp); opacity: 0.85; }
.config-item b { font-size: 14px; color: var(--camp); }
.ci-count { font-family: var(--latin); font-size: 12px; color: var(--ink-40); margin-left: auto; }
.config-note { margin-top: 14px; font-size: 12.5px; color: var(--ink-40); line-height: 1.8; }

@media (max-width: 640px) {
  .sim-head { align-items: flex-start; flex-direction: column; }
  .progress-text { margin-left: 0; width: 100%; }
  .narration { padding: 18px; }
}
</style>
