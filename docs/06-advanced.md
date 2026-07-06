# 06. 高级功能

## 数学公式

Marp 使用 **Pandoc 风格的 Markdown 数学语法**，默认使用 **MathJax** 渲染（自 v3.2.0 起）。

### 基本语法

```markdown
行内公式：$E = mc^2$

块级公式（独立成行居中显示）：

$$
\frac{\partial u}{\partial t} = h^2 \left(
  \frac{\partial^2 u}{\partial x^2} +
  \frac{\partial^2 u}{\partial y^2} +
  \frac{\partial^2 u}{\partial z^2}
\right)
$$
```

### 常用示例

```markdown
$$
\begin{aligned}
\nabla \times \vec{E} &= -\frac{\partial \vec{B}}{\partial t} \\
\nabla \times \vec{B} &= \mu_0 \vec{J} + \mu_0 \epsilon_0 \frac{\partial \vec{E}}{\partial t}
\end{aligned}
$$

$$
f(x) = \int_{-\infty}^{\infty} \hat{f}(\xi) e^{2\pi i \xi x} d\xi
$$

$$
P(A|B) = \frac{P(B|A)P(A)}{P(B)}
$$
```

### 切换为 KaTeX

Marp 默认使用 MathJax，但可以切换到 KaTeX（渲染速度更快，但语法支持更严格）：

```yaml
---
marp: true
math: katex
---
```

或者通过 HTML 注释指令：

```markdown
<!-- math: katex -->
```

**MathJax vs KaTeX：**
| 特性 | MathJax | KaTeX |
|------|---------|-------|
| 渲染速度 | 稍慢 | 更快 |
| 语法支持 | 完整 LaTeX | 大部分 LaTeX |
| 宏/扩展 | 丰富 | 有限 |
| 默认引擎 | ✅ 是 | ❌ 否 |

---

## 演讲者备注（Speaker Notes）

演讲者备注可以让你在演示时看到观众看不到的提示内容。Marp 支持两种语法：

### 方法一：HTML 注释方式

```markdown
# 幻灯片标题

- 公开内容 A
- 公开内容 B

<!--
演讲者备注写在这里：
- 提醒自己讲这个案例
- 可以放详细数据和补充说明
- 观众看不到这些内容
-->
```

### 方法二：`<!-- presenter:` 指令

```markdown
# 幻灯片标题

<!-- presenter: 这是演讲者备注的内容 -->
```

### 查看备注

- **VS Code**：在预览窗口中切换到 "Presenter View"
- **CLI 导出 PDF**：使用 `--pdf-notes` 参数可将备注包含在 PDF 中

```bash
marp slide.md --pdf --pdf-notes
```

- **CLI 导出 TXT**：可以单独导出纯文本备注文件

```bash
marp slide.md --notes -o notes.txt
```

### 备注的局限性

备注内容只在 **HTML 导出** 和 **VS Code 演示者视图** 中显示。导出为 PDF/PPTX/图片时备注会被忽略（除非使用了 `--pdf-notes`）。

---

## 背景图片配置

### 单页背景

```markdown
<!-- _backgroundImage: url('cover.jpg') -->
<!-- _backgroundSize: cover -->
<!-- _backgroundPosition: center -->
# 封面标题
```

### 全局背景（所有页）

```yaml
---
marp: true
backgroundImage: url('bg.png')
backgroundSize: cover
---
```

### 背景图片相关指令

```markdown
<!-- _backgroundImage: url('pattern.png') -->
<!-- _backgroundSize: 200px -->
<!-- _backgroundRepeat: repeat -->
<!-- _backgroundPosition: top left -->
```

所有 `backgroundXxx` 指令都接受 CSS 值，与 CSS 的 `background-*` 属性一一对应：

| 指令 | CSS 属性 | 常用值 |
|------|----------|--------|
| `backgroundImage` | `background-image` | `url('...')` |
| `backgroundSize` | `background-size` | `cover`, `contain`, `100%`, `200px` |
| `backgroundPosition` | `background-position` | `center`, `top left`, `50% 50%` |
| `backgroundRepeat` | `background-repeat` | `no-repeat`, `repeat`, `repeat-x` |

---

## 过渡动画

Marp CLI 提供了 **bespoke 模板**，内置 33 种幻灯片过渡动画：

```bash
marp --template bespoke slide.md -o output.html
```

### 配置过渡效果

```yaml
---
marp: true
theme: uncover
transition: fade
---
```

### 33 种内置过渡

