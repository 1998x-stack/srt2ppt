import PptxGenJS from "pptxgenjs";

const pptx = new PptxGenJS();

// ── Theme / Layout ──────────────────────────────────────────
pptx.defineLayout({ name: "WIDE", width: 13.333, height: 7.5 });
pptx.layout = "WIDE";

const C = {
  bg:       "1A2744",   // dark navy
  accent:   "3B82F6",   // blue accent
  gold:     "F59E0B",   // gold / amber
  white:    "FFFFFF",
  light:    "CBD5E1",   // light gray-blue
  green:    "10B981",
  red:      "EF4444",
  orange:   "F97316",
};

// ── Helper: bullet slide ────────────────────────────────────
function bulletSlide(title, bullets, opts = {}) {
  const slide = pptx.addSlide();
  slide.background = { fill: C.bg };

  // Title bar
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 13.333, h: 1.1,
    fill: { color: C.accent },
  });
  slide.addText(title, {
    x: 0.6, y: 0.15, w: 12, h: 0.8,
    fontSize: 28, fontFace: "Microsoft YaHei",
    color: C.white, bold: true,
    align: "left", valign: "middle",
  });

  // Bullets
  const lineH = opts.lineHeight ?? 0.6;
  const maxLines = opts.maxLines ?? 8;
  const startY = 1.5;
  const visible = bullets.slice(0, maxLines);
  const remainder = bullets.length - maxLines;

  slide.addText(
    visible.map((b) => ({
      text: b,
      options: {
        fontSize: 18,
        fontFace: "Microsoft YaHei",
        color: C.light,
        bullet: { code: "2022", color: C.gold },
        breakType: "none",
        lineSpacingMultiple: 1.3,
      },
    })),
    {
      x: 0.8, y: startY, w: 11.5, h: lineH * maxLines,
      valign: "top",
      lineSpacingMultiple: 1.2,
    }
  );

  // continuation hint
  if (remainder > 0) {
    slide.addText(`… 还有 ${remainder} 条内容`, {
      x: 0.8, y: startY + lineH * maxLines + 0.1, w: 6, h: 0.5,
      fontSize: 14, fontFace: "Microsoft YaHei",
      color: C.gold, italic: true,
    });
  }

  // decoration line
  slide.addShape(pptx.ShapeType.line, {
    x: 0.6, y: 1.3, w: 3, h: 0,
    line: { color: C.gold, width: 3 },
  });

  // page number
  slide.addText(String(slideIndex++), {
    x: 12.2, y: 7.0, w: 0.8, h: 0.4,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: C.light, align: "right",
  });

  return slide;
}

let slideIndex = 1;

// ════════════════════════════════════════════════════════════
// SLIDE 1  –  Title
// ════════════════════════════════════════════════════════════
{
  const slide = pptx.addSlide();
  slide.background = { fill: C.bg };

  // decorative top bar
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 13.333, h: 0.08,
    fill: { color: C.accent },
  });

  // big circle decoration
  slide.addShape(pptx.ShapeType.ellipse, {
    x: 9.5, y: -1.5, w: 5, h: 5,
    fill: { color: C.accent, transparency: 85 },
  });
  slide.addShape(pptx.ShapeType.ellipse, {
    x: -2, y: 4.5, w: 4, h: 4,
    fill: { color: C.gold, transparency: 90 },
  });

  // main title
  slide.addText("病毒科学课", {
    x: 1.0, y: 1.5, w: 11, h: 1.2,
    fontSize: 52, fontFace: "Microsoft YaHei",
    color: C.white, bold: true,
    align: "left",
  });

  // subtitle
  slide.addText("第二讲：病毒到底是什么样的生命？", {
    x: 1.0, y: 2.8, w: 11, h: 0.8,
    fontSize: 26, fontFace: "Microsoft YaHei",
    color: C.gold,
    align: "left",
  });

  // speaker
  slide.addText("主讲人：王丽明", {
    x: 1.0, y: 4.0, w: 8, h: 0.6,
    fontSize: 20, fontFace: "Microsoft YaHei",
    color: C.light,
    align: "left",
  });

  // accent line
  slide.addShape(pptx.ShapeType.rect, {
    x: 1.0, y: 4.8, w: 2.5, h: 0.06,
    fill: { color: C.accent },
  });

  // description
  slide.addText("探索病毒与地球其他生命的根本区别", {
    x: 1.0, y: 5.2, w: 10, h: 0.6,
    fontSize: 16, fontFace: "Microsoft YaHei",
    color: C.light,
    align: "left",
    italic: true,
  });

  slide.addText(String(slideIndex++), {
    x: 12.2, y: 7.0, w: 0.8, h: 0.4,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: C.light, align: "right",
  });
}

