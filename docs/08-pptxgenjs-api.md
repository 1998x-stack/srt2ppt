# 08. PptxGenJS API 详解

PptxGenJS 提供了丰富的 API 来添加各种内容元素。所有 add 方法都返回自身（支持链式调用），且使用统一的坐标定位系统。

## 坐标定位系统

PptxGenJS 使用 **英寸（inch）** 作为定位单位，基于幻灯片的左上角：

```
(0,0) ──────────────────── (10, 0)
  │                         │
  │    幻灯片可视区域        │
  │    默认 10" × 5.625"    │
  │                         │
(0, 5.625) ──────────── (10, 5.625)
```

**位置参数：**

| 参数 | 类型 | 说明 |
|------|------|------|
| `x` | number/string | 距离左边距离（英寸或百分比字符串如 `"50%"`） |
| `y` | number/string | 距离顶部距离 |
| `w` | number/string | 元素宽度 |
| `h` | number/string | 元素高度 |

## 文本 (addText)

文本是 PptxGenJS 中最重要的内容类型。`addText` 支持单文本、多文本（富文本）和复杂格式。

### 基本用法

```javascript
slide.addText("简单文本", {
  x: 1.0, y: 0.5, w: 8.0, h: 1.0,
  fontSize: 24,
  color: "333333",
});
```

### 富文本（多段文本数组）

```javascript
slide.addText([
  {
    text: "主标题\n",
    options: {
      fontSize: 36,
      bold: true,
      color: "003366",
      fontFace: "Microsoft YaHei",
    },
  },
  {
    text: "副标题说明文字\n",
    options: {
      fontSize: 18,
      color: "666666",
      italic: true,
    },
  },
  {
    text: "底部信息",
    options: {
      fontSize: 14,
      color: "999999",
    },
  },
], {
  x: 1.0, y: 1.0, w: 8.0, h: 4.0,
  valign: "top",
});
```

### 文本属性速查

| 属性 | 类型 | 示例 | 说明 |
|------|------|------|------|
| `fontSize` | number | `24` | 字体大小（磅） |
| `fontFace` | string | `"Microsoft YaHei"` | 字体名称 |
| `color` | string | `"FF0000"` | 文字颜色（RGB十六进制） |
| `bold` | boolean | `true` | 加粗 |
| `italic` | boolean | `true` | 斜体 |
| `underline` | boolean | `true` | 下划线 |
| `strike` | boolean | `true` | 删除线 |
| `align` | string | `"left"/"center"/"right"` | 水平对齐 |
| `valign` | string | `"top"/"middle"/"bottom"` | 垂直对齐 |
| `bullet` | boolean/object | `true` / `{type:"number"}` | 项目符号 |
| `breakType` | string | `"none"/"slide"/"section"` | 分页/分节 |
| `paraSpaceBefore` | number | `12` | 段前间距（磅） |
| `paraSpaceAfter` | number | `6` | 段后间距（磅） |
| `lineSpacing` | number | `24` | 行间距（磅） |
| `transparency` | number | `50` | 透明度（0-100） |
| `lang` | string | `"zh-CN"` | 语言代码 |

### 项目符号与编号

```javascript
slide.addText([
  { text: "第一点\n", options: { bullet: true } },
  { text: "第二点\n", options: { bullet: true } },
  { text: "第三点",   options: { bullet: true } },
], { x: 1.0, y: 1.0, w: 8.0, h: 3.0 });

// 编号列表
slide.addText([
  { text: "步骤一\n", options: { bullet: { type: "number" } } },
  { text: "步骤二\n", options: { bullet: { type: "number" } } },
  { text: "步骤三",   options: { bullet: { type: "number" } } },
], { x: 1.0, y: 1.0, w: 8.0, h: 3.0 });
```

---

## 图片 (addImage)

