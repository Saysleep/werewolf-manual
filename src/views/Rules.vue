<template>
  <div class="content">
    <div class="kicker">RULEBOOK</div>
    <h1 class="page-title">基础规则</h1>
    <p class="page-lede">
      建议新手先看这里哦
    </p>

    <div class="anchor-chips">
      <button v-for="a in anchors" :key="a.id" class="chip-btn" @click="jumpTo(a.id)">{{ a.name }}</button>
    </div>

    <hr class="rule-hr" />

    <!-- 游戏流程 -->
    <section id="sec-flow">
      <h2 class="section-title"><span class="no">01</span>游戏流程</h2>
      <div class="flow">
        <div v-for="(s, i) in flowSteps" :key="s.t" class="flow-row">
          <div class="flow-idx" :class="{ night: s.night }">{{ String(i + 1).padStart(2, '0') }}</div>
          <div class="flow-card" :class="{ night: s.night }">
            <div class="flow-head">
              <b>{{ s.t }}</b>
              <span class="flow-phase">{{ s.night ? '夜晚' : '白天' }}</span>
            </div>
            <p>{{ s.d }}</p>
          </div>
        </div>
      </div>
    </section>

    <hr class="rule-hr" />

    <!-- 胜负判定与规则细节 -->
    <section id="sec-win">
      <h2 class="section-title"><span class="no">02</span>胜负判定</h2>
      <div class="win-grid">
        <div class="win-card">
          <b>屠边制</b>
          <p>狼人只需杀光「全部神职」或「全部平民」其中一边即获胜。绝大多数版型采用此规则，节奏更快。</p>
        </div>
        <div class="win-card">
          <b>屠城制</b>
          <p>狼人必须杀光所有好人（神职与平民）才获胜。常见于无猎人的娱乐局，局时更长。</p>
        </div>
        <div class="win-card">
          <b>好人胜利</b>
          <p>好人阵营通过白天放逐投票，将所有狼人（含功能狼与第三方）全部投出局即获胜。</p>
        </div>
        <div class="win-card">
          <b>第三方</b>
          <p>游戏出现好人、狼人外的第三方阵容，任意一方都需要将自己阵营外的玩家放逐或杀害出局，三方互相为敌，多出现于丘比特，鬼魂新娘的版型。</p>
        </div>
      </div>
      <div class="note-box">
        <b>警长权限与警徽</b>
        <p>警长拥有 1.5 票与归票权，出局时可以移交警徽，也可以撕掉警徽（不移交）。「警徽流」是预言家借警徽传递验人信息的经典战术。</p>
      </div>
      <div class="note-box">
        <b>DQ与点杀</b>
        <p>如果在游戏过程时，有玩家触发了违规或错误在夜间睁眼获取了额外信息，会按法官指示，不得继续参与游戏；DQ是指玩家被判离后，该玩家的角色仍需追刀追投，点杀是指该玩家的角色在判离后直接出局</p>
      </div>
    </section>

    <hr class="rule-hr" />

    <!-- 发言规范与违规 -->
    <section id="sec-speech">
      <h2 class="section-title"><span class="no">03</span>发言规范与违规</h2>
      <div class="win-grid">
        <div class="win-card">
          <b>场外</b>
          <p>提及夜间声响、非全场共知的信息（如「我昨晚听到旁边有动静」）——禁止。</p>
        </div>
        <div class="win-card">
          <b>贴脸</b>
          <p>赌咒发誓、情绪担保（「我要是狼我一辈子没钱」）——禁止。</p>
        </div>
        <div class="win-card">
          <b>擦边</b>
          <p>暗示身份但不构成逻辑的发言（「我这个牌不好发挥」）——禁止。</p>
        </div>
        <div class="win-card">
          <b>流程违规</b>
          <p>夜间发出声响、他人发言时插话、投票跟票变票、随意翻看身份牌——法官可警告直至判罚出局。</p>
        </div>
      </div>
    </section>

    <hr class="rule-hr" />

    <!-- 术语表 -->
    <section id="sec-glossary">
      <h2 class="section-title"><span class="no">04</span>术语表</h2>
      <div v-for="gc in glossaryGroups" :key="gc.key" class="gloss-group">
        <h3 class="gloss-cat">{{ gc.name }}</h3>
        <div class="glossary">
          <div v-for="g in gc.items" :key="g.term" :id="'term-' + g.gi" class="gloss-item" :class="{ 'gloss-flash': 'term-' + g.gi === highlight }">
            <b>{{ g.term }}</b>
            <p>{{ g.def }}</p>
          </div>
        </div>
      </div>
    </section>

    <hr class="rule-hr" />

    <!-- 附录：面杀实务 -->
    <section id="sec-appendix">
      <h2 class="section-title"><span class="no">05</span>附录 · 面杀法官手势</h2>
      <div class="win-grid">
        <div class="win-card">
          <b>数字号码</b>
          <p>单手比划 1~12 号玩家号码；法官报数与玩家指认目标都用手势完成，夜间全程无声。</p>
        </div>
        <div class="win-card">
          <b>身份与状态</b>
          <p>拇指向上表示好人、技能可用；拇指向下表示狼人、技能不可用（如女巫毒药、猎人无法开枪）。</p>
        </div>
        <div class="win-card">
          <b>技能手势</b>
          <p>救人拇指向上、毒人拇指向下并配合号码指示；不使用技能时单手或双手摆动示意「过」。</p>
        </div>
        <div class="win-card">
          <b>技能失效</b>
          <p>双前臂交叉表示技能被封印或无法发动（如被梦魇恐惧、被血月使徒封神的当夜）。</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { glossary, glossaryCats } from '../data/glossary'

