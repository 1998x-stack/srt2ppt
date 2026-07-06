# 10. Markdown → PPT 多智能体工作流

## 概念架构

将 Markdown 内容转换为专业 PPT 演示文稿的理想多智能体流水线架构如下：

```
              用户输入 Prompt
                    │
                    ▼
        ① Task Planner（任务规划器）
         LLM 分析需求，拆解任务
                    │
    ┌───────────────┼───────────────┐
    ▼               ▼               ▼
② Research Agent  ③ Outline Agent  ④ Visual Agent
   搜索/知识整合      叙事结构设计       图片/图表/图示
   网页搜索            Story Line        Diagram
                    │
    └───────────────┼───────────────┘
                    ▼
        ⑤ Presentation Planner
        （决定每页的布局类型）
          Title | Timeline | Comparison
          Matrix | Process | Chart
          Table | Roadmap | Big Number
                    │
                    ▼
        ⑥ Layout Generator
        将内容映射到具体布局模板
                    │
                    ▼
        ⑦ PPT Rendering Engine
        生成可编辑的 PPTX 文件
                    │
                    ▼
              可编辑 PPTX
```

## 现实中的实现

深度调研发现，**目前没有完全符合上述架构的开源实现**。但存在四种不同的范式，它们各自实现了该架构的部分环节。

---

## 范式对比

| 范式 | 代表项目 | 输入 | 输出 | 多Agent | 技术栈 |
|------|----------|------|------|:---:|--------|
| **学术PDF→Slide** | PreGenie, ArcDeck, SlideGen, Auto-Slides | PDF论文 | PPTX / Slidev / LaTeX | ✅ | 多个LLM/VLM |
| **网络搜索→PPTX** | SlideFlow, llm_pptx_deck_builder | 主题文本 | PPTX (python-pptx) | ✅ | LangGraph |
| **确定性渲染** | slide_smith | JSON Deck Spec | PPTX | ❌ | Python |
| **商业SaaS** | Gamma, Beautiful.ai | 自然语言/大纲 | 在线幻灯片 | 内部实现未知 | 闭源 |

---

## 范式一：学术 PDF → Slide 多智能体系统

这是最接近"多智能体协作"的领域，但输入是学术 PDF 而非 Markdown。

### PreGenie（EMNLP 2025 Findings）

**技术栈**：5 个 Agent + Slidev（Markdown-based 幻灯片框架）

```
PDF → Text Summarizer (LLM) → Code Generator (LLM)
  │         ↓                        ↓
  └→ Image Captioner (VLM)   Code Reviewer (LLM)
                                ↓
                          Page Reviewer (VLM)
                                ↓
                          Slidev Markdown → HTML/PPTX
```

- **5 个 Agent**：Text Summarizer、Image Captioner、Code Generator、Code Reviewer、Page Reviewer
- **两阶段流程**：生成 → 逐页迭代审查修正
- **输出**：Slidev Markdown 代码，通过 Slidev 渲染
- **局限**：作者明确表示"Slidev 与 PPT 的兼容性并不无缝"

### ArcDeck（UIUC RehgLab, arXiv 2026）

**技术栈**：5 个 Agent + RST Discourse Parsing + python-pptx

```
PDF → Discourse Parser → Commitment Builder → Slide Planner/Reviser
                                │
                          Narrative Critic → Narrative Judge
                         (修订或通过，最多3轮)
                                ↓
                          原生 .pptx (python-pptx)
```

- **5 个 Agent**：Discourse Parser、Commitment Builder、Slide Planner/Reviser、Narrative Critic、Narrative Judge
- **核心创新**：使用修辞结构理论（RST）将 PDF 解析为二进制的篇章树，识别段落间的关系
- **质量控制**：Narrative Critic + Judge 组成 revise-or-pass 循环，最多 3 轮
- **输出**：原生 .pptx（通过 python-pptx 生成）

### SlideGen（Y-Research-SBU, arXiv 2025）

**技术栈**：6 个 Agent + 19 种布局模板

```
PDF → Outliner → Mapper → Formulizer → Arranger → Refiner → Speaker
                      ↓                    ↓
                 内容映射           从19种布局中
              (哪些内容到哪些页)     选择最优布局
```

- **6 个 Agent**：Outliner、Mapper、Formulizer、Arranger、Refiner、Speaker
- **核心创新**：可扩展的 **19 种布局模板库**，Arranger 根据内容类型、元素数量和视觉宽高比自动选择
- 输出带演讲者备注的可编辑 PPTX

### Auto-Slides（Westlake-AGI-Lab, ICME 2026）

```
PDF → Parser → Presentation Planner → LaTeX Generator
                     ↓                       ↓
            Verification Agent → Repair Agent  交互式编辑器
            (默认启用，可禁用以加速)
```

- **6 个组件**：PDF Parser、Presentation Planner、Verification、Repair、LaTeX Generator、Interactive Editor
- **质量保证**：Verification + Repair Agent 默认启用，有 `--disable-verification` 快模式
- **交互修正**：支持自然语言反馈的迭代修订
- **输出**：LaTeX（非 PPTX，需额外转换）

---

## 范式二：LangGraph 网络搜索 → PPTX

这两个项目最接近"给主题，自动生成 PPT"的场景。

### SlideFlow（xiaoyesoso, 2026）

**5 节点 LangGraph DAG 流水线**：

```
search_outline
      │
      ├──→ chapter_content ─╮
      │                     ├→ pdf_synthesis → html_to_pptx
      └──→ page_generation ─╯   (并行)          (最终输出)
```

