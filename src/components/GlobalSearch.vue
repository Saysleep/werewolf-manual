<template>
  <Teleport to="body">
    <div v-if="open" class="search-mask" @click.self="close">
      <div class="search-panel" role="dialog" aria-modal="true">
        <div class="search-head">
          <span class="search-ico">⌕</span>
          <input
            ref="inputEl"
            v-model="query"
            class="search-input"
            type="text"
            placeholder="搜索版型、角色、术语…"
            @keydown="onKeydown"
          />
          <button class="search-esc" @click="close">Esc</button>
        </div>

        <div class="search-body">
          <p v-if="!normalizedQuery" class="search-hint">输入以搜索版型、角色、术语</p>
          <p v-else-if="!flat.length" class="search-hint">未找到相关结果</p>
          <template v-else>
            <div v-for="g in groups" :key="g.key" class="sr-group">
              <div class="sr-label">{{ g.name }}</div>
              <div
                v-for="item in g.items"
                :key="g.key + '-' + item.name"
                class="sr-item"
                :class="{ on: item.fi === active }"
                @click="go(item)"
                @mouseenter="active = item.fi"
              >
                <div class="sr-row">
                  <b>{{ item.name }}</b>
                  <span class="sr-type">{{ g.name }}</span>
                </div>
                <p class="sr-line">{{ item.line }}</p>
              </div>
            </div>
          </template>
        </div>

        <div class="search-foot">
          <span>↑↓ 选择</span><span>Enter 打开</span><span>Esc 关闭</span>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { variants } from '../data/variants'
import { roles, camps } from '../data/roles'
import { glossary } from '../data/glossary'

const open = ref(false)
const query = ref('')
const active = ref(-1)
const inputEl = ref(null)

const route = useRoute()
const router = useRouter()

const normalizedQuery = computed(() => query.value.replace(/\s+/g, '').toLowerCase())

const matched = computed(() => {
  const q = normalizedQuery.value
  if (!q) return { variant: [], role: [], term: [] }
  const vs = variants
    .filter((v) => `${v.name}${v.en}${v.tags.join('')}难度${v.difficulty}`.toLowerCase().includes(q))
    .slice(0, 6)
    .map((v) => ({
      type: 'variant',
      name: v.name,
      line: `${v.tags.join(' · ')} · 难度 ${v.difficulty}/5`,
      to: `/variants/${v.id}`,
    }))
  const rs = roles
    .filter((r) => `${r.name}${r.en}${camps[r.camp].name}${r.skill}`.toLowerCase().includes(q))
    .slice(0, 8)
    .map((r) => ({ type: 'role', name: r.name, line: camps[r.camp].name, to: `/roles?q=${encodeURIComponent(r.name)}` }))
  const ts = glossary
    .map((g, i) => ({ g, i }))
    .filter(({ g }) => `${g.term}${g.def}`.toLowerCase().includes(q))
    .slice(0, 8)
    .map(({ g, i }) => ({
      type: 'term',
      name: g.term,
      line: g.def.length > 36 ? `${g.def.slice(0, 36)}…` : g.def,
      to: `/rules#term-${i}`,
    }))
  let fi = 0
  for (const arr of [vs, rs, ts]) for (const it of arr) it.fi = fi++
  return { variant: vs, role: rs, term: ts }
})

const groups = computed(() =>
  [
    { key: 'variant', name: '版型', items: matched.value.variant },
    { key: 'role', name: '角色', items: matched.value.role },
    { key: 'term', name: '术语', items: matched.value.term },
  ].filter((g) => g.items.length)
)

const flat = computed(() => groups.value.flatMap((g) => g.items))

const openSearch = () => {
  open.value = true
  query.value = ''
  active.value = -1
  nextTick(() => inputEl.value && inputEl.value.focus())
}
const close = () => { open.value = false }

const go = (item) => {
  router.push(item.to)
  close()
}

const onKeydown = (e) => {
  const len = flat.value.length
  if (e.key === 'ArrowDown' && len) {
    e.preventDefault()
    active.value = (active.value + 1) % len
  } else if (e.key === 'ArrowUp' && len) {
    e.preventDefault()
    active.value = (active.value - 1 + len) % len
  } else if (e.key === 'Enter' && len) {
    e.preventDefault()
    go(flat.value[active.value >= 0 ? active.value : 0])
  }
}

const onGlobalKeydown = (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    open.value ? close() : openSearch()
  } else if (e.key === 'Escape' && open.value) {
    close()
  }
}

watch(open, (v) => { document.body.style.overflow = v ? 'hidden' : '' })
watch(() => route.fullPath, close)

onMounted(() => window.addEventListener('keydown', onGlobalKeydown))
onUnmounted(() => {
  window.removeEventListener('keydown', onGlobalKeydown)
  document.body.style.overflow = ''
})

defineExpose({ open: openSearch })
</script>

<style scoped>
.search-mask {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(4, 4, 9, 0.62);
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: center;
  padding: 14vh 20px 20px;
}
.search-panel {
  width: min(600px, 100%);
  max-height: 68vh;
  display: flex;
  flex-direction: column;
  background: var(--bg-soft);
  border: 1px solid var(--hairline);
  border-radius: 14px;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.55);
  overflow: hidden;
}
.search-head {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 4px 16px;
  border-bottom: 1px solid var(--hairline);
}
.search-ico { color: var(--moon-bright); font-size: 18px; }
.search-input {
  flex: 1;
  height: 48px;
  background: transparent;
  border: none;
  outline: none;
  color: var(--ink);
  font-size: 15px;
  font-family: var(--sans);
}
.search-input::placeholder { color: var(--ink-40); }
.search-esc {
  border: 1px solid var(--ink-14);
  border-radius: 6px;
  background: transparent;
  color: var(--ink-40);
  font-family: var(--latin);
  font-size: 10.5px;
  letter-spacing: 0.08em;
  padding: 2px 8px;
  cursor: pointer;
}
.search-body { overflow-y: auto; padding: 10px 10px 14px; }
.search-hint { padding: 28px 0; text-align: center; color: var(--ink-40); font-size: 13.5px; }
.sr-label {
  font-family: var(--latin);
  font-size: 10.5px;
  letter-spacing: 0.28em;
  color: var(--ink-40);
  text-transform: uppercase;
  padding: 12px 10px 6px;
}
.sr-item { padding: 9px 12px; border-radius: 8px; cursor: pointer; transition: background 0.15s; }
.sr-item.on { background: var(--moon-dim); }
.sr-row { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; }
.sr-row b { font-family: var(--serif); font-size: 14.5px; letter-spacing: 0.04em; font-weight: 700; }
.sr-type { font-size: 11px; color: var(--ink-40); flex-shrink: 0; }
.sr-line {
  margin-top: 2px;
  font-size: 12.5px;
  color: var(--ink-60);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.search-foot {
  display: flex;
  gap: 18px;
  padding: 10px 18px;
  border-top: 1px solid var(--hairline);
  font-size: 11.5px;
  color: var(--ink-40);
}
</style>
