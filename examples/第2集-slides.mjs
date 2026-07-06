import pptxgen from "pptxgenjs";

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "王丽明";
pres.title = "病毒科学课 第2讲：病毒到底是什么";

// Color palette
const C = {
  dark: "1a1a2e",
  accent: "e94560",
  accent2: "0f3460",
  accent3: "16213e",
  light: "f8f8f8",
  gray: "666666",
  white: "FFFFFF",
  warmBg: "faf3e0",
  gold: "e6a817",
  teal: "17a2b8",
};

// ============================================================
// Slide 1: Title
// ============================================================
const s01 = pres.addSlide();
s01.background = { color: C.dark };
s01.addText("病毒科学课", {
  x: 1.0, y: 1.2, w: 8.0, h: 1.2,
  fontSize: 44, bold: true, color: C.white, align: "center",
  fontFace: "Microsoft YaHei",
});
s01.addText("病毒到底是什么", {
  x: 1.0, y: 2.5, w: 8.0, h: 0.8,
  fontSize: 28, color: C.accent, align: "center",
  fontFace: "Microsoft YaHei",
});
s01.addText("王丽明 · 病毒科学课 第2讲", {
  x: 1.0, y: 3.8, w: 8.0, h: 0.6,
  fontSize: 16, color: "AAAAAA", align: "center",
  fontFace: "Microsoft YaHei",
});
s01.addShape(pres.shapes.RECTANGLE, {
  x: 3.5, y: 3.5, w: 3.0, h: 0.04, fill: { color: C.accent },
});
s01.addNotes("欢迎来到病毒科学课第2讲。本节课我们深入探讨病毒的本质——它们到底是什么样的生命形式？与地球其他生物有什么本质区别？");

// ============================================================
// Slide 2: Section — 病毒与我们
// ============================================================
const s02 = pres.addSlide();
s02.background = { color: C.accent2 };
s02.addText("病毒与人类疾病", {
  x: 1.0, y: 2.0, w: 8.0, h: 1.5,
  fontSize: 36, bold: true, color: C.white, align: "center",
  fontFace: "Microsoft YaHei",
});
s02.addText("乙肝 · 艾滋病 · 流感 · SARS · 新冠肺炎", {
  x: 1.0, y: 3.6, w: 8.0, h: 0.6,
  fontSize: 18, color: "CCCCCC", align: "center",
  fontFace: "Microsoft YaHei",
});
s02.addNotes("病毒听起来离我们很远，但实际上许多著名的人类疾病都是由病毒引起的，比如乙肝、艾滋病、流感、SARS和新冠肺炎。可以说，病毒与我们每个人的生活都息息相关。然而与之相对的，是人类至今对病毒的了解还比较少。");

// ============================================================
// Slide 3: Content — 病毒的基本描述
// ============================================================
const s03 = pres.addSlide();
s03.background = { color: C.white };
// accent bar
s03.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.accent },
});
s03.addText("病毒是什么？", {
  x: 0.8, y: 0.3, w: 8.4, h: 0.8,
  fontSize: 28, bold: true, color: C.dark, fontFace: "Microsoft YaHei",
});
s03.addText([
  { text: "结构简单的非细胞形态微生物", options: { bold: true, color: C.accent, fontSize: 20 } },
  { text: "由蛋白质外壳包裹 DNA 或 RNA 分子\n\n", options: { fontSize: 18, color: "333333" } },
  { text: "大小只有几十到几百纳米", options: { bold: true, color: C.accent, fontSize: 20 } },
  { text: "比细菌小得多，只能通过电子显微镜才能看到\n\n", options: { fontSize: 18, color: "333333" } },
  { text: "无法独立生长和繁殖", options: { bold: true, color: C.accent, fontSize: 20 } },
  { text: "需要寄生于别的生物体内", options: { fontSize: 18, color: "333333" } },
], {
  x: 0.8, y: 1.5, w: 8.4, h: 4.0,
  valign: "top", lineSpacing: 28, fontFace: "Microsoft YaHei",
});
s03.addNotes("简单来说，病毒是一类结构很简单的非细胞形态微生物，由蛋白质外壳包裹着DNA或者RNA分子形成，有时候最外面还会包裹一层薄薄的膜。大部分病毒只有几十到几百纳米，比细菌要小得多，只能通过电子显微镜才能看到它们的真容。而且病毒无法独立生长和繁殖，需要寄生于别的生物体内。");