- **输入**：主题文本（非 Markdown）
- **流程**：搜索大纲 → 并行（章节内容 + 页面生成）→ PDF 合成 → HTML 转 PPTX
- **MCP 服务器**：暴露 **10 个原子工具**，供外部 AI Agent（如 Claude Code）调用
- **推荐模型**：Claude 3.5 Sonnet 或 GPT-4o

### llm_pptx_deck_builder（jc7k, 2026）

**6 节点顺序 LangGraph 流水线**：

```
START → research → load_docs → create_index → generate_outline
                                                     ↓
                                              generate_content
                                                     ↓
                                           create_presentation
                                                     ↓
                                                    END
```

- **输入**：纯文本主题（`--topic` CLI 参数）
- **流程**：搜索（Brave Search API）→ 加载文档 → 创建索引（LlamaIndex）→ 生成大纲 → 生成内容 → 创建 PPTX
- **内部格式**：使用 Pydantic 模型定义的 JSON 结构，LLM 生成结构化幻灯片描述，python-pptx 渲染

---

## 范式三：确定性 JSON → PPTX 渲染

### slide_smith（ninjapapa, v3.1.0）

> "Slide Smith is a deterministic PPTX tool, not an LLM."

- **定位**：确定性的 JSON Deck Spec → PPTX 渲染器
- **设计哲学**：不包含 LLM 调用、不包含 Agent 编排、不包含非确定性元素
- **目标用户**：外部 AI Coding Agent（如 Claude Code、Copilot）调用它来生成 PPTX
- **核心流程**：`normalize → load template → iterate slides → render each → save`
- **特色功能**：可迭代编辑（incremental editing）、模板系统、基于 python-pptx

> 这是最务实的方案：将"AI 理解内容并决定布局"交给外部 LLM Agent 处理，"精确渲染 PPTX"交给确定性工具。

---

## 布局生成器设计参考

虽然没有项目完整实现了概念架构中的 Layout Generator，但 SlideGen 的 **19 种布局模板分类**提供了最佳参考：

### 布局类型体系

| 大类 | 具体布局 | 适用内容 |
|------|----------|----------|
| **标题页** | Title, Section Header | 封面、章节过渡 |
| **文本型** | Text Only, Bullet List, Two Column | 文字内容、列表 |
| **图表型** | Chart, Table, Big Number | 数据展示 |
| **对比型** | Comparison, Matrix, Pros/Cons | 对比分析 |
| **流程型** | Process, Timeline, Roadmap | 时间线、步骤 |
| **图文型** | Image + Text, Gallery, Icon Grid | 图文混排 |
| **总结型** | Summary, Thank You, Contact | 结束页 |

Arranger agent 的决策逻辑：

```
输入：幻灯片内容（元素数量、类型、文本长度、图片比例）
  ↓
匹配布局模板库
  ↓
评分：内容适配度 × 视觉效果 × 空间利用率
  ↓
选择最高分布局
```

---

## Agent 角色映射

将五套系统的 agent 命名映射到概念架构：

| 概念角色 | PreGenie | ArcDeck | SlideGen | SlideFlow | llm_pptx_deck_builder |
|----------|----------|---------|----------|-----------|----------------------|
| Task Planner | — | — | — | search_outline | generate_outline |
| Research | —（输入是PDF）| —（输入是PDF）| —（输入是PDF）| search_outline | research |
| Outline | — | Discourse Parser | Outliner | chapter_content | generate_outline |
| Visual | Image Captioner | — | — | — | — |
| Content Writer | Code Generator | Slide Planner | Mapper + Formulizer | page_generation | generate_content |
| Layout | — | — | Arranger（19模板）| — | — |
| Reviewer | Code Reviewer + Page Reviewer | Narrative Critic + Judge | Refiner | — | — |
| Renderer | Slidev | python-pptx | python-pptx | html_to_pptx | create_presentation |

---

## 推荐的实践架构

综合调研结果，推荐以下架构用于 Markdown → PPT 的实际构建：

```
                  Markdown 文档
                       │
                       ▼
         ① Content Analyzer (LLM Call)
            - 解析章节结构
            - 提取关键信息
            - 识别数据点（适合图表的）
                       │
                       ▼
         ② Outline Designer (LLM Call)
            - 设计叙事流程
            - 确定幻灯片数量和类型
            - 输出：JSON Slide Plan
                       │
                       ▼
         ③ Layout Assigner (规则引擎 + LLM)
            - 为每页分配布局模板
            - 标题/列表/对比/图表/时间线等
            - 输出：JSON Deck Spec
                       │
                       ▼
         ④ PPTX Renderer (确定性的)
            - python-pptx（Python）
            - 或 PptxGenJS（JavaScript）
            - 按 JSON Deck Spec 精确渲染
            - 输出：可编辑的 .pptx
```

### 关键设计原则

1. **LLM 负责"决策"，不负责"渲染"**：LLM 生成结构化的幻灯片描述（JSON），确定性引擎渲染
2. **JSON 作为中间格式**：JSON Deck Spec 作为 LLM 和渲染引擎之间的契约
3. **布局模板库可扩展**：支持添加新的布局类型而不改动核心逻辑
4. **分离内容和样式**：LLM 决定内容/结构，模板决定视觉风格

---

## 商业工具简述

| 工具 | 输入方式 | 核心能力 | 开源 |
|------|----------|----------|:--:|
| **Gamma** | 自然语言/大纲 | AI 一键生成整份演示文稿 | ❌ |
| **Beautiful.ai** | 内容编辑 | 智能布局自适应 + 设计约束 | ❌ |
| **Slidev** | Markdown | 开发者友好的代码驱动幻灯片 | ✅ |
| **Canva** | 模板编辑 | AI 辅助设计 + 丰富模板 | ❌ |

> 深度调研发现，这些商业工具在开源学术文献中几乎完全未被引用或复现。
