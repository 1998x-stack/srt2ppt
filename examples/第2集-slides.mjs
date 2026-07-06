import pptxgen from "pptxgenjs";

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "王丽明";
pres.title = "病毒科学课 第2讲 — 病毒到底是一种什么生命？";

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

const TOTAL = 18;
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
  s.addText("病毒到底是一种\n什么生命？", {
    x: 0.5, y: 1.2, w: 9.0, h: 2.5,
    fontSize: 46, bold: true, color: YT.white, align: "center",
    fontFace: FONT, lineSpacing: 56,
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 3.8, y: 4.0, w: 2.4, h: 0.04, fill: { color: YT.warm },
  });
  s.addText("王丽明 · 病毒科学课 第2讲", {
    x: 1.0, y: 4.3, w: 8.0, h: 0.6,
    fontSize: 15, color: YT.gray, align: "center",
    fontFace: FONT,
  });
  s.addNotes("开场抓住观众注意力，抛出核心问题：病毒到底是一种什么生命？");
}

// === Slide 2: INTRO ===
{
  const s = pres.addSlide();
  s.background = { color: YT.dark };
  leftAccent(s);
  s.addText("今天我们要聊什么", {
    x: 0.8, y: 0.3, w: 8.4, h: 0.8,
    fontSize: 30, bold: true, color: YT.white, fontFace: FONT,
  });
  s.addText([
    { text: "▸ 病毒与人类疾病的关系\n\n", options: { fontSize: 20, color: YT.white } },
    { text: "▸ 病毒的三大核心特性\n\n", options: { fontSize: 20, color: YT.white } },
    { text: "▸ 为什么病毒如此特别", options: { fontSize: 20, color: YT.white } },
  ], {
    x: 1.2, y: 1.5, w: 7.5, h: 3.5,
    valign: "top", lineSpacing: 34, fontFace: FONT,
  });
  addProgress(s, 1);
  s.addNotes("从人们熟悉的疾病入手，建立病毒与日常生活的关联。强调我们对病毒的了解还很有限。");
}

// === Slide 3: CONTENT — 病毒的基本描述 ===
{
  const s = pres.addSlide();
  s.background = { color: YT.dark };
  leftAccent(s);
  s.addText("病毒的基本描述", {
    x: 0.8, y: 0.3, w: 8.4, h: 0.8,
    fontSize: 30, bold: true, color: YT.white, fontFace: FONT,
  });
  s.addText([
    { text: "▸ 结构特征：", options: { bold: true, color: YT.warm, fontSize: 20 } },
    { text: "非细胞形态微生物，蛋白质外壳包裹 DNA 或 RNA\n\n", options: { fontSize: 18, color: YT.lightGray } },
    { text: "▸ 尺寸范围：", options: { bold: true, color: YT.warm, fontSize: 20 } },
    { text: "几十到几百纳米，比细菌小得多，需电子显微镜观察\n\n", options: { fontSize: 18, color: YT.lightGray } },
    { text: "▸ 关键特性：", options: { bold: true, color: YT.warm, fontSize: 20 } },
    { text: "无法独立生长和繁殖，必须寄生于其他生物体内", options: { fontSize: 18, color: YT.lightGray } },
  ], {
    x: 1.2, y: 1.5, w: 7.8, h: 3.5,
    valign: "top", lineSpacing: 32, fontFace: FONT,
  });
  addProgress(s, 2);
  s.addNotes("中学课本级别的基础知识回顾。但仅凭这些描述，很难体会病毒的奇异之处。");
}

// === Slide 4: BIG_NUMBER — 三句话总结 ===
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
  s.addText("个关键词定义病毒", {
    x: 1.0, y: 2.3, w: 8.0, h: 0.8,
    fontSize: 28, color: YT.accent, align: "center",
    fontFace: FONT,
  });
  s.addText("完美寄生者 · 极简主义者 · 规则破坏者", {
    x: 1.0, y: 3.3, w: 8.0, h: 0.5,
    fontSize: 18, color: YT.lightGray, align: "center",
    fontFace: FONT,
  });
  addProgress(s, 3);
  s.addNotes("用三句话总结病毒的核心特性，为后续三个章节做预告。");
}