| 类别 | 效果名称 |
|------|----------|
| 基础 | `none`, `fade`, `fade-out` |
| 滑动 | `slide`, `cover`, `reveal`, `push`, `pull`, `swipe`, `swoosh` |
| 擦除 | `wipe`, `wiper`, `overlap`, `swap` |
| 3D 效果 | `cube`, `cylinder`, `diamond`, `star`, `pivot`, `rotate` |
| 特效 | `drop`, `explode`, `implode`, `glow`, `melt` |
| 遮罩 | `iris-in`, `iris-out` |
| 旋转 | `clockwise`, `counterclockwise` |
| 滑动 | `coverflow`, `fall` |
| 缩放 | `zoom`, `flip`, `in-out` |

### 逐条显示（Fragmented List）

在 HTML 导出（bespoke 模板）中，列表项可以逐条显示：

```markdown
* 第一点
* 第二点
* 第三点
```

需要配合 bespoke 模板使用。**注意**：逐条显示效果只在 HTML 导出中有效，导出为 PDF/PPTX 时列表会完整显示。

---

## 代码高亮

Marp 使用 Highlight.js 进行代码语法高亮：

````markdown
```javascript
const greeting = 'Hello, Marp!'
console.log(greeting)

// 箭头函数
const add = (a, b) => a + b
```

```python
from typing import List

def process_data(data: List[int]) -> int:
    """处理数据并返回结果"""
    return sum(data)
```

```sql
SELECT user_id, COUNT(*) as cnt
FROM orders
WHERE created_at > '2026-01-01'
GROUP BY user_id
ORDER BY cnt DESC
LIMIT 10
```
````

### 行号显示

部分主题支持代码行号，可以在 `style` 中自定义代码块样式：

```markdown
---
marp: true
style: |
  pre {
    border-radius: 8px;
  }
  code {
    font-family: 'Fira Code', monospace;
  }
---
```

---

## 自定义 CSS 高级技巧

### 分栏布局

```markdown
---
marp: true
style: |
  .columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
---

<div class="columns">
<div>

## 左栏

- 内容 A
- 内容 B

</div>
<div>

## 右栏

- 内容 C
- 内容 D

</div>
</div>
```

### 特殊文本框

```markdown
---
marp: true
style: |
  .info-box {
    background: #E3F2FD;
    border-left: 4px solid #2196F3;
    padding: 1rem;
    margin: 1rem 0;
  }
  .warning-box {
    background: #FFF3E0;
    border-left: 4px solid #FF9800;
    padding: 1rem;
    margin: 1rem 0;
  }
---

<div class="info-box">

**提示**：这是一个信息框

</div>

<div class="warning-box">

**注意**：这是一个警告框

</div>
```

### 全屏图片背景 + 文字叠加

```markdown
<!-- _class: invert -->
<!-- _backgroundImage: url('hero.jpg') -->
<!-- _backgroundSize: cover -->

# <!--fit--> 标题覆盖在图片上
```

---

## 标题自适应（fit）

`<!--fit-->` 标记可以让标题自动缩放以填充一行：

```markdown
# <!--fit--> 这个标题无论多长，都会自动缩小字号以适应一行宽度

# <!--fit--> 短标题
```

这对于不确定标题长度、需要动态调整的场景非常有用。

---

## VS Code 高级功能

### 演示者视图（Presenter View）

VS Code 扩展支持演示者视图：
1. 打开 Marp Markdown 文件
2. 点击右上角预览图标旁的下拉菜单
3. 选择 "Open Presenter View"

### 大纲视图

使用 `headingDivider` 指令可以自动从标题生成幻灯片大纲：

```yaml
---
marp: true
headingDivider: 2   # 按 H2 自动分页
---
```

### 实时预览同步

编辑 Markdown 时，预览窗口会实时更新。滚动位置会在编辑器和预览之间同步。

---

## 性能与最佳实践

1. **大型幻灯片**：如果幻灯片数量很多（100+），建议拆分多个文件
2. **图片优化**：使用合理尺寸的图片（建议不超过 1920x1080），避免拖慢导出速度
3. **自定义字体**：使用 web font 时注意加载时间，可在 `style` 中通过 `@import` 引入
4. **缓存复用**：CLI 的 `-w` 模式支持增量构建，开发时推荐使用
5. **CI/CD 集成**：在自动化流程中使用 Docker 镜像可避免浏览器安装问题

---

## 已知限制

| 限制 | 说明 |
|------|------|
| PPTX 不可编辑 | 幻灯片在 PowerPoint 中为背景图片，文字不可编辑（实验性可编辑模式除外） |
| 逐条显示 | 仅在 HTML 导出（bespoke 模板）中支持，PDF/PPTX 中无效 |
| HTML 标签 | 默认禁用大部分 HTML 标签，仅允许 `<style>` 和 `<br>` |
| VS Code 图片导出 | 仅导出第一张幻灯片 |
| 自定义字体 | 导出 PDF/PPTX 时，未安装的字体可能被替换 |
