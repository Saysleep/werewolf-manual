<template>
  <div class="content">
    <section class="hero">
      <div class="hero-dots" aria-hidden="true"></div>
      <div class="kicker">PALPLAY · LIBRARY</div>
      <h1 class="hero-title">狼人杀图鉴 · 资料库</h1>
      <p class="hero-lede">
        PalPlay 资料模块之一。上桌之前，查清规则、角色与版型。这里收录 12 人标准局的完整流程、角色技能和阵容攻略，按需要直接查阅。
      </p>
      <div class="hero-cta">
        <RouterLink to="/roles" class="btn primary">查询角色</RouterLink>
        <RouterLink to="/variants" class="btn ghost">浏览版型</RouterLink>
        <RouterLink to="/rules" class="rules-link">查看基础规则 →</RouterLink>
      </div>
      <div class="hero-stats" aria-label="内容统计">
        <span><b>{{ variants.length }}</b> 个收录版型</span>
        <span><b>{{ roles.length }}</b> 个角色图鉴</span>
      </div>
    </section>

    <hr class="rule-hr" />

    <section>
      <h2 class="section-title"><span class="no">01</span>热门版型</h2>
      <p class="sec-lede">从常见版型开始，查看阵容配置、夜间流程与玩法攻略。</p>
      <div class="grid">
        <RouterLink
          v-for="v in featured"
          :key="v.id"
          :to="`/variants/${v.id}`"
          class="card vcard"
        >
          <div class="vcard-top">
            <span class="players">{{ v.players }} 人</span>
            <span class="dots" :aria-label="`难度 ${v.difficulty} / 5`"><i v-for="n in 5" :key="n" :class="{ on: n <= v.difficulty }"></i></span>
          </div>
          <h3>{{ v.name }}</h3>
          <p>{{ v.summary }}</p>
          <div class="vcard-tags">
            <span v-for="t in v.tags.slice(0, 3)" :key="t" class="tag">{{ t }}</span>
          </div>
        </RouterLink>
      </div>
      <RouterLink to="/variants" class="more-link">浏览全部 {{ variants.length }} 个版型 →</RouterLink>
    </section>

    <hr class="rule-hr" />

    <section>
      <h2 class="section-title"><span class="no">02</span>一局游戏的正常流程</h2>
      <p class="sec-lede">从查看身份到放逐投票，快速了解一局游戏如何进行。</p>
      <div class="cycle">
        <div v-for="(step, i) in cycleSteps" :key="step.t" class="cycle-step" :class="{ night: step.night }">
          <div class="cycle-idx">{{ String(i + 1).padStart(2, '0') }}</div>
          <div class="cycle-body">
            <b>{{ step.t }}</b>
            <p>{{ step.d }}</p>
          </div>
        </div>
      </div>
      <RouterLink to="/rules" class="more-link">查看完整规则 →</RouterLink>
    </section>

    <hr class="rule-hr" />

    <section>
      <h2 class="section-title"><span class="no">03</span>返回 PalPlay</h2>
      <p class="sec-lede">图鉴只是 PalPlay 的一部分，去社区玩游戏或查看其他资料。</p>
      <a href="/community/" class="palplay-back card">
        <span class="pp-ico">🎮</span>
        <div>
          <h3>返回 PalPlay 社区</h3>
          <p>进入游戏大厅、公共留言板与更多资料。</p>
        </div>
        <span class="pp-arrow">→</span>
      </a>
    </section>
  </div>
</template>

<script setup>
import { variants, roles } from '../data/content'

const featuredIds = ['masters-mech', 'masters-mixed', 'twelve-wolf-king-guard', 'knightbeautywolf']
const featured = featuredIds.map((id) => variants.find((v) => v.id === id)).filter(Boolean)

const cycleSteps = [
  { t: '查看身份底牌', d: '发牌后各玩家查看自己的身份底牌，牢记阵营与技能，随后天黑。', night: false },
  { t: '天黑闭眼', d: '法官宣布入夜，所有玩家闭眼，夜间行动依次进行。', night: true },
  { t: '夜间行动', d: '狼人袭击、神职用技，每个环节由法官单独唤醒。', night: true },
  { t: '警长竞选', d: '上警玩家轮流发言，争夺警徽。', night: false },
  { t: '退水自爆环节', d: '玩家可以退水，狼人可以选择自爆。', night: false },
  { t: '天亮报夜', d: '法官公布昨夜出局名单（或平安夜），死者留遗言。', night: false },
  { t: '轮流发言', d: '从死者下置位开始顺/逆时针发言，互抿身份、表水。', night: false },
  { t: '放逐投票', d: '全员投票，得票最多者出局并留遗言，再次入夜。', night: false },
]
</script>

