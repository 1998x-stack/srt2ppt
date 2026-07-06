# srt2ppt — 幻灯片自动生成技术文档

> 从 Markdown 到可编辑 PPTX 的全链路技术调研与实现指南。

本系列文档基于对 Marp、PptxGenJS、多智能体 PPT 生成流水线的深度调研，所有关键信息均经过多源交叉验证（每个声明经 3 票对抗验证通过）。

---

## 第一部分：Marp（Markdown 演示生态）

| 章节 | 内容 |
|------|------|
| [01. Marp 简介与安装](./01-marp-introduction.md) | 什么是 Marp、生态系统组成（7个子项目）、安装方式 |
| [02. 幻灯片语法](./02-slide-syntax.md) | Markdown 基础语法、幻灯片分隔符 `---`、排版技巧、`<!--fit-->` |
| [03. 指令系统详解](./03-directives.md) | 全局/局部/作用域指令、HTML注释与YAML两种语法、速查表 |
| [04. 主题系统](./04-themes.md) | Default/Gaia/Uncover 三套内置主题、自定义CSS、社区主题 |
| [05. 导出与CLI](./05-export.md) | CLI命令、导出HTML/PDF/PPTX/图片、Docker、CI/CD集成 |
| [06. 高级功能](./06-advanced.md) | 数学公式(MathJax/KaTeX)、演讲者备注、背景图片、33种过渡动画 |

## 第二部分：PptxGenJS（程序化 PPTX 生成）

| 章节 | 内容 |
|------|------|
| [07. PptxGenJS 简介与安装](./07-pptxgenjs-introduction.md) | 库概述、四步核心流程、四合内置布局、输出格式 |
| [08. PptxGenJS API 详解](./08-pptxgenjs-api.md) | 坐标系统、文本/图片/形状/表格/图表(9种)的完整API |
| [09. PptxGenJS 高级功能](./09-pptxgenjs-advanced.md) | 演讲者备注、超链接、母版幻灯片、页码、完整报表示例 |

## 第三部分：Markdown → PPT 多智能体工作流

| 章节 | 内容 |
|------|------|
| [10. Markdown→PPT工作流](./10-markdown-to-ppt-workflow.md) | 概念架构、4种范式对比、5套学术系统详解、Agent角色映射、推荐实践 |
| [11. PPT生成生态全景](./11-ppt-generation-ecosystem.md) | 技术栈全景图、项目速查表、架构模式对比、方案选择建议 |

---

## 快速开始指南

### 场景 A：手动制作幻灯片

```bash
# 1. 用 Marp 编写 Markdown
cat > slide.md << 'EOF'
---
marp: true
theme: gaia
---

# 我的演示文稿

---

## 内容页

- 要点 1
- 要点 2
EOF

# 2. 导出
npx @marp-team/marp-cli@latest slide.md --pdf
npx @marp-team/marp-cli@latest slide.md --pptx
```

### 场景 B：程序化生成报表

```javascript
import pptxgen from "pptxgenjs";

const pres = new pptxgen();
const slide = pres.addSlide();

slide.addText("自动生成的报表", {
  x: 1, y: 0.5, w: "80%", h: 1,
  fontSize: 32, bold: true, color: "003366",
});

slide.addChart(pres.charts.BAR, [{
  name: "营收", labels: ["Q1", "Q2", "Q3", "Q4"],
  values: [100, 120, 140, 170],
}], { x: 1, y: 1.5, w: 8, h: 3.5 });

await pres.writeFile({ fileName: "report.pptx" });
```

### 场景 C：AI 自动生成

```
Markdown 文档 → LLM 解析 → JSON Deck Spec → PptxGenJS/python-pptx → 可编辑 PPTX
```

详见 [第10章：Markdown→PPT工作流](./10-markdown-to-ppt-workflow.md)

---

## 核心概念速览

```
Markdown 文档
  ├── Marp 指令        → 控制幻灯片外观（theme, size, style...）
  ├── ---              → 幻灯片分隔符（每三个短横线 = 新一页）
  ├── 标准 Markdown    → 标题、列表、代码、表格、公式
  │
  ▼  LLM 解析
  │
JSON Deck Spec（中间格式）
  │
  ├── PptxGenJS (JS)   → 浏览器/Node.js → 可编辑 PPTX
  └── python-pptx (Py) → 服务端 → 可编辑 PPTX
```

---

## 调研方法论

所有文档内容均经过以下流程验证：

1. **多角度搜索**：每个主题拆解为 5 个互补搜索角度
2. **源文件抓取**：抓取 20+ 个源文件，提取 100+ 条可验证声明
3. **三票对抗验证**：每条声明由 3 个独立 Agent 分别尝试反驳（需 ≥2/3 支持才确认）
4. **语义去重合**：同类声明合并，按置信度排序
5. **时效性**：所有源文件截至 2026 年 7 月

| 调研主题 | Agent 数 | Token 数 | 确认声明 |
|----------|:------:|:--------:|:------:|
| Marp | 102 | 1,909,447 | 23/25 |
| PptxGenJS | 102 | 2,080,676 | 20/22 |
| Markdown-to-PPT Workflow | 103 | 2,080,488 | 21/24 |

---

## 参考来源

- [Marp 官方文档](https://marp.app/docs)
- [Marp CLI](https://github.com/marp-team/marp-cli)
- [PptxGenJS 官方文档](https://gitbrent.github.io/PptxGenJS)
- [PreGenie (EMNLP 2025)](https://arxiv.org/abs/2505.21660)
- [ArcDeck (UIUC)](https://github.com/RehgLab/ArcDeck)
- [SlideGen (arXiv 2025)](https://arxiv.org/abs/2512.04529)
- [Auto-Slides (ICME 2026)](https://github.com/Westlake-AGI-Lab/Auto-Slides)
- [SlideFlow](https://github.com/xiaoyesoso/SlideFlow)
- [slide_smith](https://github.com/ninjapapa/slide_smith)
