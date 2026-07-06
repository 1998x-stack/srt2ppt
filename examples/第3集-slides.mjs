import pptxgen from "pptxgenjs";

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "王丽明";
pres.title = "病毒科学课 第3讲 — 病毒如何让人生病？";

const YT = {
  dark:       "0B1E2E",
  darker:     "132D42",
  accent:     "00A8CC",
  warm:       "F08C3E",
  coral:      "E85D5D",
  purple:     "7B5EA7",
  white:      "E8ECF0",
  gray:       "6B8299",
  lightGray:  "9BB0C2",
  darkGray:   "1E3A50",
};

const TOTAL = 17;
const FONT = "Microsoft YaHei";

// Thin bottom progress bar (cleaner than dots)
function addProgress(slide, current) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 5.35, w: 9.0, h: 0.025, fill: { color: YT.darkGray },
  });
  const pw = (current / (TOTAL - 1)) * 9.0;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 5.35, w: pw, h: 0.025, fill: { color: YT.accent },
  });
}

// Capsid triangles for chapter dividers — the signature element
function addCapsidPattern(slide) {
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
}

// Left accent strip on content slides
function leftAccent(slide, color) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.08, h: 5.63, fill: { color: color || YT.accent },
  });
}

// === Slide 1: HOOK ===
{
  const s = pres.addSlide();
  s.background = { color: YT.dark };
  // Geometric corner frame
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 0.6, w: 0.06, h: 1.2, fill: { color: YT.accent },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 0.6, w: 2.4, h: 0.04, fill: { color: YT.accent },
  });
  s.addText("病毒如何\n让人生病？", {
    x: 0.5, y: 1.2, w: 9.0, h: 2.5,
    fontSize: 46, bold: true, color: YT.white, align: "center",
    fontFace: FONT, lineSpacing: 56,
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 3.8, y: 4.0, w: 2.4, h: 0.04, fill: { color: YT.warm },
  });
  s.addText("王丽明 · 病毒科学课 第3讲", {
    x: 1.0, y: 4.3, w: 8.0, h: 0.6,
    fontSize: 15, color: YT.gray, align: "center",
    fontFace: FONT,
  });
  s.addNotes("开场抛出核心问题：病毒在细胞外像沙子一样不会动，它们是怎么跑进我们身体里并且让我们得病的呢？回顾上一讲三大特性（完美寄生者、极简主义者、规则破坏者），引出本讲主题。");
}

// === Slide 2: INTRO ===
{
  const s = pres.addSlide();
  s.background = { color: YT.dark };
  leftAccent(s);
  s.addText("本讲概要", {
    x: 0.8, y: 0.3, w: 8.4, h: 0.8,
    fontSize: 30, bold: true, color: YT.white, fontFace: FONT,
  });
  s.addText([
    { text: "▸ 病毒本身会致病吗？\n", options: { fontSize: 20, color: YT.white } },
    { text: "  「病毒」=「病+毒」？字面理解正确吗\n\n", options: { fontSize: 16, color: YT.gray } },
    { text: "▸ 病毒如何识别和入侵宿主细胞？\n", options: { fontSize: 20, color: YT.white } },
    { text: "  完全静默的病毒怎样精准找到目标\n\n", options: { fontSize: 16, color: YT.gray } },
    { text: "▸ 病毒入侵后如何导致疾病？\n", options: { fontSize: 20, color: YT.white } },
    { text: "  三种截然不同的致病机制", options: { fontSize: 16, color: YT.gray } },
  ], {
    x: 1.2, y: 1.5, w: 7.5, h: 3.5,
    valign: "top", lineSpacing: 30, fontFace: FONT,
  });
  addProgress(s, 1);
  s.addNotes("介绍本讲三个核心问题。只有搞清楚了病毒怎么进入人体、怎么导致生病，我们才能更好地对抗它。");
}

