# PptxGenJS YouTube-Style Layout Code Blocks

Complete copy-paste code templates. Every template uses the YouTube neon-dark
palette. Replace placeholder text with actual content.

## YouTube Color Palette

```javascript
const YT = {
  dark:       "0a0a0a",   // near-black main background
  darker:     "141414",
  neonRed:    "ff2d55",   // hot pink-red — emphasis, bullets, bars
  neonCyan:   "00d4ff",   // electric cyan — h2 headings, links
  neonYellow: "ffcc00",   // warm yellow — numbers, warnings
  neonGreen:  "00ff88",   // bright green — positive indicators
  neonPurple: "bf5af2",   // vivid purple — chapter dividers
  white:      "FFFFFF",
  gray:       "888888",
  lightGray:  "BBBBBB",
  darkGray:   "333333",
};
```

---

## HOOK (封面开场)

```javascript
const slide = pres.addSlide();
slide.background = { color: YT.dark };
slide.addText("病毒到底是一种\n什么生命？", {
  x: 0.5, y: 1.0, w: 9.0, h: 2.5,
  fontSize: 48, bold: true, color: YT.white, align: "center",
  fontFace: "Microsoft YaHei", lineSpacing: 60,
});
// Neon accent line
slide.addShape(pres.shapes.RECTANGLE, {
  x: 3.5, y: 3.8, w: 3.0, h: 0.05, fill: { color: YT.neonRed },
});
slide.addText("王丽明 · 病毒科学课 第2讲", {
  x: 1.0, y: 4.2, w: 8.0, h: 0.6,
  fontSize: 16, color: YT.gray, align: "center",
  fontFace: "Microsoft YaHei",
});
```

---

## INTRO (介绍页)

```javascript
const slide = pres.addSlide();
slide.background = { color: YT.dark };
slide.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 10, h: 0.06, fill: { color: YT.neonCyan },
});
slide.addText("今天我们要聊什么", {
  x: 0.8, y: 0.3, w: 8.4, h: 0.8,
  fontSize: 28, bold: true, color: YT.white, fontFace: "Microsoft YaHei",
});
slide.addText([
  { text: "▸ 病毒与人类疾病的关系\n\n", options: { fontSize: 20, color: YT.white } },
  { text: "▸ 病毒的三大核心特性\n\n", options: { fontSize: 20, color: YT.white } },
  { text: "▸ 为什么病毒如此特别", options: { fontSize: 20, color: YT.white } },
], {
  x: 1.0, y: 1.5, w: 8.0, h: 3.5,
  valign: "top", lineSpacing: 32, fontFace: "Microsoft YaHei",
});
slide.addNotes("本节介绍病毒的基本概念和三大特性...");
```

---

## CHAPTER (章节过渡)

```javascript
const slide = pres.addSlide();
slide.background = { color: YT.neonPurple };
slide.addText("CHAPTER 01", {
  x: 0.8, y: 1.5, w: 8.4, h: 0.8,
  fontSize: 20, color: YT.white, fontFace: "Microsoft YaHei",
  charSpacing: 8,
});
// Title
slide.addText("完美寄生者", {
  x: 0.8, y: 2.3, w: 8.4, h: 1.2,
  fontSize: 40, bold: true, color: YT.white, fontFace: "Microsoft YaHei",
});
// Timestamp
slide.addText("⏱ 00:50 – 04:30", {
  x: 0.8, y: 3.8, w: 8.4, h: 0.5,
  fontSize: 16, color: YT.white, fontFace: "Microsoft YaHei",
});
// Decorative line
slide.addShape(pres.shapes.RECTANGLE, {
  x: 0.8, y: 3.6, w: 3.0, h: 0.04, fill: { color: YT.white },
});
slide.addNotes("本章将要介绍病毒的完美寄生特性...");
```

---

## CONTENT (标准内容页 — Dark)

```javascript
const slide = pres.addSlide();
slide.background = { color: YT.dark };
// Top accent bar
slide.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 10, h: 0.06, fill: { color: YT.neonRed },
});
// Title
slide.addText("病毒的基本描述", {
  x: 0.8, y: 0.3, w: 8.4, h: 0.8,
  fontSize: 28, bold: true, color: YT.white, fontFace: "Microsoft YaHei",
});
// Bullet points with neon red markers
slide.addText([
  { text: "▸ 结构特征：", options: { bold: true, color: YT.neonRed, fontSize: 20 } },
  { text: "由蛋白质外壳包裹DNA或RNA分子\n\n", options: { fontSize: 18, color: YT.lightGray } },
  { text: "▸ 尺寸范围：", options: { bold: true, color: YT.neonRed, fontSize: 20 } },
  { text: "几十到几百纳米，比细菌小得多\n\n", options: { fontSize: 18, color: YT.lightGray } },
  { text: "▸ 寄生特性：", options: { bold: true, color: YT.neonRed, fontSize: 20 } },
  { text: "无法独立生长和繁殖，必须寄生于宿主", options: { fontSize: 18, color: YT.lightGray } },
], {
  x: 0.8, y: 1.5, w: 8.4, h: 3.5,
  valign: "top", lineSpacing: 30, fontFace: "Microsoft YaHei",
});
// Progress dots at bottom
const totalSlides = 15, currentSlide = 3;
for (let i = 0; i < totalSlides; i++) {
  slide.addShape(pres.shapes.OVAL, {
    x: 3.5 + i * 0.25, y: 5.3, w: 0.12, h: 0.12,
    fill: { color: i <= currentSlide ? YT.neonRed : YT.darkGray },
  });
}
slide.addNotes("详细讲解病毒的基本结构特征...");
```