```javascript
slide.addImage({
  path: "image.jpg",           // 本地文件路径（Node.js）
  x: 1.0, y: 1.0, w: 3.0, h: 2.0,
});

// 从 URL 加载（浏览器环境）
slide.addImage({
  data: "https://example.com/image.png",
  x: 6.0, y: 1.0, w: 3.0, h: 2.0,
});

// Base64 数据
slide.addImage({
  data: "data:image/png;base64,iVBORw0KGgo...",
  x: 1.0, y: 1.0, w: 3.0, h: 2.0,
});

// 添加圆角
slide.addImage({
  path: "photo.jpg",
  x: 1.0, y: 1.0, w: 3.0, h: 3.0,
  rounding: true,           // 使图片变为圆形（前提是 w === h）
});
```

### 图片选项

| 选项 | 类型 | 说明 |
|------|------|------|
| `rounding` | boolean | 圆形（需要正方形，即 w === h） |
| `sizing` | object | `{ type: "contain"/"cover"/"crop", w, h }` |
| `hyperlink` | object | 点击图片跳转链接 |

---

## 形状 (addShape)

```javascript
const pptx = new pptxgen();

// 矩形
slide.addShape(pptx.shapes.RECTANGLE, {
  x: 1.0, y: 1.0, w: 3.0, h: 2.0,
  fill: { color: "3366CC" },
  line: { color: "003366", width: 2 },
  rectRadius: 0.1,           // 圆角半径
});

// 圆形 / 椭圆
slide.addShape(pptx.shapes.OVAL, {
  x: 7.0, y: 1.0, w: 2.0, h: 2.0,
  fill: { color: "FF6600", transparency: 30 },
});

// 线条
slide.addShape(pptx.shapes.LINE, {
  x: 1.0, y: 4.0, w: 8.0, h: 0.0,
  line: { color: "999999", width: 2, dashType: "dash" },
});

// 圆角矩形
slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 1.0, y: 1.0, w: 4.0, h: 2.0,
  fill: { color: "F0F0F0" },
  rectRadius: 0.2,
});

// 五角星
slide.addShape(pptx.shapes.STAR_5, {
  x: 1.0, y: 1.0, w: 2.0, h: 2.0,
  fill: { color: "FFD700" },
});
```

### 支持的形状类型

在 `pptx.shapes` 中提供（包括但不限于）：

`RECTANGLE`, `ROUNDED_RECTANGLE`, `OVAL`, `LINE`, `TRIANGLE`, `RIGHT_TRIANGLE`, `DIAMOND`, `PENTAGON`, `HEXAGON`, `STAR_4`, `STAR_5`, `STAR_6`, `STAR_7`, `STAR_8`, `ARROW_LEFT`, `ARROW_RIGHT`, `ARROW_UP`, `ARROW_DOWN`, `CHEVRON`, `PIE`, `CLOUD`, `HEART` 等。

---

## 表格 (addTable)

```javascript
const rows = [
  // 表头行
  [
    { text: "姓名", options: { bold: true, color: "FFFFFF", fill: { color: "3366CC" }, align: "center" } },
    { text: "部门", options: { bold: true, color: "FFFFFF", fill: { color: "3366CC" }, align: "center" } },
    { text: "薪资", options: { bold: true, color: "FFFFFF", fill: { color: "3366CC" }, align: "center" } },
  ],
  // 数据行
  [
    { text: "张三", options: { align: "center" } },
    { text: "技术部", options: { align: "center" } },
    { text: "¥15,000", options: { align: "right" } },
  ],
  [
    { text: "李四", options: { align: "center" } },
    { text: "市场部", options: { align: "center" } },
    { text: "¥12,000", options: { align: "right" } },
  ],
];

slide.addTable(rows, {
  x: 0.5, y: 1.0, w: 9.0,
  border: { type: "solid", pt: 1, color: "CCCCCC" },
  colW: [2.0, 3.0, 2.5],               // 列宽数组
  rowH: [0.6, 0.5, 0.5],                // 行高数组
  autoPage: true,                        // 溢出时自动分页
  autoPageRepeatHeader: true,            // 分页后重复表头
});
```

### 表格选项

