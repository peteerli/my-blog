# 龙傲天的创作笔记

龙傲天 / peteerli 的个人博客。内容围绕 YouTube、TikTok 和 X 上的创作方法。站点用 [Astro](https://astro.build/) 在构建时生成静态 HTML，适合 Cloudflare Pages 免费方案。页面默认不加载统计脚本。

YouTube 频道是 <https://www.youtube.com/@吴宗臻>。X（Twitter）是 <https://x.com/Zong32078Wuw3>（@Zong32078Wuw3，显示名龙傲天）。TikTok 仍是占位，页面上标了 **TODO**，定义在 `src/data/social.ts`。

## 本地预览

需要 Node.js 22.23.4 或更新版本（见 `.nvmrc`）。

```bash
npm install
npm run dev
```

浏览器打开 <http://localhost:4321>。

## 构建

```bash
npm run build
```

| 项 | 值 |
| --- | --- |
| 构建命令 | `npm run build` |
| 输出目录 | `dist` |
| 产物 | 静态 HTML、CSS，以及 Astro 处理过的资源 |

本地查看构建结果：

```bash
npm run preview
```

`wrangler.toml` 里的 `pages_build_output_dir` 也是 `./dist`，与上面一致。这个站点没有 Pages Functions。

## 推送到 main 即发布

生产分支是 `main`。合并或推送到 `main` 后，GitHub Actions（`.github/workflows/deploy.yml`）会安装依赖、执行 `npm run build`，再把 `dist` 上传到 Cloudflare Pages 项目 **`my-blog`**。

这条路径使用 API Token 做 Direct Upload，**不需要**把 Cloudflare 账号和 GitHub 做 OAuth 绑定。

Pages 项目请用 **Direct Upload** 创建，项目名填 `my-blog`。不要再给同一个项目接 Git 集成：Cloudflare 规定，用过 Git 集成的项目不能改成 Direct Upload。本仓库已经自己构建，控制台里不需要再填一套构建命令。若名称 `my-blog` 已被占用，同时修改 `wrangler.toml` 的 `name` 和工作流里的 `--project-name`。

默认访问域名是 `https://my-blog.pages.dev`。若实际域名不同，改 `astro.config.ts` 里的 `site`。

第一次推送时，若账号里还没有这个项目，Wrangler 会按项目名 `my-blog` 尝试创建。Token 需要有建立 Pages 项目的权限。

## 账号与密钥

在 GitHub 仓库打开 **Settings → Secrets and variables → Actions → New repository secret**，添加两个密钥。名字必须一致，工作流只从密钥读取，不会把 Token 或账号 ID 写进代码。

| Secret 名称 | 填什么 |
| --- | --- |
| `CLOUDFLARE_API_TOKEN` | API Token。在 [API Tokens](https://dash.cloudflare.com/profile/api-tokens) 创建自定义令牌，权限选 **Account → Cloudflare Pages → Edit**。不要使用 Global API Key，也不要把 Token 提交到仓库。 |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare 账号 ID。在控制台域名概览右侧 **API** 区域，或 Workers & Pages 页面的账户 URL 里可以看到。 |

账号 ID 示例（仅供对照，Action 仍然读取 secret，不要把 Token 写在旁边）：

```text
fd8499cb18e73345de00b39cb7069260
```

这是文档里的例子。请换成你自己账号里看到的 ID。

### Secrets (English)

1. Open the GitHub repository → **Settings → Secrets and variables → Actions → New repository secret**.
2. `CLOUDFLARE_API_TOKEN`: custom token with **Account → Cloudflare Pages → Edit**. Do not commit the token.
3. `CLOUDFLARE_ACCOUNT_ID`: your Cloudflare account ID. Example only: `fd8499cb18e73345de00b39cb7069260`.
4. Push to `main`. The workflow deploys directory `dist` to the Pages project named `my-blog`.

## 关于部署 Action

原计划使用 `cloudflare/pages-action@v1`（`apiToken`、`accountId`、`projectName: my-blog`、`directory: dist`）。2026-10-30 核对时，该仓库对 GitHub API 返回 404，官方已改用 [`cloudflare/wrangler-action`](https://github.com/cloudflare/wrangler-action)。当前工作流使用 `cloudflare/wrangler-action@v4`，执行：

```bash
pages deploy dist --project-name=my-blog --branch=main
```

密钥名仍是 `CLOUDFLARE_API_TOKEN` 和 `CLOUDFLARE_ACCOUNT_ID`。`gitHubToken` 使用 Actions 自带的 `GITHUB_TOKEN`（工作流已声明 `contents: read` 与 `deployments: write`），用来记录 GitHub Deployment。

说明见 [Use Direct Upload with continuous integration](https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/)。

## 写一篇新笔记

在 `src/content/blog/` 新增一个 Markdown 文件：

```markdown
---
title: "标题"
description: "列表页上的一句摘要"
pubDate: 2026-10-30
platform: YouTube
---

正文。`platform` 只能是 `YouTube`、`TikTok` 或 `X`。
```

文件名会成为地址，例如 `src/content/blog/new-note.md` 对应 `/posts/new-note`。保存后重新 `npm run dev` 或推送到 `main`。

## 页面

- `/` 首页：介绍、最近笔记、社交占位
- `/about` 关于
- `/posts` 文章列表
- `/posts/...` 三篇示例笔记（YouTube、TikTok、X）
- `/links` 链接说明与 TODO 占位地址

## 统计

默认关闭。页面里没有 Google Analytics 或其他第三方脚本。若以后要看访问量，可在 Cloudflare 控制台单独打开 Web Analytics，再把提供的 snippet 加进布局。不需要的话就保持现状。

构建脚本设置了 `ASTRO_TELEMETRY_DISABLED=1`，Astro 命令行的匿名使用统计也不会上报。