// === Slide 5: CHAPTER — 完美寄生者 ===
{
  const s = pres.addSlide();
  s.background = { color: YT.purple };
  addCapsidPattern(s);
  s.addText("CHAPTER 01", {
    x: 0.8, y: 2.0, w: 8.4, h: 0.7,
    fontSize: 18, color: YT.white, fontFace: FONT, charSpacing: 6,
  });
  s.addText("完美寄生者", {
    x: 0.8, y: 2.7, w: 8.4, h: 1.2,
    fontSize: 42, bold: true, color: YT.white, fontFace: FONT,
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 4.0, w: 2.0, h: 0.04, fill: { color: YT.white },
  });
  s.addText("⏱ 01:56 – 04:50", {
    x: 0.8, y: 4.2, w: 8.4, h: 0.5,
    fontSize: 15, color: YT.white, fontFace: FONT,
  });
  s.addNotes("第一章：病毒将全部生命活动转交宿主，是真正意义上的完美寄生者。");
}

// === Slide 6: VS — 寄生虫 vs 病毒 ===
{
  const s = pres.addSlide();
  s.background = { color: YT.dark };
  leftAccent(s);
  s.addText("寄生虫 vs 病毒", {
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
      { text: "寄生虫", options: hdr },
      { text: "病毒", options: hdr },
    ],
    [
      { text: "独立代谢", options: left },
      { text: "✅ 可以", options: { ...cell, color: green } },
      { text: "❌ 不能", options: { ...cell, color: YT.coral } },
    ],
    [
      { text: "自主繁殖", options: left },
      { text: "✅ 可以", options: { ...cell, color: green } },
      { text: "❌ 不能", options: { ...cell, color: YT.coral } },
    ],
    [
      { text: "能量消耗", options: left },
      { text: "✅ 需要", options: { ...cell, color: green } },
      { text: "❌ 不需要", options: { ...cell, color: YT.coral } },
    ],
    [
      { text: "独立生存", options: left },
      { text: "✅ 完整生命", options: { ...cell, color: green } },
      { text: "❌ 非严格生命", options: { ...cell, color: YT.coral } },
    ],
    [
      { text: "功能转移", options: left },
      { text: "小部分转移", options: { ...cell, color: YT.white } },
      { text: "全部转移", options: { ...cell, color: YT.white } },
    ],
  ];

  s.addTable(rows, {
    x: 0.8, y: 1.5, w: 8.4,
    border: { type: "solid", pt: 0.5, color: YT.darkGray },
    colW: [3.0, 2.7, 2.7],
    rowH: [0.55, 0.5, 0.5, 0.5, 0.5, 0.5],
  });
  addProgress(s, 5);
  s.addNotes("通过对比表格，直观展示病毒与寄生虫的本质区别。寄生虫仍需自己完成生存繁殖，病毒则全部外包。");
}

// === Slide 7: CONTENT — 病毒的两个生命阶段 ===
{
  const s = pres.addSlide();
  s.background = { color: YT.dark };
  leftAccent(s);
  s.addText("病毒的两个生命阶段", {
    x: 0.8, y: 0.3, w: 8.4, h: 0.8,
    fontSize: 30, bold: true, color: YT.white, fontFace: FONT,
  });
  s.addText([
    { text: "▸ 阶段一：宿主细胞之外\n", options: { bold: true, color: YT.warm, fontSize: 20 } },
    { text: "完全静默 — 不呼吸不动不繁殖，与沙子石头无异\n", options: { fontSize: 18, color: YT.lightGray } },
    { text: "可在大自然中稳定存在超长时间\n", options: { fontSize: 16, color: YT.gray } },
    { text: "例：2014年西伯利亚永冻土中发现3万年前的活病毒\n\n", options: { fontSize: 16, color: YT.gray } },
    { text: "▸ 阶段二：进入宿主细胞内部\n", options: { bold: true, color: YT.warm, fontSize: 20 } },
    { text: "立刻展现全部生命迹象\n", options: { fontSize: 18, color: YT.lightGray } },
    { text: "利用宿主现成的能量和工具批量制造后代\n", options: { fontSize: 18, color: YT.lightGray } },
    { text: "后代离开细胞，回归沉寂，等待下一次入侵机会", options: { fontSize: 18, color: YT.lightGray } },
  ], {
    x: 1.2, y: 1.3, w: 7.8, h: 4.0,
    valign: "top", lineSpacing: 28, fontFace: FONT,
  });
  addProgress(s, 6);
  s.addNotes("病毒生命分成黑白分明的两个阶段：细胞外完全沉寂，细胞内完全活跃。这是真正意义上的完美寄生。");
}

