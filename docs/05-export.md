# 05. 导出与 CLI 使用

## Marp CLI 命令行工具

### 基本命令

```bash
# 最简单的用法：Markdown → HTML
npx @marp-team/marp-cli@latest slide.md

# 指定输出文件
npx @marp-team/marp-cli@latest slide.md -o output.html

# 同时处理多个文件
npx @marp-team/marp-cli@latest slide1.md slide2.md -o dist/
```

### 所有导出格式

| 格式 | CLI 参数 | 是否需要浏览器 |
|------|----------|:---:|
| **HTML** | （默认输出） | ❌ 不需要 |
| **PDF** | `--pdf` | ✅ 需要 |
| **PPTX** | `--pptx` | ✅ 需要 |
| **PNG** | `--image png` | ✅ 需要 |
| **JPEG** | `--image jpeg` | ✅ 需要 |

### 常用选项

```bash
# 导出 PDF
npx @marp-team/marp-cli@latest slide.md --pdf

# 批量导出为 PNG 图片（每张幻灯片一张）
npx @marp-team/marp-cli@latest slide.md --images png -o ./images/

# 导出 PPTX
npx @marp-team/marp-cli@latest slide.md --pptx

# 监听模式（文件变化自动重新构建）
npx @marp-team/marp-cli@latest -w slide.md -o output.html

# 服务器模式（启动本地预览服务器）
npx @marp-team/marp-cli@latest -s ./

# 允许本地文件引用
npx @marp-team/marp-cli@latest --allow-local-files slide.md

# 允许 HTML 标签
npx @marp-team/marp-cli@latest --html slide.md

# 指定自定义主题
npx @marp-team/marp-cli@latest --theme custom.css slide.md

# 选择浏览器引擎
npx @marp-team/marp-cli@latest --browser firefox slide.md --pdf

# 使用 bespoke 模版（支持过渡动画）
npx @marp-team/marp-cli@latest --template bespoke slide.md -o output.html

# PDF 导出时包含演讲者备注
npx @marp-team/marp-cli@latest --pdf --pdf-notes slide.md
```

### 指定浏览器路径

如果浏览器不在默认位置，可以手动指定：

```bash
# Linux
marp --browser /usr/bin/google-chrome slide.md --pdf

# macOS
marp --browser /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome slide.md --pdf

# Windows
marp --browser "C:\Program Files\Google\Chrome\Application\chrome.exe" slide.md --pdf
```

## Marp for VS Code 导出

VS Code 插件中的导出方式和 CLI 略有不同：

| 格式 | 说明 |
|------|------|
| HTML | 完整导出 |
| PDF | 完整文档 |
| PPTX | PowerPoint 文档 |
| PNG | **仅导出第一页** |
| JPEG | **仅导出第一页** |
| TXT | **仅导出演讲者备注文本** |

### 操作方法

1. 打开 Markdown 文件（确保已激活 `marp: true`）
2. 点击右上角 Marp 图标 → 选择 "Export Slide Deck..."
3. 或使用命令面板：`Ctrl+Shift+P` → "Marp: Export Slide Deck"

---

## 浏览器依赖详解

### 为什么要浏览器？

PDF、PPTX 和图片格式的导出实际上是通过 **无头浏览器** 先渲染 HTML，再截取页面生成的。Marp CLI 使用 **puppeteer-core** 通过 CDP (Chrome DevTools Protocol) 或 WebDriver BiDi 协议控制本地浏览器实例。

### 支持的浏览器

| 浏览器 | 通信协议 |
|--------|----------|
| Google Chrome | CDP (Chrome DevTools Protocol) |
| Chromium | CDP |
| Microsoft Edge | CDP |
| Mozilla Firefox | WebDriver BiDi（v4.0.0 新增支持） |

### Docker 替代方案

如果不想在本地安装浏览器，可以使用官方 Docker 镜像（镜���已包含 Chrome）：

```bash
# 导出 PDF
docker run --rm -v $PWD:/home/marp/app marpteam/marp-cli slide.md --pdf

# 导出 PPTX
docker run --rm -v $PWD:/home/marp/app marpteam/marp-cli slide.md --pptx

# 导出 HTML（不需要浏览器，但 Docker 更方便部署）
docker run --rm -v $PWD:/home/marp/app marpteam/marp-cli slide.md -o output.html
```

---

## 配置文件

Marp CLI 使用 **cosmiconfig** 加载配置，支持多种格式：

```
.marprc.yml          ← YAML 格式
.marprc.yaml
.marprc.json         ← JSON 格式
.marprc.cjs          ← CommonJS 模块
marp.config.js       ← JavaScript 模块
marp.config.cjs
package.json 中的 "marp" 字段
```

### 配置示例 (`.marprc.yml`)

```yaml
# 默认输出目录
output: ./dist

# 全局选项
allowLocalFiles: true
html: true
theme: ./themes/custom.css

# 浏览器设置
browser: chrome
```

### 配置示例 (`marp.config.js`)

```javascript
module.exports = {
  output: './dist',
  allowLocalFiles: true,
  html: true,
  theme: './themes/custom.css',
}
```

---

## 关于 PPTX 的限制

PPTX 导出有一个重要的技术限制：**每张幻灯片被渲染为一张不可编辑的背景图片**。

这意味着：
- ❌ 在 PowerPoint 中无法直接编辑文字
- ❌ 无法修改图表数据
- ❌ 无法调整排版布局
- ✅ 可以添加额外的 PowerPoint 元素（文本框、形状等叠加在图片上）

Marp v4 引入了**实验性的可编辑 PPTX 模式**，但尚未稳定：

```bash
marp --pptx --pptx-editable slide.md  # 实验性功能
```

---

## 批量导出脚本示例

### 将所有 Markdown 文件导出为 HTML

```bash
for f in slides/*.md; do
  npx @marp-team/marp-cli@latest "$f" -o "dist/$(basename "$f" .md).html"
done
```

### 使用 Makefile 自动化

```makefile
SRC := $(wildcard slides/*.md)
HTML := $(SRC:slides/%.md=dist/%.html)
PDF := $(SRC:slides/%.md=dist/%.pdf)

all: html pdf

html: $(HTML)
dist/%.html: slides/%.md
	npx @marp-team/marp-cli@latest $< -o $@

pdf: $(PDF)
dist/%.pdf: slides/%.md
	npx @marp-team/marp-cli@latest $< --pdf -o $@

clean:
	rm -rf dist/*
```

### GitHub Actions 自动构建

```yaml
name: Build Slides
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npx @marp-team/marp-cli@latest slides/*.md -o dist/
      - uses: actions/upload-artifact@v4
        with:
          name: slides
          path: dist/
```
