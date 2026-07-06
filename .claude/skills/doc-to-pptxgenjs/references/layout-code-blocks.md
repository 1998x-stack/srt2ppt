# PptxGenJS Layout Code Blocks

Ready-to-use code templates for each slide layout type. Every template
uses `pres` as the presentation object and `slide` as the current slide.
All Chinese text uses `fontFace: "Microsoft YaHei"`.

## Color Palette Setup

Always define these at the top of the script:

```javascript
const C = {
  dark:     "1a1a2e",   // dark navy (covers, section dividers)
  accent:   "e94560",   // coral red (emphasis, accent bars)
  accent2:  "0f3460",   // deep blue (section dividers, headings)
  accent3:  "16213e",   // medium navy
  light:    "f8f8f8",   // off-white (content bg)
  gray:     "666666",   // medium gray (secondary text)
  white:    "FFFFFF",
  warmBg:   "faf3e0",   // warm beige (alternate bg)
  gold:     "e6a817",   // gold accent
  teal:    "17a2b8",    // teal accent
};
```

---

## TITLE (封面)

```javascript
const slide = pres.addSlide();
slide.background = { color: C.dark };
slide.addText("演示文稿标题", {
  x: 1.0, y: 1.2, w: 8.0, h: 1.2,
  fontSize: 44, bold: true, color: C.white, align: "center",
  fontFace: "Microsoft YaHei",
});
slide.addText("副标题", {
  x: 1.0, y: 2.5, w: 8.0, h: 0.8,
  fontSize: 28, color: C.accent, align: "center",
  fontFace: "Microsoft YaHei",
});
slide.addText("演讲者 · 日期", {
  x: 1.0, y: 3.8, w: 8.0, h: 0.6,
  fontSize: 16, color: "AAAAAA", align: "center",
  fontFace: "Microsoft YaHei",
});
// Decorative accent line
slide.addShape(pres.shapes.RECTANGLE, {
  x: 3.5, y: 3.5, w: 3.0, h: 0.04, fill: { color: C.accent },
});
slide.addNotes("欢迎词和演讲概述...");
```

---

## SECTION (章节过渡)

```javascript
const slide = pres.addSlide();
slide.background = { color: C.accent2 };
slide.addText("第X章", {
  x: 1.0, y: 1.5, w: 8.0, h: 0.8,
  fontSize: 20, color: C.accent, align: "center",
  fontFace: "Microsoft YaHei",
});
slide.addText("章节标题", {
  x: 1.0, y: 2.2, w: 8.0, h: 1.5,
  fontSize: 36, bold: true, color: C.white, align: "center",
  fontFace: "Microsoft YaHei",
});
slide.addNotes("本章将要介绍的内容...");
```

---

## CONTENT (标准内容页)

```javascript
const slide = pres.addSlide();
slide.background = { color: C.white };
// Top accent bar
slide.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.accent },
});
// Title
slide.addText("页面标题", {
  x: 0.8, y: 0.3, w: 8.4, h: 0.8,
  fontSize: 28, bold: true, color: C.dark, fontFace: "Microsoft YaHei",
});
// Rich text bullets
slide.addText([
  { text: "要点一：", options: { bold: true, color: C.accent, fontSize: 20 } },
  { text: "详细说明内容，包含关键数据和背景信息\n\n", options: { fontSize: 18, color: "333333" } },
  { text: "要点二：", options: { bold: true, color: C.accent, fontSize: 20 } },
  { text: "另一个重要观点的详细阐述\n\n", options: { fontSize: 18, color: "333333" } },
  { text: "要点三：", options: { bold: true, color: C.accent, fontSize: 20 } },
  { text: "第三个关键结论", options: { fontSize: 18, color: "333333" } },
], {
  x: 0.8, y: 1.5, w: 8.4, h: 3.5,
  valign: "top", lineSpacing: 28,
  fontFace: "Microsoft YaHei",
});
slide.addNotes("演讲时对每个要点的补充...");
```

---

## BIG_WORD (大字概念)

```javascript
const slide = pres.addSlide();
slide.background = { color: C.light };
slide.addText("核心概念定义", {
  x: 1.0, y: 1.5, w: 8.0, h: 2.5,
  fontSize: 32, bold: true, color: C.accent, align: "center",
  valign: "middle",
  fontFace: "Microsoft YaHei",
});
slide.addNotes("这个概念的具体解释和举例...");
```

---

## QUOTE (引用/金句)

```javascript
const slide = pres.addSlide();
slide.background = { color: C.accent };
slide.addText("「引用的原文或金句内容」", {
  x: 1.5, y: 1.5, w: 7.0, h: 2.5,
  fontSize: 28, italic: true, color: C.white, align: "center",
  valign: "middle",
  fontFace: "Microsoft YaHei",
});
slide.addText("—— 出处 / 作者", {
  x: 1.5, y: 4.0, w: 7.0, h: 0.5,
  fontSize: 14, color: "DDDDDD", align: "right",
  fontFace: "Microsoft YaHei",
});
```