// === Slide 8: CHAPTER — 极简主义者 ===
{
  const s = pres.addSlide();
  s.background = { color: YT.purple };
  addCapsidPattern(s);
  s.addText("CHAPTER 02", {
    x: 0.8, y: 2.0, w: 8.4, h: 0.7,
    fontSize: 18, color: YT.white, fontFace: FONT, charSpacing: 6,
  });
  s.addText("极简主义者", {
    x: 0.8, y: 2.7, w: 8.4, h: 1.2,
    fontSize: 42, bold: true, color: YT.white, fontFace: FONT,
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 4.0, w: 2.0, h: 0.04, fill: { color: YT.white },
  });
  s.addText("⏱ 04:50 – 07:15", {
    x: 0.8, y: 4.2, w: 8.4, h: 0.5,
    fontSize: 15, color: YT.white, fontFace: FONT,
  });
  s.addNotes("第二章：完美的寄生能力让病毒有条件发展出极简主义的生活方式。以乙肝病毒为例。");
}

// === Slide 9: DATA — 乙肝病毒的极简设计 ===
{
  const s = pres.addSlide();
  s.background = { color: YT.dark };
  leftAccent(s);
  s.addText("乙肝病毒 — 极简设计", {
    x: 0.8, y: 0.3, w: 8.4, h: 0.8,
    fontSize: 30, bold: true, color: YT.white, fontFace: FONT,
  });

  const cards = [
    { value: "3 层", label: "结构层次", color: YT.accent },
    { value: "4 个", label: "基因数量", color: YT.warm },
    { value: "3.2 kb", label: "基因组大小", color: YT.purple },
  ];
  const cardW = 2.2, cardH = 1.6, startX = 0.8, gap = 0.6;
  cards.forEach((c, i) => {
    const cx = startX + i * (cardW + gap);
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx, y: 1.6, w: cardW, h: cardH,
      fill: { color: YT.darker },
      rectRadius: 0.1,
      line: { color: c.color, width: 1.2, transparency: 40 },
    });
    s.addShape(pres.shapes.OVAL, {
      x: cx + 0.15, y: 1.85, w: 0.12, h: 0.12,
      fill: { color: c.color },
    });
    s.addText(c.value, {
      x: cx + 0.35, y: 1.75, w: cardW - 0.5, h: 0.7,
      fontSize: 26, bold: true, color: c.color, align: "left",
      fontFace: FONT,
    });
    s.addText(c.label, {
      x: cx + 0.15, y: 2.55, w: cardW - 0.3, h: 0.5,
      fontSize: 14, color: YT.gray, align: "left",
      fontFace: FONT,
    });
  });

  s.addText([
    { text: "大肠杆菌：4,000+ 基因  |  人类：20,000+ 基因", options: { fontSize: 15, color: YT.gray } },
  ], {
    x: 0.8, y: 3.6, w: 8.4, h: 0.5,
    align: "center", fontFace: FONT,
  });
  addProgress(s, 8);
  s.addNotes("乙肝病毒基因组不到大肠杆菌的千分之一，不到人类的百万分之一。只有4个基因，极简到极致。");
}

// === Slide 10: CONTENT — 乙肝病毒如何繁殖 ===
{
  const s = pres.addSlide();
  s.background = { color: YT.dark };
  leftAccent(s, YT.warm);
  s.addText("乙肝病毒的繁殖策略", {
    x: 0.8, y: 0.3, w: 8.4, h: 0.8,
    fontSize: 30, bold: true, color: YT.white, fontFace: FONT,
  });
  s.addText([
    { text: "▸ 4个基因 = 一份说明书\n", options: { bold: true, color: YT.warm, fontSize: 20 } },
    { text: "告诉人体细胞如何制造新一代乙肝病毒\n\n", options: { fontSize: 18, color: YT.lightGray } },
    { text: "▸ 4个蛋白质分工明确：\n", options: { bold: true, color: YT.warm, fontSize: 20 } },
    { text: "P + X 蛋白 → 复制病毒 DNA\n", options: { fontSize: 18, color: YT.lightGray } },
    { text: "C + S 蛋白 → 构建病毒外壳\n\n", options: { fontSize: 18, color: YT.lightGray } },
    { text: "▸ 组装流程：\n", options: { bold: true, color: YT.warm, fontSize: 20 } },
    { text: "识别肝脏细胞 → 脱膜 → 释放DNA → 借用宿主系统\n", options: { fontSize: 18, color: YT.lightGray } },
    { text: "→ 生产蛋白质 + 复制DNA → 组装成新病毒颗粒", options: { fontSize: 18, color: YT.lightGray } },
  ], {
    x: 1.2, y: 1.3, w: 7.8, h: 4.0,
    valign: "top", lineSpacing: 28, fontFace: FONT,
  });
  addProgress(s, 9);
  s.addNotes("乙肝病毒无非是蛋白质外壳+DNA。寄生能力和极简生活方式相辅相成。");
}