// === Slide 3: CONTENT — 「病毒」≠「病+毒」：非洲猪瘟的启示 ===
{
  const s = pres.addSlide();
  s.background = { color: YT.dark };
  leftAccent(s, YT.warm);
  s.addText("「病毒」≠「病+毒」", {
    x: 0.8, y: 0.3, w: 8.4, h: 0.8,
    fontSize: 30, bold: true, color: YT.white, fontFace: FONT,
  });
  s.addText([
    { text: "▸ 病毒的字面理解是错误的\n", options: { bold: true, color: YT.warm, fontSize: 20 } },
    { text: "病毒 = 蛋白质外壳 + DNA/RNA，本身不致病\n", options: { fontSize: 18, color: YT.lightGray } },
    { text: "日常饮食也含蛋白质、DNA、RNA，吃了没事\n\n", options: { fontSize: 16, color: YT.gray } },
    { text: "▸ 非洲猪瘟的启示\n", options: { bold: true, color: YT.warm, fontSize: 20 } },
    { text: "对猪：致死率接近 100%，重创中国养殖业\n", options: { fontSize: 18, color: YT.lightGray } },
    { text: "对人：吃感染猪肉完全没事，既不病也不毒\n\n", options: { fontSize: 18, color: YT.lightGray } },
    { text: "▸ 关键原因：非洲猪瘟病毒不识别人体细胞\n", options: { bold: true, color: YT.accent, fontSize: 20 } },
    { text: "病毒致病的第一个要素 → 必须能进入宿主细胞", options: { fontSize: 18, color: YT.lightGray } },
  ], {
    x: 1.2, y: 1.3, w: 7.8, h: 4.0,
    valign: "top", lineSpacing: 28, fontFace: FONT,
  });
  addProgress(s, 2);
  s.addNotes("病毒的字面理解是错的。病毒由蛋白质和DNA/RNA构成，这些东西本身不会引起疾病。非洲猪瘟病毒100%杀死猪，但人吃了感染猪肉完全没事——因为病毒无法进入人体细胞。关键：病毒必须先进入宿主细胞才可能致病。");
}

// === Slide 4: CHAPTER 1 — 识别与入侵宿主细胞 ===
{
  const s = pres.addSlide();
  s.background = { color: YT.purple };
  addCapsidPattern(s);
  s.addText("CHAPTER 01", {
    x: 0.8, y: 2.0, w: 8.4, h: 0.7,
    fontSize: 18, color: YT.white, fontFace: FONT, charSpacing: 6,
  });
  s.addText("识别与入侵宿主细胞", {
    x: 0.8, y: 2.7, w: 8.4, h: 1.2,
    fontSize: 42, bold: true, color: YT.white, fontFace: FONT,
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 4.0, w: 2.0, h: 0.04, fill: { color: YT.white },
  });
  s.addText("⏱ 02:49 – 07:46", {
    x: 0.8, y: 4.2, w: 8.4, h: 0.5,
    fontSize: 15, color: YT.white, fontFace: FONT,
  });
  s.addNotes("第一章：病毒致病的第一个要素——必须能进入宿主细胞。本章讲解病毒如何依靠表面蛋白质分子被动识别并入侵特定宿主细胞。");
}

// === Slide 5: CONTENT — 宿主选择性 ===
{
  const s = pres.addSlide();
  s.background = { color: YT.dark };
  leftAccent(s);
  s.addText("宿主选择性", {
    x: 0.8, y: 0.3, w: 8.4, h: 0.8,
    fontSize: 30, bold: true, color: YT.white, fontFace: FONT,
  });
  s.addText([
    { text: "▸ 几乎所有地球生命都能被病毒入侵\n", options: { bold: true, color: YT.warm, fontSize: 20 } },
    { text: "从细菌到真菌，从植物到动物，都不例外\n\n", options: { fontSize: 18, color: YT.lightGray } },
    { text: "▸ 但特定病毒只入侵特定物种的特定细胞\n", options: { bold: true, color: YT.warm, fontSize: 20 } },
    { text: "乙肝病毒 → 只识别肝脏细胞\n", options: { fontSize: 18, color: YT.lightGray } },
    { text: "艾滋病毒 → 只识别某种免疫细胞\n\n", options: { fontSize: 18, color: YT.lightGray } },
    { text: "▸ 病毒在细胞外处于绝对静默状态\n", options: { bold: true, color: YT.accent, fontSize: 20 } },
    { text: "那它们是怎么识别并入侵宿主细胞的？", options: { fontSize: 18, color: YT.lightGray } },
  ], {
    x: 1.2, y: 1.3, w: 7.8, h: 4.0,
    valign: "top", lineSpacing: 28, fontFace: FONT,
  });
  addProgress(s, 4);
  s.addNotes("宿主选择性是病毒的关键特征。乙肝病毒只入侵肝脏细胞，艾滋病毒只入侵特定免疫细胞。病毒在进入宿主细胞之前毫无生命迹象，处在一种绝对的静默状态。");
}