const anchors = [
  { id: 'sec-flow', name: '游戏流程' },
  { id: 'sec-win', name: '胜负判定' },
  { id: 'sec-speech', name: '发言规范与违规' },
  { id: 'sec-glossary', name: '术语表' },
  { id: 'sec-appendix', name: '附录 · 面杀法官手势' },
]
const jumpTo = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const route = useRoute()
const highlight = ref('')
let flashTimer
const applyHash = () => {
  clearTimeout(flashTimer)
  highlight.value = /^#term-\d+$/.test(route.hash) ? route.hash.slice(1) : ''
  if (highlight.value) flashTimer = setTimeout(() => { highlight.value = '' }, 2000)
}
onMounted(applyHash)
onUnmounted(() => clearTimeout(flashTimer))
watch(() => route.hash, applyHash)

const glossaryGroups = computed(() =>
  glossaryCats.map((c) => ({
    ...c,
    items: glossary
      .map((g, i) => ({ ...g, gi: i }))
      .filter((g) => g.cat === c.key),
  }))
)

const flowSteps = [
  { t: '天黑请闭眼', night: true, d: '法官宣布入夜，所有玩家闭眼低头，不得发出任何声音或动作。' },
  { t: '狼人行动', night: true, d: '狼人睁眼互认同伴，用手势共同选定一名袭击目标后闭眼。功能狼（梦魇、狼美人等）按版型规定的顺序行动。' },
  { t: '神职行动', night: true, d: '守卫守护、女巫用药、预言家验人等依次进行，每个神职单独被法官唤醒，互不知道其他人的操作。' },
  { t: '警长竞选（首夜天亮前）', night: false, d: '首夜天亮前进行：想竞选的玩家举手报名（上警），上警玩家依次发言后可退水（退水者失去本轮投票权）；' },
  { t: '退水自爆环节（首夜天亮前）', night: false, d: '首夜天亮前，当所有警上玩家发言完毕后，可统一在此环节进行退水或自爆，若仅剩一人在警上，该玩家自动当选警长，跳过下一步警徽投票；若两人或以上的玩家在警上，则进入警徽投票环节；狼人也可在该阶段自爆，自爆后直接入夜；夜间流程结束后，继续进入退水自爆环节（未天亮），若第二位狼人自爆，则警徽直接流失，跳过警徽投票，进入天亮报夜；否则进入警徽投票环节' },
  { t: '警徽投票（首夜天亮前）', night: false, d: '由未上警的玩家投票选出警长。平票时平票玩家再次发言后全场重投，二次平票则本局警徽流失。' },  
  { t: '天亮报夜', night: false, d: '法官宣布天亮，按序播报死讯并询问是否留遗言；若无人死亡则宣布「平安夜」。仅首夜出局的玩家可以发表遗言。' },
  { t: '轮流发言', night: false, d: '1.若有警长且为平安夜，则警长决定警长相邻位置（警左/警右）开始按序轮流；2.若有警长不为平安夜且为单死，则警长决定死者相邻位置（死左/死右）开始按序轮流；3.若有警长且昨夜多倒，则警长决定警长相邻位置（警左/警右）开始按序轮流；4.若无警长，则随机指定玩家按随机顺序（顺或逆，一般是顺时针，不做随机）开始按序轮流发言；每人限时发言：报身份、盘逻辑、指认或表水，其余玩家不得插话、提问。普通狼人可以随时自爆终止当前玩家的发言直接入夜，若进入到放逐与遗言环节则不能自爆' },
  { t: '放逐投票', night: false, d: '如果有警长，警长可以选择一个号码来归票，该票警长投出时拥有1.5票；警长也可以选择多个号码来进行多人PK，此时警长1.5票无效；若无警长则自由投票。全员同时举票，禁止跟票、变票，得票最多者出局留遗言；平票时平票玩家进入 PK 发言后再投一次，二次平票则当日无人出局。' },
  { t: '发表遗言与发动技能', night: false, d: '白天出局的玩家可以发表遗言，遗言结束后可以选择发动技能（猎人在该阶段开枪）' },
  { t: '天黑请闭眼', night: true, d: '法官宣布入夜，所有玩家闭眼低头，不得发出任何声音或动作。循环往复，直到游戏结束。' },

]
</script>

