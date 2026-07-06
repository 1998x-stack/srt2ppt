---
name: doc-to-marp
description: >
  Turn documents (SRT subtitle files, Markdown articles, plain text) into
  Marp presentation slide decks AND rendered PPTX/HTML/PDF. Use this skill
  whenever the user wants to convert a document, article, transcript, SRT
  file, or lecture notes into slides — even if they just say "turn this into
  slides" or "make a PPT from this doc." Outputs .md, plan.json, and .pptx.
  Do NOT use this skill if the user specifically asks for PptxGenJS output.
---

# doc-to-marp: Document → YouTube-Style Slide Deck + PPTX

Convert documents into visually striking, YouTube-style Marp presentations
with neon-dark theme, chapter markers, timeline mapping, and rendered PPTX.
No web search — work entirely from the input document.

## Bundled Resources

| Resource | When to Use |
|----------|-------------|
| `scripts/parse_srt.py` | Run FIRST for any .srt input — extracts clean text with timestamps |
| `scripts/parse_srt.py --json` | Run when you need timing data for plan.json |
| `references/slide-patterns.md` | Layout templates for each slide type |
| `references/youtube-theme.md` | **Read this always** — YouTube dark/neon theme, CSS, color palette |

## Pipeline (Each step produces an artifact)

```
Input Document (.srt / .md / .txt)
        │
        ▼
① PARSE & CLEAN
   - SRT content: `python3 scripts/parse_srt.py <input> -o /tmp/parsed.txt`
   - SRT timing: `python3 scripts/parse_srt.py <input> --no-merge --json -o /tmp/timing.json`
   - MD: read directly
        │
        ▼
② STRUCTURE ANALYSIS → /tmp/outline.json
   - Identify narrative arc, section breaks, key concepts
   - Map content to SRT timestamps (start/end per slide)
   - Assign slide types: HOOK | CHAPTER | CONTENT | BIG_NUMBER | QUOTE | VS | SUMMARY | NEXT
        │
        ▼
③ SLIDE DESIGN → /tmp/slides-plan.json
   - Decide exact slide count and sequence
   - Assign timestamps (from SRT JSON) to each slide
   - Read `references/youtube-theme.md` for theme setup
   - Read `references/slide-patterns.md` for layout code
        │
        ▼
④ MARP GENERATION → <input-name>-marp.md
   - Front-matter with YouTube dark theme + custom CSS
   - --- separators with blank lines
   - Chapter markers with ⏱ timestamps
   - Speaker notes on EVERY content slide
        │
        ▼
⑤ PLAN GENERATION → <input-name>-plan.json
   - Slide-by-slide timeline mapping
   - See Plan JSON Schema section below
        │
        ▼
⑥ RENDER → <input-name>.pptx + .html
   - Run: npx marp <input-name>-marp.md --pptx -o <input-name>.pptx
   - Run: npx marp <input-name>-marp.md -o <input-name>.html
   - Marp CLI is already installed in the project
```

## Step 0: Extract Timestamps for SRT

When input is .srt, get timing data FIRST:

```bash
# For content extraction (merged paragraphs):
python3 .claude/skills/doc-to-marp/scripts/parse_srt.py examples/第2集.srt -o /tmp/parsed.txt

# For timeline mapping (individual entries with timestamps):
python3 .claude/skills/doc-to-marp/scripts/parse_srt.py examples/第2集.srt --no-merge --json -o /tmp/timing.json
```

The `--no-merge --json` output gives you precise per-subtitle timestamps:
`[{"paragraph": N, "time": "00:00:06,490 --> 00:00:08,330", "text": "..."}]`
Use these to map each slide to its video segment in plan.json.

## Step ②: Outline Structure (YouTube Style)

YouTube presentation flow:

```
HOOK (5-10s)     → Grab attention, big statement
INTRO (30-60s)    → What we're covering, why it matters
CHAPTER 1          → Main point 1 with ⏱ marker
  - Content slides  (3-5 bullets each)
  - Deep dive       (BIG_NUMBER or QUOTE)
CHAPTER 2          → Main point 2
  - Content slides
  - VS comparison
CHAPTER 3          → Main point 3
  - Content slides
RECAP (30s)        → 3 key takeaways
NEXT (15s)         → Tease next episode
```

## Plan JSON Schema

Generate `<input-name>-plan.json` with this exact structure:

```json
{
  "title": "演示文稿标题",
  "source": "examples/第2集.srt",
  "total_slides": 18,
  "total_duration": "00:12:30",
  "theme": "youtube-dark",
  "slides": [
    {
      "index": 1,
      "type": "HOOK",
      "title": "病毒：完美寄生者",
      "start": "00:00:06,490",
      "end": "00:00:15,500",
      "duration_sec": 9.0,
      "chapter": null,
      "layout": "TITLE",
      "speaker_notes": "开场抓住注意力..."
    },
    {
      "index": 2,
      "type": "INTRO",
      "title": "今天我们要聊什么",
      "start": "00:00:15,500",
      "end": "00:00:50,000",
      "duration_sec": 34.5,
      "chapter": null,
      "layout": "CONTENT",
      "speaker_notes": "介绍三大特性..."
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

Field rules:
- `type`: HOOK | INTRO | CHAPTER | CONTENT | BIG_NUMBER | QUOTE | VS | DATA | RECAP | NEXT | CLOSING
- `layout`: Marp layout name (TITLE | CHAPTER | CONTENT | BIG_WORD | QUOTE | VS | DATA | RECAP | NEXT | CLOSING)
- `start/end`: SRT timestamp format `HH:MM:SS,mmm`
- `duration_sec`: float, computed from (end - start)
- `chapter`: null for non-chapter slides, integer 1-9 for chapter markers
- `speaker_notes`: one sentence summarizing what presenter says

## YouTube Dark Theme

**Always use `references/youtube-theme.md`** for the complete theme. Quick setup:

```yaml
---
marp: true
theme: uncover
size: 16:9
paginate: false
style: |
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700;900&display=swap');
  :root {
    --dark: #0a0a0a; --neon-red: #ff2d55; --neon-cyan: #00d4ff;
    --neon-yellow: #ffcc00; --white: #ffffff; --gray: #888888;
    font-family: 'Noto Sans SC', system-ui, sans-serif;
  }
  section { background-color: var(--dark); color: var(--white); padding: 60px 80px; }
  h1 { font-size: 3.5em; font-weight: 900; }
  h2 { font-size: 2.2em; font-weight: 700; color: var(--neon-cyan); }
  strong { color: var(--neon-red); }
  em { color: var(--neon-yellow); font-style: normal; }
  ul { list-style: none; padding-left: 0; }
  ul li::before { content: "▸"; color: var(--neon-red); margin-right: 0.5em; }
  li { font-size: 1.3em; margin: 0.4em 0; }
  section::after {
    content: ''; position: absolute; bottom: 0; left: 0; height: 4px;
    background: linear-gradient(90deg, var(--neon-red), var(--neon-cyan));
  }
---
```

Color usage:
- Background: `#0a0a0a` (near-black)
- Headings: `#ffffff` (white h1), `#00d4ff` (cyan h2)
- Emphasis: `#ff2d55` (neon red) for **bold**, ▸ bullets
- Highlights: `#ffcc00` (neon yellow) for *italic*
- Chapter backgrounds: `#bf5af2` (purple), `#ff2d55` (red)

## YouTube Slide Patterns (Quick Reference)

Full details in `references/youtube-theme.md`.

### HOOK — First slide, grab attention
```markdown
<!-- _class: lead -->
# <!--fit--> [BOLD STATEMENT]
```