// ════════════════════════════════════════════════════════════
// SLIDE 2  –  病毒与人类疾病
// ════════════════════════════════════════════════════════════
{
  const slide = pptx.addSlide();
  slide.background = { fill: C.bg };
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 13.333, h: 1.1,
    fill: { color: C.accent },
  });
  slide.addText("病毒与人类疾病", {
    x: 0.6, y: 0.15, w: 12, h: 0.8,
    fontSize: 28, fontFace: "Microsoft YaHei",
    color: C.white, bold: true,
  });
  slide.addShape(pptx.ShapeType.line, {
    x: 0.6, y: 1.3, w: 3, h: 0,
    line: { color: C.gold, width: 3 },
  });

  // intro text
  slide.addText(
    "提到病毒这种东西，你肯定不陌生。许多著名的人类疾病，都是由病毒入侵人体导致的。",
    {
      x: 0.8, y: 1.6, w: 11.5, h: 0.7,
      fontSize: 18, fontFace: "Microsoft YaHei",
      color: C.light, lineSpacingMultiple: 1.4,
    }
  );

  // disease cards
  const diseases = [
    ["乙肝", "乙型肝炎", C.orange],
    ["艾滋病", "HIV病毒感染", C.red],
    ["流感", "季节性流感", C.green],
    ["SARS", "非典型肺炎", C.orange],
    ["新冠肺炎", "COVID-19", C.red],
  ];

  diseases.forEach((d, i) => {
    const x = 0.8 + i * 2.4;
    slide.addShape(pptx.ShapeType.roundRect, {
      x, y: 2.8, w: 2.1, h: 2.6,
      fill: { color: d[2], transparency: 80 },
      rectRadius: 0.15,
      line: { color: d[2], width: 1.5 },
    });
    slide.addText(d[0], {
      x, y: 3.0, w: 2.1, h: 0.8,
      fontSize: 24, fontFace: "Microsoft YaHei",
      color: C.white, bold: true, align: "center", valign: "middle",
    });
    slide.addText(d[1], {
      x, y: 3.8, w: 2.1, h: 0.6,
      fontSize: 13, fontFace: "Microsoft YaHei",
      color: C.light, align: "center",
    });
  });

  slide.addText(
    "可以说，病毒和我们每个人的生活都息息相关。但与之相对的，是人类至今对病毒的了解还比较少。",
    {
      x: 0.8, y: 5.8, w: 11.5, h: 0.7,
      fontSize: 16, fontFace: "Microsoft YaHei",
      color: C.light, lineSpacingMultiple: 1.4, italic: true,
    }
  );

  // page num
  slide.addText(String(slideIndex++), {
    x: 12.2, y: 7.0, w: 0.8, h: 0.4,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: C.light, align: "right",
  });
}

// ════════════════════════════════════════════════════════════
// SLIDE 3  –  三个核心特性（概览）
// ════════════════════════════════════════════════════════════
{
  const slide = pptx.addSlide();
  slide.background = { fill: C.bg };
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 13.333, h: 1.1,
    fill: { color: C.accent },
  });
  slide.addText("病毒的三句话总结", {
    x: 0.6, y: 0.15, w: 12, h: 0.8,
    fontSize: 28, fontFace: "Microsoft YaHei",
    color: C.white, bold: true,
  });
  slide.addShape(pptx.ShapeType.line, {
    x: 0.6, y: 1.3, w: 3, h: 0,
    line: { color: C.gold, width: 3 },
  });

  slide.addText(
    "我用三句话来总结病毒的特性：",
    {
      x: 0.8, y: 1.6, w: 11.5, h: 0.6,
      fontSize: 18, fontFace: "Microsoft YaHei",
      color: C.light,
    }
  );

  const traits = [
    { name: "完美寄生者", desc: "把自己的全部生命都寄托在别的生命（宿主）身上", icon: "🦠" },
    { name: "极简主义者", desc: "只保留最小化的指令系统，一切都尽可能简化", icon: "⚡" },
    { name: "规则破坏者", desc: "突破其他所有地球生命遵循的共同法则", icon: "🔥" },
  ];

  traits.forEach((t, i) => {
    const y = 2.6 + i * 1.5;
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.8, y, w: 11.5, h: 1.2,
      fill: { color: C.accent, transparency: 85 },
      rectRadius: 0.12,
      line: { color: i === 0 ? C.gold : i === 1 ? C.green : C.red, width: 1.5 },
    });
    slide.addText(t.name, {
      x: 1.2, y: y + 0.05, w: 4, h: 0.6,
      fontSize: 22, fontFace: "Microsoft YaHei",
      color: i === 0 ? C.gold : i === 1 ? C.green : C.red,
      bold: true,
    });
    slide.addText(t.desc, {
      x: 1.2, y: y + 0.6, w: 10.5, h: 0.5,
      fontSize: 15, fontFace: "Microsoft YaHei",
      color: C.light,
    });
  });

  slide.addText(String(slideIndex++), {
    x: 12.2, y: 7.0, w: 0.8, h: 0.4,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: C.light, align: "right",
  });
}