// ============================================================
// Slide 4: Section — 三大特性
// ============================================================
const s04 = pres.addSlide();
s04.background = { color: C.dark };
s04.addText("病毒的三大特性", {
  x: 1.0, y: 1.5, w: 8.0, h: 1.0,
  fontSize: 36, bold: true, color: C.white, align: "center",
  fontFace: "Microsoft YaHei",
});
s04.addText("完美寄生者", {
  x: 1.0, y: 2.8, w: 8.0, h: 0.7,
  fontSize: 24, color: C.accent, align: "center", fontFace: "Microsoft YaHei",
});
s04.addText("极简主义者", {
  x: 1.0, y: 3.6, w: 8.0, h: 0.7,
  fontSize: 24, color: C.gold, align: "center", fontFace: "Microsoft YaHei",
});
s04.addText("规则破坏者", {
  x: 1.0, y: 4.4, w: 8.0, h: 0.7,
  fontSize: 24, color: C.teal, align: "center", fontFace: "Microsoft YaHei",
});
s04.addNotes("在这里我用三句话来总结病毒的特性：完美寄生者、极简主义者、规则破坏者。我来一条一条和你说道说道。");

// ============================================================
// Slide 5: Content — 完美寄生者（上）
// ============================================================
const s05 = pres.addSlide();
s05.background = { color: C.white };
s05.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.accent },
});
s05.addText("完美寄生者", {
  x: 0.8, y: 0.3, w: 8.4, h: 0.8,
  fontSize: 28, bold: true, color: C.dark, fontFace: "Microsoft YaHei",
});
s05.addText([
  { text: "病毒 vs 普通寄生虫", options: { bold: true, color: C.accent, fontSize: 20 } },
  { text: "寄生虫只把一小部分功能转移给宿主，自身仍是完整生命\n\n", options: { fontSize: 18, color: "333333" } },
  { text: "病毒完全不同", options: { bold: true, color: C.accent, fontSize: 20 } },
  { text: "进入宿主前不是严格意义上的生命——不消耗能量、不呼吸、不繁殖\n\n", options: { fontSize: 18, color: "333333" } },
  { text: "进入宿主细胞后立刻展现全部生命迹象", options: { bold: true, color: C.accent, fontSize: 20 } },
  { text: "利用宿主细胞内现成的能量和工具批量繁殖后代", options: { fontSize: 18, color: "333333" } },
], {
  x: 0.8, y: 1.5, w: 8.4, h: 4.0,
  valign: "top", lineSpacing: 28, fontFace: "Microsoft YaHei",
});
s05.addNotes("病毒是一类特别完美的寄生者。与普通寄生虫不同——寄生虫虽然也寄生，但总还得自己完成生长、进食、修复等基本功能。而病毒在进入宿主之前，根本就不是严格意义上的生命，它不需要能量也不消耗能量，不呼吸不动，更不会繁殖后代，完全处在静止状态，和大自然里的一颗沙子一堆尘土没有什么两样。");

