---
name: doc-to-pptxgenjs
description: >
  Turn documents (SRT subtitle files, Markdown articles, plain text) into
  editable PowerPoint .pptx files using PptxGenJS. Use this skill whenever
  the user wants to convert a document, article, transcript, SRT file, or
  lecture notes into a real, editable PowerPoint file — even if they just
  say "turn this into PPT" or "make a PowerPoint from this doc." Generates
  and executes JavaScript code to produce the .pptx immediately. Do NOT use
  this skill if the user specifically asks for Marp Markdown output.
---

# doc-to-pptxgenjs: Document → Editable PPTX

Convert documents (SRT, Markdown, text) into an editable PowerPoint .pptx
file using PptxGenJS. No web search — work entirely from the input document.

## Pipeline

```
Input Document (.srt / .md / .txt)
        │
        ▼
① PARSE & CLEAN
   - If SRT: strip indices, timestamps, TurboScribe watermarks
   - Merge short fragments into coherent paragraphs
   - Preserve original language and terminology
        │
        ▼
② STRUCTURE ANALYSIS
   - Identify the document's narrative arc
   - Find natural section breaks (topics, transitions, conclusions)
   - Extract key facts, definitions, examples, data
        │
        ▼
③ LAYOUT ASSIGNMENT
   - Plan slide sequence: Cover → Sections → Content → Summary
   - Assign a layout type to each slide:
     TITLE | SECTION | CONTENT | BIG_WORD | QUOTE | DATA | SUMMARY
   - Keep 3-5 bullet points per content slide
        │
        ▼
④ PPTXGENJS CODE GENERATION
   - Write a runnable .mjs script using PptxGenJS
   - Apply layout-specific styling per slide type
   - Use Chinese-friendly fonts (Microsoft YaHei)
   - Add speaker notes for presenter context
        │
        ▼
⑤ EXECUTE & OUTPUT
   - Run: node <script>.mjs
   - Save .pptx to same directory as input
   - Name: <input-name>-slides.pptx
```

## SRT Parsing Rules

```
Raw SRT:
1
00:00:06,490 --> 00:00:08,330
您好,欢迎来到病毒科学课,我是王丽明,

↓ Parse to clean text:
您好，欢迎来到病毒科学课，我是王丽明，

Rules:
- Remove all index numbers (lines that are just digits)
- Remove all timestamp lines (containing "-->")
- Remove "Transcribed by TurboScribe..." watermark
- Join fragmented lines into complete sentences
- Use punctuation to decide paragraph breaks
```

## Slide Layout System

Each slide gets a `type` that determines its PptxGenJS code template:

### TITLE (封面)
```javascript
slide.background = { color: "1a1a2e" };
slide.addText("标题", {
  x: 1.0, y: 1.5, w: 8.0, h: 1.5,
  fontSize: 40, bold: true, color: "FFFFFF", align: "center",
  fontFace: "Microsoft YaHei",
});
slide.addText("副标题 · 演讲者", {
  x: 1.0, y: 3.2, w: 8.0, h: 0.6,
  fontSize: 18, color: "AAAAAA", align: "center",
  fontFace: "Microsoft YaHei",
});
```

### SECTION (章节过渡)
```javascript
slide.background = { color: topicColor };
slide.addText("章节标题", {
  x: 1.0, y: 2.0, w: 8.0, h: 1.5,
  fontSize: 36, bold: true, color: "FFFFFF", align: "center",
  fontFace: "Microsoft YaHei",
});
```

### CONTENT (内容页)
```javascript
// Top accent bar
slide.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 10, h: 0.06, fill: { color: accentColor },
});
// Title
slide.addText("页面标题", {
  x: 0.8, y: 0.3, w: 8.4, h: 0.8,
  fontSize: 28, bold: true, color: "1a1a2e",
  fontFace: "Microsoft YaHei",
});
// Bullet points
slide.addText([
  { text: "要点一：", options: { bold: true, color: accentColor, fontSize: 20 } },
  { text: "详细说明内容\n", options: { fontSize: 18, color: "333333" } },
  { text: "要点二：", options: { bold: true, color: accentColor, fontSize: 20 } },
  { text: "详细说明内容\n", options: { fontSize: 18, color: "333333" } },
], {
  x: 0.8, y: 1.5, w: 8.4, h: 3.5,
  valign: "top", lineSpacing: 28,
  fontFace: "Microsoft YaHei",
});
```

### BIG_WORD (大字概念)
```javascript
slide.background = { color: "f8f8f8" };
slide.addText("核心概念定义", {
  x: 1.0, y: 1.5, w: 8.0, h: 2.5,
  fontSize: 32, bold: true, color: accentColor, align: "center",
  valign: "middle",
  fontFace: "Microsoft YaHei",
});
```

### QUOTE (引用/金句)
```javascript
slide.background = { color: accentColor };
slide.addText("「关键引用或金句」", {
  x: 1.5, y: 1.5, w: 7.0, h: 2.5,
  fontSize: 28, italic: true, color: "FFFFFF", align: "center",
  valign: "middle",
  fontFace: "Microsoft YaHei",
});
slide.addText("—— 出处说明", {
  x: 1.5, y: 4.0, w: 7.0, h: 0.5,
  fontSize: 14, color: "DDDDDD", align: "right",
  fontFace: "Microsoft YaHei",
});
```

