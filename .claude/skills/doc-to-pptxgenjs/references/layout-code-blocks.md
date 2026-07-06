# PptxGenJS Layout Code Blocks — Cryo-EM Scientific Documentary

Complete copy-paste code templates for a distinctive scientific documentary style.
Grounded in cryo-electron microscopy false-color palettes and viral capsid geometry.
Every template uses the Cryo-EM palette. Replace placeholder text with actual content.

## Cryo-EM Color Palette

```javascript
const YT = {
  dark:       "0B1E2E",   // deep navy — primary background
  darker:     "132D42",   // lighter navy — card surfaces
  accent:     "00A8CC",   // fluorescent teal — headings, highlights
  warm:       "F08C3E",   // lab amber — emphasis, numbers, warnings
  coral:      "E85D5D",   // clinical red — critical emphasis only
  purple:     "7B5EA7",   // scientific purple — chapter dividers
  white:      "E8ECF0",   // cool white — body text
  gray:       "6B8299",   // slate gray — secondary text
  lightGray:  "9BB0C2",   // lighter slate — tertiary
  darkGray:   "1E3A50",   // dark slate — borders, progress
};
```

---

## HOOK (封面开场)

```javascript
const slide = pres.addSlide();
slide.background = { color: YT.dark };

// Subtle geometric frame — upper decorative line
slide.addShape(pres.shapes.RECTANGLE, {
  x: 0.6, y: 0.6, w: 0.06, h: 1.2, fill: { color: YT.accent },
});
slide.addShape(pres.shapes.RECTANGLE, {
  x: 0.6, y: 0.6, w: 2.5, h: 0.05, fill: { color: YT.accent },
});

// Main question — huge, bold
slide.addText("病毒到底是一种\n什么生命？", {
  x: 1.0, y: 1.2, w: 8.0, h: 2.5,
  fontSize: 46, bold: true, color: YT.white, align: "center",
  fontFace: "Microsoft YaHei", lineSpacing: 56,
});

// Thin separator line
slide.addShape(pres.shapes.RECTANGLE, {
  x: 3.8, y: 4.0, w: 2.4, h: 0.04, fill: { color: YT.warm },
});

// Subtitle
slide.addText("王丽明 · 病毒科学课 第2讲", {
  x: 1.0, y: 4.3, w: 8.0, h: 0.6,
  fontSize: 16, color: YT.gray, align: "center",
  fontFace: "Microsoft YaHei",
});
```

---

## INTRO (介绍页)

```javascript
const slide = pres.addSlide();
slide.background = { color: YT.dark };

// Left accent strip (instead of top bar — more distinctive)
slide.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 0.08, h: 5.63, fill: { color: YT.accent },
});

slide.addText("今天我们要聊什么", {
  x: 0.8, y: 0.3, w: 8.4, h: 0.8,
  fontSize: 30, bold: true, color: YT.white, fontFace: "Microsoft YaHei",
});

slide.addText([
  { text: "▸ 病毒与人类疾病的关系\n\n", options: { fontSize: 20, color: YT.white } },
  { text: "▸ 病毒的三大核心特性\n\n", options: { fontSize: 20, color: YT.white } },
  { text: "▸ 为什么病毒如此特别", options: { fontSize: 20, color: YT.white } },
], {
  x: 1.2, y: 1.5, w: 7.5, h: 3.5,
  valign: "top", lineSpacing: 34, fontFace: "Microsoft YaHei",
});
slide.addNotes("本节介绍病毒的基本概念和三大特性...");
```

---

## CHAPTER (章节过渡 — with capsid geometry)