// === Slide 6: CONTENT — 艾滋病毒的入侵机制 ===
{
  const s = pres.addSlide();
  s.background = { color: YT.dark };
  leftAccent(s, YT.warm);
  s.addText("艾滋病毒的入侵机制", {
    x: 0.8, y: 0.3, w: 8.4, h: 0.8,
    fontSize: 30, bold: true, color: YT.white, fontFace: FONT,
  });
  s.addText([
    { text: "▸ 病毒表面：像图钉一样的蛋白质分子\n", options: { bold: true, color: YT.warm, fontSize: 20 } },
    { text: "大头 GP120 → 识别并结合 CD4 受体\n", options: { fontSize: 18, color: YT.lightGray } },
    { text: "尖头 GP41 → 刺破细胞膜，完成融合\n\n", options: { fontSize: 18, color: YT.lightGray } },
    { text: "▸ 入侵四步（全程被动）\n", options: { bold: true, color: YT.warm, fontSize: 20 } },
    { text: "① GP120 结合免疫细胞表面 CD4 蛋白\n", options: { fontSize: 18, color: YT.lightGray } },
    { text: "② CCR5 辅助拉近病毒与细胞距离\n", options: { fontSize: 18, color: YT.lightGray } },
    { text: "③ GP41 刺破细胞膜\n", options: { fontSize: 18, color: YT.lightGray } },
    { text: "④ 病毒膜与细胞膜融合 → 内容物进入", options: { fontSize: 18, color: YT.lightGray } },
  ], {
    x: 1.2, y: 1.3, w: 7.8, h: 4.0,
    valign: "top", lineSpacing: 28, fontFace: FONT,
  });
  addProgress(s, 5);
  s.addNotes("以艾滋病毒为例详解入侵机制。GP120像图钉大头结合CD4，GP41像尖头刺破细胞膜。整个过程就像磁铁南北极天然相互吸引一样，完全被动完成，不需要病毒做任何事情。");
}

// === Slide 7: CONTENT — 被动入侵的两大特点 ===
{
  const s = pres.addSlide();
  s.background = { color: YT.dark };
  leftAccent(s);
  s.addText("被动入侵的两大特点", {
    x: 0.8, y: 0.3, w: 8.4, h: 0.8,
    fontSize: 30, bold: true, color: YT.white, fontFace: FONT,
  });
  s.addText([
    { text: "▸ 特点一：完全被动，无需主动动作\n", options: { bold: true, color: YT.warm, fontSize: 20 } },
    { text: "病毒没有能力做任何主动动作\n", options: { fontSize: 18, color: YT.lightGray } },
    { text: "仅靠蛋白质吸引结合 + 细胞膜融合等物理过程\n", options: { fontSize: 18, color: YT.lightGray } },
    { text: "就能找到宿主细胞并成功入侵\n\n", options: { fontSize: 18, color: YT.lightGray } },
    { text: "▸ 特点二：宿主选择性 = 结合什么蛋白质\n", options: { bold: true, color: YT.warm, fontSize: 20 } },
    { text: "细胞表面有对应受体 → 能识别入侵\n", options: { fontSize: 18, color: YT.lightGray } },
    { text: "细胞表面没有对应受体 → 无法进入\n\n", options: { fontSize: 18, color: YT.lightGray } },
    { text: "▸ 聪明的策略：利用宿主必需蛋白作为入侵工具\n", options: { bold: true, color: YT.accent, fontSize: 20 } },
    { text: "宿主无法轻易放弃这些有重要功能的蛋白质", options: { fontSize: 18, color: YT.lightGray } },
  ], {
    x: 1.2, y: 1.3, w: 7.8, h: 4.0,
    valign: "top", lineSpacing: 26, fontFace: FONT,
  });
  addProgress(s, 6);
  s.addNotes("病毒识别和入侵宿主细胞的两大特点：第一，完全被动，不需要做任何事情；第二，宿主选择性取决于结合什么蛋白质分子。病毒利用宿主必需的蛋白质作为入侵工具——宿主无法放弃这些蛋白质，自然也无法阻止病毒入侵。");
}

