---
name: doc-to-pptxgenjs
description: >
  Turn documents (SRT subtitle files, Markdown articles, plain text) into
  editable, YouTube-style PowerPoint .pptx files using PptxGenJS. Use this
  skill whenever the user wants to convert a document, article, transcript,
  SRT file, or lecture notes into a real, editable, visually striking
  PowerPoint file — even if they just say "turn this into PPT" or "make a
  PowerPoint from this doc." Outputs .pptx, plan.json, and .mjs script.
  Do NOT use this skill if the user specifically asks for Marp output.
---

# doc-to-pptxgenjs: Document → YouTube-Style Editable PPTX

Convert documents into visually striking YouTube-style PowerPoint files
with neon-dark theme, chapter markers, timeline mapping, and speaker notes.
No web search — work entirely from the input document.

## Bundled Resources

| Resource | When to Use |
|----------|-------------|
| `scripts/parse_srt.py` | Run FIRST for .srt input — clean text + timing |
| `references/layout-code-blocks.md` | **Read this** before generating code — YouTube-style copy-paste templates |

## Pipeline (Each step produces an artifact)

```
Input Document (.srt / .md / .txt)
        │
        ▼
① PARSE & CLEAN
   - SRT: `python3 scripts/parse_srt.py <input> -o /tmp/parsed.txt`
   - SRT timing: `python3 scripts/parse_srt.py <input> --json -o /tmp/timing.json`
   - MD: read directly
        │
        ▼
② STRUCTURE ANALYSIS
   - Identify narrative arc, section breaks, key concepts
   - Map content to SRT timestamps
   - Design YouTube flow: HOOK → INTRO → CHAPTERS → RECAP → NEXT
        │
        ▼
③ LAYOUT ASSIGNMENT
   - Plan slide sequence with types and timestamps
   - Types: HOOK | INTRO | CHAPTER | CONTENT | BIG_NUMBER | QUOTE | VS | DATA | RECAP | NEXT | CLOSING
   - **Read `references/layout-code-blocks.md` now** — YouTube-style code templates
        │
        ▼
④ PPTXGENJS CODE GENERATION → <input-name>-slides.mjs
   - Copy code blocks directly from `references/layout-code-blocks.md`
   - Use the YouTube neon color palette (YT object)
   - Add speaker notes via addNotes() on every content slide
   - Include chapter markers with ⏱ timestamps
        │
        ▼
⑤ PLAN GENERATION → <input-name>-plan.json
   - Slide-by-slide timeline mapping (see schema below)
        │
        ▼
⑥ EXECUTE → <input-name>-slides.pptx
   - Run: node <input-name>-slides.mjs
   - Verify PPTX is valid OOXML
```

## YouTube Color Palette (Always Use)

```javascript
const YT = {
  dark:       "0a0a0a",   // near-black (main bg)
  darker:     "141414",   // slightly lighter
  neonRed:    "ff2d55",   // hot pink-red (emphasis, bullets)
  neonCyan:   "00d4ff",   // electric cyan (headings, highlights)
  neonYellow: "ffcc00",   // warm yellow (numbers, warnings)
  neonGreen:  "00ff88",   // bright green (success)
  neonPurple: "bf5af2",   // vivid purple (chapter dividers)
  white:      "FFFFFF",
  gray:       "888888",
  lightGray:  "BBBBBB",
};
```

## Plan JSON Schema

Generate `<input-name>-plan.json`:

```json
{
  "title": "演示文稿标题",
  "source": "examples/第2集.srt",
  "total_slides": 15,
  "total_duration": "00:12:30",
  "theme": "youtube-neon-dark",
  "slides": [
    {
      "index": 1,
      "type": "HOOK",
      "title": "病毒到底是一种什么生命？",
      "start": "00:00:06,490",
      "end": "00:00:10,500",
      "duration_sec": 4.0,
      "chapter": null,
      "layout": "TITLE",
      "speaker_notes": "开场抓住注意力"
    },
    {
      "index": 2,
      "type": "INTRO",
      "title": "病毒与人类",
      "start": "00:00:10,500",
      "end": "00:00:45,000",
      "duration_sec": 34.5,
      "chapter": null,
      "layout": "CONTENT",
      "speaker_notes": "介绍病毒对人类的影响..."
    },
    {
      "index": 3,
      "type": "CHAPTER",
      "title": "第一章：完美寄生者",
      "start": "00:00:50,000",
      "end": "00:00:55,000",
      "duration_sec": 5.0,
      "chapter": 1,
      "layout": "CHAPTER",
      "speaker_notes": "过渡到第一个主题..."
    }
  ]
}
```

## SRT Parsing

Run the bundled script:

```bash
# Content extraction (merged paragraphs):
python3 .claude/skills/doc-to-pptxgenjs/scripts/parse_srt.py <input>.srt -o /tmp/parsed.txt

# Timeline data (individual entries with precise timestamps):
python3 .claude/skills/doc-to-pptxgenjs/scripts/parse_srt.py <input>.srt --no-merge --json -o /tmp/timing.json
```

## Slide Layout System

**Always read `references/layout-code-blocks.md`** — it has complete YouTube-style
copy-paste code. Available types:

| Type | Layout | Description |
|------|--------|-------------|
| HOOK | TITLE | Dark bg, huge bold statement, neon accent |
| INTRO | CONTENT | White bg, accent bar, bullet preview |
| CHAPTER | CHAPTER | Purple bg, "CHAPTER N", title, ⏱ timestamp |
| CONTENT | CONTENT | Dark bg variant, accent bar, 3-5 bullets |
| BIG_NUMBER | BIG_WORD | Huge neon number + label |
| QUOTE | QUOTE | Neon red bg, italic white quote |
| VS | TABLE | Side-by-side comparison table |
| DATA | DATA | Neon-accented rounded metric cards |
| RECAP | SUMMARY | Dark bg, numbered neon takeaways |
| NEXT | SUMMARY | Neon red bg, "下一讲" teaser |
| CLOSING | CLOSING | Dark bg, "谢谢" + Q&A |

## Quick Reference: Key Templates

### HOOK Slide
```javascript
slide.background = { color: YT.dark };
slide.addText("BOLD STATEMENT", {
  x: 0.5, y: 1.5, w: 9.0, h: 2.5,
  fontSize: 48, bold: true, color: YT.white, align: "center",
  fontFace: "Microsoft YaHei",
});
slide.addShape(pres.shapes.RECTANGLE, {
  x: 3.5, y: 4.2, w: 3.0, h: 0.05, fill: { color: YT.neonRed },
});
```

### CHAPTER Divider
```javascript
slide.background = { color: YT.neonPurple };
slide.addText(`CHAPTER 0${n}`, {
  x: 0.8, y: 1.5, w: 8.4, h: 0.8,
  fontSize: 20, color: YT.white, fontFace: "Microsoft YaHei",
});
slide.addText("章节标题", {
  x: 0.8, y: 2.3, w: 8.4, h: 1.2,
  fontSize: 40, bold: true, color: YT.white, fontFace: "Microsoft YaHei",
});
slide.addText("⏱ 00:50 – 04:30", {
  x: 0.8, y: 3.8, w: 8.4, h: 0.5,
  fontSize: 16, color: YT.white, fontFace: "Microsoft YaHei",
});
```

### CONTENT Slide
```javascript
slide.background = { color: YT.dark };
// Top neon accent bar
slide.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 10, h: 0.06, fill: { color: YT.neonRed },
});
slide.addText("页面标题", {
  x: 0.8, y: 0.3, w: 8.4, h: 0.8,
  fontSize: 28, bold: true, color: YT.white, fontFace: "Microsoft YaHei",
});
slide.addText([
  { text: "▸ 第一点：", options: { bold: true, color: YT.neonRed, fontSize: 20 } },
  { text: "详细说明\n\n", options: { fontSize: 18, color: YT.lightGray } },
  { text: "▸ 第二点：", options: { bold: true, color: YT.neonRed, fontSize: 20 } },
  { text: "详细说明\n\n", options: { fontSize: 18, color: YT.lightGray } },
], {
  x: 0.8, y: 1.5, w: 8.4, h: 3.5,
  valign: "top", lineSpacing: 28, fontFace: "Microsoft YaHei",
});
slide.addNotes("演讲时的补充内容...");
```

## Complete Script Template

```javascript
import pptxgen from "pptxgenjs";

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "作者";
pres.title = "标题";

const YT = {
  dark: "0a0a0a", neonRed: "ff2d55", neonCyan: "00d4ff",
  neonYellow: "ffcc00", neonGreen: "00ff88", neonPurple: "bf5af2",
  white: "FFFFFF", gray: "888888", lightGray: "BBBBBB",
};

// === Slide 1: HOOK ===
const s01 = pres.addSlide();
s01.background = { color: YT.dark };
// ... HOOK layout ...

// === Slide 2: INTRO ===
const s02 = pres.addSlide();
// ... INTRO layout ...

// ... more slides ...

// === Save ===
await pres.writeFile({ fileName: "output.pptx" });
console.log("PPTX created: output.pptx");
```

## Style Rules

- **Font**: Always `fontFace: "Microsoft YaHei"` for Chinese
- **Title size**: 28-48pt depending on slide type
- **Body size**: 18-22pt
- **Dark backgrounds**: `YT.dark` (#0a0a0a) for most slides
- **Neon accents**: `YT.neonRed` for bullets, bars; `YT.neonCyan` for headings
- **Chapter slides**: Purple background with timestamp
- **Accent bar**: Every CONTENT slide has a thin neon bar at top
- **Spacing**: `lineSpacing: 28-36` for Chinese

## Quality Checklist

Before executing, verify:
- [ ] `import pptxgen from "pptxgenjs"` at top
- [ ] YT color palette defined
- [ ] All text uses `fontFace: "Microsoft YaHei"`
- [ ] HOOK opening slide present
- [ ] At least one CHAPTER divider with ⏱ timestamp
- [ ] RECAP slide with numbered takeaways
- [ ] NEXT slide teasing next episode
- [ ] `addNotes()` on every content slide
- [ ] `await pres.writeFile(...)` at end
- [ ] No SRT artifacts (timestamps, TurboScribe)
- [ ] plan.json generated
- [ ] Script executed: `node <file>.mjs`

## Anti-Patterns

- Do NOT do web searches
- Do NOT invent facts not in the source
- Do NOT use `require()` — always ES module `import`
- Do NOT use light/white backgrounds — YouTube style is dark
- Do NOT skip the plan.json output
- Do NOT forget to execute the .mjs script
- Do NOT omit speaker notes
