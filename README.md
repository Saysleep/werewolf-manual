# 狼人杀图鉴 · 规则与版型手册

面向面杀玩家的狼人杀规则查阅站，提供基础规则、角色图鉴、版型配置与玩法攻略。网站采用暗色主题和响应式布局，支持电脑与手机访问。

- 线上地址：<https://www.palplay.online>
- 社区入口：<https://www.palplay.online/community/>
- 社区前端：[xiabaiwang-vue-web](https://github.com/Saysleep/xiabaiwang-vue-web)
- 后端服务：[xiabaiwang-api-server](https://github.com/Saysleep/xiabaiwang-api-server)

## 技术栈

- Vue 3（`<script setup>`）
- Vite 6
- Vue Router 4（Hash 路由）
- 原生 CSS（CSS 变量，无 UI 组件库）
- 构建产物为纯静态文件，可由 Nginx 等静态服务器托管

## 功能总览

| 页面 | 路由 | 内容 |
| --- | --- | --- |
| 首页 | `/` | 网站简介、版型速览与快捷入口 |
| 基础规则 | `/rules` | 昼夜流程、胜负判定、发言规范、术语表与法官手势 |
| 角色图鉴 | `/roles` | 角色技能、阵营筛选和关键字搜索 |
| 版型大全 | `/variants` | 版型标签、难度筛选与阵容配置 |
| 版型详情 | `/variants/:id` | 夜间流程、规则说明、多视角攻略和上下版型导航 |
| 社区 | `/community/` | 独立全栈应用，不属于本站内部路由 |

全局能力：

- `Ctrl / Cmd + K` 跨角色、版型和术语搜索。
- 动态页面标题、Hash 锚点跳转和术语高亮。
- 顶部阅读进度条、页面过渡和移动端响应式布局。
- 角色与版型优先从后端读取；接口不可用或超时后使用前端内置数据，保证主站可访问。

## 本地开发

安装满足 Vite 6 要求的 Node.js，然后执行：

```bash
npm install
npm run dev
```

开发服务器会将 `/api` 代理到 `http://localhost:8080`。不启动后端时，主站仍可使用内置图鉴数据。

构建与本地预览：

```bash
npm run build
npm run preview
```

构建产物位于 `dist/`。

## 内容维护

角色和版型有两层数据来源：

1. 后端 `GET /api/manual/content` 返回数据库中的最新内容。
2. `src/data/roles.js` 与 `src/data/variants.js` 提供内置兜底数据。

`src/data/content.js` 负责初始化数据并生成 `roleMap`、`variantMap`。数据库内容适合线上维护；内置数据用于容灾，修改后需要重新构建部署。

版型数据结构示例：

```js
{
  id: 'twelve-yunvliebai',
  name: '预女猎白',
  en: 'THE CLASSIC',
  players: 12,
  difficulty: 1,
  tags: ['经典', '新手入门'],
  summary: '…',
  config: [{ role: '角色id', count: 1 }],
  nightFlow: ['守卫（守护）', '…'],
  rules: ['屠边制：…'],
  guide: [{ title: '好人思路', points: ['…'] }],
}
```

术语位于 `src/data/glossary.js`，分为 `flow`、`id`、`tactic` 三组。术语锚点使用扁平数组下标，已有条目顺序应保持稳定，避免搜索链接失效。

## 目录结构

```text
src/
├── main.js                  # 路由、锚点滚动、动态标题与内容初始化
├── App.vue                  # 全站布局与导航
├── style.css                # 暗色主题和响应式样式
├── components/
│   ├── GlobalSearch.vue     # 全局搜索
│   └── RoleIcon.vue         # 角色图标
├── views/                   # 首页、规则、角色、版型等页面
├── admin/                   # 本地内容看板（不作为公开页面上线）
└── data/
    ├── content.js           # 后端数据加载与本地兜底
    ├── roles.js             # 内置角色数据
    ├── variants.js          # 内置版型数据
    └── glossary.js          # 术语数据
```

## 部署

本站使用相对资源路径和 Hash 路由，构建后将 `dist/` 交给静态服务器即可。社区前端部署在独立的 `/community/` 子路径，不要与本站 `dist/` 混放。

仓库所有者可使用本地 `deploy.sh` 完成构建、上传和线上检查。该脚本包含个人服务器配置，已被 `.gitignore` 排除；其他开发者可按自己的静态托管方式部署。