| 选项 | 类型 | 说明 |
|------|------|------|
| `colW` | number[] | 每列宽度（英寸）数组 |
| `rowH` | number[] | 每行高度（英寸）数组 |
| `border` | object | 边框样式 `{ type, pt, color }` |
| `autoPage` | boolean | 表格超出页面时自动新增幻灯片 |
| `autoPageRepeatHeader` | boolean | 自动分页后在新页重复表头 |
| `margin` | number[] | 单元格内边距 `[top, right, bottom, left]` |

---

## 图表 (addChart)

PptxGenJS 支持 **9 种图表类型**：

```javascript
const { data, options } = slide.charts[pptx.charts.BAR];
slide.addChart(pptx.charts.BAR, dataArr, options);
```

### 9 种图表类型

| 类型 | 常量 | 说明 |
|------|------|------|
| 面积图 | `pptx.charts.AREA` | 堆叠面积 |
| 柱状图 | `pptx.charts.BAR` | 垂直柱状 |
| 3D柱状图 | `pptx.charts.BAR3D` | 三维柱状 |
| 气泡图 | `pptx.charts.BUBBLE` | 大小表示第三维 |
| 甜甜圈图 | `pptx.charts.DOUGHNUT` | 中心有空洞 |
| 折线图 | `pptx.charts.LINE` | 趋势线 |
| 饼图 | `pptx.charts.PIE` | 占比图 |
| 雷达图 | `pptx.charts.RADAR` | 多维度对比 |
| 散点图 | `pptx.charts.SCATTER` | 二维分布 |

### 柱状图示例

```javascript
const chartData = [
  {
    name: "2023年",
    labels: ["Q1", "Q2", "Q3", "Q4"],
    values: [80, 95, 110, 130],
  },
  {
    name: "2024年",
    labels: ["Q1", "Q2", "Q3", "Q4"],
    values: [100, 120, 140, 170],
  },
];

slide.addChart(pptx.charts.BAR, chartData, {
  x: 1.0, y: 1.0, w: 8.0, h: 3.5,
  barDir: "col",                          // 纵向柱状图
  showTitle: true,
  title: "季度营收对比",
  showLegend: true,
  legendPos: "b",                         // 图例在底部
  catAxisLabelColor: "666666",
  valAxisLabelColor: "666666",
  valAxisTitle: "万元",
  chartColors: ["3366CC", "FF6600"],     // 自定义颜色
});
```

### 饼图示例

```javascript
slide.addChart(pptx.charts.PIE, [{
  name: "市场份额",
  labels: ["产品A", "产品B", "产品C", "其他"],
  values: [45, 30, 15, 10],
}], {
  x: 1.0, y: 1.0, w: 6.0, h: 3.5,
  showLegend: true,
  legendPos: "r",
  showPercent: true,
  chartColors: ["3366CC", "FF6600", "33CC66", "999999"],
});
```

### 图表数据格式

```javascript
// 通用格式
[
  {
    name: "系列名称",     // 图例中的系列名
    labels: ["A", "B", "C"],  // X轴标签
    values: [10, 20, 30],     // Y轴数值
  },
  // 可包含多个系列
]
```

---

## SVG 与 GIF

```javascript
// SVG（需要在浏览器环境中使用 Canvas API）
slide.addImage({
  data: "image/svg+xml;utf8,<svg xmlns=...>",
  x: 1.0, y: 1.0, w: 3.0, h: 3.0,
});

// 动画 GIF
slide.addImage({
  path: "animation.gif",
  x: 1.0, y: 1.0, w: 4.0, h: 3.0,
});
// ⚠️ 在旧版 PowerPoint 中可能显示为静态图
```

---

## RTL 文字与亚洲字体

```javascript
slide.addText("שלום עולם", {
  x: 1.0, y: 1.0, w: 8.0, h: 1.0,
  isRTL: true,                  // 从右到左
});

slide.addText("你好世界", {
  x: 1.0, y: 1.0, w: 8.0, h: 1.0,
  fontFace: "Microsoft YaHei",  // 中文字体
  lang: "zh-CN",
});
```
