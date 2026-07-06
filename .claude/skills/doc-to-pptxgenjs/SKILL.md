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

# doc-to-pptxgenjs: Document → Scientific Documentary Editable PPTX

Convert documents into visually striking scientific documentary PowerPoint files
with Cryo-EM deep navy theme, viral capsid geometric accents, chapter markers,
timeline mapping, and speaker notes. Design grounded in cryo-electron microscopy
false-color palettes — distinctive, not templated.
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
   - SRT timing: `python3 scripts/parse_srt.py <input> --no-merge --json -o /tmp/timing.json`
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
⑥ EXECUTE + VERIFY → <input-name>-slides.pptx
   - Validate JSON: `python3 -m json.tool <input-name>-plan.json > /dev/null`
   - Run: `node <input-name>-slides.mjs`
   - If node fails: check error, fix the .mjs, re-run
   - Verify PPTX: `file <input-name>-slides.pptx | grep -q 'Zip archive'`
   - Report: `ls -lh <input-name>-slides.pptx <input-name>-plan.json <input-name>-slides.mjs`
```

## Cryo-EM Color Palette (Always Use)

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

## Plan JSON Schema

Generate `<input-name>-plan.json`:

```json
{
  "title": "演示文稿标题",
  "source": "examples/第2集.srt",
  "total_slides": 15,
  "total_duration": "00:12:30",
  "theme": "cryo-em-scientific",
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

**Always read `references/layout-code-blocks.md`** — it has complete Cryo-EM
scientific documentary copy-paste code. Available types:

| Type | Layout | Description |
|------|--------|-------------|
| HOOK | TITLE | Deep navy bg, framed bold statement, teal corner accent |
| INTRO | CONTENT | Left accent strip, bullet preview |
| CHAPTER | CHAPTER | Purple bg, capsid geometric triangles, "CHAPTER N", title, ⏱ timestamp |
| CONTENT | CONTENT | Deep navy + left accent strip, 3-5 bullets with amber markers |
| BIG_NUMBER | BIG_WORD | Warm amber number + teal label, subtle geometric ring |
| QUOTE | QUOTE | Warm amber bg, left-line accent, italic white quote |
| VS | TABLE | Side-by-side comparison table, purple headers |
| DATA | DATA | Bento-grid rounded cards on darker navy surfaces |
| RECAP | SUMMARY | Left purple accent, numbered takeaways |
| NEXT | SUMMARY | Warm amber bg, "下一讲" teaser with geometric decoration |
| CLOSING | CLOSING | Deep navy bg, "谢谢" + Q&A with teal accent bar |

## Quick Reference: Key Templates

### HOOK Slide
```javascript
slide.background = { color: YT.dark };
// Subtle geometric frame
slide.addShape(pres.shapes.RECTANGLE, {
  x: 0.6, y: 0.6, w: 0.06, h: 1.2, fill: { color: YT.accent },
});
slide.addShape(pres.shapes.RECTANGLE, {
  x: 0.6, y: 0.6, w: 2.5, h: 0.05, fill: { color: YT.accent },
});
slide.addText("BOLD STATEMENT", {
  x: 0.5, y: 1.2, w: 9.0, h: 2.5,
  fontSize: 46, bold: true, color: YT.white, align: "center",
  fontFace: "Microsoft YaHei", lineSpacing: 56,
});
slide.addShape(pres.shapes.RECTANGLE, {
  x: 3.8, y: 4.0, w: 2.4, h: 0.04, fill: { color: YT.warm },
});
```

### CHAPTER Divider (with capsid geometry)
```javascript
slide.background = { color: YT.purple };
// Geometric triangle pattern — signature element
const triSize = 0.35, triY = 1.0;
for (let i = 0; i < 5; i++) {
  const cx = 1.5 + i * 1.6;
  slide.addShape(pres.shapes.ISOSCELES_TRIANGLE, {
    x: cx, y: triY, w: triSize, h: triSize,
    fill: { color: YT.white, transparency: 85 }, flipV: false,
  });
  slide.addShape(pres.shapes.ISOSCELES_TRIANGLE, {
    x: cx + 0.8, y: triY + 0.3, w: triSize, h: triSize,
    fill: { color: YT.white, transparency: 90 }, flipV: true,
  });
}
slide.addText(`CHAPTER 0${n}`, {
  x: 0.8, y: 2.0, w: 8.4, h: 0.7,
  fontSize: 18, color: YT.white, fontFace: "Microsoft YaHei", charSpacing: 6,
});
slide.addText("章节标题", {
  x: 0.8, y: 2.7, w: 8.4, h: 1.2,
  fontSize: 42, bold: true, color: YT.white, fontFace: "Microsoft YaHei",
});
slide.addText("⏱ 00:50 – 04:30", {
  x: 0.8, y: 4.2, w: 8.4, h: 0.5,
  fontSize: 15, color: YT.white, fontFace: "Microsoft YaHei",
});
```

### CONTENT Slide (left accent strip)
```javascript
slide.background = { color: YT.dark };
// Left accent strip — distinctive vertical bar
slide.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 0.08, h: 5.63, fill: { color: YT.accent },
});
slide.addText("页面标题", {
  x: 0.8, y: 0.3, w: 8.4, h: 0.8,
  fontSize: 30, bold: true, color: YT.white, fontFace: "Microsoft YaHei",
});
slide.addText([
  { text: "▸ 第一点：", options: { bold: true, color: YT.warm, fontSize: 20 } },
  { text: "详细说明\n\n", options: { fontSize: 18, color: YT.lightGray } },
  { text: "▸ 第二点：", options: { bold: true, color: YT.warm, fontSize: 20 } },
  { text: "详细说明\n\n", options: { fontSize: 18, color: YT.lightGray } },
], {
  x: 1.2, y: 1.5, w: 7.8, h: 3.5,
  valign: "top", lineSpacing: 32, fontFace: "Microsoft YaHei",
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
  dark: "0B1E2E", darker: "132D42", accent: "00A8CC",
  warm: "F08C3E", coral: "E85D5D", purple: "7B5EA7",
  white: "E8ECF0", gray: "6B8299", lightGray: "9BB0C2", darkGray: "1E3A50",
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
- **Title size**: 30-46pt depending on slide type
- **Body size**: 18-20pt
- **Deep navy backgrounds**: `YT.dark` (#0B1E2E) for all slides — not pure black
- **Left accent strip**: Every CONTENT slide has a 0.08" vertical accent bar on the left edge
- **Amber markers**: `YT.warm` for bullet markers and emphasis
- **Teal headings**: `YT.accent` for titles and highlights
- **Chapter slides**: Purple bg (#7B5EA7) with capsid-inspired triangle pattern + timestamp
- **Quote slides**: Warm amber bg (#F08C3E) with left-line accent
- **Progress bar**: Single thin bottom bar (not many dots)
- **Spacing**: `lineSpacing: 32-40` for Chinese

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
- Do NOT use pure black (#000000) or generic neon colors — use the Cryo-EM palette
- Do NOT use horizontal top accent bars — use left vertical accent strips
- Do NOT skip the plan.json output
- Do NOT forget to execute the .mjs script
- Do NOT omit speaker notes
- Do NOT use progress dots — use the thin bottom progress bar