// ════════════════════════════════════════════════════════════
// SLIDE 4  –  完美寄生者 (1) 与寄生虫对比
// ════════════════════════════════════════════════════════════
{
  const slide = pptx.addSlide();
  slide.background = { fill: C.bg };
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 13.333, h: 1.1,
    fill: { color: C.gold, transparency: 20 },
  });
  slide.addText("完美寄生者 —— 与传统寄生虫的不同", {
    x: 0.6, y: 0.15, w: 12, h: 0.8,
    fontSize: 28, fontFace: "Microsoft YaHei",
    color: C.white, bold: true,
  });
  slide.addShape(pptx.ShapeType.line, {
    x: 0.6, y: 1.3, w: 3, h: 0,
    line: { color: C.gold, width: 3 },
  });

  // left column - 传统寄生虫
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.8, y: 1.6, w: 5.5, h: 4.8,
    fill: { color: "374151", transparency: 50 },
    rectRadius: 0.15,
    line: { color: "6B7280", width: 1 },
  });
  slide.addText("传统寄生虫", {
    x: 0.8, y: 1.7, w: 5.5, h: 0.6,
    fontSize: 20, fontFace: "Microsoft YaHei", color: "9CA3AF", bold: true,
    align: "center",
  });
  slide.addText(
    [
      { text: "蛔虫、钩虫、血吸虫、疟原虫等\n\n", options: { fontSize: 15, color: "9CA3AF" } },
      { text: "仍需要自己从受精卵长大成虫\n", options: { fontSize: 15, color: C.light } },
      { text: "仍需要自己张嘴吃东西\n", options: { fontSize: 15, color: C.light } },
      { text: "受伤了需自己修复损伤\n", options: { fontSize: 15, color: C.light } },
      { text: "生存和繁殖仍需独立完成\n\n", options: { fontSize: 15, color: C.light } },
      { text: "→ 只是把一小部分功能转移给宿主\n", options: { fontSize: 14, color: "9CA3AF", italic: true } },
      { text: "→ 自己仍然是完整的生命", options: { fontSize: 14, color: "9CA3AF", italic: true } },
    ],
    {
      x: 1.2, y: 2.5, w: 4.8, h: 3.5,
      lineSpacingMultiple: 1.5, valign: "top",
      fontFace: "Microsoft YaHei",
    }
  );

  // right column - 病毒
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 6.8, y: 1.6, w: 5.5, h: 4.8,
    fill: { color: C.gold, transparency: 90 },
    rectRadius: 0.15,
    line: { color: C.gold, width: 1.5 },
  });
  slide.addText("病毒", {
    x: 6.8, y: 1.7, w: 5.5, h: 0.6,
    fontSize: 20, fontFace: "Microsoft YaHei", color: C.gold, bold: true,
    align: "center",
  });
  slide.addText(
    [
      { text: "进入宿主之前根本不是严格意义上的生命\n\n", options: { fontSize: 15, color: C.gold } },
      { text: "不需要能量，不消耗能量\n", options: { fontSize: 15, color: C.white } },
      { text: "不呼吸，不动\n", options: { fontSize: 15, color: C.white } },
      { text: "更不会繁殖后代\n", options: { fontSize: 15, color: C.white } },
      { text: "完全静止，像沙子尘土\n\n", options: { fontSize: 15, color: C.white } },
      { text: "→ 把所有功能都转交给宿主\n", options: { fontSize: 14, color: C.gold, italic: true } },
      { text: "→ 真正的完美寄生者", options: { fontSize: 14, color: C.gold, italic: true } },
    ],
    {
      x: 7.2, y: 2.5, w: 4.8, h: 3.5,
      lineSpacingMultiple: 1.5, valign: "top",
      fontFace: "Microsoft YaHei",
    }
  );

  slide.addText(String(slideIndex++), {
    x: 12.2, y: 7.0, w: 0.8, h: 0.4,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: C.light, align: "right",
  });
}