<style scoped>
.hero { position: relative; padding: 24px 0 8px; }
.hero-dots {
  position: absolute;
  inset: -32px -48px auto auto;
  width: 280px;
  height: 200px;
  background-image: radial-gradient(rgba(230, 227, 218, 0.13) 1.2px, transparent 1.2px);
  background-size: 22px 22px;
  pointer-events: none;
  mask-image: linear-gradient(135deg, #000 30%, transparent 75%);
  -webkit-mask-image: linear-gradient(135deg, #000 30%, transparent 75%);
}
.hero-title {
  position: relative;
  font-family: var(--serif);
  font-weight: 900;
  font-size: clamp(40px, 5vw, 64px);
  line-height: 1.18;
  letter-spacing: 0.05em;
  margin-top: 22px;
}
.hero-lede { position: relative; margin-top: 22px; max-width: 620px; color: var(--ink-60); font-size: 16px; }
.hero-cta { display: flex; gap: 14px; margin-top: 32px; flex-wrap: wrap; align-items: center; }
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0 24px;
  border-radius: 10px;
  font-size: 14px;
  transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
}
.btn.primary { background: var(--moon); color: #0a0a12; font-weight: 600; }
.btn.primary:hover { background: var(--moon-bright); transform: translateY(-2px); }
.btn.ghost { border: 1px solid var(--ink-14); color: var(--ink); }
.btn.ghost:hover { border-color: var(--moon); color: var(--moon-bright); }
.rules-link { min-height: 44px; display: inline-flex; align-items: center; color: var(--moon-bright); font-size: 14px; }
.hero-stats {
  display: flex;
  gap: 28px;
  margin-top: 32px;
  padding-top: 20px;
  border-top: 1px solid var(--hairline);
  color: var(--ink-40);
  font-size: 13px;
}
.hero-stats b { color: var(--moon-bright); font-family: var(--latin); font-size: 20px; margin-right: 5px; }
.sec-lede { margin-top: 10px; color: var(--ink-40); font-size: 14px; }
.grid { margin-top: 28px; display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 18px; }
.vcard { display: flex; flex-direction: column; }
.vcard-top { display: flex; justify-content: space-between; align-items: center; }
.players { font-family: var(--latin); font-size: 11px; letter-spacing: 0.22em; color: var(--moon-bright); text-transform: uppercase; }
.vcard h3 { font-family: var(--serif); font-size: 21px; font-weight: 700; margin-top: 14px; letter-spacing: 0.03em; }
.vcard p {
  margin-top: 8px;
  font-size: 13.5px;
  color: var(--ink-60);
  line-height: 1.7;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.vcard-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-top: auto; padding-top: 16px; }
.cycle { margin-top: 28px; display: flex; flex-direction: column; }
.cycle-step { display: grid; grid-template-columns: 56px 1fr; gap: 18px; padding: 16px 0; border-top: 1px solid var(--hairline); align-items: baseline; }
.cycle-step:last-child { border-bottom: 1px solid var(--hairline); }
.cycle-idx { font-family: var(--latin); font-size: 12px; letter-spacing: 0.2em; color: var(--ink-40); }
.cycle-step.night .cycle-idx, .cycle-step.night .cycle-body b { color: var(--moon-bright); }
.cycle-body b { font-size: 15.5px; font-weight: 600; }
.cycle-body p { color: var(--ink-60); font-size: 14px; margin-top: 2px; }
.more-link { display: inline-flex; align-items: center; min-height: 44px; margin-top: 18px; font-size: 14px; color: var(--moon-bright); border-bottom: 1px solid transparent; }
.more-link:hover { border-color: var(--moon-bright); }
.palplay-back {
  margin-top: 28px;
  display: flex;
  align-items: center;
  gap: 18px;
  text-decoration: none;
  color: var(--ink);
}
.pp-ico { font-size: 28px; }
.palplay-back h3 { font-family: var(--serif); font-size: 18px; font-weight: 700; }
.palplay-back p { margin-top: 4px; font-size: 13.5px; color: var(--ink-60); }
.pp-arrow { margin-left: auto; font-size: 18px; color: var(--moon-bright); }
@media (max-width: 640px) {
  .hero-stats { flex-direction: column; gap: 8px; }
  .grid { grid-template-columns: 1fr; }
  .rules-link { width: 100%; }
}
</style>
