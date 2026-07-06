# 01. Marp 简介与安装

## 什么是 Marp？

Marp 的全称是 **Markdown Presentation Ecosystem**（Markdown 演示生态系统），是一套用纯 Markdown 编写演示文稿的开源工具链。核心理念是：**用 Markdown 写内容，自动生成精美的幻灯片**。

Marp 由日本开发者 [@yhatt](https://github.com/yhatt) 创建，目前由 [marp-team](https://github.com/marp-team) 维护。

## 生态系统组成

Marp 包含 **七个子项目**：

```
Marp 生态系统
├── 框架/核心层
│   ├── Marpit        → 轻量级框架，将 Markdown 转为幻灯片
│   └── Marp Core     → 功能完备的转换器，内置主题
│
├── 用户工具
│   ├── Marp CLI      → 命令行工具（导出 HTML/PDF/PPTX/图片）
│   └── Marp for VS Code → VS Code 扩展（实时预览）
│
└── 已归档/不活跃
    ├── Marp Web      → PWA 网页应用
    ├── Marp React    → React 组件
    └── Marp Vue      → Vue 组件
```

**两个主要使用方式：**
1. **Marp CLI**：命令行工具，适合自动化构建、CI/CD 集成
2. **Marp for VS Code**：VS Code 插件，适合手动编辑和实时预览

## 安装方式

### 方式一：Marp CLI（命令行）

需要 **Node.js v18 或更高版本**（v4.x 系列；v3.x 仅需 Node.js 16+）：

```bash
# 临时使用（无需安装）
npx @marp-team/marp-cli@latest slide.md -o output.html

# 全局安装
npm install -g @marp-team/marp-cli

# 项目本地安装
npm install --save-dev @marp-team/marp-cli
```

### 方式二：Marp for VS Code

1. 在 VS Code 扩展市场搜索 **"Marp for VS Code"**
2. 安装 `marp-team.marp-vscode`
3. 在 Markdown 文件头部添加 `marp: true` 即可激活

```yaml
---
marp: true
---
```

### 方式三：Docker（免安装浏览器）

```bash
# 使用官方 Docker 镜像导出 PDF（镜像内已包含 Chrome）
docker run --rm -v $PWD:/home/marp/app marpteam/marp-cli slide.md --pdf
```

## 激活 Marp 功能

Marp 功能的激活方式是在 Markdown 文件的 **YAML 前置元数据（front matter）** 中声明：

```yaml
---
marp: true
---
```

- **VS Code 中**：添加后即可看到幻灯片预览
- **CLI 中**：这是文件被识别为 Marp 幻灯片的前提

如果不加 `marp: true`，文件会被当作普通 Markdown 处理。

## 前置需求汇总

| 功能 | 依赖 |
|------|------|
| 编辑/预览 Markdown | 无额外依赖 |
| 导出 HTML | 无额外依赖 |
| 导出 PDF | 需要 Chrome / Chromium / Edge / Firefox |
| 导出 PPTX | 需要 Chrome / Chromium / Edge / Firefox |
| 导出 PNG/JPEG | 需要 Chrome / Chromium / Edge / Firefox |
| 数学公式渲染 | 无额外依赖（MathJax 默认内嵌） |

> **注意**：Mar​p CLI 使用 **puppeteer-core** 控制浏览器，不会自动下载浏览器。请确保已安装 Chrome、Edge 或 Firefox。

## 版本历史要点

| 版本 | 时间 | 重要变更 |
|------|------|----------|
| v0.0.1 | 2018 | 首次发布，Default、Gaia 主题 |
| v0.0.2 | 2018 | 新增 Uncover 主题 |
| v3.2.0 | 2022.05 | MathJax 成为默认数学渲染引擎 |
| v4.0.0 | 2024.10 | 重大更新，Node.js 18+ 要求 |
| v4.4.0 | 2026.05 | 当前最新稳定版 |