// ════════════════════════════════════════════════════════════
// SLIDE 5  –  完美寄生者 (2) 生命两阶段
// ════════════════════════════════════════════════════════════
{
  const slide = pptx.addSlide();
  slide.background = { fill: C.bg };
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 13.333, h: 1.1,
    fill: { color: C.gold, transparency: 20 },
  });
  slide.addText("完美寄生者 —— 病毒生命的两个阶段", {
    x: 0.6, y: 0.15, w: 12, h: 0.8,
    fontSize: 28, fontFace: "Microsoft YaHei",
    color: C.white, bold: true,
  });
  slide.addShape(pptx.ShapeType.line, {
    x: 0.6, y: 1.3, w: 3, h: 0,
    line: { color: C.gold, width: 3 },
  });

  // Phase 1
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.8, y: 1.6, w: 5.5, h: 4.5,
    fill: { color: "1E3A5F" },
    rectRadius: 0.15,
    line: { color: "6B7280", width: 1.5 },
  });
  slide.addText("阶段一：宿主细胞之外", {
    x: 0.8, y: 1.7, w: 5.5, h: 0.6,
    fontSize: 18, fontFace: "Microsoft YaHei",
    color: C.light, bold: true, align: "center",
  });
  slide.addText(
    [
      { text: "和非生命物质没有区别\n\n", options: { fontSize: 15, color: "9CA3AF" } },
      { text: "安静地等待寄生的机会\n", options: { fontSize: 16, color: C.white } },
      { text: "可以稳定存在超长时间\n\n", options: { fontSize: 16, color: C.white } },
      { text: "例如：2014年法国科学家\n", options: { fontSize: 14, color: C.light } },
      { text: "在西伯利亚永冻土中找到\n", options: { fontSize: 14, color: C.light } },
      { text: "3万年前的活病毒", options: { fontSize: 14, color: C.light } },
    ],
    {
      x: 1.2, y: 2.5, w: 4.8, h: 3.2,
      fontFace: "Microsoft YaHei",
      lineSpacingMultiple: 1.5, valign: "top",
    }
  );

  // Arrow
  slide.addText("→", {
    x: 5.6, y: 3.2, w: 1.5, h: 0.8,
    fontSize: 40, fontFace: "Microsoft YaHei",
    color: C.gold, align: "center", valign: "middle",
  });

  // Phase 2
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 6.8, y: 1.6, w: 5.5, h: 4.5,
    fill: { color: C.gold, transparency: 90 },
    rectRadius: 0.15,
    line: { color: C.gold, width: 1.5 },
  });
  slide.addText("阶段二：进入宿主细胞后", {
    x: 6.8, y: 1.7, w: 5.5, h: 0.6,
    fontSize: 18, fontFace: "Microsoft YaHei",
    color: C.gold, bold: true, align: "center",
  });
  slide.addText(
    [
      { text: "立刻展现全部生命迹象\n\n", options: { fontSize: 15, color: C.gold } },
      { text: "利用宿主细胞内的能量\n", options: { fontSize: 16, color: C.white } },
      { text: "借助宿主现成工具批量制造后代\n", options: { fontSize: 16, color: C.white } },
      { text: "不需要自己繁殖\n\n", options: { fontSize: 16, color: C.white } },
      { text: "→ 新的病毒颗粒离开宿主细胞\n", options: { fontSize: 14, color: C.light } },
      { text: "→ 回归沉寂，等待下一次入侵", options: { fontSize: 14, color: C.light } },
    ],
    {
      x: 7.2, y: 2.5, w: 4.8, h: 3.2,
      fontFace: "Microsoft YaHei",
      lineSpacingMultiple: 1.5, valign: "top",
    }
  );

  slide.addText(String(slideIndex++), {
    x: 12.2, y: 7.0, w: 0.8, h: 0.4,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: C.light, align: "right",
  });
}

// ════════════════════════════════════════════════════════════
// SLIDE 6  –  极简主义者 (1) 概述
// ════════════════════════════════════════════════════════════
{
  const slide = pptx.addSlide();
  slide.background = { fill: C.bg };
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 13.333, h: 1.1,
    fill: { color: C.green, transparency: 30 },
  });
  slide.addText("极简主义者 —— 最小化的生命系统", {
    x: 0.6, y: 0.15, w: 12, h: 0.8,
    fontSize: 28, fontFace: "Microsoft YaHei",
    color: C.white, bold: true,
  });
  slide.addShape(pptx.ShapeType.line, {
    x: 0.6, y: 1.3, w: 3, h: 0,
    line: { color: C.green, width: 3 },
  });

  slide.addText(
    "完美的寄生能力让病毒有条件发展出第二个特性 —— 极简主义的生活方式。",
    {
      x: 0.8, y: 1.6, w: 11.5, h: 0.6,
      fontSize: 18, fontFace: "Microsoft YaHei",
      color: C.light,
    }
  );

  const points = [
    "在宿主之外完全静默 → 所有维持生存的基本要素都不需要了",
    "进入宿主后利用宿主繁殖 → 连繁殖技能也可以尽可能简化",
    "只需一套最小化的指令系统，能告诉宿主细胞如何帮自己繁殖即可",
    "其他的所有东西都不需要",
  ];

  points.forEach((p, i) => {
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.8, y: 2.6 + i * 1.0, w: 11.5, h: 0.8,
      fill: { color: C.green, transparency: 85 },
      rectRadius: 0.1,
    });
    slide.addText(`0${i + 1}`, {
      x: 1.0, y: 2.6 + i * 1.0, w: 0.7, h: 0.8,
      fontSize: 18, fontFace: "Microsoft YaHei",
      color: C.green, bold: true, align: "center", valign: "middle",
    });
    slide.addText(p, {
      x: 1.8, y: 2.6 + i * 1.0, w: 10.2, h: 0.8,
      fontSize: 16, fontFace: "Microsoft YaHei",
      color: C.white, valign: "middle",
    });
  });

  slide.addText(String(slideIndex++), {
    x: 12.2, y: 7.0, w: 0.8, h: 0.4,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: C.light, align: "right",
  });
}