---

## CONTENT — Light Variant (for readability on dense slides)

```javascript
const slide = pres.addSlide();
slide.background = { color: YT.white };
slide.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 10, h: 0.06, fill: { color: YT.neonRed },
});
slide.addText("页面标题", {
  x: 0.8, y: 0.3, w: 8.4, h: 0.8,
  fontSize: 28, bold: true, color: YT.dark, fontFace: "Microsoft YaHei",
});
slide.addText([
  { text: "▸ 第一点：", options: { bold: true, color: YT.neonRed, fontSize: 20 } },
  { text: "详细说明内容\n\n", options: { fontSize: 18, color: "333333" } },
  { text: "▸ 第二点：", options: { bold: true, color: YT.neonRed, fontSize: 20 } },
  { text: "详细说明内容", options: { fontSize: 18, color: "333333" } },
], {
  x: 0.8, y: 1.5, w: 8.4, h: 3.5,
  valign: "top", lineSpacing: 30, fontFace: "Microsoft YaHei",
});
slide.addNotes("演讲补充...");
```

---

## BIG_NUMBER (大字数据)

```javascript
const slide = pres.addSlide();
slide.background = { color: YT.dark };
slide.addText("100 nm", {
  x: 1.0, y: 1.2, w: 8.0, h: 1.5,
  fontSize: 64, bold: true, color: YT.neonRed, align: "center",
  fontFace: "Microsoft YaHei",
});
slide.addText("病毒颗粒直径", {
  x: 1.0, y: 2.8, w: 8.0, h: 0.8,
  fontSize: 28, color: YT.neonCyan, align: "center",
  fontFace: "Microsoft YaHei",
});
slide.addText("比细菌小 10 倍 · 只能在电子显微镜下看到", {
  x: 1.0, y: 3.8, w: 8.0, h: 0.5,
  fontSize: 16, color: YT.gray, align: "center",
  fontFace: "Microsoft YaHei",
});
// Decorative neon circle
slide.addShape(pres.shapes.OVAL, {
  x: 4.0, y: 1.0, w: 2.0, h: 2.0,
  line: { color: YT.neonRed, width: 2, transparency: 70 },
});
slide.addNotes("强调病毒的微小尺寸，举例说明...");
```

---

## QUOTE (引用/金句)

```javascript
const slide = pres.addSlide();
slide.background = { color: YT.neonRed };
slide.addText("「Never say never,\nand never say forever」", {
  x: 1.0, y: 1.5, w: 8.0, h: 2.0,
  fontSize: 32, italic: true, color: YT.white, align: "center",
  valign: "middle", fontFace: "Microsoft YaHei", lineSpacing: 48,
});
slide.addText("—— 生物学家的箴言", {
  x: 1.0, y: 3.8, w: 8.0, h: 0.5,
  fontSize: 16, color: YT.white, align: "right",
  fontFace: "Microsoft YaHei",
});
```

---

## VS (对比)

```javascript
const slide = pres.addSlide();
slide.background = { color: YT.dark };
slide.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 10, h: 0.06, fill: { color: YT.neonCyan },
});
slide.addText("寄生虫 vs 病毒", {
  x: 0.8, y: 0.3, w: 8.4, h: 0.8,
  fontSize: 28, bold: true, color: YT.white, fontFace: "Microsoft YaHei",
});

const headerOpts = { bold: true, color: YT.white, fill: { color: YT.neonRed }, align: "center", fontSize: 15, fontFace: "Microsoft YaHei" };
const leftOpts = { bold: true, align: "center", fontSize: 14, fontFace: "Microsoft YaHei", color: YT.white };
const cellOpts = { align: "center", fontSize: 14, fontFace: "Microsoft YaHei", color: YT.lightGray };

const rows = [
  [
    { text: "特征", options: headerOpts },
    { text: "🅰️ 寄生虫", options: headerOpts },
    { text: "🅱️ 病毒", options: headerOpts },
  ],
  [
    { text: "独立代谢", options: leftOpts },
    { text: "✅ 可以", options: { ...cellOpts, color: YT.neonGreen } },
    { text: "❌ 不能", options: { ...cellOpts, color: YT.neonRed } },
  ],
  [
    { text: "自主繁殖", options: leftOpts },
    { text: "✅ 可以", options: { ...cellOpts, color: YT.neonGreen } },
    { text: "❌ 不能", options: { ...cellOpts, color: YT.neonRed } },
  ],
];

slide.addTable(rows, {
  x: 0.8, y: 1.5, w: 8.4,
  border: { type: "solid", pt: 0.5, color: YT.darkGray },
  colW: [2.5, 2.5, 2.5],
  rowH: [0.6, 0.55, 0.55],
});
slide.addNotes("对比病毒和寄生虫的本质区别...");
```