```javascript
const slide = pres.addSlide();
slide.background = { color: YT.purple };

// Capsid-inspired geometric accent — interconnected triangles
// Top triangle pattern (subtle, decorative)
const triSize = 0.35;
const triY = 1.0;
for (let i = 0; i < 5; i++) {
  // Upward triangles
  const cx = 1.5 + i * 1.6;
  slide.addShape(pres.shapes.ISOSCELES_TRIANGLE, {
    x: cx, y: triY, w: triSize, h: triSize,
    fill: { color: YT.white, transparency: 85 },
    flipV: false,
  });
  // Downward triangles (offset to create hex pattern)
  slide.addShape(pres.shapes.ISOSCELES_TRIANGLE, {
    x: cx + 0.8, y: triY + 0.3, w: triSize, h: triSize,
    fill: { color: YT.white, transparency: 90 },
    flipV: true,
  });
}

// CHAPTER label
slide.addText("CHAPTER 01", {
  x: 0.8, y: 2.0, w: 8.4, h: 0.7,
  fontSize: 18, color: YT.white, fontFace: "Microsoft YaHei",
  charSpacing: 6,
});

// Title
slide.addText("完美寄生者", {
  x: 0.8, y: 2.7, w: 8.4, h: 1.2,
  fontSize: 42, bold: true, color: YT.white, fontFace: "Microsoft YaHei",
});

// Decorative line
slide.addShape(pres.shapes.RECTANGLE, {
  x: 0.8, y: 4.0, w: 2.0, h: 0.04, fill: { color: YT.white },
});

// Timestamp
slide.addText("⏱ 00:50 – 04:30", {
  x: 0.8, y: 4.2, w: 8.4, h: 0.5,
  fontSize: 15, color: YT.white, fontFace: "Microsoft YaHei",
});
slide.addNotes("本章将要介绍...");
```

---

## CONTENT (标准内容页 — with left accent strip)

```javascript
const slide = pres.addSlide();
slide.background = { color: YT.dark };

// Left accent strip
slide.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 0.08, h: 5.63, fill: { color: YT.accent },
});

// Title
slide.addText("病毒的基本描述", {
  x: 0.8, y: 0.3, w: 8.4, h: 0.8,
  fontSize: 30, bold: true, color: YT.white, fontFace: "Microsoft YaHei",
});

// Bullet points with warm amber markers
slide.addText([
  { text: "▸ 结构特征：", options: { bold: true, color: YT.warm, fontSize: 20 } },
  { text: "由蛋白质外壳包裹DNA或RNA分子\n\n", options: { fontSize: 18, color: YT.lightGray } },
  { text: "▸ 尺寸范围：", options: { bold: true, color: YT.warm, fontSize: 20 } },
  { text: "几十到几百纳米，比细菌小得多\n\n", options: { fontSize: 18, color: YT.lightGray } },
  { text: "▸ 寄生特性：", options: { bold: true, color: YT.warm, fontSize: 20 } },
  { text: "无法独立生长和繁殖，必须寄生于宿主", options: { fontSize: 18, color: YT.lightGray } },
], {
  x: 1.2, y: 1.5, w: 7.8, h: 3.5,
  valign: "top", lineSpacing: 32, fontFace: "Microsoft YaHei",
});

// Subtle progress indicator (single thin bar at bottom, not many dots)
slide.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 5.3, w: 9.0, h: 0.03, fill: { color: YT.darkGray },
});
// Filled portion
const TOTAL = 15, CURRENT = 2;
const progressW = (CURRENT / (TOTAL - 1)) * 9.0;
slide.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 5.3, w: progressW, h: 0.03, fill: { color: YT.accent },
});

slide.addNotes("详细讲解病毒的基本结构特征...");
```

---

## CONTENT — Warm emphasis variant

For critical insight slides that need warmth and urgency:

```javascript
const slide = pres.addSlide();
slide.background = { color: YT.dark };

// Left accent strip in warm
slide.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 0.08, h: 5.63, fill: { color: YT.warm },
});

slide.addText("页面标题", {
  x: 0.8, y: 0.3, w: 8.4, h: 0.8,
  fontSize: 30, bold: true, color: YT.white, fontFace: "Microsoft YaHei",
});

// Bullet points with warm accent bar
slide.addText([
  { text: "▸ 第一点：", options: { bold: true, color: YT.warm, fontSize: 20 } },
  { text: "详细说明内容\n\n", options: { fontSize: 18, color: YT.lightGray } },
  { text: "▸ 第二点：", options: { bold: true, color: YT.warm, fontSize: 20 } },
  { text: "详细说明内容", options: { fontSize: 18, color: YT.lightGray } },
], {
  x: 1.2, y: 1.5, w: 7.8, h: 3.5,
  valign: "top", lineSpacing: 32, fontFace: "Microsoft YaHei",
});
slide.addNotes("演讲补充...");
```

---

## BIG_NUMBER (大字数据)

```javascript
const slide = pres.addSlide();
slide.background = { color: YT.dark };

// Decorative geometric ring (subtle)
slide.addShape(pres.shapes.OVAL, {
  x: 4.0, y: 0.6, w: 2.0, h: 2.0,
  fill: { color: YT.accent, transparency: 95 },
  line: { color: YT.accent, width: 1.5, transparency: 70 },
});

slide.addText("100 nm", {
  x: 1.0, y: 1.0, w: 8.0, h: 1.5,
  fontSize: 64, bold: true, color: YT.warm, align: "center",
  fontFace: "Microsoft YaHei",
});
slide.addText("病毒颗粒直径", {
  x: 1.0, y: 2.6, w: 8.0, h: 0.8,
  fontSize: 28, color: YT.accent, align: "center",
  fontFace: "Microsoft YaHei",
});
slide.addText("比细菌小 10 倍 · 只能在电子显微镜下看到", {
  x: 1.0, y: 3.6, w: 8.0, h: 0.5,
  fontSize: 16, color: YT.gray, align: "center",
  fontFace: "Microsoft YaHei",
});
slide.addNotes("强调病毒的微小尺寸...");
```

---

## QUOTE (引用/金句 — warm background)

```javascript
const slide = pres.addSlide();
slide.background = { color: YT.warm };

// Subtle decorative line left
slide.addShape(pres.shapes.RECTANGLE, {
  x: 0.8, y: 1.8, w: 0.05, h: 1.8, fill: { color: YT.white, transparency: 50 },
});

slide.addText("「Never say never,\nand never say forever」", {
  x: 1.5, y: 1.5, w: 7.5, h: 2.0,
  fontSize: 30, italic: true, color: YT.white, align: "left",
  valign: "middle", fontFace: "Microsoft YaHei", lineSpacing: 44,
});
slide.addText("—— 生物学家的箴言", {
  x: 1.5, y: 3.8, w: 7.5, h: 0.5,
  fontSize: 15, color: YT.white, align: "right",
  fontFace: "Microsoft YaHei",
});
```

---

## VS (对比 — two-column layout)

```javascript
const slide = pres.addSlide();
slide.background = { color: YT.dark };

// Left accent strip
slide.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 0.08, h: 5.63, fill: { color: YT.accent },
});

slide.addText("寄生虫 vs 病毒", {
  x: 0.8, y: 0.3, w: 8.4, h: 0.8,
  fontSize: 30, bold: true, color: YT.white, fontFace: "Microsoft YaHei",
});

const headerOpts = {
  bold: true, color: YT.white, fill: { color: YT.purple },
  align: "center", fontSize: 15, fontFace: "Microsoft YaHei",
};
const leftOpts = {
  bold: true, align: "center", fontSize: 14, fontFace: "Microsoft YaHei", color: YT.white,
};
const cellOpts = {
  align: "center", fontSize: 14, fontFace: "Microsoft YaHei", color: YT.lightGray,
};

const rows = [
  [
    { text: "特征", options: headerOpts },
    { text: "🅰️ 寄生虫", options: headerOpts },
    { text: "🅱️ 病毒", options: headerOpts },
  ],
  [
    { text: "独立代谢", options: leftOpts },
    { text: "✅ 可以", options: { ...cellOpts, color: "5DBA8B" } },
    { text: "❌ 不能", options: { ...cellOpts, color: YT.coral } },
  ],
  [
    { text: "自主繁殖", options: leftOpts },
    { text: "✅ 可以", options: { ...cellOpts, color: "5DBA8B" } },
    { text: "❌ 不能", options: { ...cellOpts, color: YT.coral } },
  ],
];

slide.addTable(rows, {
  x: 0.8, y: 1.5, w: 8.4,
  border: { type: "solid", pt: 0.5, color: YT.darkGray },
  colW: [3.0, 2.7, 2.7],
  rowH: [0.55, 0.5, 0.5],
});
slide.addNotes("对比病毒和寄生虫的本质区别...");
```