// ════════════════════════════════════════════════════════════
// SLIDE 7  –  极简主义者 (2) 乙肝病毒案例
// ════════════════════════════════════════════════════════════
{
  const slide = pptx.addSlide();
  slide.background = { fill: C.bg };
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 13.333, h: 1.1,
    fill: { color: C.green, transparency: 30 },
  });
  slide.addText("极简主义者 —— 乙肝病毒案例", {
    x: 0.6, y: 0.15, w: 12, h: 0.8,
    fontSize: 28, fontFace: "Microsoft YaHei",
    color: C.white, bold: true,
  });
  slide.addShape(pptx.ShapeType.line, {
    x: 0.6, y: 1.3, w: 3, h: 0,
    line: { color: C.green, width: 3 },
  });

  // Structure diagram area
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.8, y: 1.6, w: 5.5, h: 4.8,
    fill: { color: "1E3A5F" },
    rectRadius: 0.15,
    line: { color: C.green, width: 1 },
  });
  slide.addText("乙肝病毒结构", {
    x: 0.8, y: 1.7, w: 5.5, h: 0.5,
    fontSize: 18, fontFace: "Microsoft YaHei",
    color: C.green, bold: true, align: "center",
  });

  // Layers
  const layers = [
    { name: "最外层 — 膜", y: 2.4, color: "FCD34D" },
    { name: "中间层 — 蛋白质外壳", y: 3.15, color: "6EE7B7" },
    { name: "最内层 — 环形DNA分子（4个基因）", y: 3.9, color: "93C5FD" },
  ];
  layers.forEach((l) => {
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 1.2, y: l.y, w: 4.5, h: 0.55,
      fill: { color: l.color, transparency: 80 },
      rectRadius: 0.08,
      line: { color: l.color, width: 1.5 },
    });
    slide.addText(l.name, {
      x: 1.2, y: l.y, w: 4.5, h: 0.55,
      fontSize: 14, fontFace: "Microsoft YaHei",
      color: C.white, align: "center", valign: "middle",
    });
  });

  // Right side: facts
  const facts = [
    "基因组长仅约 3.2kb",
    "只有区区 4 个基因",
    "大肠杆菌有 4000+ 基因",
    "人类有 20000+ 基因",
    "长度不到大肠杆菌基因组的千分之一",
    "不到人类基因组的百万分之一",
  ];

  facts.forEach((f, i) => {
    const color = i < 2 ? C.green : "9CA3AF";
    slide.addText(`• ${f}`, {
      x: 6.8, y: 1.7 + i * 0.7, w: 5.5, h: 0.55,
      fontSize: 16, fontFace: "Microsoft YaHei",
      color, valign: "middle",
    });
  });

  slide.addText(String(slideIndex++), {
    x: 12.2, y: 7.0, w: 0.8, h: 0.4,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: C.light, align: "right",
  });
}

// ════════════════════════════════════════════════════════════
// SLIDE 8  –  极简主义者 (3) 四基因怎么工作
// ════════════════════════════════════════════════════════════
{
  const slide = pptx.addSlide();
  slide.background = { fill: C.bg };
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 13.333, h: 1.1,
    fill: { color: C.green, transparency: 30 },
  });
  slide.addText("极简主义者 —— 四基因如何工作？", {
    x: 0.6, y: 0.15, w: 12, h: 0.8,
    fontSize: 28, fontFace: "Microsoft YaHei",
    color: C.white, bold: true,
  });
  slide.addShape(pptx.ShapeType.line, {
    x: 0.6, y: 1.3, w: 3, h: 0,
    line: { color: C.green, width: 3 },
  });

  slide.addText(
    "DNA分子上的4个基因 —— 一套告诉人体细胞如何帮它产生新一代乙肝病毒的说明书",
    {
      x: 0.8, y: 1.5, w: 11.5, h: 0.7,
      fontSize: 16, fontFace: "Microsoft YaHei",
      color: C.light, lineSpacingMultiple: 1.3,
    }
  );

  // Process flow
  const steps = [
    { label: "识别肝细胞", desc: "识别人体肝脏细胞", color: C.accent },
    { label: "脱膜拆壳", desc: "脱掉外层膜，拆解蛋白质壳", color: C.orange },
    { label: "释放DNA", desc: "把DNA释放进入人体细胞", color: C.red },
    { label: "混合", desc: "和人体细胞DNA混在一起", color: C.gold },
  ];

  steps.forEach((s, i) => {
    const x = 0.8 + i * 3.05;
    slide.addShape(pptx.ShapeType.roundRect, {
      x, y: 2.5, w: 2.7, h: 1.0,
      fill: { color: s.color, transparency: 80 },
      rectRadius: 0.1,
      line: { color: s.color, width: 1.5 },
    });
    slide.addText(s.label, {
      x, y: 2.5, w: 2.7, h: 0.5,
      fontSize: 15, fontFace: "Microsoft YaHei",
      color: C.white, bold: true, align: "center",
    });
    slide.addText(s.desc, {
      x, y: 2.95, w: 2.7, h: 0.45,
      fontSize: 12, fontFace: "Microsoft YaHei",
      color: C.light, align: "center",
    });

    // arrow
    if (i < steps.length - 1) {
      slide.addText("→", {
        x: x + 2.7, y: 2.6, w: 0.5, h: 0.8,
        fontSize: 24, fontFace: "Microsoft YaHei",
        color: C.light, align: "center", valign: "middle",
      });
    }
  });

  // The 4 proteins
  slide.addText("四个基因对应四种蛋白质", {
    x: 0.8, y: 3.9, w: 5, h: 0.5,
    fontSize: 18, fontFace: "Microsoft YaHei",
    color: C.green, bold: true,
  });

  const proteins = [
    { name: "P 蛋白", role: "复制乙肝病毒的DNA", color: C.accent },
    { name: "X 蛋白", role: "复制乙肝病毒的DNA", color: C.accent },
    { name: "C 蛋白", role: "构成乙肝病毒的外壳", color: C.orange },
    { name: "S 蛋白", role: "构成乙肝病毒的外壳", color: C.orange },
  ];

  proteins.forEach((p, i) => {
    const x = 0.8 + (i % 2) * 6.0;
    const y = 4.6 + Math.floor(i / 2) * 1.0;
    slide.addShape(pptx.ShapeType.roundRect, {
      x, y, w: 5.5, h: 0.8,
      fill: { color: p.color, transparency: 85 },
      rectRadius: 0.08,
      line: { color: p.color, width: 1 },
    });
    slide.addText(`${p.name}  —  ${p.role}`, {
      x, y, w: 5.5, h: 0.8,
      fontSize: 15, fontFace: "Microsoft YaHei",
      color: C.white, valign: "middle", align: "center",
    });
  });

  // Bottom note
  slide.addText("蛋白质外壳 + DNA → 装备在一起 → 新的乙肝病毒颗粒", {
    x: 0.8, y: 6.6, w: 11.5, h: 0.5,
    fontSize: 15, fontFace: "Microsoft YaHei",
    color: C.gold, align: "center", italic: true,
  });

  slide.addText(String(slideIndex++), {
    x: 12.2, y: 7.0, w: 0.8, h: 0.4,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: C.light, align: "right",
  });
}