---

## DATA (指标卡片)

```javascript
const slide = pres.addSlide();
slide.background = { color: YT.dark };
slide.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 10, h: 0.06, fill: { color: YT.neonCyan },
});
slide.addText("乙肝病毒 — 极简设计", {
  x: 0.8, y: 0.3, w: 8.4, h: 0.8,
  fontSize: 28, bold: true, color: YT.white, fontFace: "Microsoft YaHei",
});

const cards = [
  { value: "3 层", label: "结构层次", color: YT.neonRed },
  { value: "4 个", label: "基因数量", color: YT.neonCyan },
  { value: "3.2 kb", label: "基因组大小", color: YT.neonPurple },
];
const cardW = 2.3, cardH = 1.8, startX = 0.8, gap = 0.5;
cards.forEach((c, i) => {
  const cx = startX + i * (cardW + gap);
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: cx, y: 1.5, w: cardW, h: cardH,
    fill: { color: c.color, transparency: 90 },
    rectRadius: 0.15,
    line: { color: c.color, width: 1.5, transparency: 50 },
  });
  slide.addText(c.value, {
    x: cx, y: 1.6, w: cardW, h: 0.9,
    fontSize: 30, bold: true, color: c.color, align: "center",
    fontFace: "Microsoft YaHei",
  });
  slide.addText(c.label, {
    x: cx, y: 2.6, w: cardW, h: 0.5,
    fontSize: 14, color: YT.gray, align: "center",
    fontFace: "Microsoft YaHei",
  });
});
slide.addNotes("乙肝病毒的数据解读...");
```

---

## RECAP (总结)

```javascript
const slide = pres.addSlide();
slide.background = { color: YT.dark };
slide.addText("总结", {
  x: 0.8, y: 0.3, w: 8.4, h: 0.8,
  fontSize: 36, bold: true, color: YT.white, fontFace: "Microsoft YaHei",
});
slide.addText([
  { text: "01  ", options: { bold: true, color: YT.neonRed, fontSize: 28 } },
  { text: "完美寄生者 — 将全部生命活动转交宿主\n\n", options: { color: YT.lightGray, fontSize: 20 } },
  { text: "02  ", options: { bold: true, color: YT.neonCyan, fontSize: 28 } },
  { text: "极简主义者 — 用最少基因实现生命功能\n\n", options: { color: YT.lightGray, fontSize: 20 } },
  { text: "03  ", options: { bold: true, color: YT.neonPurple, fontSize: 28 } },
  { text: "规则破坏者 — 突破地球生命的共同法则", options: { color: YT.lightGray, fontSize: 20 } },
], {
  x: 1.0, y: 1.5, w: 8.0, h: 3.5,
  valign: "top", lineSpacing: 40, fontFace: "Microsoft YaHei",
});
slide.addNotes("回顾三大核心要点，为下一讲做铺垫...");
```

---

## NEXT (下集预告 — Neon Red Call-to-Action)

```javascript
const slide = pres.addSlide();
slide.background = { color: YT.neonRed };
slide.addText("下一讲", {
  x: 1.0, y: 1.2, w: 8.0, h: 0.8,
  fontSize: 24, color: YT.white, align: "center",
  fontFace: "Microsoft YaHei",
});
slide.addText("病毒如何让人生病？", {
  x: 0.5, y: 2.2, w: 9.0, h: 1.2,
  fontSize: 40, bold: true, color: YT.white, align: "center",
  fontFace: "Microsoft YaHei",
});
slide.addText("⏱ 第三章 — 即将更新", {
  x: 1.0, y: 3.8, w: 8.0, h: 0.5,
  fontSize: 18, color: YT.white, align: "center",
  fontFace: "Microsoft YaHei",
});
```

---

## CLOSING (结束页)

```javascript
const slide = pres.addSlide();
slide.background = { color: YT.dark };
slide.addText("谢谢", {
  x: 1.0, y: 2.0, w: 8.0, h: 1.2,
  fontSize: 52, bold: true, color: YT.white, align: "center",
  fontFace: "Microsoft YaHei",
});
slide.addText("Q & A", {
  x: 1.0, y: 3.3, w: 8.0, h: 0.6,
  fontSize: 28, color: YT.neonCyan, align: "center",
  fontFace: "Microsoft YaHei",
});
// Bottom neon bar
slide.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 5.55, w: 10, h: 0.06, fill: { color: YT.neonRed },
});
```

---

## Progress Bar (Bottom Dots)

Add this after every content slide for YouTube-style progress:

```javascript
// Progress dots
const TOTAL = 15;  // total slide count
const CURRENT = 3; // current slide index (0-based)
for (let i = 0; i < TOTAL; i++) {
  slide.addShape(pres.shapes.OVAL, {
    x: 3.5 + i * 0.25, y: 5.3, w: 0.12, h: 0.12,
    fill: { color: i <= CURRENT ? YT.neonRed : YT.darkGray },
  });
}
```