<style scoped>
/* 流程 */
.flow { margin-top: 36px; }
.flow-row { display: grid; grid-template-columns: 56px 1fr; gap: 20px; }
.flow-idx {
  font-family: var(--latin);
  font-size: 12px;
  letter-spacing: 0.18em;
  color: var(--ink-40);
  padding-top: 26px;
  text-align: right;
  position: relative;
}
.flow-idx::after {
  content: '';
  position: absolute;
  right: -10px;
  top: 34px;
  width: 1px;
  height: calc(100% - 20px);
  background: var(--hairline);
}
.flow-row:last-child .flow-idx::after { display: none; }
.flow-idx.night { color: var(--moon-bright); }
.flow-card {
  border: 1px solid var(--hairline);
  border-radius: 12px;
  padding: 20px 24px;
  margin-bottom: 14px;
  background: var(--bg-soft);
}
.flow-card.night {
  background: linear-gradient(120deg, var(--moon-dim), var(--bg-soft) 65%);
  border-color: rgba(110, 123, 255, 0.28);
}
.flow-head { display: flex; justify-content: space-between; align-items: baseline; }
.flow-head b { font-family: var(--serif); font-size: 17px; letter-spacing: 0.04em; }
.flow-phase { font-size: 11.5px; color: var(--ink-40); letter-spacing: 0.2em; }
.flow-card p { margin-top: 8px; font-size: 14px; color: var(--ink-60); }

/* 胜负 */
.win-grid { margin-top: 32px; display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 18px; }
.win-card { border: 1px solid var(--hairline); border-radius: 12px; padding: 22px 24px; background: var(--bg-soft); }
.win-card b { font-family: var(--serif); font-size: 16.5px; letter-spacing: 0.05em; }
.win-card p { margin-top: 8px; font-size: 13.5px; color: var(--ink-60); }
.note-box {
  margin-top: 18px;
  border-left: 3px solid var(--moon);
  background: var(--moon-dim);
  border-radius: 0 12px 12px 0;
  padding: 18px 24px;
}
.note-box b { font-family: var(--serif); letter-spacing: 0.05em; }
.note-box p { margin-top: 6px; font-size: 13.5px; color: var(--ink-60); }

/* 术语 */
.glossary { margin-top: 28px; display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 0 32px; }
.gloss-item { padding: 14px 0; border-top: 1px solid var(--hairline); }
.gloss-item b { color: var(--moon-bright); font-weight: 600; font-size: 14.5px; }
.gloss-item p { font-size: 13px; color: var(--ink-60); margin-top: 2px; }

/* 术语分组 */
.gloss-group + .gloss-group { margin-top: 30px; }
.gloss-cat { font-family: var(--serif); font-size: 15px; letter-spacing: 0.12em; color: var(--ink-60); }
.gloss-group .glossary { margin-top: 10px; }

/* 锚点目录 */
.anchor-chips { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 20px; }
.chip-btn {
  height: 30px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1px solid var(--ink-14);
  background: transparent;
  color: var(--ink-60);
  font-size: 12.5px;
  font-family: var(--sans);
  cursor: pointer;
  transition: all 0.2s;
}
.chip-btn:hover { color: var(--ink); border-color: var(--moon); background: var(--moon-dim); }
section[id] { scroll-margin-top: 72px; }

/* 术语锚点高亮 */
.gloss-item[id] { scroll-margin-top: 80px; }
.gloss-flash { border-radius: 8px; animation: gloss-flash 2s ease; }
@keyframes gloss-flash {
  0%, 100% { background: transparent; }
  20%, 60% { background: var(--moon-dim); }
}
</style>