// ════════════════════════════════════════════════════════════
// SLIDE 9  –  规则破坏者 (1) 能量法则
// ════════════════════════════════════════════════════════════
{
  const slide = pptx.addSlide();
  slide.background = { fill: C.bg };
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 13.333, h: 1.1,
    fill: { color: C.red, transparency: 30 },
  });
  slide.addText("规则破坏者 —— 打破生命的基本法则", {
    x: 0.6, y: 0.15, w: 12, h: 0.8,
    fontSize: 28, fontFace: "Microsoft YaHei",
    color: C.white, bold: true,
  });
  slide.addShape(pptx.ShapeType.line, {
    x: 0.6, y: 1.3, w: 3, h: 0,
    line: { color: C.red, width: 3 },
  });

  // Rule 1 - Energy
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.8, y: 1.6, w: 11.5, h: 5.0,
    fill: { color: C.red, transparency: 92 },
    rectRadius: 0.15,
    line: { color: C.red, width: 1 },
  });

  slide.addText("破坏法则一：能量利用", {
    x: 1.2, y: 1.7, w: 10.5, h: 0.6,
    fontSize: 20, fontFace: "Microsoft YaHei",
    color: C.red, bold: true,
  });

  slide.addText(
    "所有地球生命都需要源源不断地从环境吸收能量，维持生存、繁殖后代。\n" +
    "根源：热力学第二定律 — 孤立系统的混乱程度（熵）只会持续增大。\n" +
    "生命体是精良有序的，需要在混乱中构造秩序，需要持续不断的能量输入。",
    {
      x: 1.2, y: 2.4, w: 10.5, h: 1.2,
      fontSize: 15, fontFace: "Microsoft YaHei",
      color: C.light, lineSpacingMultiple: 1.5,
    }
  );

  // BUT
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 1.2, y: 3.8, w: 10.5, h: 0.7,
    fill: { color: C.red, transparency: 60 },
    rectRadius: 0.08,
  });
  slide.addText("但病毒完全破坏这条法则！", {
    x: 1.2, y: 3.8, w: 10.5, h: 0.7,
    fontSize: 18, fontFace: "Microsoft YaHei",
    color: C.white, bold: true, align: "center", valign: "middle",
  });

  slide.addText(
    "在宿主细胞之外，病毒根本不需要也没有能力展现出任何生命特征。\n" +
    "它本质上和环境里的沙子石头没有区别，所以不需要能量输入来维持生存。",
    {
      x: 1.2, y: 4.7, w: 10.5, h: 0.9,
      fontSize: 15, fontFace: "Microsoft YaHei",
      color: C.gold, lineSpacingMultiple: 1.5,
    }
  );

  slide.addText(String(slideIndex++), {
    x: 12.2, y: 7.0, w: 0.8, h: 0.4,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: C.light, align: "right",
  });
}