// === Slide 11: CHAPTER — 规则破坏者 ===
{
  const s = pres.addSlide();
  s.background = { color: YT.purple };
  addCapsidPattern(s);
  s.addText("CHAPTER 03", {
    x: 0.8, y: 2.0, w: 8.4, h: 0.7,
    fontSize: 18, color: YT.white, fontFace: FONT, charSpacing: 6,
  });
  s.addText("规则破坏者", {
    x: 0.8, y: 2.7, w: 8.4, h: 1.2,
    fontSize: 42, bold: true, color: YT.white, fontFace: FONT,
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 4.0, w: 2.0, h: 0.04, fill: { color: YT.white },
  });
  s.addText("⏱ 07:15 – 11:11", {
    x: 0.8, y: 4.2, w: 8.4, h: 0.5,
    fontSize: 15, color: YT.white, fontFace: FONT,
  });
  s.addNotes("第三章：病毒发展出与所有其他地球生命完全不同的特性，是地地道道的规则破坏者。");
}

// === Slide 12: QUOTE — 生物学家的箴言 ===
{
  const s = pres.addSlide();
  s.background = { color: YT.warm };
  // Left line accent
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 1.8, w: 0.05, h: 1.8, fill: { color: YT.white, transparency: 50 },
  });
  s.addText("「Never say never,\nand never say forever」", {
    x: 1.5, y: 1.5, w: 7.5, h: 2.0,
    fontSize: 30, italic: true, color: YT.white, align: "left",
    valign: "middle", fontFace: FONT, lineSpacing: 44,
  });
  s.addText("—— 生物学家的箴言", {
    x: 1.5, y: 3.8, w: 7.5, h: 0.5,
    fontSize: 15, color: YT.white, align: "right",
    fontFace: FONT,
  });
  s.addNotes("地球生命五花八门，很难找到底层逻辑。但即使如此，病毒仍然突破了许多基本法则。");
}

// === Slide 13: CONTENT — 打破能量法则 ===
{
  const s = pres.addSlide();
  s.background = { color: YT.dark };
  leftAccent(s, YT.warm);
  s.addText("打破能量法则", {
    x: 0.8, y: 0.3, w: 8.4, h: 0.8,
    fontSize: 30, bold: true, color: YT.white, fontFace: FONT,
  });
  s.addText([
    { text: "▸ 热力学第二定律：", options: { bold: true, color: YT.warm, fontSize: 20 } },
    { text: "孤立系统的混乱程度（熵）只会持续增大\n", options: { fontSize: 18, color: YT.lightGray } },
    { text: "生命体需要持续能量输入才能维持秩序\n\n", options: { fontSize: 18, color: YT.lightGray } },
    { text: "▸ 病毒的特例：", options: { bold: true, color: YT.warm, fontSize: 20 } },
    { text: "在宿主细胞之外，病毒无需能量输入\n", options: { fontSize: 18, color: YT.lightGray } },
    { text: "不展现任何生命特征 —— 和沙子石头没有区别\n\n", options: { fontSize: 18, color: YT.lightGray } },
    { text: "▸ 所有地球生命都需要能量维持生存\n", options: { bold: true, color: YT.accent, fontSize: 20 } },
    { text: "唯独病毒完全破坏了这条法则", options: { fontSize: 18, color: YT.lightGray } },
  ], {
    x: 1.2, y: 1.3, w: 7.8, h: 4.0,
    valign: "top", lineSpacing: 28, fontFace: FONT,
  });
  addProgress(s, 12);
  s.addNotes("病毒在宿主细胞之外不需要能量输入来维持生存，打破了热力学第二定律对生命的要求。");
}

// === Slide 14: CONTENT — 打破中心法则 ===
{
  const s = pres.addSlide();
  s.background = { color: YT.dark };
  leftAccent(s);
  s.addText("打破中心法则", {
    x: 0.8, y: 0.3, w: 8.4, h: 0.8,
    fontSize: 30, bold: true, color: YT.white, fontFace: FONT,
  });
  s.addText([
    { text: "▸ 生物学中心法则：DNA → RNA → 蛋白质\n", options: { bold: true, color: YT.accent, fontSize: 18 } },
    { text: "所有地球生物都遵循这条遗传信息传递路径\n\n", options: { fontSize: 16, color: YT.gray } },
    { text: "▸ 病毒的多样性（逻辑上成立就一定有病毒在用）：\n", options: { bold: true, color: YT.warm, fontSize: 20 } },
    { text: "天花病毒 → 使用 DNA，与传统生物一致\n", options: { fontSize: 18, color: YT.lightGray } },
    { text: "流感/艾滋/新冠病毒 → 使用 RNA 代替 DNA\n", options: { fontSize: 18, color: YT.lightGray } },
    { text: "乙肝病毒 → DNA 但先造 RNA 再反造 DNA\n\n", options: { fontSize: 18, color: YT.lightGray } },
    { text: "▸ 几乎只要逻辑上成立，就一定有病毒在这么用", options: { bold: true, color: YT.accent, fontSize: 20 } },
  ], {
    x: 1.2, y: 1.3, w: 7.8, h: 4.0,
    valign: "top", lineSpacing: 28, fontFace: FONT,
  });
  addProgress(s, 13);
  s.addNotes("病毒记录和使用遗传信息的方式多种多样。中心法则在病毒这里彻底失灵。");
}

