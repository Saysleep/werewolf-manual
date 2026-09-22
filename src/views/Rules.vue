<template>
  <div class="content">
    <div class="kicker">RULEBOOK</div>
    <h1 class="page-title">基础规则</h1>
    <p class="page-lede">
      建议新手先看这里哦
    </p>

    <hr class="rule-hr" />

    <!-- 游戏流程 -->
    <section>
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

    <!-- 胜负判定 -->
    <section>
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
          <p>丘比特局中若出现人狼恋，情侣与丘比特需屠光其余所有玩家方可获胜，三方互相为敌。</p>
        </div>
      </div>
      <div class="note-box">
        <b>警长竞选</b>
        <p>12 人版型设有警长：首个白天前竞选，警长拥有 1.5 票归票权，出局时可移交警徽，狼人双爆可以吞掉警徽。「警徽流」是预言家传递验人信息的核心战术。</p>
      </div>
    </section>

    <hr class="rule-hr" />

    <!-- 术语表 -->
    <section>
      <h2 class="section-title"><span class="no">03</span>术语表</h2>
      <div class="glossary">
        <div v-for="g in glossary" :key="g.term" class="gloss-item">
          <b>{{ g.term }}</b>
          <p>{{ g.def }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const flowSteps = [
  { t: '天黑请闭眼', night: true, d: '法官宣布入夜，所有玩家闭眼低头，不得发出任何声音或动作。' },
  { t: '狼人行动', night: true, d: '狼人睁眼互认同伴，用手势共同选定一名袭击目标后闭眼。功能狼（梦魇、狼美人等）按版型规定的顺序行动。' },
  { t: '神职行动', night: true, d: '守卫守护、女巫用药、预言家验人等依次进行，每个神职单独被法官唤醒，互不知道其他人的操作。' },
  { t: '警长竞选', d: '仅第一夜和第一天之间存在该环节，上警玩家轮流发言，争夺警徽', night: false },
  { t: '退水自爆环节', d: '仅第一夜和第一天之间存在该环节；退水或自爆', night: false },  
  { t: '天亮报夜', night: false, d: '法官宣布天亮，公布昨夜出局名单；若无人死亡则宣布「平安夜」。首夜出局者留遗言。' },
  { t: '轮流发言', night: false, d: '按顺序每人限时发言：报身份、盘逻辑、指认或表水。发言期间其他人不得插话。' },
  { t: '放逐投票', night: false, d: '自由讨论后全员同时投票，得票最多者出局留遗言；平票则平票者加赛发言再投，仍平票则无人出局。' },
  { t: '再次入夜', night: true, d: '循环往复，直到某一阵营达成胜利条件，法官宣判游戏结束。' },
]

const glossary = [
  { term: '金水', def: '预言家验出的好人。明金水是被全场认可的好人身份。' },
  { term: '查杀', def: '预言家验出的狼人，起跳报验人时的核心信息。' },
  { term: '银水', def: '女巫用解药救下的人，身份偏好但不保真（可能救了自刀狼）。' },
  { term: '悍跳', def: '狼人冒充神职发言（多为假预言家），抢信息位与警徽。' },
  { term: '表水', def: '平民通过发言逻辑自证清白，是民牌的核心工作。' },
  { term: '挡刀', def: '故意暴露自己吸引狼人袭击，保护更关键的神职。' },
  { term: '抗推', def: '白天集中票型把某位玩家投出局，多用于狼推好人。' },
  { term: '自刀', def: '狼人夜里袭击自己（或队友），骗取女巫解药做高身份。' },
  { term: '倒钩', def: '狼人站边真预言家、打队友，把自己洗进好人堆里。' },
  { term: '垫飞', def: '狼人故意把某好人发言捧高再放大其漏洞，引导好人互踩。' },
  { term: '警徽流', def: '预言家当选警长后，通过移交警徽的方向传递验人结果的战术。' },
  { term: '奶穿', def: '同一玩家同夜被守卫守护又被女巫解药救，反而死亡的规则事故。' },
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
</style>