### CHAPTER — Section divider with timestamp
```markdown
<!-- _class: lead -->
<!-- _backgroundColor: #bf5af2 -->
CHAPTER 01
# [TITLE]
⏱ `00:50` – `04:30`
```

### BIG NUMBER — Emphasize key data
```markdown
<!-- _class: lead -->
# **100 nm**
## 病毒颗粒直径
```

### VS — Side-by-side comparison
```markdown
# 🅰️ VS 🅱️
| | A | B |
|---|:---:|:---:|
| 特征1 | ✅ | ❌ |
```

### RECAP — 3 key takeaways
```markdown
<!-- _class: lead -->
# 总结
## **01** 要点一
## **02** 要点二
## **03** 要点三
```

### NEXT — Tease next episode
```markdown
<!-- _class: lead -->
<!-- _backgroundColor: #ff2d55 -->
# <!--fit--> 下一讲
## [NEXT TOPIC]
⏱ 即将更新
```

## SRT Parsing Rules

**Always run the script first:**

```bash
# For content extraction:
python3 .claude/skills/doc-to-marp/scripts/parse_srt.py examples/第2集.srt -o /tmp/parsed.txt

# For timeline mapping (plan.json):
python3 .claude/skills/doc-to-marp/scripts/parse_srt.py examples/第2集.srt --no-merge --json -o /tmp/timing.json
```

Manual parsing rules (for non-SRT):
```
Raw SRT:
1
00:00:06,490 --> 00:00:08,330
您好,欢迎来到病毒科学课,我是王丽明,

↓ Parse to:
您好，欢迎来到病毒科学课，我是王丽明，

Rules:
- Remove index numbers, timestamp lines, TurboScribe watermark
- Join fragmented lines into complete sentences
```

## Speaker Notes (MANDATORY)

**Every content slide MUST have speaker notes.** Format:

```markdown
<!-- Speaker notes:
Context, examples, and talking points the presenter should mention.
-->
```

What to include: context, transitions, key facts from source, examples.
Only exceptions: HOOK and NEXT slides may skip.

## Quality Checklist

Before rendering, verify:
- [ ] YouTube dark theme in front-matter (--dark: #0a0a0a, neon colors)
- [ ] `marp: true` set
- [ ] Each `---` has blank line before it
- [ ] **Every content slide has speaker notes**
- [ ] At least one CHAPTER marker with ⏱ timestamp
- [ ] HOOK opening slide present
- [ ] RECAP + NEXT closing slides present
- [ ] No SRT timestamps/watermarks in output
- [ ] plan.json written with all slides mapped to timestamps
- [ ] PPTX rendered: `npx marp <file> --pptx`

## After Generating .md

Always run these commands to produce final outputs:

```bash
# Render PPTX (editable PowerPoint)
npx marp <input-name>-marp.md --pptx -o <input-name>.pptx

# Render HTML (for web preview)
npx marp <input-name>-marp.md -o <input-name>.html

# Optional: Render PDF
npx marp <input-name>-marp.md --pdf -o <input-name>.pdf
```

After rendering, verify:
```bash
# Check PPTX is valid (should be a ZIP/OOXML file)
file <input-name>.pptx | grep -q 'Zip archive' && echo "✅ PPTX OK" || echo "❌ PPTX FAILED"

# Validate plan.json
python3 -m json.tool <input-name>-plan.json > /dev/null && echo "✅ plan.json valid" || echo "❌ plan.json invalid"

# Verify all artifacts exist
ls -lh <input-name>-marp.md <input-name>-plan.json <input-name>.pptx <input-name>.html
```

## Anti-Patterns

- Do NOT do web searches — work from the document content
- Do NOT invent facts not in the source document
- Do NOT skip the YouTube dark theme — always use it
- Do NOT forget the plan.json output
- Do NOT skip rendering commands — always produce .pptx
- Do NOT use light themes (gaia/default) — YouTube style is dark
- Do NOT omit speaker notes
- Do NOT forget blank lines before `---