// ============================================================
// Slide 6: Big Word — 病毒的生命周期
// ============================================================
const s06 = pres.addSlide();
s06.background = { color: C.light };
s06.addText("病毒的生命 = 两个阶段", {
  x: 1.0, y: 0.5, w: 8.0, h: 0.8,
  fontSize: 30, bold: true, color: C.dark, align: "center", fontFace: "Microsoft YaHei",
});
s06.addShape(pres.shapes.RECTANGLE, {
  x: 4.5, y: 1.4, w: 1.0, h: 0.04, fill: { color: C.accent },
});
s06.addText("宿主细胞之外", {
  x: 0.5, y: 1.8, w: 4.2, h: 0.7,
  fontSize: 22, bold: true, color: C.accent, align: "center", fontFace: "Microsoft YaHei",
});
s06.addText("和非生命物质没有区别\n安静地等待寄生的机会", {
  x: 0.5, y: 2.5, w: 4.2, h: 1.5,
  fontSize: 16, color: "333333", align: "center", valign: "top",
  lineSpacing: 24, fontFace: "Microsoft YaHei",
});
s06.addText("进入宿主细胞", {
  x: 5.3, y: 1.8, w: 4.2, h: 0.7,
  fontSize: 22, bold: true, color: C.teal, align: "center", fontFace: "Microsoft YaHei",
});
s06.addText("借助宿主现成的能量和工具\n立刻启动繁殖后代的程序", {
  x: 5.3, y: 2.5, w: 4.2, h: 1.5,
  fontSize: 16, color: "333333", align: "center", valign: "top",
  lineSpacing: 24, fontFace: "Microsoft YaHei",
});
// vertical divider line
s06.addShape(pres.shapes.RECTANGLE, {
  x: 4.97, y: 1.8, w: 0.06, h: 3.0, fill: { color: "CCCCCC" },
});
s06.addText("病毒把所有的生物学功能，包括新陈代谢和繁殖，都全部转交给了宿主。", {
  x: 0.8, y: 4.5, w: 8.4, h: 1.0,
  fontSize: 14, color: C.gray, align: "center", fontFace: "Microsoft YaHei",
});
s06.addNotes("病毒的生命可以简化成两个黑白分明的阶段。在宿主细胞之外，它和非生命物质没有区别，安静地等待寄生的机会。而一旦进入宿主细胞，就可以借助宿主细胞现成的能量和工具立刻启动繁殖后代的程序。这是真正意义上的完美寄生者。");

// ============================================================
// Slide 7: Content — 极简主义者
// ============================================================
const s07 = pres.addSlide();
s07.background = { color: C.white };
s07.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.gold },
});
s07.addText("极简主义者", {
  x: 0.8, y: 0.3, w: 8.4, h: 0.8,
  fontSize: 28, bold: true, color: C.dark, fontFace: "Microsoft YaHei",
});
s07.addText([
  { text: "完美寄生能力 → 极简生活方式", options: { bold: true, color: C.gold, fontSize: 20 } },
  { text: "既然一切都可以交给宿主，病毒只需要一套最小化的指令系统\n\n", options: { fontSize: 18, color: "333333" } },
  { text: "宿主外：完全静默，所有生存要素都不需要", options: { bold: true, color: C.gold, fontSize: 20 } },
  { text: "宿主内：利用宿主工具繁殖，连繁殖技能也可以简化\n\n", options: { fontSize: 18, color: "333333" } },
  { text: "逻辑结论", options: { bold: true, color: C.gold, fontSize: 20 } },
  { text: "只需告诉宿主细胞如何帮自己繁殖后代，其他的都不需要", options: { fontSize: 18, color: "333333" } },
], {
  x: 0.8, y: 1.5, w: 8.4, h: 4.0,
  valign: "top", lineSpacing: 28, fontFace: "Microsoft YaHei",
});
s07.addNotes("完美的寄生能力让病毒有条件发展出了第二个特性——极简主义者的生活方式。在找到宿主之前，病毒既然是完全静默的状态，那所有维持正常生物生存的基本要素就都不需要了。而一旦进入宿主细胞，病毒又可利用宿主来帮助自己繁殖，所以连繁殖这一套技能也可以尽可能的简化。");