// === Slide 8: VS — 新冠病毒 vs 非洲猪瘟病毒 ===
{
  const s = pres.addSlide();
  s.background = { color: YT.dark };
  leftAccent(s);
  s.addText("新冠病毒 vs 非洲猪瘟病毒", {
    x: 0.8, y: 0.3, w: 8.4, h: 0.8,
    fontSize: 30, bold: true, color: YT.white, fontFace: FONT,
  });

  const hdr = { bold: true, color: YT.white, fill: { color: YT.purple }, align: "center", fontSize: 15, fontFace: FONT };
  const left = { bold: true, align: "center", fontSize: 14, fontFace: FONT, color: YT.white };
  const cell = { align: "center", fontSize: 14, fontFace: FONT, color: YT.lightGray };

  const green = "5DBA8B";
  const rows = [
    [
      { text: "特征", options: hdr },
      { text: "🦠 新冠病毒", options: hdr },
      { text: "🐷 非洲猪瘟病毒", options: hdr },
    ],
    [
      { text: "结合受体", options: left },
      { text: "ACE2 蛋白质", options: { ...cell, color: YT.warm } },
      { text: "（人体中不存在）", options: { ...cell, color: YT.gray } },
    ],
    [
      { text: "靶向器官", options: left },
      { text: "肺、肾、睾丸等多器官", options: { ...cell, color: YT.coral } },
      { text: "仅猪的特定细胞", options: { ...cell, color: YT.gray } },
    ],
    [
      { text: "感染人类", options: left },
      { text: "✅ 是", options: { ...cell, color: YT.coral } },
      { text: "❌ 否", options: { ...cell, color: green } },
    ],
    [
      { text: "致病后果", options: left },
      { text: "多器官严重病变", options: { ...cell, color: YT.coral } },
      { text: "对人完全无害", options: { ...cell, color: green } },
    ],
    [
      { text: "根本原因", options: left },
      { text: "人体细胞带有 ACE2", options: { ...cell, color: YT.white } },
      { text: "人体细胞无对应受体", options: { ...cell, color: YT.white } },
    ],
  ];

  s.addTable(rows, {
    x: 0.8, y: 1.5, w: 8.4,
    border: { type: "solid", pt: 0.5, color: YT.darkGray },
    colW: [2.4, 3.0, 3.0],
    rowH: [0.55, 0.5, 0.5, 0.5, 0.5, 0.5],
  });
  addProgress(s, 7);
  s.addNotes("SARS-CoV-2依靠ACE2受体入侵人体多器官（肺、肾、睾丸），造成多器官病变。非洲猪瘟病毒识别的蛋白质人体根本没有，所以人类不会被感染。病毒都是「指哪打哪」。");
}

// === Slide 9: QUOTE — 病毒没有动机一定要让宿主生病 ===
{
  const s = pres.addSlide();
  s.background = { color: YT.warm };
  // Left line accent
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 1.8, w: 0.05, h: 1.8, fill: { color: YT.white, transparency: 50 },
  });
  s.addText("「病毒没有动机\n一定要让宿主生病，\n更别说死亡了」", {
    x: 1.5, y: 1.2, w: 7.5, h: 2.5,
    fontSize: 28, italic: true, color: YT.white, align: "left",
    valign: "middle", fontFace: FONT, lineSpacing: 42,
  });
  s.addText("—— 每个健康人体内都隐藏着很多病毒", {
    x: 1.5, y: 3.8, w: 7.5, h: 0.5,
    fontSize: 15, color: YT.white, align: "right",
    fontFace: FONT,
  });
  s.addNotes("病毒唯一使命是自我复制。宿主细胞健健康康地活着，持续帮助病毒制造后代，才是最理想的。但如果某些病毒过分活跃，或者人体免疫系统比较弱，人就可能会生病。");
}

