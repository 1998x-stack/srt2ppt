# Marp Slide Pattern Library

Reference of proven slide layout patterns with Marp code. Use these directly
or adapt as needed.

## Table of Contents
- [Cover Slide](#cover-slide)
- [Section Divider](#section-divider)
- [Content (Bullets)](#content-bullets)
- [Big Concept](#big-concept)
- [Quote](#quote)
- [Comparison (Two Column)](#comparison-two-column)
- [Process / Steps](#process-steps)
- [Data Highlights](#data-highlights)
- [Image + Text](#image--text)
- [Summary](#summary)
- [Closing Slide](#closing-slide)

---

## Cover Slide

```markdown
<!-- _class: lead -->
# [PRESENTATION TITLE]
## [Subtitle · Speaker · Date]
```

Variation with background:

```markdown
<!-- _class: lead invert -->
<!-- _backgroundColor: #1a1a2e -->
<!-- _color: white -->
# [TITLE]
## [Subtitle]
```

---

## Section Divider

```markdown
<!-- _class: lead -->
## [SECTION NUMBER]. [SECTION TITLE]

<!-- Speaker notes:
Introduce this section. Explain what the audience will learn.
-->
```

Inverted variant (dark background):

```markdown
<!-- _class: lead invert -->
<!-- _backgroundColor: #0f3460 -->
## [SECTION TITLE]
```

---

## Content (Bullets)

Standard content slide with 3-5 bullet points:

```markdown
## [SLIDE TITLE]

- **[Bold Lead]**: Explanation text with key detail
- **[Bold Lead]**: Another point with supporting information
- **[Bold Lead]**: Third key point

<!-- Speaker notes:
Elaborate on each bullet. Give the examples and context
that the slide text can't convey.
-->
```

With nested bullets:

```markdown
## [SLIDE TITLE]

- Main point 1
  - Supporting detail
  - Another detail
- Main point 2
  - Supporting detail
- Main point 3
```

---

## Big Concept

For definitions, key terms, or important single ideas:

```markdown
# <!--fit--> [KEY CONCEPT IN LARGE TEXT]

<!-- Speaker notes:
Define this concept in detail. Use analogies to make it
accessible. Connect it to what the audience already knows.
-->
```

With background color:

```markdown
<!-- _backgroundColor: #f8f8f8 -->
# <!--fit--> [KEY CONCEPT]
```

---

## Quote

```markdown
<!-- _class: lead -->

> "Quote from the source document"
>
> — Attribution

<!-- Speaker notes:
Explain the significance of this quote. Why does it matter?
-->
```

---

## Comparison (Two Column)

Using HTML table hack for side-by-side comparison:

```markdown
## [COMPARISON TITLE]

| **A 方面** | **B 方面** |
|:--:|:--:|
| 特征 1 | 特征 A |
| 特征 2 | 特征 B |
| 特征 3 | 特征 C |
```

For more complex comparisons:

```html
<table>
<tr>
<td width="50%">

### 观点 A
- 论据 1
- 论据 2

</td>
<td width="50%">

### 观点 B
- 论据 A
- 论据 B

</td>
</tr>
</table>
```

---

## Process / Steps

```markdown
## [PROCESS TITLE]

1. **步骤一** — 简要说明
2. **步骤二** — 简要说明
3. **步骤三** — 简要说明
4. **步骤四** — 简要说明

<!-- Speaker notes:
Walk through each step with concrete examples.
-->
```

---

## Data Highlights

For emphasizing numbers or statistics:

```markdown
## [METRIC TITLE]

| 指标 | 数值 |
|---|---|
| 病毒大小 | **100 nm** |
| 基因组 | **4 个基因** |
| 结构层数 | **3 层** |
```

Or as big numbers:

```markdown
# **100 nm**
## 病毒颗粒直径
```

---

## Image + Text

```markdown
![bg right:40%](image.jpg)

## [TITLE]
- Point 1
- Point 2
- Point 3
```

---

## Summary

```markdown
<!-- _class: lead -->
## 总结

1. **关键点一** — 一句话概括
2. **关键点二** — 一句话概括
3. **关键点三** — 一句话概括

<!-- Speaker notes:
Recap the main themes of the presentation.
Connect them to the bigger picture. Preview next steps.
-->
```

---

## Closing Slide

```markdown
<!-- _class: lead -->
# 谢谢
## Q & A

<!-- Speaker notes:
Thank the audience. Open for questions. Provide contact info
or references if applicable.
-->
```

---

## Color Usage

When using `backgroundColor` or `color` directives:

| Context | Background | Text Color |
|---------|------------|------------|
| Dark cover | `#1a1a2e` or `#0f3460` | `white` or `#FFFFFF` |
| Light content | `#f8f8f8` | `#333333` |
| Warm accent | `#faf3e0` | `#333333` |
| Red alert | `#e94560` | `white` |
