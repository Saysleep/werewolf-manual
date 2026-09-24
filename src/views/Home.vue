<template>
  <div class="content">
    <!-- HERO -->
    <section class="hero">
      <div class="hero-dots" aria-hidden="true"></div>
      <div class="hero-inner">
        <div class="hero-text">
          <div class="kicker">A MANUAL OF DECEPTION</div>
          <h1 class="hero-title">首页<span class="accent"></span></h1>
          <p class="hero-lede">
            狼人杀是充满逻辑与谎言的对抗发言游戏，这里收录了 12 人标准局的完整规则、角色图鉴与版型玩法，上桌之前，如果可以读完这份手册，你将直接变成像开发者一样的高手。
          </p>
          <div class="hero-cta">
            <RouterLink to="/rules" class="btn primary">从基础规则开始</RouterLink>
            <RouterLink to="/variants" class="btn ghost">直接查看版型</RouterLink>
          </div>
        </div>
      </div>
      <div class="hero-stats">
        <div class="stat"><b>{{ variants.length }}</b><span>收录版型</span></div>
        <div class="stat"><b>{{ roles.length }}</b><span>角色图鉴</span></div>
        <div class="stat"><b>4</b><span>阵营划分</span></div>
        <div class="stat"><b>2</b><span>游戏阶段</span></div>
      </div>
    </section>

    <hr class="rule-hr" />

    <!-- 昼夜流程预览 -->
    <section>
      <h2 class="section-title"><span class="no">01</span>一局游戏的正常流程</h2>
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

    <!-- 精选版型 -->
    <section>
      <h2 class="section-title"><span class="no">02</span>版型速览</h2>
      <p class="sec-lede">全部 12 人标准局：京城大师赛官方版型，加上一些经典板子。</p>
      <div class="grid">
        <RouterLink
          v-for="v in featured"
          :key="v.id"
          :to="`/variants/${v.id}`"
          class="card vcard"
        >
          <div class="vcard-top">
            <span class="players">{{ v.players }} 人</span>
            <span class="dots"><i v-for="n in 5" :key="n" :class="{ on: n <= v.difficulty }"></i></span>
          </div>
          <h3>{{ v.name }}</h3>
          <p>{{ v.summary }}</p>
          <div class="vcard-tags">
            <span v-for="t in v.tags" :key="t" class="tag">{{ t }}</span>
          </div>
        </RouterLink>
      </div>
      <RouterLink to="/variants" class="more-link">浏览全部 {{ variants.length }} 个版型 →</RouterLink>
    </section>

    <hr class="rule-hr" />

    <!-- 阵营 -->
    <section>
      <h2 class="section-title"><span class="no">03</span>四大阵营</h2>
      <div class="camp-grid">
        <div v-for="c in campList" :key="c.key" class="camp" :style="{ '--camp': c.color }">
          <div class="camp-bar"></div>
          <b>{{ c.name }}</b>
          <p>{{ c.desc }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { variants } from '../data/variants'
import { roles, camps } from '../data/roles'

const featuredIds = ['masters-mech', 'masters-mixed', 'twelve-wolf-king-guard', 'knightbeautywolf']
const featured = featuredIds.map((id) => variants.find((v) => v.id === id)).filter(Boolean)

const cycleSteps = [
  { t: '天黑闭眼', d: '法官宣布入夜，所有玩家闭眼，夜间行动依次进行。', night: true },
  { t: '夜间行动', d: '狼人袭击、神职用技，每个环节由法官单独唤醒。', night: true },
  { t: '警长竞选', d: '上警玩家轮流发言，争夺警徽', night: false },
  { t: '退水自爆环节', d: '退水或自爆', night: false },  
  { t: '天亮报夜', d: '法官公布昨夜出局名单（或平安夜），死者留遗言。', night: false },
  { t: '轮流发言', d: '从死者下置位开始顺/逆时针发言，互抿身份、表水。', night: false },
  { t: '放逐投票', d: '全员投票，得票最多者出局并留遗言，再次入夜。', night: false },
]

const campList = [
  { key: 'wolf', name: camps.wolf.name, color: camps.wolf.color, desc: '夜里动刀、白天说谎。目标是杀光神职或平民（屠边），或杀光所有人（屠城）。' },
  { key: 'god', name: camps.god.name, color: camps.god.color, desc: '手握技能的信息位与轮次位，预言家验人、女巫用药、猎人开枪、守卫持盾。' },
  { key: 'folk', name: camps.folk.name, color: camps.folk.color, desc: '没有技能的普通人，用发言与投票为好人阵营筑起基本盘。' },
  { key: 'third', name: camps.third.name, color: camps.third.color, desc: '第三方阵营，通常他们要屠光其余所有人。' },
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

.hero-inner {
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
  align-items: center;
}

.hero-title {
  font-family: var(--serif);
  font-weight: 900;
  font-size: clamp(44px, 6.4vw, 84px);
  line-height: 1.15;
  letter-spacing: 0.06em;
  margin-top: 22px;
}
.hero-title .accent { color: var(--moon-bright); }

.hero-lede { margin-top: 22px; max-width: 540px; color: var(--ink-60); font-size: 15.5px; }

.hero-cta { display: flex; gap: 14px; margin-top: 34px; flex-wrap: wrap; }
.btn {
  display: inline-flex;
  align-items: center;
  height: 44px;
  padding: 0 24px;
  border-radius: 999px;
  font-size: 14px;
  transition: all 0.25s ease;
}
.btn.primary { background: var(--moon); color: #0a0a12; font-weight: 600; }
.btn.primary:hover { background: var(--moon-bright); transform: translateY(-2px); }
.btn.ghost { border: 1px solid var(--ink-14); color: var(--ink-60); }
.btn.ghost:hover { border-color: var(--moon); color: var(--ink); }

.hero-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: var(--hairline);
  border: 1px solid var(--hairline);
  border-radius: 12px;
  overflow: hidden;
  margin-top: 56px;
}
.stat { background: var(--bg-soft); padding: 22px 24px; }
.stat b {
  font-family: var(--latin);
  font-size: 30px;
  font-weight: 700;
  display: block;
  color: var(--moon-bright);
}
.stat span { font-size: 12.5px; color: var(--ink-40); letter-spacing: 0.08em; }

.sec-lede { margin-top: 10px; color: var(--ink-40); font-size: 14px; }

/* 昼夜流程 */
.cycle { margin-top: 32px; display: flex; flex-direction: column; }
.cycle-step {
  display: grid;
  grid-template-columns: 64px 1fr;
  gap: 20px;
  padding: 18px 0;
  border-top: 1px solid var(--hairline);
  align-items: baseline;
}
.cycle-step:last-child { border-bottom: 1px solid var(--hairline); }
.cycle-idx { font-family: var(--latin); font-size: 12px; letter-spacing: 0.2em; color: var(--ink-40); }
.cycle-step.night .cycle-idx { color: var(--moon-bright); }
.cycle-body b { font-size: 15.5px; font-weight: 600; }
.cycle-step.night .cycle-body b { color: var(--moon-bright); }
.cycle-body p { color: var(--ink-60); font-size: 14px; margin-top: 2px; }

.more-link {
  display: inline-block;
  margin-top: 28px;
  font-size: 14px;
  color: var(--moon-bright);
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s;
}
.more-link:hover { border-color: var(--moon-bright); }

/* 版型卡片 */
.grid {
  margin-top: 32px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 18px;
}
.vcard-top { display: flex; justify-content: space-between; align-items: center; }
.players {
  font-family: var(--latin);
  font-size: 11px;
  letter-spacing: 0.22em;
  color: var(--moon-bright);
  text-transform: uppercase;
}
.vcard h3 {
  font-family: var(--serif);
  font-size: 21px;
  font-weight: 700;
  margin-top: 14px;
  letter-spacing: 0.03em;
}
.vcard p { margin-top: 8px; font-size: 13.5px; color: var(--ink-60); line-height: 1.7; }
.vcard-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 16px; }

/* 阵营 */
.camp-grid {
  margin-top: 32px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 18px;
}
.camp { position: relative; padding: 24px 24px 22px; border: 1px solid var(--hairline); border-radius: 12px; background: var(--bg-soft); overflow: hidden; }
.camp-bar { position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: var(--camp); opacity: 0.85; }
.camp b { font-family: var(--serif); font-size: 17px; letter-spacing: 0.05em; color: var(--camp); }
.camp p { margin-top: 8px; font-size: 13.5px; color: var(--ink-60); }

@media (max-width: 860px) {
  .hero-stats { grid-template-columns: repeat(2, 1fr); }
}
</style>