### DATA (数据/统计)
```javascript
// Three metric cards horizontally
const metrics = [
  { value: "100nm", label: "病毒大小" },
  { value: "DNA/RNA", label: "遗传物质" },
  { value: "蛋白质", label: "外壳成分" },
];
metrics.forEach((m, i) => {
  const cx = 0.8 + i * 3.0;
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: cx, y: 1.5, w: 2.5, h: 1.8,
    fill: { color: accentColor, transparency: 90 },
    rectRadius: 0.15,
  });
  slide.addText(m.value, {
    x: cx, y: 1.6, w: 2.5, h: 0.9,
    fontSize: 28, bold: true, color: accentColor, align: "center",
    fontFace: "Microsoft YaHei",
  });
  slide.addText(m.label, {
    x: cx, y: 2.5, w: 2.5, h: 0.5,
    fontSize: 14, color: "666666", align: "center",
    fontFace: "Microsoft YaHei",
  });
});
```

### SUMMARY (总结)
```javascript
slide.background = { color: "1a1a2e" };
slide.addText("总结", {
  x: 0.8, y: 0.5, w: 8.4, h: 0.8,
  fontSize: 32, bold: true, color: "FFFFFF",
  fontFace: "Microsoft YaHei",
});
slide.addText([
  { text: "1. ", options: { bold: true, color: accentColor, fontSize: 22 } },
  { text: "要点一\n\n", options: { color: "CCCCCC", fontSize: 18 } },
  { text: "2. ", options: { bold: true, color: accentColor, fontSize: 22 } },
  { text: "要点二\n\n", options: { color: "CCCCCC", fontSize: 18 } },
  { text: "3. ", options: { bold: true, color: accentColor, fontSize: 22 } },
  { text: "要点三", options: { color: "CCCCCC", fontSize: 18 } },
], {
  x: 0.8, y: 1.5, w: 8.4, h: 3.5,
  valign: "top", lineSpacing: 36,
  fontFace: "Microsoft YaHei",
});
```

## Complete Script Template

Generate a self-contained `.mjs` file. Structure:

```javascript
import pptxgen from "pptxgenjs";

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "作者名";
pres.title = "演示标题";

// Color palette
const COLORS = {
  dark: "1a1a2e",
  accent: "e94560",
  accent2: "0f3460",
  light: "f8f8f8",
  gray: "666666",
  white: "FFFFFF",
};

// === Slide 1: Title ===
const s01 = pres.addSlide();
// ... TITLE layout code ...

// === Slide 2: Section ===
const s02 = pres.addSlide();
// ... SECTION layout code ...

// === Slide 3: Content ===
const s03 = pres.addSlide();
// ... CONTENT layout code ...

// ... more slides ...

// === Save ===
await pres.writeFile({ fileName: "output.pptx" });
console.log("PPTX created: output.pptx");
```

## Style Rules

- **Font**: Always use `fontFace: "Microsoft YaHei"` for Chinese text
- **Title size**: 28-40pt depending on slide type
- **Body size**: 18-22pt for readability
- **Max text per slide**: 4-5 bullet points, each 1-2 lines
- **Color contrast**: Dark backgrounds use white text; light backgrounds use dark text
- **Accent bar**: Every content slide gets a thin colored bar at top (w:10, h:0.06)
- **Spacing**: `lineSpacing: 28-36` for Chinese text readability
- **Margins**: Content within x:0.8–9.2, respecting slide edges

## Quality Checklist

Before executing, verify the generated code:
- [ ] `import pptxgen from "pptxgenjs"` at top
- [ ] `pres.layout = "LAYOUT_16x9"` set
- [ ] All text uses `fontFace: "Microsoft YaHei"`
- [ ] Cover slide has dark background with white text
- [ ] At least one SECTION divider slide
- [ ] Content slides have accent bar at top
- [ ] Summary/closing slide present
- [ ] No slide has more than 6 text elements
- [ ] Speaker notes added via `slide.addNotes("...")` where needed
- [ ] `await pres.writeFile(...)` at end with correct filename
- [ ] Original SRT timestamps and indices fully removed
- [ ] Language of output matches language of input

## Execution

After writing the `.mjs` file:

```bash
cd /path/to/output && node script.mjs
```

The script must be runnable standalone. If `pptxgenjs` is not installed:
```bash
npm install pptxgenjs
```

## Anti-Patterns

- Do NOT do web searches — work from the document content
- Do NOT invent facts not in the source document
- Do NOT use the `require()` CommonJS syntax — use ES module `import`
- Do NOT generate slides with tiny text (<14pt body)
- Do NOT skip the cover or closing slide
- Do NOT put more than one concept per slide
- Do NOT use `<script>` tags or CDN imports — this is Node.js code
- Do NOT forget to `await` the `writeFile` call
