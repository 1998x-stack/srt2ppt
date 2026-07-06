# 02. 幻灯片语法

## 核心概念

Marp 的语法建立在 **CommonMark**（标准 Markdown）之上，只增加了一个关键扩展：用 `---` 作为幻灯片分隔符。

## 幻灯片分隔符

### 基本用法

```markdown
# 第一页

内容写在这里

---

# 第二页

新的一页开始了
```

**`---`（三个短横线）= 新幻灯片**

### 重要：空行规则

```markdown
一些文字
---        ← ❌ 这会被解析为 setext 标题（h2），因为前面没有空行

一些文字

---        ← ✅ 正确识别为幻灯片分隔符
```

> **原因**：CommonMark 规范规定，`---` 跟在文本后面没有空行时，会被解析为二级标题的底部下划线。**在文字内容和 `---` 之间加一个空行**即可避免此问题。

## 标准 Markdown 语法

Marp 支持 CommonMark 的全部语法：

### 标题

```markdown
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
```

### 文本样式

```markdown
**粗体文本**
*斜体文本*
~~删除线~~
`行内代码`
```

### 列表

```markdown
- 无序列表项 1
- 无序列表项 2
  - 嵌套子项

1. 有序列表项 1
2. 有序列表项 2
```

### 代码块

````markdown
```python
def hello():
    print("Hello, Marp!")
```
````

### 引用

```markdown
> 这是一段引用文字
> 可以多行
```

### 图片

```markdown
![图片描述](image.png)
![图片描述](https://example.com/image.jpg)

<!-- 指定大小（HTML方式） -->
<img src="image.png" width="500" />
```

### 表格

```markdown
| 列1 | 列2 | 列3 |
|-----|-----|-----|
| A   | B   | C   |
| D   | E   | F   |
```

### 链接

```markdown
[链接文字](https://example.com)
```

### 水平线（注意：会变成幻灯片分隔符！）

```markdown
---    ← Marp 中这会创建新幻灯片，而不是水平线
***    ← 用星号代替短横线来画水平线
___    ← 用下划线代替短横线来画水平线
```

## 自动标题分页

使用 `headingDivider` 指令可按标题级别自动分割幻灯片：

```markdown
---
marp: true
headingDivider: 2    ← 每个二级标题前自动分页
---

# 主标题

这是第一页，包含主标题

## 第一章

这是第二页，由二级标题自动分割

## 第二章

这是第三页
```

支持的值：`1` ~ `6`（对应 h1 ~ h6）

## 排版增强

### 自适应标题

在标题行中插入 `<!--fit-->`，Marp 会自动调整字体大小使标题占满一行：

```markdown
# <!--fit--> 这是一个超级长的标题，字体会自动缩小以适应一行

# <!--fit--> 短标题也能自动放大
```

### 内容对齐

```markdown
<!-- _class: lead -->
# 居中标题页

这是类似封面或章节过渡页的效果
```

`lead` 类会在内置主题中居中显示内容。

### 分栏布局

Marp 没有内置的分栏语法，但可以通过自定义 CSS 实现，也可以使用 HTML table hack：

```html
<table>
<tr>
<td width="50%">

## 左栏内容

- 放在这里

</td>
<td width="50%">

## 右栏内容

- 放在那里

</td>
</tr>
</table>
```

## 完整示例

```markdown
---
marp: true
theme: default
size: 16:9
headingDivider: 2
---

# 我的演示文稿

**作者**: 张三
**日期**: 2026-07-06

---

## 项目背景

- 这是第一点
- 这是第二点
- 这是第三点

---

## 技术方案

1. 步骤一：环境搭建
2. 步骤二：核心开发
3. 步骤三：测试上线

---

## 代码示例

```python
import numpy as np

data = np.array([1, 2, 3, 4, 5])
print(f"均值: {data.mean()}")
```

---

## 总结

> 用 Markdown 写幻灯片，简单而强大。
```

## HTML 标签限制

出于安全考虑，Marp 默认**禁用了大部分 HTML 标签**，只允许 `<style>` 和 `<br />`。

如需使用其他 HTML 标签，需要在 CLI 中启用：

```bash
npx @marp-team/marp-cli@latest --html slide.md
```

> VS Code 扩展中也默认允许 HTML，但建议优先使用 Markdown 原生语法，以保证跨平台兼容性。