---

## DATA (指标卡片 — scientific bento grid)

```javascript
const slide = pres.addSlide();
slide.background = { color: YT.dark };

// Left accent strip
slide.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 0.08, h: 5.63, fill: { color: YT.accent },
});

slide.addText("乙肝病毒 — 极简设计", {
  x: 0.8, y: 0.3, w: 8.4, h: 0.8,
  fontSize: 30, bold: true, color: YT.white, fontFace: "Microsoft YaHei",
});

const cards = [
  { value: "3 层", label: "结构层次", color: YT.accent },
  { value: "4 个", label: "基因数量", color: YT.warm },
  { value: "3.2 kb", label: "基因组大小", color: YT.purple },
];
const cardW = 2.2, cardH = 1.6, startX = 0.8, gap = 0.6;
cards.forEach((c, i) => {
  const cx = startX + i * (cardW + gap);
  // Card background
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: cx, y: 1.6, w: cardW, h: cardH,
    fill: { color: YT.darker },
    rectRadius: 0.1,
    line: { color: c.color, width: 1.2, transparency: 40 },
  });
  // Top accent dot
  slide.addShape(pres.shapes.OVAL, {
    x: cx + 0.15, y: 1.85, w: 0.12, h: 0.12,
    fill: { color: c.color },
  });
  slide.addText(c.value, {
    x: cx + 0.35, y: 1.75, w: cardW - 0.5, h: 0.7,
    fontSize: 26, bold: true, color: c.color, align: "left",
    fontFace: "Microsoft YaHei",
  });
  slide.addText(c.label, {
    x: cx + 0.15, y: 2.55, w: cardW - 0.3, h: 0.5,
    fontSize: 14, color: YT.gray, align: "left",
    fontFace: "Microsoft YaHei",
  });
});

// Comparison footnote
slide.addText([
  { text: "大肠杆菌：4,000+ 基因  |  人类：20,000+ 基因", options: { fontSize: 15, color: YT.gray } },
], {
  x: 0.8, y: 3.6, w: 8.4, h: 0.5,
  align: "center", fontFace: "Microsoft YaHei",
});
slide.addNotes("乙肝病毒的数据解读...");
```

---

## RECAP (总结)

```javascript
const slide = pres.addSlide();
slide.background = { color: YT.dark };

// Left accent strip in purple
slide.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 0.08, h: 5.63, fill: { color: YT.purple },
});

slide.addText("总结", {
  x: 0.8, y: 0.3, w: 8.4, h: 0.8,
  fontSize: 36, bold: true, color: YT.white, fontFace: "Microsoft YaHei",
});

slide.addText([
  { text: "01  ", options: { bold: true, color: YT.accent, fontSize: 24 } },
  { text: "完美寄生者 — 将全部生命活动转交宿主\n\n", options: { color: YT.lightGray, fontSize: 20 } },
  { text: "02  ", options: { bold: true, color: YT.warm, fontSize: 24 } },
  { text: "极简主义者 — 用最少基因实现生命功能\n\n", options: { color: YT.lightGray, fontSize: 20 } },
  { text: "03  ", options: { bold: true, color: YT.purple, fontSize: 24 } },
  { text: "规则破坏者 — 突破地球生命的共同法则", options: { color: YT.lightGray, fontSize: 20 } },
], {
  x: 1.2, y: 1.5, w: 7.8, h: 3.5,
  valign: "top", lineSpacing: 40, fontFace: "Microsoft YaHei",
});
slide.addNotes("回顾三大核心要点...");
```