// === Slide 10: CHAPTER 2 — 病毒致病的三大机制 ===
{
  const s = pres.addSlide();
  s.background = { color: YT.purple };
  addCapsidPattern(s);
  s.addText("CHAPTER 02", {
    x: 0.8, y: 2.0, w: 8.4, h: 0.7,
    fontSize: 18, color: YT.white, fontFace: FONT, charSpacing: 6,
  });
  s.addText("病毒致病的三大机制", {
    x: 0.8, y: 2.7, w: 8.4, h: 1.2,
    fontSize: 42, bold: true, color: YT.white, fontFace: FONT,
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 4.0, w: 2.0, h: 0.04, fill: { color: YT.white },
  });
  s.addText("⏱ 08:41 – 11:20", {
    x: 0.8, y: 4.2, w: 8.4, h: 0.5,
    fontSize: 15, color: YT.white, fontFace: FONT,
  });
  s.addNotes("第二章：病毒进入宿主细胞后，通过三种截然不同的机制导致疾病——直接破坏、过度防御、免疫攻击。");
}

// === Slide 11: CONTENT — 第一类：病毒直接破坏宿主细胞 ===
{
  const s = pres.addSlide();
  s.background = { color: YT.dark };
  leftAccent(s, YT.coral);
  s.addText("第一类：病毒直接破坏宿主细胞", {
    x: 0.8, y: 0.3, w: 8.4, h: 0.8,
    fontSize: 28, bold: true, color: YT.white, fontFace: FONT,
  });
  s.addText([
    { text: "▸ 代表：腺病毒（引发病毒性肺炎）\n\n", options: { bold: true, color: YT.warm, fontSize: 20 } },
    { text: "▸ 机制：\n", options: { bold: true, color: YT.accent, fontSize: 20 } },
    { text: "病毒在宿主细胞内完成自我复制\n", options: { fontSize: 18, color: YT.lightGray } },
    { text: "新病毒颗粒需要离开 → 寻找下一个目标\n", options: { fontSize: 18, color: YT.lightGray } },
    { text: "→ 病毒命令宿主细胞启动自杀程序\n", options: { fontSize: 18, color: YT.lightGray } },
    { text: "→ 细胞破碎分解 → 释放大量新病毒\n\n", options: { fontSize: 18, color: YT.lightGray } },
    { text: "▸ 后果：短时间内大批细胞被破坏 → 人得病\n", options: { bold: true, color: YT.coral, fontSize: 20 } },
  ], {
    x: 1.2, y: 1.3, w: 7.8, h: 4.0,
    valign: "top", lineSpacing: 28, fontFace: FONT,
  });
  addProgress(s, 10);
  s.addNotes("腺病毒在人体细胞内完成自我复制后，命令宿主细胞启动自杀程序，把自己的破碎分解掉，这样病毒颗粒就可以被释放出去。短时间内入侵和分解大批量的人体细胞，人当然就可能得病。");
}

// === Slide 12: CONTENT — 第二类：宿主细胞过度防御 ===
{
  const s = pres.addSlide();
  s.background = { color: YT.dark };
  leftAccent(s, YT.warm);
  s.addText("第二类：宿主细胞过度防御", {
    x: 0.8, y: 0.3, w: 8.4, h: 0.8,
    fontSize: 28, bold: true, color: YT.white, fontFace: FONT,
  });
  s.addText([
    { text: "▸ 代表：艾滋病毒（HIV）\n\n", options: { bold: true, color: YT.warm, fontSize: 20 } },
    { text: "▸ 机制：\n", options: { bold: true, color: YT.accent, fontSize: 20 } },
    { text: "病毒本身不杀伤免疫细胞\n", options: { fontSize: 18, color: YT.lightGray } },
    { text: "但细胞内部监视系统检测到入侵 → 启动自杀\n", options: { fontSize: 18, color: YT.lightGray } },
    { text: "本是人体防御措施：让感染细胞主动死亡\n", options: { fontSize: 18, color: YT.lightGray } },
    { text: "→ 阻止病毒完成复制并入侵其他细胞\n\n", options: { fontSize: 18, color: YT.lightGray } },
    { text: "▸ 问题：防御做得「过于好」\n", options: { bold: true, color: YT.coral, fontSize: 20 } },
    { text: "连未被感染的免疫细胞也被清除\n", options: { fontSize: 18, color: YT.lightGray } },
    { text: "→ 免疫系统彻底瘫痪 → 死于各种病原体感染", options: { fontSize: 18, color: YT.lightGray } },
  ], {
    x: 1.2, y: 1.3, w: 7.8, h: 4.0,
    valign: "top", lineSpacing: 26, fontFace: FONT,
  });
  addProgress(s, 11);
  s.addNotes("有些时候病毒本身不杀伤宿主细胞，反而是宿主细胞自身的防御措施导致了疾病。艾滋病人体内，宿主细胞的防御做得过于好了——不仅杀死被感染的细胞，连健康的免疫细胞也被清除。免疫系统彻底瘫痪。");
}

