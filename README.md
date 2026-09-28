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
| 基础规则 | `/rules` | 11 步昼夜流程（含「退水自爆环节」）、胜负判定、发言规范与违规、术语表（32 条，流程/身份/战术三组）、附录·面杀法官手势；顶部锚点目录快速跳转 |
| 角色图鉴 | `/roles` | 31 个角色，阵营筛选 + 关键字搜索（角色名 / 英文名 / 技能） |
| 版型大全 | `/variants` | 11 个 12 人版型，标签 + 难度（1–5）组合筛选 |
| 版型详情 | `/variants/:id` | 阵营配置、竖向夜间流程图、规则与攻略（好人 / 狼人 / 进阶三视角）、上一版下一版导航 |

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
    ├── roles.js             # 角色数据（31 条）
    ├── variants.js          # 版型数据（11 个在线 + 4 个注释中）
    └── glossary.js          # 术语数据（32 条，glossary + glossaryCats）
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

## 开发

```bash
npm install --registry=https://registry.npmmirror.com --replace-registry-host=always --no-audit
npm run dev      # 本地开发
npm run build    # 构建到 dist/
npm run preview  # 预览构建产物
```

> lockfile 锁定了国内镜像源，npm install 必须带上面的 registry 参数。

## 部署

仓库根目录有一键部署脚本 `deploy.sh`（构建 → scp 到服务器临时目录 → 原子替换线上 dist，自动保留 favicon）：

```bash
bash deploy.sh
```

脚本包含服务器信息，**已加入 .gitignore，严禁提交**。

线上环境：阿里云 `/opt/xiabaiwang/frontend/dist`，nginx 容器 bind mount 该目录，替换时必须替换目录内容而非删除目录本身。

## 内容口径约定（重要）

- 标注「大师赛官方」的版型，配置与规则以京城大师赛官方版型卡牌为准
- 规则文案不自我创新：修改以项目已有原文 / 维护者提供的原文为准
- 拿不准的攻略条目写「我不会……等待高手补充」，不编造
- 注释掉的 4 个版型（白狼王守卫、血月猎魔、熊隐狼、盗贼丘比特）数据保留，恢复上线时需补 nightFlow 与猎人规则
- 通用裁决惯例：女巫全程不可自救、毒杀克制一切出局技、出局不亮身份（暗牌）、自爆窗口限定在发言阶段
