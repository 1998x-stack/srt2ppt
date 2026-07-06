---
name: doc-to-marp
description: >
  Turn documents (SRT subtitle files, Markdown articles, plain text) into
  Marp presentation slide decks. Use this skill whenever the user wants to
  convert a document, article, transcript, SRT file, or lecture notes into
  a Marp Markdown presentation — even if they just say "turn this into
  slides" or "make a PPT from this doc" without specifying the format.
  Do NOT use this skill if the user specifically asks for PptxGenJS or
  python-pptx output.
---

# doc-to-marp: Document → Marp Slide Deck

Convert documents (SRT, Markdown, text) into a professional Marp Markdown
presentation. No web search — work entirely from the input document.

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
③ SLIDE DESIGN
   - Plan slide sequence: Cover → Sections → Key Points → Summary
   - Assign slide types: title, content, quote, data, comparison
   - Keep 3-5 bullet points per slide max
   - Each slide should have ONE clear message
   - Draft speaker notes FOR EVERY SLIDE as you design it
        │
        ▼
④ MARP GENERATION
   - Write front-matter (marp:true, theme, size, paginate, etc.)
   - Use --- as slide separator (blank line before it!)
   - Apply directives for visual variety
   - Append speaker notes to EVERY content slide
        │
        ▼
⑤ OUTPUT .md FILE
   - Save to same directory as input
   - Name: <input-name>-marp.md
```

## SRT Parsing Rules

```
Raw SRT:
1
00:00:06,490 --> 00:00:08,330
您好,欢迎来到病毒科学课,我是王丽明,

↓ Parse to:
您好，欢迎来到病毒科学课，我是王丽明，

Rules:
- Remove all index numbers (lines that are just digits)
- Remove all timestamp lines (containing "-->")
- Remove "Transcribed by TurboScribe..." watermark
- Join fragmented lines into complete sentences
- Use punctuation and natural pauses to decide paragraph breaks
```

## Slide Design Principles

### Content-to-Slide Mapping

| Content Type | Slide Layout | Marp Technique |
|---|---|---|
| Lecture intro / speaker intro | Title slide | `<!-- _class: lead -->` |
| Key concept / definition | Big text | `# <!--fit--> DEFINITION` |
| 3-5 related facts | Bullet list | Standard `- ` items |
| A quote or key insight | Quote slide | `<!-- _class: lead -->` + `>` |
| Two contrasting ideas | Two-column | Table hack or `<!-- class: columns -->` |
| Process / steps | Numbered list | `1. Step one` etc. |
| Data / statistics | Highlight numbers | Big font, `**bold**` numbers |
| Section transition | Section header | `<!-- _class: lead -->` + `## Section` |
| Summary / takeaways | Bullet review | `- ` with key points |

### Slide Count Guidelines

- 30 min lecture transcript → 12-18 slides
- 5 min short content → 5-8 slides
- Each slide ≈ 1-2 minutes of speaking

## Marp Template

Always start with this structure:

```markdown
---
marp: true
theme: gaia
size: 16:9
paginate: true
headingDivider: 0
---

<!-- _class: lead -->
# [TITLE]
## [SUBTITLE / CONTEXT]

---

<!-- _class: lead -->
## [FIRST SECTION NAME]

---

## [SLIDE TITLE]
- Point 1
- Point 2
- Point 3

<!-- Speaker notes:
Additional context the presenter should mention.
Explain the reasoning behind each point.
-->

---

# <!--fit--> [KEY CONCEPT / DEFINITION]

<!-- Speaker notes:
Elaborate on this concept. Give a concrete example or analogy.
-->

---

## 总结
- Key takeaway 1
- Key takeaway 2
- Key takeaway 3

<!-- Speaker notes:
Recap the main themes. Preview what comes next.
-->

---

<!-- _class: lead -->
# 谢谢
## Q & A
```

## Directive Cheatsheet

Refer to `docs/03-directives.md` for the full reference. Most-used directives:

```markdown
<!-- Global (in front matter) -->
theme: gaia | default | uncover
size: 16:9 | 4:3
paginate: true
style: |          ← custom CSS injection

<!-- Local (applies to following slides) -->
<!-- backgroundColor: #hex -->
<!-- color: #hex -->
<!-- class: lead -->    ← centered layout

<!-- Scoped (current slide only, _ prefix) -->
<!-- _backgroundColor: #hex -->
<!-- _backgroundImage: url(...) -->
<!-- _class: lead -->
```

## Speaker Notes (MANDATORY)

**Every content slide MUST have speaker notes.** This is non-negotiable.
Notes help presenters deliver the talk without memorizing — they carry the
full context from the original document that wouldn't fit on the slide.

Use this format immediately before the `---` separator:

```markdown
<!-- Speaker notes:
Context, examples, and talking points the presenter should mention.
Include key facts and transitions from the source document.
-->
```

What to include:
- **Context**: Background the presenter should know beyond slide text
- **Transitions**: How this slide connects to the next one
- **Key facts**: Important details from the source that didn't fit on the slide
- **Examples**: Concrete illustrations the presenter can mention orally

Only exceptions: the title slide and the closing "谢谢" slide may skip notes.

## Quality Checklist

Before outputting, verify:
- [ ] Front matter has `marp: true`
- [ ] Each `---` separator has blank line before it
- [ ] No slide has more than 7 lines of text
- [ ] **Every content slide has speaker notes** (only title + closing may skip)
- [ ] At least one visual variety directive used (class, background)
- [ ] Title slide and closing slide present
- [ ] Original SRT timestamps and indices fully removed
- [ ] Language of output matches language of input

## Anti-Patterns

- Do NOT do web searches — work from the document content
- Do NOT invent facts not in the source document
- Do NOT use `headingDivider` unless the document naturally maps to heading levels
- Do NOT put more than one concept per slide
- Do NOT skip the title slide or closing slide
- Do NOT forget blank lines before `---`
- Do NOT omit speaker notes — every content slide needs them