// === Slide 13: CONTENT — 第三类：免疫系统持续攻击 ===
{
  const s = pres.addSlide();
  s.background = { color: YT.dark };
  leftAccent(s, YT.purple);
  s.addText("第三类：免疫系统持续攻击", {
    x: 0.8, y: 0.3, w: 8.4, h: 0.8,
    fontSize: 28, bold: true, color: YT.white, fontFace: FONT,
  });
  s.addText([
    { text: "▸ 代表：乙肝病毒 · SARS · 新冠病毒\n\n", options: { bold: true, color: YT.warm, fontSize: 20 } },
    { text: "▸ 机制：\n", options: { bold: true, color: YT.accent, fontSize: 20 } },
    { text: "免疫系统被激活 → 寻找并消灭病毒\n", options: { fontSize: 18, color: YT.lightGray } },
    { text: "大量细胞已被感染 → 也成了免疫攻击对象\n\n", options: { fontSize: 18, color: YT.lightGray } },
    { text: "▸ 乙肝病毒慢性感染：\n", options: { bold: true, color: YT.warm, fontSize: 20 } },
    { text: "大部分肝脏细胞长期携带病毒\n", options: { fontSize: 18, color: YT.lightGray } },
    { text: "→ 免疫系统持续全面攻击肝脏\n", options: { fontSize: 18, color: YT.lightGray } },
    { text: "→ 肝炎 → 肝硬化 → 肝癌\n\n", options: { fontSize: 18, color: YT.lightGray } },
    { text: "▸ SARS/新冠病毒同理：\n", options: { bold: true, color: YT.warm, fontSize: 20 } },
    { text: "免疫系统剧烈攻击肺部 → 呼吸衰竭 → 死亡", options: { fontSize: 18, color: YT.lightGray } },
  ], {
    x: 1.2, y: 1.3, w: 7.8, h: 4.0,
    valign: "top", lineSpacing: 26, fontFace: FONT,
  });
  addProgress(s, 12);
  s.addNotes("第三类与人体免疫系统的机制有关。免疫系统持续攻击那些携带病毒的人体细胞。乙肝→肝炎→肝硬化→肝癌的进展链条；SARS和新冠病毒感染引发免疫系统剧烈攻击肺部，导致呼吸衰竭。");
}

// === Slide 14: BIG_NUMBER — 三大致病机制 ===
{
  const s = pres.addSlide();
  s.background = { color: YT.dark };
  // Subtle geometric ring
  s.addShape(pres.shapes.OVAL, {
    x: 4.1, y: 0.6, w: 1.8, h: 1.8,
    fill: { color: YT.accent, transparency: 95 },
    line: { color: YT.accent, width: 1.5, transparency: 70 },
  });
  s.addText("3", {
    x: 1.0, y: 0.7, w: 8.0, h: 1.5,
    fontSize: 68, bold: true, color: YT.warm, align: "center",
    fontFace: FONT,
  });
  s.addText("大类致病机制", {
    x: 1.0, y: 2.3, w: 8.0, h: 0.8,
    fontSize: 28, color: YT.accent, align: "center",
    fontFace: FONT,
  });
  s.addText("直接破坏 · 过度防御 · 免疫攻击", {
    x: 1.0, y: 3.3, w: 8.0, h: 0.5,
    fontSize: 18, color: YT.lightGray, align: "center",
    fontFace: FONT,
  });
  s.addText("三类机制可同时发生 · 相互叠加", {
    x: 1.0, y: 3.9, w: 8.0, h: 0.5,
    fontSize: 15, color: YT.gray, align: "center",
    fontFace: FONT,
  });
  addProgress(s, 13);
  s.addNotes("总结三类致病机制的核心。有时三类机制同时发生，相互叠加。理解这些机制是开发抗病毒药物和疫苗的基础。");
}

