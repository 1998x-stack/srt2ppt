# 04. 主题系统

Marp Core 精确内置了 **三套官方主题**。这三套主题自 2018 年 v0.0.2 以来保持不变，没有新增也没有移除（截至 2026年7月的 v4.3.1）。

## 内置主题一览

### Default（默认主题）

```markdown
---
marp: true
theme: default
---
```

**特点：**
- 干净、极简风格
- 浅色背景
- 适合商务演示、技术分享
- 文字排版清晰，层次分明

### Gaia（盖亚主题）

```markdown
---
marp: true
theme: gaia
---
```

**特点：**
- 温暖的现代风格
- 双色调设计
- 适合作品展示、创意演示
- 标题有装饰性侧边条

### Uncover（揭幕主题）

```markdown
---
marp: true
theme: uncover
---
```

**特点：**
- 深色背景
- 全幅出血设计
- 极具视觉冲击力
- 适合产品发布、演讲开场

---

## 主题对比

| 特性 | Default | Gaia | Uncover |
|------|---------|------|---------|
| 背景色 | 白色 | 暖色渐变 | 深色 |
| 风格 | 商务极简 | 温暖现代 | 大胆暗色 |
| 适合场景 | 技术分享、会议 | 创意展示、课程 | 产品发布、演讲 |
| 页码显示 | 右下角 | 右下角 | 右下角 |
| 代码高亮 | 支持 | 支持 | 支持 |

---

## 为特定页面添加样式类

三套内置主题都支持通过 `class` 指令应用预设的页面布局：

### lead（居中页面）

```markdown
<!-- _class: lead -->
# 章节标题

适合作为封面或章节过渡页
```

### invert（反色）

```markdown
<!-- _class: invert -->
# 反色页面

在 Default 主题中切换为深色背景浅色文字
```

---

## 自定义 CSS 主题

### 方式一：通过 style 指令注入

在 front matter 中使用 `style` 指令写入内联 CSS：

```markdown
---
marp: true
theme: default
style: |
  section {
    font-family: 'Noto Sans SC', sans-serif;
  }
  h1 {
    color: #1565C0;
    font-size: 2.5em;
  }
  h2 {
    border-bottom: 3px solid #42A5F5;
    padding-bottom: 0.3em;
  }
  blockquote {
    border-left: 5px solid #FFA726;
    background: #FFF3E0;
    padding: 15px 20px;
  }
---
```

### 方式二：创建独立的 CSS 主题文件

Marp 支持通过 `@theme` 元数据指令定义自定义主题。主题 CSS 文件编写规则基于 [Marpit Theme CSS](https://marpit.marp.app/theme-css)：

```css
/* @theme my-custom-theme */

@import 'default'; /* 继承 default 主题 */

/* :root 在 Marpit 中指向每个 <section> 元素（每张幻灯片） */
:root {
  font-family: 'Noto Sans SC', sans-serif;
}

/* 标题样式 */
h1 {
  color: #1565C0;
  font-size: 2.5em;
}

h2 {
  border-bottom: 3px solid #42A5F5;
  padding-bottom: 0.3em;
}

/* 幻灯片分页样式（通过 data-marpit-pagination 属性选择） */
section::after {
  font-size: 0.6em;
  color: #999;
}
```

### 在 Marp 中使用自定义主题

```markdown
---
marp: true
theme: my-custom-theme
---
```

CLI 可以指定自定义主题文件或目录：

```bash
# 指定单个主题文件
marp --theme my-theme.css slide.md

# 指定主题目录（目录下的所有 CSS 文件都会被加载）
marp --theme ./themes/ slide.md
```

---

## 社区主题

除了三套官方内置主题，社区也贡献了大量第三方主题。可以关注 [awesome-marp](https://github.com/favorite/awesome-marp) 等精选列表获取更多主题，如：

- **Beam** — 模仿 LaTeX Beamer 风格
- **Dracula** — 基于流行 Dracula 配色方案
- **Nord** — 基于 Nord 配色方案
- **Academic** — 学术演示风格

---

## 主题定制要点

1. **`:root` 选择器**：在 Marpit 上下文中，`:root` 指向每个 `<section>` 元素（即每张幻灯片），而非 `<html>` 根元素
2. **尺寸单位**：主题中定义幻灯片尺寸必须使用**绝对长度单位**（如 `px`），不能使用相对单位（如 `%`、`vw`）
3. **继承内置主题**：使用 `@import 'default'` 继承内置主题，只覆盖需要修改的部分
4. **选择器优先级**：自定义样式利用 `section` 选择器的高优先级覆盖默认样式