// ============================================================
// Slide 8: Content — 乙肝病毒实例
// ============================================================
const s08 = pres.addSlide();
s08.background = { color: C.white };
s08.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.gold },
});
s08.addText("案例：乙肝病毒（HBV）", {
  x: 0.8, y: 0.3, w: 8.4, h: 0.8,
  fontSize: 28, bold: true, color: C.dark, fontFace: "Microsoft YaHei",
});
s08.addText([
  { text: "结构：仅三层", options: { bold: true, color: C.gold, fontSize: 20 } },
  { text: "最外层膜 → 中间蛋白质外壳 → 内部环形DNA分子\n\n", options: { fontSize: 18, color: "333333" } },
  { text: "基因组大小", options: { bold: true, color: C.gold, fontSize: 20 } },
  { text: "不到大肠杆菌基因组的千分之一\n不到人类基因组的百万分之一\n\n", options: { fontSize: 18, color: "333333" } },
  { text: "仅含 4 个基因！", options: { bold: true, color: C.accent, fontSize: 22 } },
  { text: "相比之下：大肠杆菌 > 4000个，人类 > 20000个", options: { fontSize: 18, color: "333333" } },
], {
  x: 0.8, y: 1.5, w: 8.4, h: 4.0,
  valign: "top", lineSpacing: 28, fontFace: "Microsoft YaHei",
});
s08.addNotes("就拿咱们大家都听说过的乙肝病毒来说吧。从外到内，乙肝病毒只有三层非常简单的结构，最外面一层膜，中间一层蛋白质外壳，里面藏着它的遗传物质，一个环形DNA分子。而且这个DNA分子上只有区区四个基因，相比之下连大肠杆菌的基因数量都超过了四千个，而人类则超过了两万个。");

// ============================================================
// Slide 9: DATA — 基因数量对比
// ============================================================
const s09 = pres.addSlide();
s09.background = { color: C.white };
s09.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.teal },
});
s09.addText("基因数量对比", {
  x: 0.8, y: 0.3, w: 8.4, h: 0.8,
  fontSize: 26, bold: true, color: C.dark, fontFace: "Microsoft YaHei",
});
const metrics = [
  { value: "4个", label: "乙肝病毒" },
  { value: "4,000+个", label: "大肠杆菌" },
  { value: "20,000+个", label: "人类" },
];
metrics.forEach((m, i) => {
  const cx = 0.8 + i * 3.0;
  s09.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: cx, y: 1.5, w: 2.5, h: 2.2,
    fill: { color: i === 0 ? C.gold : (i === 1 ? C.teal : C.accent), transparency: 90 },
    rectRadius: 0.15,
  });
  s09.addText(m.value, {
    x: cx, y: 1.6, w: 2.5, h: 1.0,
    fontSize: 30, bold: true, color: i === 0 ? C.gold : (i === 1 ? C.teal : C.accent),
    align: "center", fontFace: "Microsoft YaHei",
  });
  s09.addText(m.label, {
    x: cx, y: 2.6, w: 2.5, h: 0.6,
    fontSize: 16, color: C.gray, align: "center", fontFace: "Microsoft YaHei",
  });
});
s09.addText("这四个基因（P、C、S、X）构成了一套完整的病毒繁殖说明书", {
  x: 0.8, y: 4.2, w: 8.4, h: 0.6,
  fontSize: 14, color: C.gray, align: "center", fontFace: "Microsoft YaHei",
});
s09.addNotes("乙肝病毒的DNA分子上只有区区四个基因，分别叫做P、C、S和X。P和X蛋白的作用是复制乙肝病毒的DNA，而C和S蛋白则构成了乙肝病毒的外壳。简单来说它就是一套告诉人体细胞如何帮它产生新一代乙肝病毒的说明书。");

// ============================================================
// Slide 10: Section — 规则破坏者
// ============================================================
const s10 = pres.addSlide();
s10.background = { color: C.teal };
s10.addText("规则破坏者", {
  x: 1.0, y: 2.0, w: 8.0, h: 1.2,
  fontSize: 36, bold: true, color: C.white, align: "center",
  fontFace: "Microsoft YaHei",
});
s10.addText("在所有地球生命遵循的共同法则之外", {
  x: 1.0, y: 3.4, w: 8.0, h: 0.6,
  fontSize: 18, color: "E0FFFF", align: "center", fontFace: "Microsoft YaHei",
});
s10.addNotes("病毒的第三个特性是它们能够发展出和所有其他地球生命都完全不同的许多特性，所以我叫它规则破坏者。");

