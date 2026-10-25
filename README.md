# 狼人杀图鉴 · 规则与版型手册

一个面向面杀玩家的狼人杀规则查阅站：12 人标准局的完整规则、角色图鉴与版型玩法，上桌之前查一查。

线上地址：<https://www.palplay.online>
仓库：<git@github.com:Saysleep/werewolf-manual.git>

## 技术栈

- Vue 3（`<script setup>`）+ Vite 6 + vue-router 4（hash 路由）
- 纯手写暗色主题 CSS（CSS 变量，无 UI 框架、无组件库，零额外运行时依赖）
- 纯静态站点，构建产物为 `dist/`，由 nginx 容器托管

## 功能总览

| 页面 | 路由 | 内容 |
| --- | --- | --- |
| 首页 | `/` | 简介、收录统计、版型速览（机械狼通灵师 / 预女猎白混 / 狼王守卫 / 狼美人骑士）、四大阵营 |
| 基础规则 | `/rules` | 昼夜流程、胜负判定、发言规范与违规、术语表、附录·面杀法官手势；顶部锚点目录快速跳转 |
| 角色图鉴 | `/roles` | 若干个角色，阵营筛选 + 关键字搜索（角色名 / 英文名 / 技能） |
| 版型大全 | `/variants` | 若干个 12 人版型，标签 + 难度（1–5）组合筛选 |
| 版型详情 | `/variants/:id` | 阵营配置、竖向夜间流程图、规则与攻略（好人 / 狼人 / 进阶三视角）、上一版下一版导航 |
| 社区 | `/community/`（外链整页跳转） | 独立全栈应用（xiabaiwang-vue-web 构建产物 + Spring Boot 后端），非本站路由 |

全局能力：

- **全局搜索（Ctrl / Cmd + K）**：跨版型、角色、术语搜索；版型直达详情页，角色带关键字直达筛选结果，术语锚点直达条目并高亮闪烁
- **动态页面标题**：详情页显示「版型名 · 版型大全 · 狼人杀图鉴」
- 顶部阅读进度条、页面淡入过渡、移动端独立顶栏，响应式布局

## 目录结构

```
src/
├── main.js                  # 入口：路由 + scrollBehavior(hash 锚点) + 动态 title
├── App.vue                  # 布局：侧边栏导航 + 顶栏 + 搜索入口 + 进度条
├── style.css                # 全局暗色主题（CSS 变量）
├── components/
│   ├── GlobalSearch.vue     # 全局搜索弹层（Ctrl+K）
│   └── RoleIcon.vue         # 角色阵营图标
├── views/
│   ├── Home.vue             # 首页
│   ├── Rules.vue            # 基础规则（数据来自 data/glossary.js）
│   ├── Roles.vue            # 角色图鉴
│   ├── Variants.vue         # 版型大全
│   └── VariantDetail.vue    # 版型详情（夜间流程图等）
└── data/
    ├── roles.js             # 角色数据
    ├── variants.js          # 版型数据
    └── glossary.js          # 术语数据（glossary + glossaryCats）
```

## 数据模型

### `data/variants.js`

```js
{
  id: 'twelve-yunvliebai',   // 唯一标识（用于路由与搜索）
  name: '预女猎白',
  en: 'THE CLASSIC',
  players: 12,
  difficulty: 1,             // 1–5，用于难度筛选
  tags: ['经典', '新手入门'], // 用于标签筛选
  summary: '…',
  config: [{ role: '角色id', count: 1 }],  // 阵营配置
  nightFlow: ['守卫（守护）', …],           // 夜间流程（顺序即法官唤醒顺序）
  rules: ['屠边制：…', …],                  // 版型规则结算口径
  guide: [{ title: '好人思路', points: […] }], // 攻略（三视角）
}
```

另有 `variantMap`（id → 版型）供详情页与动态标题查询。

### `data/roles.js` / `data/glossary.js`

- 角色：id、名称、英文名、阵营、技能描述等，由 `Roles.vue` 与全局搜索消费
- 术语：`{ term, def, cat }`，`cat` 为 `flow` / `id` / `tactic` 三组；术语锚点 id `term-<下标>` 与全局搜索联动，**下标基于扁平数组，稳定不可变**

### 社区应用（/community/）

省略
