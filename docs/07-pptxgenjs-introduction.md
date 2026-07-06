# 07. PptxGenJS 简介与安装

## 什么是 PptxGenJS？

**PptxGenJS** 是一个 JavaScript/TypeScript 开源库，用于**通过代码程序化地创建 PowerPoint (.pptx) 文件**。它不依赖 PowerPoint 软件本身，可在任何现代浏览器、Node.js、React、Angular、Vite 和 Electron 环境中运行。

- **仓库地址**：[gitbrent/PptxGenJS](https://github.com/gitbrent/PptxGenJS)
- **当前版本**：v4.x（含完整 TypeScript 类型定义）
- **许可证**：MIT

## 为什么选择 PptxGenJS？

| 特性 | 说明 |
|------|------|
| **纯 JavaScript** | 无需 PowerPoint，无需 LibreOffice，无需浏览器插件 |
| **跨平台** | 浏览器 + Node.js 通吃 |
| **完整的 .pptx** | 生成标准 OOXML 格式，所有主流 PPT 软件可打开 |
| **TS 支持** | 自带 `.d.ts` 类型定义 |
| **轻量** | 不依赖 Canvas 核心功能，树摇友好 |

## 安装方式

### Node.js（推荐）

```bash
npm install pptxgenjs
# 或
yarn add pptxgenjs
```

```javascript
// ES Module
import pptxgen from "pptxgenjs";
const pres = new pptxgen();

// CommonJS
const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
```

### 浏览器（CDN）

```html
<script src="https://cdn.jsdelivr.net/gh/gitbrent/PptxGenJS/dist/pptxgen.bundle.js"></script>
<script>
  // 注意：浏览器中类名首字母大写！
  let pres = new PptxGenJS();
</script>
```

### React / Angular / Vite

```javascript
import pptxgen from "pptxgenjs";

function generatePPT() {
  const pres = new pptxgen();
  // ... 构建幻灯片
  pres.writeFile({ fileName: "output.pptx" });
}
```

## 四步核心流程

PptxGenJS 的使用遵循一个简单的四步模式：

```
① new pptxgen()  →  ② pres.addSlide()  →  ③ slide.addText()...  →  ④ pres.writeFile()
   创建演示文稿         添加幻灯片            添加内容元素               保存文件
```

```javascript
// ① 创建演示文稿
const pptx = new pptxgen();

// ② 添加幻灯片
const slide = pptx.addSlide();

// ③ 添加内容
slide.addText("Hello, World!", {
  x: 1.0, y: 0.5, w: "80%", h: 1.0,
  fontSize: 32,
  color: "3366CC",
  align: "center",
});

// ④ 保存文件
await pptx.writeFile({ fileName: "hello-world.pptx" });
console.log("演示文稿已创建！");
```

## 支持的输出格式

PptxGenJS 的 `write()` 方法（以及 `writeFile()`）支持**六种输出格式**：

| 格式 | outputType 值 | 使用场景 |
|------|---------------|----------|
| Blob | `"blob"` | 浏览器下载 |
| ArrayBuffer | `"arraybuffer"` | 二进制处理 |
| Base64 字符串 | `"base64"` | API 传输 |
| Node.js Buffer | `"nodebuffer"` | Node.js 文件系统写入 |
| 二进制字符串 | `"binarystring"` | 兼容旧系统 |
| Uint8Array | `"uint8array"` | 流式处理 |

```javascript
// writeFile — 在 Node.js 中写文件，在浏览器中触发下载
await pptx.writeFile({ fileName: "demo.pptx" });

// write — 返回指定格式的数据
const base64 = await pptx.write({ outputType: "base64" });
const blob = await pptx.write({ outputType: "blob" });
```

> **注意**：所有保存方法都返回 **Promise**，必须 `await` 或 `.then()`。

## 演示文稿全局设置

```javascript
const pptx = new pptxgen();

// 设置演示文稿属性
pptx.layout = "LAYOUT_WIDE";      // 页面尺寸
pptx.author = "作者名";
pptx.company = "公司名";
pptx.subject = "主题";
pptx.title = "标题";

// 只读版本号
console.log(pptx.version);         // "4.0.0"
```

## 内置布局预设

PptxGenJS 提供 **四套内置布局**：

| 预设 | 尺寸（英寸） | 比例 | 说明 |
|------|:------------:|:----:|------|
| `LAYOUT_16x9` | 10 × 5.625 | 16:9 | **默认布局**，最常用 |
| `LAYOUT_16x10` | 10 × 6.25 | 16:10 | MacBook 屏幕比例 |
| `LAYOUT_4x3` | 10 × 7.5 | 4:3 | 传统投影仪 |
| `LAYOUT_WIDE` | 13.3 × 7.5 | ~16:9 | 超宽屏显示器 |

```javascript
pptx.layout = "LAYOUT_16x9";  // 使用预设名称（推荐）
pptx.layout = "LAYOUT_WIDE";  // 超宽布局
```

也可以自定义尺寸：

```javascript
pptx.defineLayout({ name: "CUSTOM", width: 12, height: 8 });
pptx.layout = "CUSTOM";
```

## 完整的最小示例

```javascript
import pptxgen from "pptxgenjs";

async function createPresentation() {
  // 1. 创建
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "张三";

  // 2. 封面
  const coverSlide = pres.addSlide();
  coverSlide.addText("我的演示文稿", {
    x: 1.0, y: 1.5, w: "80%", h: 2.0,
    fontSize: 44, bold: true, color: "003366", align: "center",
  });
  coverSlide.addText("2026年7月", {
    x: 1.0, y: 3.5, w: "80%", h: 0.5,
    fontSize: 18, color: "666666", align: "center",
  });

  // 3. 内容页
  const contentSlide = pres.addSlide();
  contentSlide.addText("主要内容", {
    x: 0.5, y: 0.3, w: "90%", h: 0.8,
    fontSize: 28, bold: true, color: "003366",
  });
  contentSlide.addText([
    { text: "项目背景：", options: { bold: true, color: "3366CC" } },
    { text: "用代码生成 PowerPoint，自动化文档工作流\n" },
    { text: "核心优势：", options: { bold: true, color: "3366CC" } },
    { text: "跨平台、无依赖、纯 JavaScript" },
  ], {
    x: 0.5, y: 1.3, w: "90%", h: 3.0,
    fontSize: 18, valign: "top",
  });

  // 4. 保存
  await pres.writeFile({ fileName: "demo.pptx" });
  console.log("done!");
}

createPresentation();
```