// ============================================================
// Slide 11: Content — 能量法则
// ============================================================
const s11 = pres.addSlide();
s11.background = { color: C.white };
s11.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.teal },
});
s11.addText("破坏法则一：能量", {
  x: 0.8, y: 0.3, w: 8.4, h: 0.8,
  fontSize: 28, bold: true, color: C.dark, fontFace: "Microsoft YaHei",
});
s11.addText([
  { text: "生命的铁律", options: { bold: true, color: C.teal, fontSize: 20 } },
  { text: "所有生命都需要从环境吸收能量来维持秩序（热力学第二定律）\n\n", options: { fontSize: 18, color: "333333" } },
  { text: "病毒的例外", options: { bold: true, color: C.teal, fontSize: 20 } },
  { text: "宿主细胞之外，病毒本质上和环境里的沙子石头没有区别\n不需要能量输入来维持生存\n\n", options: { fontSize: 18, color: "333333" } },
  { text: "这是对热力学第二定律的完美规避", options: { bold: true, color: C.accent, fontSize: 18 } },
], {
  x: 0.8, y: 1.5, w: 8.4, h: 4.0,
  valign: "top", lineSpacing: 28, fontFace: "Microsoft YaHei",
});
s11.addNotes("在生存这个层面，病毒是规则破坏者。所有地球生命都需要源源不断地从环境吸收能量，通过能量输入来维持秩序——这是热力学第二定律的要求。但病毒却完全破坏了这条法则，因为在宿主细胞之外，病毒根本不需要也没有能力展现出任何生命特征。");

// ============================================================
// Slide 12: Content — 中心法则
// ============================================================
const s12 = pres.addSlide();
s12.background = { color: C.white };
s12.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.teal },
});
s12.addText("破坏法则二：遗传中心法则", {
  x: 0.8, y: 0.3, w: 8.4, h: 0.8,
  fontSize: 28, bold: true, color: C.dark, fontFace: "Microsoft YaHei",
});
s12.addText([
  { text: "正常生命：DNA → RNA → 蛋白质", options: { bold: true, color: C.teal, fontSize: 20 } },
  { text: "遗传信息从DNA到RNA再到蛋白质的传递，即生物学中心法则\n\n", options: { fontSize: 18, color: "333333" } },
  { text: "病毒的多种玩法", options: { bold: true, color: C.teal, fontSize: 20 } },
  { text: "天花病毒：仍使用DNA（正统派）\n", options: { fontSize: 18, color: "333333" } },
  { text: "流感/HIV/新冠：使用RNA代替DNA\n", options: { fontSize: 18, color: "333333" } },
  { text: "乙肝病毒：先制造RNA，再根据RNA反过来制造DNA", options: { fontSize: 18, color: "333333" } },
], {
  x: 0.8, y: 1.5, w: 8.4, h: 4.0,
  valign: "top", lineSpacing: 28, fontFace: "Microsoft YaHei",
});
s12.addNotes("在遗传物质层面，病毒也彻底破坏了中心法则。病毒记录和使用遗传信息的方式多种多样，几乎只要是逻辑上能成立，就一定有毒在这么用。比如天花病毒仍然使用DNA，但流感病毒、艾滋病病毒和新冠病毒使用RNA作为遗传物质。而乙肝病毒则先制造RNA，再反过来制造DNA。");

// ============================================================
// Slide 13: Content — 病毒的形状
// ============================================================
const s13 = pres.addSlide();
s13.background = { color: C.white };
s13.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.teal },
});
s13.addText("破坏法则三：形状", {
  x: 0.8, y: 0.3, w: 8.4, h: 0.8,
  fontSize: 28, bold: true, color: C.dark, fontFace: "Microsoft YaHei",
});
s13.addText([
  { text: "大多数生命：没有特别规则的外形", options: { bold: true, color: C.teal, fontSize: 20 } },
  { text: "\n", options: { fontSize: 18, color: "333333" } },
  { text: "很多病毒：数学上完美的几何形状", options: { bold: true, color: C.teal, fontSize: 20 } },
  { text: "乙肝病毒：完美球形 + 正二十面体蛋白质壳（20个相同三角形）\n\n", options: { fontSize: 18, color: "333333" } },
  { text: "T4噬菌体：像人类设计的机器人——二十面体头 + 中心对称尾巴\n\n", options: { fontSize: 18, color: "333333" } },
  { text: "新冠病毒：120nm圆球 + 长满尖刺（像海胆/王冠装饰）", options: { fontSize: 18, color: "333333" } },
], {
  x: 0.8, y: 1.5, w: 8.4, h: 4.0,
  valign: "top", lineSpacing: 28, fontFace: "Microsoft YaHei",
});
s13.addNotes("甚至连病毒生命的形状都比较不按常理出牌。绝大多数地球生命都没有特别规则的外形，但是很多病毒却是数学上很完美的几何形状。比如乙肝病毒的外层是一个完美的球形，中层的蛋白质壳则是完美的正二十面体。T4噬菌体像人类设计的机器人。新冠病毒则像海胆或王冠。");

