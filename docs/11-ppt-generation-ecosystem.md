# 11. PPT 自动生成生态系统全景

本文档汇总 Markdown → PPT 自动生成领域的完整技术生态。

## 技术栈全景图

```
                        输入层
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼
    纯 Markdown      自然语言主题      PDF 论文
        │               │               │
        ▼               ▼               ▼
  ┌──────────────────────────────────────────┐
  │          内容理解 & 规划层                  │
  │                                          │
  │  ① LLM 解析结构化信息                     │
  │  ② 叙事结构设计（Story Line）              │
  │  ③ 布局类型选择                           │
  │  ④ 内容-布局匹配                          │
  │                                          │
  │  输出：JSON Deck Spec（统一的中间格式）     │
  └──────────────────────────────────────────┘
                        │
                        ▼
  ┌──────────────────────────────────────────┐
  │           渲染引擎层                       │
  │                                          │
  │  ┌─────────┐ ┌──────────┐ ┌───────────┐ │
  │  │ python- │ │PptxGenJS │ │  Slidev   │ │
  │  │  pptx   │ │  (JS)    │ │(Markdown) │ │
  │  └────┬────┘ └────┬─────┘ └─────┬─────┘ │
  │       │           │             │       │
  │  原生.pptx    原生.pptx    Markdown→HTML │
  │  完全可编辑   完全可编辑    (PPTX兼容性差) │
  └──────────────────────────────────────────┘
                        │
                        ▼
                  可编辑 PPTX
```

## 关键项目速查表

### 幻灯片生成项目

| 项目 | 语言 | 输入 | 输出 | 多Agent | 亮点 |
|------|:----:|------|------|:---:|------|
| [PreGenie](https://arxiv.org/abs/2505.21660) | Python | PDF | Slidev Markdown | ✅ 5个 | EMNLP 2025 |
| [ArcDeck](https://github.com/RehgLab/ArcDeck) | Python | PDF | PPTX | ✅ 5个 | RST篇章分析 |
| [SlideGen](https://arxiv.org/abs/2512.04529) | Python | PDF | PPTX | ✅ 6个 | 19种布局模板 |
| [Auto-Slides](https://github.com/Westlake-AGI-Lab/Auto-Slides) | Python | PDF | LaTeX | ✅ 6组件 | 验证修复循环 |
| [SlideFlow](https://github.com/xiaoyesoso/SlideFlow) | Python | 主题文本 | PPTX | ✅ 5节点 | MCP + LangGraph |
| [llm_pptx_deck_builder](https://github.com/jc7k/llm_pptx_deck_builder) | Python | 主题文本 | PPTX | ✅ 6节点 | LangGraph + RAG |
| [slide_smith](https://github.com/ninjapapa/slide_smith) | Python | JSON | PPTX | ❌ | 确定性渲染器 |

### Markdown → 幻灯片工具

| 工具 | 语言 | 输入 | 输出 | 适合场景 |
|------|:----:|------|------|----------|
| [Marp](https://github.com/marp-team/marp) | JS/TS | Markdown | HTML/PDF/PPTX/图片 | 开发者手动编写 |
| [Slidev](https://sli.dev/) | JS/TS | Markdown | HTML（PPTX有兼容问题） | 技术演讲 |
| [reveal.js](https://revealjs.com/) | JS | HTML/Markdown | HTML | Web演示 |
| [Pandoc](https://pandoc.org/) | Haskell | Markdown | PPTX（通过参考模板） | 简单转换 |
| [Quarto](https://quarto.org/) | JS/Python | Markdown | PPTX/Reveal.js/PDF | 科学计算文档 |

### PPTX 程序化生成库

| 库 | 语言 | 成熟度 | 亮点 |
|------|:----:|:------:|------|
| [python-pptx](https://github.com/scanny/python-pptx) | Python | ⭐⭐⭐⭐⭐ | 最成熟的 Python PPTX 库 |
| [PptxGenJS](https://github.com/gitbrent/PptxGenJS) | JavaScript | ⭐⭐⭐⭐⭐ | 跨平台，浏览器原生支持 |
| [Apache POI](https://poi.apache.org/) | Java | ⭐⭐⭐⭐⭐ | 企业级 Java Office 操作 |
| [OpenXML SDK](https://github.com/OfficeDev/Open-XML-SDK) | C# | ⭐⭐⭐⭐ | 微软官方 SDK |

---

## 架构模式总结

### 模式 A：端到端多 Agent（学术主流）

```
优缺点：
✅ 自动化程度最高（PDF in, PPTX out）
✅ 学术验证过质量
❌ 输入限于 PDF 论文
❌ 需要多个 LLM 调用，成本高
❌ 质量波动大，依赖 prompt 工程
```

### 模式 B：Agent-Driven 搜索+生成（新兴方向）

```
优缺点：
✅ 不需要预先准备内容（从零生成）
✅ 适合知识性/科普型演示
❌ 事实准确性依赖搜索质量
❌ 缺乏深度和原创性
```

### 模式 C：AI 决策 + 确定性渲染（推荐实践）

```
优缺点：
✅ LLM 只做决策，不做渲染（确定性、可靠）
✅ JSON 中间格式清晰，易于调试
✅ 布局模板可扩展
✅ 输出完全可编辑
❌ 需要设计 JSON Schema 和模板库
❌ 需要较多的 initial setup
```

### 模式 D：声明式 Markdown（最轻量）

```
优缺点：
✅ 学习成本最低
✅ 人可读写，版本控制友好
❌ PPTX 中不可编辑（渲染为图片）
❌ 布局灵活性有限
❌ 无法表达复杂的视觉设计
```

---

## 选择建议

| 你的情况 | 推荐方案 |
|----------|----------|
| 手动制作技术演讲 | **Marp** — 最快上手 |
| 程序化生成报表/数据分析 | **PptxGenJS** 或 **python-pptx** |
| 需要 AI 全自动生成 | **模式 C**：LLM → JSON → 确定性渲染 |
| 学术论文转演讲 | **ArcDeck** 或 **SlideGen** |
| 与 AI Coding Agent 集成 | **slide_smith** — 专为 Agent 设计 |
| 只需要 HTML 演讲 | **Marp CLI** 或 **Slidev** |

---

## 技术栈推荐组合

### 方案一：全 JavaScript 技术栈

```
Marp（Markdown 编辑/预览）
  +
PptxGenJS（PPTX 程序化生成）
  +
LLM API（内容理解/布局决策）
  +
自定义 JSON Schema（中间格式）
```

### 方案二：全 Python 技术栈

```
python-pptx（PPTX 生成）
  +
slide_smith（JSON → PPTX 渲染）
  +
LangGraph（多 Agent 编排）
  +
LlamaIndex（知识库索引）
```

### 方案三：混合技术栈（当前项目 srt2ppt）

```
Marp（Markdown → 初版幻灯片预览）
  +
LLM（内容解析、大纲设计、布局决策）
  +
PptxGenJS 或 python-pptx（PPTX 精确渲染）
  +
自定义布局模板库
```

---

## 未来趋势

1. **JSON Deck Spec 标准化**：社区可能会形成统一的幻灯片描述 JSON 格式，相当于幻灯片领域的 Markdown
2. **Agent-First 设计**：工具越来越倾向于被 AI Agent 调用（如 slide_smith 的设计），而非直接面向人类用户
3. **多模态输入**：从纯文本 → 文本+图片+数据+音频 → 完整演示文稿
4. **交互式生成**：不再是一键生成，而是 AI 与用户协作迭代
5. **布局智能选择**：SlideGen 的 19 模板 + Arranger 模式将成为标配