// ════════════════════════════════════════════════════════════
// SLIDE 10  –  规则破坏者 (2) 中心法则
// ════════════════════════════════════════════════════════════
{
  const slide = pptx.addSlide();
  slide.background = { fill: C.bg };
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 13.333, h: 1.1,
    fill: { color: C.red, transparency: 30 },
  });
  slide.addText("规则破坏者 —— 打破中心法则", {
    x: 0.6, y: 0.15, w: 12, h: 0.8,
    fontSize: 28, fontFace: "Microsoft YaHei",
    color: C.white, bold: true,
  });
  slide.addShape(pptx.ShapeType.line, {
    x: 0.6, y: 1.3, w: 3, h: 0,
    line: { color: C.red, width: 3 },
  });

  slide.addText(
    "生物学中心法则：遗传信息从 DNA → RNA → 蛋白质 的传递。\n" +
    "所有地球生物都遵循这一法则 —  除了病毒。",
    {
      x: 0.8, y: 1.5, w: 11.5, h: 0.9,
      fontSize: 16, fontFace: "Microsoft YaHei",
      color: C.light, lineSpacingMultiple: 1.4,
    }
  );

  // Three virus categories
  const categories = [
    {
      title: "DNA病毒",
      example: "天花病毒",
      desc: "和其他正常生物一样，使用DNA分子作为遗传物质",
      color: C.accent,
    },
    {
      title: "RNA病毒",
      example: "流感病毒、艾滋病病毒、新冠病毒",
      desc: "放弃使用DNA，改用RNA分子作为遗传物质",
      color: C.orange,
    },
    {
      title: "逆转录病毒",
      example: "乙肝病毒（特殊）",
      desc: "繁殖时先制造RNA，再根据RNA反过来制造DNA",
      color: C.red,
    },
  ];

  categories.forEach((c, i) => {
    const y = 2.7 + i * 1.5;
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.8, y, w: 11.5, h: 1.25,
      fill: { color: c.color, transparency: 85 },
      rectRadius: 0.1,
      line: { color: c.color, width: 1.5 },
    });
    slide.addText(c.title, {
      x: 1.2, y, w: 2.5, h: 0.5,
      fontSize: 18, fontFace: "Microsoft YaHei",
      color: c.color, bold: true,
    });
    slide.addText(c.example, {
      x: 1.2, y: y + 0.5, w: 10.5, h: 0.4,
      fontSize: 13, fontFace: "Microsoft YaHei",
      color: C.gold,
    });
    slide.addText(c.desc, {
      x: 3.8, y, w: 8, h: 0.5,
      fontSize: 15, fontFace: "Microsoft YaHei",
      color: C.white, valign: "middle",
    });
  });

  slide.addText(String(slideIndex++), {
    x: 12.2, y: 7.0, w: 0.8, h: 0.4,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: C.light, align: "right",
  });
}

// ════════════════════════════════════════════════════════════
// SLIDE 11  –  规则破坏者 (3) 几何形状
// ════════════════════════════════════════════════════════════
{
  const slide = pptx.addSlide();
  slide.background = { fill: C.bg };
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 13.333, h: 1.1,
    fill: { color: C.red, transparency: 30 },
  });
  slide.addText("规则破坏者 —— 病毒的特殊形状", {
    x: 0.6, y: 0.15, w: 12, h: 0.8,
    fontSize: 28, fontFace: "Microsoft YaHei",
    color: C.white, bold: true,
  });
  slide.addShape(pptx.ShapeType.line, {
    x: 0.6, y: 1.3, w: 3, h: 0,
    line: { color: C.red, width: 3 },
  });

  slide.addText(
    "绝大多数地球生命没有特别规则的外形，但很多病毒却是数学上很完美的几何形状。",
    {
      x: 0.8, y: 1.5, w: 11.5, h: 0.6,
      fontSize: 16, fontFace: "Microsoft YaHei",
      color: C.light,
    }
  );

  const shapes = [
    { name: "乙肝病毒", desc: "完美球形外层 + 正二十面体蛋白质壳（20个相同三角形平面）", color: C.accent },
    { name: "T4噬菌体", desc: "二十面体的头 + 几根中心对称的尾巴，像人类设计的机器人", color: C.gold },
    { name: "新冠病毒", desc: "直径120nm的圆球，长满长长尖刺，像海胆或王冠装饰物", color: C.red },
  ];

  shapes.forEach((s, i) => {
    const y = 2.4 + i * 1.5;
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.8, y, w: 11.5, h: 1.2,
      fill: { color: s.color, transparency: 85 },
      rectRadius: 0.1,
      line: { color: s.color, width: 1.5 },
    });
    slide.addText(s.name, {
      x: 1.2, y: y + 0.05, w: 2.8, h: 0.6,
      fontSize: 20, fontFace: "Microsoft YaHei",
      color: s.color, bold: true,
    });
    slide.addText(s.desc, {
      x: 4.2, y, w: 7.8, h: 1.2,
      fontSize: 15, fontFace: "Microsoft YaHei",
      color: C.white, valign: "middle", lineSpacingMultiple: 1.3,
    });
  });

  slide.addText(String(slideIndex++), {
    x: 12.2, y: 7.0, w: 0.8, h: 0.4,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: C.light, align: "right",
  });
}

