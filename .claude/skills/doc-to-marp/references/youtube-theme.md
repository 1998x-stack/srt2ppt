# YouTube-Style Marp Theme

YouTube presentation style: dark backgrounds, neon accents, kinetic typography,
chapter markers, progress indicators. Bold, high-contrast, visually punchy.

## Color Palette

```yaml
youtube-dark:  "#0a0a0a"   # nearly black (main bg)
youtube-darker:"#141414"   # slightly lighter black
neon-red:      "#ff2d55"   # hot pink-red (emphasis)
neon-cyan:     "#00d4ff"   # electric cyan (highlights)
neon-yellow:   "#ffcc00"   # warm yellow (warnings, numbers)
neon-green:    "#00ff88"   # bright green (success, go)
neon-purple:   "#bf5af2"   # vivid purple (chapter accents)
white:         "#ffffff"
gray:          "#888888"
light-gray:    "#bbbbbb"
```

## Global Front-Matter Template

```yaml
---
marp: true
theme: uncover       # uncover works best for dark YouTube style
size: 16:9
paginate: false      # we use custom progress bar instead
style: |
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700;900&display=swap');

  :root {
    --dark: #0a0a0a;
    --neon-red: #ff2d55;
    --neon-cyan: #00d4ff;
    --neon-yellow: #ffcc00;
    --white: #ffffff;
    --gray: #888888;
    font-family: 'Noto Sans SC', system-ui, sans-serif;
  }

  section {
    background-color: var(--dark);
    color: var(--white);
    padding: 60px 80px;
  }

  h1 { font-size: 3.5em; font-weight: 900; color: var(--white); }
  h2 { font-size: 2.2em; font-weight: 700; color: var(--neon-cyan); }
  h3 { font-size: 1.6em; font-weight: 700; color: var(--white); }

  strong { color: var(--neon-red); }
  em { color: var(--neon-yellow); font-style: normal; }

  li { font-size: 1.3em; margin: 0.4em 0; }
  ul { list-style: none; padding-left: 0; }
  ul li::before { content: "▸"; color: var(--neon-red); margin-right: 0.5em; }

  blockquote {
    border-left: 4px solid var(--neon-cyan);
    padding: 1em 1.5em;
    font-size: 1.5em;
    font-style: italic;
    background: #1a1a2e;
  }

  table { width: 100%; border-collapse: collapse; margin: 1em 0; }
  th { background: var(--neon-red); color: white; padding: 0.5em; font-size: 1.2em; }
  td { padding: 0.4em; border-bottom: 1px solid #333; font-size: 1.1em; }

  code {
    background: #1e1e1e;
    color: var(--neon-cyan);
    padding: 0.2em 0.5em;
    border-radius: 4px;
    font-size: 0.9em;
  }

  /* Progress bar */
  section::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--neon-red), var(--neon-cyan));
  }
---
```

## Slide Patterns

### HOOK OPENER — Grab attention immediately

```markdown
<!-- _class: lead -->
# <!--fit--> [BOLD STATEMENT / HOOK]

![bg opacity:.15](cover-bg.jpg)
```

### CHAPTER MARKER — Show progress

```markdown
<!-- _class: lead -->
<!-- _backgroundColor: #bf5af2 -->

CHAPTER 01
# [CHAPTER TITLE]
⏱ `00:00` – `03:45`
```

### BIG NUMBER / STAT

```markdown
<!-- _class: lead -->
# **100 nm**
## 病毒颗粒直径

比细菌小 **10倍**
```

### COMPARISON — VS style

```markdown
# 🅰️ 寄生虫 VS 🅱️ 病毒

| | **寄生虫** | **病毒** |
|---|:---:|:---:|
| 独立代谢 | ✅ | ❌ |
| 自主繁殖 | ✅ | ❌ |
| 宿主外存活 | ✅ | 🔴 完全沉寂 |
```

### KEY INSIGHT — Bold claim

```markdown
<!-- _class: lead -->
# <!--fit--> 「病毒是完美的寄生者」
## 它把所有的生命活动都转交给了宿主
```

### COUNTDOWN / SEQUENCE

```markdown
<!-- _class: lead -->
# `01` 识别
# `02` 入侵
# `03` 复制
# `04` 释放
```

### TIMELINE — Visual narrative

```markdown
# ⏱ 病毒生命周期

| 阶段 | 时间 | 事件 |
|------|------|------|
| 🔵 吸附 | 0 min | 识别宿主细胞 |
| 🟢 入侵 | 5 min | 注入遗传物质 |
| 🟡 复制 | 30 min | 大量复制病毒 |
| 🔴 释放 | 60 min | 新病毒释放 |
```

### CALL TO ACTION — Closing

```markdown
<!-- _class: lead -->
# <!--fit--> 下一讲
## 病毒如何让人生病？
## ⏱ 第三章 — 即将更新
```

## Chapter Progress Bar (CSS)

Add this to the global style for section dividers:

```css
section.chapter::before {
  content: '';
  position: absolute;
  top: 20px;
  left: 80px;
  width: 40%;
  height: 3px;
  background: linear-gradient(90deg, var(--neon-red), var(--neon-cyan));
  border-radius: 2px;
}
```
