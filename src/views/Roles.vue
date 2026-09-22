<template>
  <div class="content">
    <div class="kicker">ROLE INDEX</div>
    <h1 class="page-title">角色图鉴</h1>
    <p class="page-lede">
      全部角色按阵营归档，点选筛选快速查阅任意一张牌。
    </p>

    <div class="camp-filter">
      <button
        v-for="f in campFilters"
        :key="f.key"
        class="filter-btn"
        :class="{ on: activeCamp === f.key }"
        :style="f.key !== 'all' ? { '--fc': camps[f.key].color } : {}"
        @click="activeCamp = f.key"
      >{{ f.name }}</button>
    </div>
    <div class="role-grid">
      <div v-for="r in filteredRoles" :key="r.id" class="role-card" :style="{ '--rc': camps[r.camp].color }">
        <div class="role-head">
          <span class="role-icon"><RoleIcon :name="r.icon" :size="24" /></span>
          <div>
            <b>{{ r.name }}</b>
            <span class="role-en">{{ r.en }} · {{ camps[r.camp].name }}</span>
          </div>
        </div>
        <p class="role-skill">{{ r.skill }}</p>
        <p class="role-note">{{ r.notes }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { roles, camps } from '../data/roles'
import RoleIcon from '../components/RoleIcon.vue'

const campFilters = [
  { key: 'all', name: '全部' },
  { key: 'wolf', name: '狼人阵营' },
  { key: 'god', name: '神职阵营' },
  { key: 'folk', name: '平民阵营' },
  { key: 'third', name: '第三方' },
]
const activeCamp = ref('all')
const filteredRoles = computed(() =>
  activeCamp.value === 'all' ? roles : roles.filter((r) => r.camp === activeCamp.value)
)
</script>

<style scoped>
.camp-filter { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 28px; }
.filter-btn {
  height: 34px;
  padding: 0 18px;
  border-radius: 999px;
  border: 1px solid var(--ink-14);
  background: transparent;
  color: var(--ink-60);
  font-size: 13px;
  font-family: var(--sans);
  cursor: pointer;
  transition: all 0.2s;
}
.filter-btn:hover { color: var(--ink); border-color: var(--ink-40); }
.filter-btn.on {
  color: var(--ink);
  border-color: var(--fc, var(--moon));
  background: var(--ink-07);
}

.role-grid { margin-top: 26px; display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 16px; }
.role-card {
  border: 1px solid var(--hairline);
  border-radius: 12px;
  padding: 22px 24px;
  background: var(--bg-soft);
  transition: border-color 0.2s;
}
.role-card:hover { border-color: var(--rc); }
.role-head { display: flex; gap: 14px; align-items: center; }
.role-icon {
  width: 46px; height: 46px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--rc);
  background: var(--ink-07);
  flex-shrink: 0;
}
.role-head b { font-family: var(--serif); font-size: 17px; letter-spacing: 0.04em; display: block; }
.role-en { font-family: var(--latin); font-size: 10px; letter-spacing: 0.18em; color: var(--ink-40); text-transform: uppercase; }
.role-skill { margin-top: 14px; font-size: 13.5px; color: var(--ink); line-height: 1.75; }
.role-note { margin-top: 8px; font-size: 12.5px; color: var(--ink-40); border-top: 1px dashed var(--hairline); padding-top: 10px; }
</style>