---

## DATA (数据/指标卡片)

```javascript
const slide = pres.addSlide();
slide.background = { color: C.white };
// Title bar
slide.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.accent },
});
slide.addText("关键数据", {
  x: 0.8, y: 0.3, w: 8.4, h: 0.8,
  fontSize: 28, bold: true, color: C.dark, fontFace: "Microsoft YaHei",
});

// Metric cards (3 across)
const metrics = [
  { value: "100 nm", label: "病毒大小" },
  { value: "DNA/RNA", label: "遗传物质类型" },
  { value: "4 个基因", label: "乙肝病毒基因组" },
];
const cardW = 2.5, cardH = 1.8, startX = 0.8, gap = 0.3;
metrics.forEach((m, i) => {
  const cx = startX + i * (cardW + gap);
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: cx, y: 1.5, w: cardW, h: cardH,
    fill: { color: C.accent, transparency: 90 },
    rectRadius: 0.15,
  });
  slide.addText(m.value, {
    x: cx, y: 1.6, w: cardW, h: 0.9,
    fontSize: 28, bold: true, color: C.accent, align: "center",
    fontFace: "Microsoft YaHei",
  });
  slide.addText(m.label, {
    x: cx, y: 2.5, w: cardW, h: 0.5,
    fontSize: 14, color: C.gray, align: "center",
    fontFace: "Microsoft YaHei",
  });
});
slide.addNotes("每个指标的详细说明...");
```

---

## TABLE (表格)

```javascript
const slide = pres.addSlide();
slide.background = { color: C.white };
slide.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.accent },
});
slide.addText("数据对比", {
  x: 0.8, y: 0.3, w: 8.4, h: 0.8,
  fontSize: 28, bold: true, color: C.dark, fontFace: "Microsoft YaHei",
});

const headerOpts = { bold: true, color: C.white, fill: { color: C.accent2 }, align: "center", fontSize: 14, fontFace: "Microsoft YaHei" };
const cellOpts = { align: "center", fontSize: 13, fontFace: "Microsoft YaHei" };

const rows = [
  [
    { text: "类别", options: headerOpts },
    { text: "特征A", options: headerOpts },
    { text: "特征B", options: headerOpts },
  ],
  [
    { text: "项目1", options: { ...cellOpts, bold: true } },
    { text: "数据A1", options: cellOpts },
    { text: "数据B1", options: cellOpts },
  ],
  [
    { text: "项目2", options: { ...cellOpts, bold: true } },
    { text: "数据A2", options: cellOpts },
    { text: "数据B2", options: cellOpts },
  ],
];

slide.addTable(rows, {
  x: 0.8, y: 1.5, w: 8.4,
  border: { type: "solid", pt: 0.5, color: "DDDDDD" },
  colW: [2.0, 3.0, 3.0],
  rowH: [0.6, 0.5, 0.5],
});
slide.addNotes("表格数据的来源和解读...");
```

---

## SUMMARY (总结)

```javascript
const slide = pres.addSlide();
slide.background = { color: C.dark };
slide.addText("总结", {
  x: 0.8, y: 0.5, w: 8.4, h: 0.8,
  fontSize: 32, bold: true, color: C.white, fontFace: "Microsoft YaHei",
});
slide.addText([
  { text: "1. ", options: { bold: true, color: C.accent, fontSize: 22 } },
  { text: "第一个关键结论\n\n", options: { color: "CCCCCC", fontSize: 18 } },
  { text: "2. ", options: { bold: true, color: C.accent, fontSize: 22 } },
  { text: "第二个关键结论\n\n", options: { color: "CCCCCC", fontSize: 18 } },
  { text: "3. ", options: { bold: true, color: C.accent, fontSize: 22 } },
  { text: "第三个关键结论", options: { color: "CCCCCC", fontSize: 18 } },
], {
  x: 0.8, y: 1.5, w: 8.4, h: 3.5,
  valign: "top", lineSpacing: 36,
  fontFace: "Microsoft YaHei",
});
slide.addNotes("总结演讲内容，展望下一步...");
```

---

## CLOSING (结束页)

```javascript
const slide = pres.addSlide();
slide.background = { color: C.dark };
slide.addText("谢谢", {
  x: 1.0, y: 2.0, w: 8.0, h: 1.2,
  fontSize: 48, bold: true, color: C.white, align: "center",
  fontFace: "Microsoft YaHei",
});
slide.addText("Q & A", {
  x: 1.0, y: 3.2, w: 8.0, h: 0.6,
  fontSize: 24, color: C.accent, align: "center",
  fontFace: "Microsoft YaHei",
});
```