// === Slide 15: RECAP — 总结 ===
{
  const s = pres.addSlide();
  s.background = { color: YT.dark };
  leftAccent(s, YT.purple);
  s.addText("总结", {
    x: 0.8, y: 0.3, w: 8.4, h: 0.8,
    fontSize: 36, bold: true, color: YT.white, fontFace: FONT,
  });
  s.addText([
    { text: "01  ", options: { bold: true, color: YT.accent, fontSize: 24 } },
    { text: "病毒本身不致病 — 必须进入宿主细胞\n\n", options: { color: YT.lightGray, fontSize: 20 } },
    { text: "02  ", options: { bold: true, color: YT.warm, fontSize: 24 } },
    { text: "被动入侵 — 表面蛋白结合宿主受体，全程无需主动动作\n\n", options: { color: YT.lightGray, fontSize: 20 } },
    { text: "03  ", options: { bold: true, color: YT.purple, fontSize: 24 } },
    { text: "三大致病机制 — 直接破坏 / 过度防御 / 免疫攻击", options: { color: YT.lightGray, fontSize: 20 } },
  ], {
    x: 1.2, y: 1.5, w: 7.8, h: 3.5,
    valign: "top", lineSpacing: 36, fontFace: FONT,
  });
  addProgress(s, 14);
  s.addNotes("回顾本讲三大要点：1) 病毒本身不致病，必须进入宿主细胞；2) 病毒靠表面蛋白结合宿主受体完成被动入侵；3) 三大致病机制——直接破坏、过度防御、免疫攻击。搞清楚了病毒如何导致疾病，下一讲我们来说说病毒是如何传播的。");
}

// === Slide 16: NEXT — 下集预告 ===
{
  const s = pres.addSlide();
  s.background = { color: YT.warm };
  // Subtle geometric decoration
  s.addShape(pres.shapes.OVAL, {
    x: 8.0, y: -0.5, w: 3.0, h: 3.0,
    fill: { color: YT.white, transparency: 93 },
  });
  s.addText("下一讲", {
    x: 1.0, y: 1.2, w: 8.0, h: 0.7,
    fontSize: 22, color: YT.white, align: "center",
    fontFace: FONT,
  });
  s.addText("病毒如何传播？", {
    x: 0.5, y: 2.2, w: 9.0, h: 1.2,
    fontSize: 40, bold: true, color: YT.white, align: "center",
    fontFace: FONT,
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 3.5, y: 3.5, w: 3.0, h: 0.03, fill: { color: YT.white, transparency: 50 },
  });
  s.addText("⏱ 第4讲 — 即将更新", {
    x: 1.0, y: 3.8, w: 8.0, h: 0.5,
    fontSize: 17, color: YT.white, align: "center",
    fontFace: FONT,
  });
  s.addNotes("预告下一讲内容：病毒是如何传播的？为什么病毒会导致那么多可怕的传染病，威胁我们的健康和生命。");
}

// === Slide 17: CLOSING ===
{
  const s = pres.addSlide();
  s.background = { color: YT.dark };
  leftAccent(s);
  s.addText("谢谢", {
    x: 1.0, y: 2.0, w: 8.0, h: 1.2,
    fontSize: 52, bold: true, color: YT.white, align: "center",
    fontFace: FONT,
  });
  s.addText("Q & A", {
    x: 1.0, y: 3.3, w: 8.0, h: 0.6,
    fontSize: 28, color: YT.accent, align: "center",
    fontFace: FONT,
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 5.55, w: 10, h: 0.06, fill: { color: YT.accent },
  });
}

// === Save ===
await pres.writeFile({ fileName: "/workspace/data/xieming/other-codes/srt2ppt/examples/第3集-slides.pptx" });
console.log("PPTX created: 第3集-slides.pptx");
