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

## Bundled Resources

| Resource | When to Use |
|----------|-------------|
| `scripts/parse_srt.py` | Run this FIRST for any .srt input — extracts clean text |
| `references/layout-code-blocks.md` | **Read this** before generating code — complete copy-paste templates for every slide type. Load it at step ③. |

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
     TITLE | SECTION | CONTENT | BIG_WORD | QUOTE | DATA | TABLE | SUMMARY | CLOSING
   - Keep 3-5 bullet points per content slide
   - **Read `references/layout-code-blocks.md` now** — it has exact code templates
        │
        ▼
④ PPTXGENJS CODE GENERATION
   - Write a runnable .mjs script using PptxGenJS
   - Copy code blocks directly from `references/layout-code-blocks.md`
   - Use the C color palette defined in the reference
   - Add speaker notes for presenter context
        │
        ▼
⑤ EXECUTE & OUTPUT
   - Run: node <script>.mjs
   - Save .pptx to same directory as input
   - Name: <input-name>-slides.pptx
```

## SRT Parsing Rules

**For .srt files, run the bundled script FIRST:**

```bash
python3 .claude/skills/doc-to-pptxgenjs/scripts/parse_srt.py <input.srt> -o /tmp/parsed.txt
```

This produces clean, merged text. Read `/tmp/parsed.txt` and use it as your source content.
The script handles: index removal, timestamp stripping, TurboScribe watermark removal,
and intelligent paragraph merging.

For manual parsing, follow these rules:

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

Each slide gets a `type`. The complete, ready-to-copy code for every layout
is in **`references/layout-code-blocks.md`** — read that file, don't write
from scratch. Below is a quick overview of available types:

### Available Layout Types

| Type | Description | Code in Reference |
|------|-------------|:---:|
| TITLE | Dark background, title + subtitle + speaker | `layout-code-blocks.md#title` |
| SECTION | Colored background, section name | `layout-code-blocks.md#section` |
| CONTENT | White bg, accent bar, heading, bullet list | `layout-code-blocks.md#content` |
| BIG_WORD | Light bg, centered definition text | `layout-code-blocks.md#big_word` |
| QUOTE | Accent bg, italic quote + attribution | `layout-code-blocks.md#quote` |
| DATA | Metric cards with rounded rectangles | `layout-code-blocks.md#data` |
| TABLE | Structured table with header row | `layout-code-blocks.md#table` |
| SUMMARY | Dark bg, numbered takeaways | `layout-code-blocks.md#summary` |
| CLOSING | Dark bg, "谢谢" + Q&A | `layout-code-blocks.md#closing` |

**Always read `references/layout-code-blocks.md` before writing code.**
Copy the templates directly — they include the C color palette, correct
coordinates, fontFace settings, and addNotes patterns.

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