---

## NEXT (下集预告 — warm amber CTA)

```javascript
const slide = pres.addSlide();
slide.background = { color: YT.warm };

// Subtle geometric decoration
slide.addShape(pres.shapes.OVAL, {
  x: 8.0, y: -0.5, w: 3.0, h: 3.0,
  fill: { color: YT.white, transparency: 93 },
});

slide.addText("下一讲", {
  x: 1.0, y: 1.2, w: 8.0, h: 0.7,
  fontSize: 22, color: YT.white, align: "center",
  fontFace: "Microsoft YaHei",
});
slide.addText("病毒如何让人生病？", {
  x: 0.5, y: 2.2, w: 9.0, h: 1.2,
  fontSize: 40, bold: true, color: YT.white, align: "center",
  fontFace: "Microsoft YaHei",
});
// Thin line
slide.addShape(pres.shapes.RECTANGLE, {
  x: 3.5, y: 3.5, w: 3.0, h: 0.03, fill: { color: YT.white, transparency: 50 },
});
slide.addText("⏱ 第三章 — 即将更新", {
  x: 1.0, y: 3.8, w: 8.0, h: 0.5,
  fontSize: 17, color: YT.white, align: "center",
  fontFace: "Microsoft YaHei",
});
```

---

## CLOSING (结束页)

```javascript
const slide = pres.addSlide();
slide.background = { color: YT.dark };

// Subtle left accent
slide.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 0.08, h: 5.63, fill: { color: YT.accent },
});

slide.addText("谢谢", {
  x: 1.0, y: 2.0, w: 8.0, h: 1.2,
  fontSize: 52, bold: true, color: YT.white, align: "center",
  fontFace: "Microsoft YaHei",
});
slide.addText("Q & A", {
  x: 1.0, y: 3.3, w: 8.0, h: 0.6,
  fontSize: 28, color: YT.accent, align: "center",
  fontFace: "Microsoft YaHei",
});
// Bottom accent bar
slide.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 5.55, w: 10, h: 0.06, fill: { color: YT.accent },
});
```

---

## Progress Bar (Bottom Thin Line)

Add this after every content slide — a single thin progress bar, cleaner than a field of dots:

```javascript
// Progress bar
const TOTAL = 18;
const CURRENT = 3; // current slide index (0-based)
slide.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 5.3, w: 9.0, h: 0.03, fill: { color: YT.darkGray },
});
const progressW = (CURRENT / (TOTAL - 1)) * 9.0;
slide.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 5.3, w: progressW, h: 0.03, fill: { color: YT.accent },
});
```

---

## Design Rules (Cryo-EM Edition)

- **Background**: `YT.dark` (#0B1E2E) for all slides — deep navy, not pure black
- **Accent strip**: Left-side vertical strip (0.08" wide) on all content slides — more distinctive than horizontal top bars
- **Headings**: `YT.accent` (fluorescent teal) or `YT.white`, 28-30pt
- **Body**: `YT.lightGray` or `YT.white`, 18-20pt, line spacing 32-36
- **Emphasis markers**: `YT.warm` (lab amber) for bullet markers and key terms
- **Chapter slides**: `YT.purple` background with capsid-inspired triangle pattern
- **QUOTE slides**: `YT.warm` background with left line accent
- **NEXT slides**: `YT.warm` background with subtle geometric decoration
- **Progress**: Single thin bottom bar, not many dots
- **Signature**: Geometric triangle patterns on chapter dividers — the one bold element
- **Font**: Always `fontFace: "Microsoft YaHei"` for Chinese
