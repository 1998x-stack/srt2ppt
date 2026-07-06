# 03. 指令系统详解

Marp 的指令（Directives）系统是控制幻灯片外观和行为的核心机制。所有指令均经过 3 票对抗验证，来自官方文档。

## 两种语法形式

指令可以通过两种方式书写：

### 1. HTML 注释形式 `<!-- ... -->`

```markdown
<!-- theme: gaia -->
<!-- backgroundColor: #333 -->
<!-- _class: lead -->
```

- 可以放在文件的任何位置
- 适合在幻灯片中间插入局部指令
- **推荐用法**：在 YAML front matter 中设置全局，在 HTML 注释中设置局部

### 2. YAML Front Matter 形式

```markdown
---
marp: true
theme: gaia
size: 16:9
paginate: true
---
```

- **只能放在文件最开头**
- 适合设置全局指令
- 必须用 `---` 包裹

## 三种作用域

| 作用域 | 写法 | 生效范围 | 继承性 |
|--------|------|----------|--------|
| **全局** | `<!-- key: value -->` 在开头 | 整个文档 | — |
| **局部** | `<!-- key: value -->` 在任意位置 | 当前及后续幻灯片 | 被后续页继承，直到被覆盖 |
| **作用域** | `<!-- _key: value -->`（下划线前缀） | 仅当前幻灯片 | 不影响后续页 |

### 局部指令的继承

```markdown
---
marp: true
theme: default
---

# 第1页
<!-- color: red -->
# 第2页（文字是红色）
# 第3页（文字还是红色，继承了第2页的设置）
<!-- color: blue -->
# 第4页（文字是蓝色，覆盖了之前的设置）
```

### 作用域指令（下划线前缀）

```markdown
# 第1页（默认样式）
<!-- _backgroundColor: #ff9900 -->
# 第2页（只有这页背景是橙色）
# 第3页（恢复正常背景）
```

### 全局指令的覆盖规则

如果同一个全局指令被设置多次，Marp 使用**最后一次定义的值**：

```markdown
---
theme: default
---

<!-- theme: gaia -->    ← 实际生效的是这个（最后定义）
```

## 指令速查表

### 全局指令

| 指令 | 类型 | 可选值 | 说明 |
|------|------|--------|------|
| `marp` | boolean | `true` / `false` | 启用/禁用 Marp 功能（必须设为 true） |
| `theme` | string | `default` / `gaia` / `uncover` | 选择内置主题 |
| `size` | string | `4:3` / `16:9` / `A0`~`A6` / `letter` 等 | 幻灯片尺寸 |
| `headingDivider` | number | `1` ~ `6` | 按标题级别自动分页 |
| `math` | string | `mathjax`（默认）/ `katex` | 数学渲染引擎 |
| `style` | string | CSS 代码 | 注入全局自定义样式 |
| `title` | string | 任意文字 | 幻灯片标题（metadata） |
| `author` | string | 任意文字 | 作者信息（metadata） |
| `description` | string | 任意文字 | 描述信息（metadata） |
| `url` | string | URL | 幻灯片在线地址（metadata） |
| `image` | string | 图片URL | OGP分享图片（metadata） |

### 局部指令（可加 `_` 前缀变为作用域指令）

| 指令 | 类型 | 可选值 | 说明 |
|------|------|--------|------|
| `paginate` | boolean | `true` / `false` | 显示页码 |
| `header` | string | 任意文字 | 页眉内容 |
| `footer` | string | 任意文字 | 页脚内容 |
| `class` | string | CSS 类名 | 给 `<section>` 添加CSS类 |
| `color` | string | CSS颜色值 | 默认文字颜色 |
| `backgroundColor` | string | CSS颜色值 | 幻灯片背景色 |
| `backgroundImage` | string | 图片URL | 幻灯片背景图片 |
| `backgroundSize` | string | CSS尺寸 | 背景图片尺寸 |
| `backgroundPosition` | string | CSS位置 | 背景图片位置 |
| `backgroundRepeat` | string | CSS重复模式 | 背景图片平铺方式 |

## 使用示例

### 主题和尺寸

```markdown
---
marp: true
theme: gaia
size: 16:9
---
```

### 页码和页眉页脚

```markdown
---
marp: true
theme: default
paginate: true
header: '公司内部培训'
footer: '© 2026 Company Inc.'
---
```

### 背景色

```markdown
<!-- backgroundColor: #1a1a2e -->
<!-- color: white -->
# 深色背景幻灯片

<!-- _backgroundColor: #e94560 -->
# 只有这页是红色背景（作用域指令）
```

### 自定义 CSS

```markdown
---
marp: true
style: |
  h1 { color: #2196F3; }
  h2 { border-bottom: 2px solid #2196F3; }
  blockquote { border-left: 4px solid #FF9800; }
---
```

### 背景图片

```markdown
<!-- _backgroundImage: url('cover.jpg') -->
<!-- _backgroundSize: cover -->
# 封面标题

<!-- _backgroundImage: url('pattern.png') -->
<!-- _backgroundRepeat: repeat -->
# 纹理背景
```

## VS Code 中的指令智能提示

Marp for VS Code 提供了完善的指令 IntelliSense：
- **自动补全**：输入 `<!--` 自动提示可用指令
- **悬停提示**：鼠标悬停在指令上显示说明
- **诊断检查**：指令值错误时显示警告

## 注意事项

1. **作用域指令**（`_` 前缀）只在 Marp Core 中支持，Marpit 框架本身不解析作用域指令
2. `paginate: true` 默认从第1页开始计数——如需跳过封面，在封面页添加 `<!-- _paginate: false -->`
3. HTML 注释必须是完整的一行，不支持跨行注释