// === Slide 15: CONTENT — 形态各异的病毒 ===
{
  const s = pres.addSlide();
  s.background = { color: YT.dark };
  leftAccent(s, YT.accent);
  s.addText("形态各异的病毒", {
    x: 0.8, y: 0.3, w: 8.4, h: 0.8,
    fontSize: 30, bold: true, color: YT.white, fontFace: FONT,
  });
  s.addText([
    { text: "▸ 乙肝病毒：", options: { bold: true, color: YT.warm, fontSize: 20 } },
    { text: "球形外层 + 正二十面体蛋白质壳（20个全等三角形）\n\n", options: { fontSize: 18, color: YT.lightGray } },
    { text: "▸ T4噬菌体：", options: { bold: true, color: YT.warm, fontSize: 20 } },
    { text: "长得像人类设计的机器人 — 二十面体头 + 对称尾巴\n\n", options: { fontSize: 18, color: YT.lightGray } },
    { text: "▸ 新冠病毒：", options: { bold: true, color: YT.warm, fontSize: 20 } },
    { text: "直径120nm圆球 + 满身尖刺，像海胆/王冠装饰\n", options: { fontSize: 18, color: YT.lightGray } },
    { text: "因其外形得名「冠状病毒」\n\n", options: { fontSize: 16, color: YT.gray } },
    { text: "▸ 许多病毒呈现数学上完美的几何形状", options: { bold: true, color: YT.accent, fontSize: 20 } },
  ], {
    x: 1.2, y: 1.3, w: 7.8, h: 4.0,
    valign: "top", lineSpacing: 28, fontFace: FONT,
  });
  addProgress(s, 14);
  s.addNotes("病毒连形状都不按常理出牌。绝大多数地球生命没有规则外形，但很多病毒却是数学上完美的几何形状。");
}

// === Slide 16: RECAP — 总结 ===
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
    { text: "完美寄生者 — 将全部生命活动转交宿主\n\n", options: { color: YT.lightGray, fontSize: 20 } },
    { text: "02  ", options: { bold: true, color: YT.warm, fontSize: 24 } },
    { text: "极简主义者 — 用最少基因实现生命功能\n\n", options: { color: YT.lightGray, fontSize: 20 } },
    { text: "03  ", options: { bold: true, color: YT.purple, fontSize: 24 } },
    { text: "规则破坏者 — 突破地球生命的共同法则", options: { color: YT.lightGray, fontSize: 20 } },
  ], {
    x: 1.2, y: 1.5, w: 7.8, h: 3.5,
    valign: "top", lineSpacing: 40, fontFace: FONT,
  });
  addProgress(s, 15);
  s.addNotes("回顾三大核心要点：完美寄生者、极简主义者、规则破坏者。这三个词让病毒鹤立鸡群。");
}

// === Slide 17: NEXT — 下集预告 ===
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
  s.addText("病毒如何让人生病？", {
    x: 0.5, y: 2.2, w: 9.0, h: 1.2,
    fontSize: 40, bold: true, color: YT.white, align: "center",
    fontFace: FONT,
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 3.5, y: 3.5, w: 3.0, h: 0.03, fill: { color: YT.white, transparency: 50 },
  });
  s.addText("⏱ 第三章 — 即将更新", {
    x: 1.0, y: 3.8, w: 8.0, h: 0.5,
    fontSize: 17, color: YT.white, align: "center",
    fontFace: FONT,
  });
  s.addNotes("预告下一讲内容：病毒为什么会让人生病？它们又是怎么让人生病的？");
}

// === Slide 18: CLOSING ===
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
await pres.writeFile({ fileName: "/workspace/data/xieming/other-codes/srt2ppt/examples/第2集-slides.pptx" });
console.log("PPTX created: 第2集-slides.pptx");