// ════════════════════════════════════════════════════════════
// SLIDE 12  –  总结
// ════════════════════════════════════════════════════════════
{
  const slide = pptx.addSlide();
  slide.background = { fill: C.bg };

  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 13.333, h: 1.1,
    fill: { color: C.accent },
  });
  slide.addText("总结：记住三个词", {
    x: 0.6, y: 0.15, w: 12, h: 0.8,
    fontSize: 28, fontFace: "Microsoft YaHei",
    color: C.white, bold: true,
  });
  slide.addShape(pptx.ShapeType.line, {
    x: 0.6, y: 1.3, w: 3, h: 0,
    line: { color: C.gold, width: 3 },
  });

  // three summary cards
  const summaries = [
    {
      title: "完美寄生者",
      color: C.gold,
      points: "• 把全部生命寄托在宿主身上\n• 与非生命物质无区别 → 完全活过来\n• 生命两阶段：沉寂 ↔ 繁殖",
    },
    {
      title: "极简主义者",
      color: C.green,
      points: "• 最小化指令系统\n• 乙肝病毒仅4个基因\n• 蛋白质外壳 + DNA = 新病毒",
    },
    {
      title: "规则破坏者",
      color: C.red,
      points: "• 打破能量利用法则\n• 打破生物学中心法则\n• DNA/RNA灵活使用\n• 数学般的完美几何形状",
    },
  ];

  summaries.forEach((s, i) => {
    const x = 0.8 + i * 4.0;
    slide.addShape(pptx.ShapeType.roundRect, {
      x, y: 1.6, w: 3.6, h: 4.8,
      fill: { color: s.color, transparency: 85 },
      rectRadius: 0.15,
      line: { color: s.color, width: 2 },
    });
    slide.addText(s.title, {
      x, y: 1.7, w: 3.6, h: 0.7,
      fontSize: 22, fontFace: "Microsoft YaHei",
      color: s.color, bold: true, align: "center", valign: "middle",
    });
    slide.addText(s.points, {
      x: x + 0.3, y: 2.5, w: 3.0, h: 3.5,
      fontSize: 14, fontFace: "Microsoft YaHei",
      color: C.white, lineSpacingMultiple: 1.6, valign: "top",
    });
  });

  slide.addText(
    "病毒鹤立鸡群，呈现出和我们熟悉的地球生物的巨大差别",
    {
      x: 0.8, y: 6.6, w: 11.5, h: 0.5,
      fontSize: 16, fontFace: "Microsoft YaHei",
      color: C.gold, align: "center", italic: true,
    }
  );

  slide.addText(String(slideIndex++), {
    x: 12.2, y: 7.0, w: 0.8, h: 0.4,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: C.light, align: "right",
  });
}

// ════════════════════════════════════════════════════════════
// SLIDE 13  –  下一讲预告
// ════════════════════════════════════════════════════════════
{
  const slide = pptx.addSlide();
  slide.background = { fill: C.bg };

  slide.addShape(pptx.ShapeType.ellipse, {
    x: -2, y: -2, w: 6, h: 6,
    fill: { color: C.accent, transparency: 85 },
  });
  slide.addShape(pptx.ShapeType.ellipse, {
    x: 9, y: 4, w: 5, h: 5,
    fill: { color: C.gold, transparency: 90 },
  });

  slide.addText("下一讲预告", {
    x: 1.0, y: 1.5, w: 11, h: 0.8,
    fontSize: 32, fontFace: "Microsoft YaHei",
    color: C.white, bold: true,
  });

  slide.addShape(pptx.ShapeType.rect, {
    x: 1.0, y: 2.4, w: 2, h: 0.06,
    fill: { color: C.accent },
  });

  slide.addText(
    "相比于病毒的独特之处，可能很多人更关心的一个问题是：\n" +
    "病毒为什么会让人生病？它们又是怎么让人生病的？\n\n" +
    "这个，我们在下一讲说。",
    {
      x: 1.0, y: 2.8, w: 11, h: 2.5,
      fontSize: 20, fontFace: "Microsoft YaHei",
      color: C.light, lineSpacingMultiple: 1.6,
    }
  );

  slide.addText(
    "感谢聆听",
    {
      x: 1.0, y: 5.5, w: 11, h: 0.8,
      fontSize: 24, fontFace: "Microsoft YaHei",
      color: C.gold, align: "center",
    }
  );

  slide.addText(String(slideIndex++), {
    x: 12.2, y: 7.0, w: 0.8, h: 0.4,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: C.light, align: "right",
  });
}

// ════════════════════════════════════════════════════════════
// Generate
// ════════════════════════════════════════════════════════════
const outPath = "examples/第2集-slides.pptx";
await pptx.writeFile({ fileName: outPath });
console.log(`Generated: ${outPath}`);
console.log(`Total slides: ${slideIndex - 1}`);