// ============================================================
// Slide 14: Quote — Never Say Never
// ============================================================
const s14 = pres.addSlide();
s14.background = { color: C.teal };
s14.addText("「Never say never and never say forever.」", {
  x: 1.2, y: 1.5, w: 7.6, h: 2.0,
  fontSize: 26, italic: true, color: C.white, align: "center",
  valign: "middle", fontFace: "Microsoft YaHei",
});
s14.addText("绝不说绝不，也绝不说永远", {
  x: 1.2, y: 3.3, w: 7.6, h: 0.8,
  fontSize: 20, color: "E0FFFF", align: "center", fontFace: "Microsoft YaHei",
});
s14.addText("—— 生物学家的口头禅", {
  x: 1.2, y: 4.2, w: 7.6, h: 0.5,
  fontSize: 14, color: "DDDDDD", align: "right", fontFace: "Microsoft YaHei",
});
s14.addNotes("生物学家常说一句话：Never say never and never say forever，绝不说绝不，也绝不说永远。因为我们不管总结出什么样的规律，生物界里都能找到例外。");

// ============================================================
// Slide 15: Summary — 总结
// ============================================================
const s15 = pres.addSlide();
s15.background = { color: C.dark };
s15.addText("总结", {
  x: 0.8, y: 0.5, w: 8.4, h: 0.8,
  fontSize: 32, bold: true, color: C.white, fontFace: "Microsoft YaHei",
});
s15.addText([
  { text: "1. ", options: { bold: true, color: C.accent, fontSize: 22 } },
  { text: "完美寄生者\n把全部生命活动转交给宿主，在宿主外如同非生命物质\n\n", options: { color: "CCCCCC", fontSize: 18 } },
  { text: "2. ", options: { bold: true, color: C.gold, fontSize: 22 } },
  { text: "极简主义者\n利用宿主完成一切，自身只需最小化的指令系统\n\n", options: { color: "CCCCCC", fontSize: 18 } },
  { text: "3. ", options: { bold: true, color: C.teal, fontSize: 22 } },
  { text: "规则破坏者\n在能量利用、遗传法则、大小形状上突破所有生命的共同法则", options: { color: "CCCCCC", fontSize: 18 } },
], {
  x: 0.8, y: 1.5, w: 8.4, h: 3.8,
  valign: "top", lineSpacing: 32, fontFace: "Microsoft YaHei",
});
s15.addShape(pres.shapes.RECTANGLE, {
  x: 0.8, y: 5.0, w: 8.4, h: 0.04, fill: { color: C.accent },
});
s15.addText("这些特点让病毒鹤立鸡群，呈现出和我们熟悉的地球生物的巨大差别", {
  x: 0.8, y: 5.2, w: 8.4, h: 0.5,
  fontSize: 14, color: "999999", align: "center", fontFace: "Microsoft YaHei",
});
s15.addNotes("总而言之，记住三个词：完美寄生者、极简主义者和规则破坏者。这些特点让病毒鹤立鸡群，呈现出和我们熟悉的地球生物的巨大差别。下一讲我们将讨论一个大家都关心的问题——病毒为什么会让人生病，它们又是怎么让人生病的。");

// ============================================================
// Save
// ============================================================
const filePath = "/workspace/data/xieming/other-codes/srt2ppt/examples/第2集-slides.pptx";
await pres.writeFile({ fileName: filePath });
console.log("PPTX created: " + filePath);
