import PptxGenJS from "pptxgenjs";

const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_WIDE"; // 16:9
pptx.author = "王丽明";
pptx.title = "病毒科学课 第3集 - 病毒如何导致疾病";

// ── Color palette ──
const C = {
  bgDark:    "1A365D",    // deep navy
  bgLight:   "EBF4FF",    // light blue
  accent:    "2B6CB0",    // medium blue
  accent2:   "C53030",    // red accent
  accent3:   "276749",    // green accent
  textDark:  "1A202C",
  textLight: "FFFFFF",
  textMuted: "4A5568",
  white:     "FFFFFF",
};

// ── Helper: add a text slide with title + bullet points ──
function makeSlide(title, bullets, opts = {}) {
  const slide = pptx.addSlide();
  slide.background = { color: C.white };

  // Top bar
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 10, h: 0.08, fill: { color: C.accent },
  });

  // Title
  slide.addText(title, {
    x: 0.6, y: 0.25, w: 8.8, h: 0.7,
    fontSize: 26, fontFace: "Microsoft YaHei", color: C.textDark,
    bold: true,
  });

  // Divider line under title
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.6, y: 0.95, w: 2.5, h: 0.04, fill: { color: C.accent },
  });

  // Bullets
  if (bullets && bullets.length > 0) {
    const bulletTexts = bullets.map(b => ({
      text: b,
      options: {
        fontSize: opts.bulletSize || 16,
        fontFace: "Microsoft YaHei",
        color: C.textDark,
        bullet: { code: "25CF", color: C.accent },
        breakType: "none",
        lineSpacingMultiple: 1.4,
        spaceAfter: opts.spaceAfter || 6,
      },
    }));
    slide.addText(bulletTexts, {
      x: 0.6, y: 1.2, w: 8.8, h: 4.8,
      valign: "top",
      paraSpaceAfter: 0,
    });
  }

  // Page number
  slide.addText(String(slide.slideNumber || ""), {
    x: 9.2, y: 5.3, w: 0.6, h: 0.4,
    fontSize: 10, fontFace: "Microsoft YaHei", color: C.textMuted,
    align: "right",
  });

  return slide;
}

// ── Helper: title-only slide (section divider) ──
function makeSectionSlide(title, subtitle) {
  const slide = pptx.addSlide();
  slide.background = { color: C.bgDark };

  slide.addText(title, {
    x: 0.6, y: 1.5, w: 8.8, h: 1.2,
    fontSize: 36, fontFace: "Microsoft YaHei", color: C.white,
    bold: true,
    align: "center",
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 1.0, y: 2.8, w: 8.0, h: 0.6,
      fontSize: 18, fontFace: "Microsoft YaHei", color: "90CDF4",
      align: "center",
    });
  }
  return slide;
}

// ── Helper: two-column slide ──
function makeTwoColSlide(title, leftBullets, rightBullets) {
  const slide = pptx.addSlide();
  slide.background = { color: C.white };

  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 10, h: 0.08, fill: { color: C.accent },
  });

  slide.addText(title, {
    x: 0.6, y: 0.25, w: 8.8, h: 0.7,
    fontSize: 24, fontFace: "Microsoft YaHei", color: C.textDark,
    bold: true,
  });

  slide.addShape(pptx.ShapeType.rect, {
    x: 0.6, y: 0.95, w: 2, h: 0.04, fill: { color: C.accent },
  });

  // Left column
  const leftTexts = leftBullets.map(b => ({
    text: b,
    options: {
      fontSize: 14, fontFace: "Microsoft YaHei", color: C.textDark,
      bullet: { code: "25CF", color: C.accent },
      breakType: "none",
      lineSpacingMultiple: 1.35,
      spaceAfter: 4,
    },
  }));
  slide.addText(leftTexts, {
    x: 0.6, y: 1.2, w: 4.1, h: 4.5,
    valign: "top",
  });

  // Right column
  const rightTexts = rightBullets.map(b => ({
    text: b,
    options: {
      fontSize: 14, fontFace: "Microsoft YaHei", color: C.textDark,
      bullet: { code: "25CF", color: C.accent2 },
      breakType: "none",
      lineSpacingMultiple: 1.35,
      spaceAfter: 4,
    },
  }));
  slide.addText(rightTexts, {
    x: 5.2, y: 1.2, w: 4.2, h: 4.5,
    valign: "top",
  });

  // Divider line
  slide.addShape(pptx.ShapeType.rect, {
    x: 4.95, y: 1.2, w: 0.03, h: 4.2, fill: { color: "CBD5E0" },
  });

  slide.addText(String(slide.slideNumber || ""), {
    x: 9.2, y: 5.3, w: 0.6, h: 0.4,
    fontSize: 10, fontFace: "Microsoft YaHei", color: C.textMuted,
    align: "right",
  });
  return slide;
}

// ── Helper: highlight/emphasis slide ──
function makeEmphasisSlide(text, subtext) {
  const slide = pptx.addSlide();
  slide.background = { color: "FFFFF0" }; // warm yellow-white

  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 10, h: 0.08, fill: { color: "D69E2E" },
  });

  slide.addText(text, {
    x: 0.8, y: 1.5, w: 8.4, h: 1.8,
    fontSize: 28, fontFace: "Microsoft YaHei", color: C.textDark,
    bold: true,
    align: "center",
    lineSpacingMultiple: 1.3,
  });
  if (subtext) {
    slide.addText(subtext, {
      x: 1.0, y: 3.5, w: 8.0, h: 0.8,
      fontSize: 16, fontFace: "Microsoft YaHei", color: C.textMuted,
      align: "center",
      italic: true,
    });
  }
  return slide;
}

// ═══════════════════════════════════════════════
// SLIDES
// ═══════════════════════════════════════════════

// 1. Title slide
(() => {
  const s = pptx.addSlide();
  s.background = { color: C.bgDark };
  s.addText("病毒科学课", {
    x: 0.8, y: 1.0, w: 8.4, h: 0.8,
    fontSize: 20, fontFace: "Microsoft YaHei", color: "90CDF4",
    align: "center",
  });
  s.addText("病毒如何导致疾病？", {
    x: 0.8, y: 1.8, w: 8.4, h: 1.2,
    fontSize: 38, fontFace: "Microsoft YaHei", color: C.white,
    bold: true, align: "center",
  });
  s.addShape(pptx.ShapeType.rect, {
    x: 3.5, y: 3.1, w: 3, h: 0.04, fill: { color: C.accent },
  });
  s.addText("主讲人：王丽明  |  第3集", {
    x: 0.8, y: 3.3, w: 8.4, h: 0.6,
    fontSize: 16, fontFace: "Microsoft YaHei", color: "A0AEC0",
    align: "center",
  });
})();

// 2. Opening & Recap
makeSlide("上集回顾：病毒是什么？", [
  "病毒是一类完美的寄生者",
  "将所有生命活动转交给宿主细胞完成",
  "自身仅携带无可精简的最小量遗传物质",
  "能绕过其他地球生命都遵循的细胞规则",
]);

// 3. Viruses cause many diseases
makeSlide("病毒与人类疾病", [
  "从普通感冒、流感，到乙肝、艾滋病",
  "以及新型冠状病毒肺炎（COVID-19）",
  "大量人类疾病都与病毒直接相关",
]);

// 4. Core question
makeEmphasisSlide(
  "病毒为什么能让人得病？",
  "它们在进入细胞之前，不是像沙子一样根本不会动吗？"
);

// 5. Why this question matters
makeSlide("为什么要搞清楚这个问题？", [
  "只有弄清楚病毒如何进入人体、如何导致疾病",
  "我们才能更好地对抗病毒",
  "这是本讲要详细讨论的核心问题",
]);

// 6. Common misconception
makeSlide("常见误解：「病毒」二字", [
  "很多人认为：病毒 = 又病又毒，进入人体肯定不好",
  "字面理解：「病毒」≈ 服毒",
  "但这种理解是 非常错误的",
]);

// 7. What is virus really like outside cells?
makeSlide("进入细胞前，病毒的本质", [
  "在进入宿主细胞之前，病毒是一种毫无生命迹象的「死东西」",
  "与一粒沙子没有多大区别",
  "病毒构造 = 蛋白质外壳 + DNA/RNA 遗传物质",
  "这些物质本身并不会引起疾病",
], { bulletSize: 15 });

// 8. Analogy: food
makeEmphasisSlide(
  "我们每天吃的肉、菜、蛋、奶里，也有蛋白质、DNA、RNA——吃了一点事都没有。",
  "病毒本身 ≠ 疾病"
);

// 9. First condition: must enter host cell
makeSlide("病毒致病的第一个要素", [
  "绝大多数情况下，如果病毒不能进入人体细胞",
  "就算被碰到或吃下肚子，也不会有任何问题",
  "关键条件：病毒必须进入宿主细胞",
], { bulletSize: 18 });

// 10. Example: African swine fever
makeSlide("例证：非洲猪瘟病毒", [
  "非洲猪瘟对猪的杀伤力极大，死亡率几乎100%",
  "但感染了非洲猪瘟的猪肉，人吃了完全没关系",
  "原因：非洲猪瘟病毒只认猪作为宿主",
  "它不会识别、也不会进入人体细胞",
  "对人类来说，吃非洲猪瘟病毒 ≈ 吃蛋白质食物",
], { bulletSize: 15 });

// 11. HIV example transition
makeSectionSlide("病毒是如何进入宿主细胞的？", "以艾滋病病毒（HIV）为例");

// 12. Host specificity
makeSlide("宿主选择性", [
  "几乎所有地球生命都能被一种或多种病毒入侵",
  "从细菌到真菌，从植物到动物，无一例外",
  "但大多数病毒只会入侵特定物种的特定细胞",
  "这就是生物学上的「宿主选择性」",
], { bulletSize: 16 });

// 13. Specific targeting examples
makeTwoColSlide("病毒的特异性入侵", [
  "乙肝病毒 → 识别并入侵肝脏细胞",
  "艾滋病病毒 → 识别特定免疫细胞",
  "SARS/新冠病毒 → 识别ACE2阳性细胞",
], [
  "关键：病毒表面蛋白质凸起",
  "在静默状态下帮助病毒寻找合适的宿主细胞",
  "整个过程病毒自己什么都不需要做",
]);

// 14. The key insight: passive process
makeEmphasisSlide(
  "病毒在识别和入侵过程中，自己什么都不需要干。",
  "它们没有能力做任何主动动作"
);

// 15. Virus structure (HIV example)
makeSlide("艾滋病病毒（HIV）结构", [
  "外层：薄膜",
  "中间层：蛋白质外壳",
  "内部：遗传物质（RNA）",
  "外层膜上插着「图钉状」蛋白质分子：",
  "  ● 大头：GP120",
  "  ● 尖头：GP41",
], { bulletSize: 16 });

// 16. HIV entry: GP120 + CD4
makeSlide("HIV入侵第一步：识别与靠近", [
  "GP120 能够与人体免疫细胞表面的 CD4 蛋白质紧密结合",
  "像磁铁的南北极天然相互吸引——完全被动完成",
  "结合后，HIV 靠近了它的天然宿主——人体免疫细胞",
]);

// 17. HIV entry: membrane fusion
makeSlide("HIV入侵第二步：进入细胞", [
  "在 CCR5 蛋白质分子的帮助下，HIV 与免疫细胞彼此拉近",
  "GP41（图钉尖头）刺破免疫细胞的细胞膜",
  "HIV 的膜与免疫细胞的膜融合在一起",
  "就像两个肥皂泡合并成一个更大的肥皂泡",
  "病毒蛋白质和遗传物质进入细胞内部",
]);

// 18. Feature 1: passive process
makeSlide("病毒入侵特点一：完全被动", [
  "病毒自己不需要做任何事情",
  "它也没有能力做任何主动动作",
  "借助纯物理/化学过程：",
  "  ● 蛋白质分子之间的吸引与结合",
  "  ● 细胞膜的融合",
  "病毒就能找到宿主细胞并成功入侵",
], { bulletSize: 15 });

// 19. Feature 2: host specificity
makeSlide("病毒入侵特点二：蛋白质锁钥机制", [
  "病毒的宿主选择性 = 取决于它结合什么蛋白质进入细胞",
  "病毒是「指哪打哪」：",
  "  ● 细胞上有它要结合的蛋白质 → 识别并入侵",
  "  ● 细胞上没有 → 无法进入这个细胞",
]);

// 20. Clever strategy
makeSlide("病毒的巧妙生存策略", [
  "宿主细胞表面的蛋白质分子并非病毒自己发明的",
  "这些蛋白质本身就是宿主细胞的重要功能元件",
  "病毒恰恰利用了这些天然存在的蛋白质作为入侵工具",
  "宿主细胞无法轻易放弃或改变这些重要蛋白质",
  "因此也无法阻止病毒的识别和入侵",
], { bulletSize: 16 });

// 21. HIV + CD4 detail
makeSlide("以 HIV 为例：为什么免疫细胞逃不掉？", [
  "CD4 蛋白质只在某些免疫细胞表面才有",
  "CD4 对免疫细胞至关重要：帮助识别病原体并展开攻击",
  "免疫细胞离不开 CD4 → 就必然受到 HIV 的入侵",
]);

// 22. SARS/COVID + ACE2
makeSlide("更多实例：SARS / 新型冠状病毒", [
  "2002年 SARS 冠状病毒 & 2019年新型冠状病毒",
  "都依靠病毒表面的「尖刺」结合 ACE2 蛋白质",
  "ACE2（血管紧张素转换酶二）对维持心血管功能非常重要",
  "病毒正是利用这个正常功能蛋白质进入细胞",
], { bulletSize: 16 });

// 23. Multi-organ attack
makeSlide("为什么新冠病毒会攻击多个器官？", [
  "人体哪些细胞带有 ACE2 蛋白质，病毒就入侵哪里：",
  "  ● 肺部某些细胞",
  "  ● 肾脏某些细胞",
  "  ● 甚至男性睾丸的某些细胞",
  "这就是新冠病毒感染后出现多器官病变的原因",
], { bulletSize: 15 });

// 24. ASF recap
makeSlide("反向例证：非洲猪瘟病毒", [
  "非洲猪瘟病毒识别和结合的蛋白质分子",
  "在人体中根本不存在",
  "所以人类不会被非洲猪瘟病毒入侵",
  "也不会因此生病",
]);

// 25. Entering cell ≠ disease
makeSectionSlide("进入细胞 = 一定会生病吗？", "不一定。");

// 26. Virus's real mission
makeSlide("病毒的唯一使命", [
  "病毒唯一重要的使命：利用宿主细胞的能量和资源自我复制",
  "它根本不关心宿主细胞本身的状态",
  "从逻辑上说，宿主细胞健康活着、持续帮助病毒制造后代，才是最理想的",
  "病毒没有动机让宿主生病，更别说死亡",
], { bulletSize: 15 });

// 27. Viruses in our body
makeEmphasisSlide(
  "每个健康人体内都隐藏着很多病毒。",
  "很多时候，病毒能和人体细胞和平相处，不会造成伤害。"
);

// 28. Three categories intro
makeSlide("病毒致病的三大原因", [
  "某些病毒过分活跃，或人体免疫系统较弱时",
  "原本无害的病毒也可能让人生病",
  "具体原因可以分为三大类：",
  "  ① 病毒直接破坏宿主细胞",
  "  ② 宿主细胞过度防御",
  "  ③ 免疫系统攻击过激",
], { bulletSize: 16 });

// 29. Category 1: direct destruction
makeSlide("第一类：病毒直接破坏细胞", [
  "以腺病毒（引发病毒性肺炎）为例：",
  "  病毒在细胞内完成复制后，需要离开细胞",
  "  腺病毒主动命令宿主细胞启动自杀程序",
  "  细胞破碎分解 → 病毒颗粒被释放出去",
  "短时间内大量细胞被破坏 → 人生病",
], { bulletSize: 15 });

// 30. Category 2: over-defense
makeSlide("第二类：宿主细胞过度防御", [
  "有时病毒本身不杀伤宿主细胞，但宿主细胞自身的防御导致了疾病",
  "以 HIV/AIDS 为例：",
  "  免疫细胞有内部监控系统，发现被入侵就启动自杀",
  "  这是正常防御——牺牲自己阻止病毒扩散",
], { bulletSize: 15 });

// 31. Category 2 continued: AIDS
makeSlide("第二类（续）：艾滋病案例", [
  "但在艾滋病人体内，防御措施做得「过于好了」",
  "不仅杀死已被病毒感染的细胞",
  "连没有被感染的免疫细胞也一并清除",
  "结果：人体免疫系统彻底瘫痪",
  "病人暴露在各种病原体之下，死于各种感染",
], { bulletSize: 15 });

// 32. Category 3: immune overreaction
makeSlide("第三类：免疫系统攻击过激", [
  "免疫系统核心任务之一：识别并清除体内病毒",
  "当大量细胞被病毒感染后，这些细胞也成为免疫系统的攻击目标",
  "以乙肝为例：",
  "  大部分肝细胞长期存在乙肝病毒踪迹",
  "  免疫系统持续全面攻击肝脏",
  "  最终导致肝炎 → 肝硬化 → 肝癌",
], { bulletSize: 14 });

// 33. Category 3 continued: COVID
makeSlide("第三类（续）：SARS / 新冠案例", [
  "SARS 冠状病毒和新型冠状病毒引发的也是同样的反应",
  "免疫系统剧烈攻击携带病毒的人体细胞（如肺部细胞）",
  "短时间内破坏肺部和其他器官的正常功能",
  "导致发病和死亡",
], { bulletSize: 15 });

// 34. Summary
makeSectionSlide("本讲小结", "");

// 35. Summary details
makeSlide("关键要点总结", [
  "病毒本身不会导致疾病，必须识别并入侵宿主细胞才会致病",
  "病毒依靠表面蛋白质分子结合宿主表面的特定蛋白质",
  "整个识别与入侵过程完全被动完成",
  "入侵后致病方式有三种：",
  "  ● 直接杀死宿主细胞",
  "  ● 宿主细胞过度防御",
  "  ● 免疫系统攻击过激",
], { bulletSize: 15 });

// 36. Preview
makeSlide("下集预告", [
  "搞清楚了病毒如何导致疾病",
  "下一讲：病毒是如何传播的？",
  "为什么病毒会导致那么多可怕的传染病？",
  "它们如何威胁我们的健康和生命？",
]);

// 37. End slide
(() => {
  const s = pptx.addSlide();
  s.background = { color: C.bgDark };
  s.addText("谢谢观看", {
    x: 0.8, y: 2.0, w: 8.4, h: 1.0,
    fontSize: 40, fontFace: "Microsoft YaHei", color: C.white,
    bold: true, align: "center",
  });
  s.addShape(pptx.ShapeType.rect, {
    x: 4.0, y: 3.1, w: 2, h: 0.04, fill: { color: C.accent },
  });
  s.addText("病毒科学课 · 第3集", {
    x: 0.8, y: 3.3, w: 8.4, h: 0.6,
    fontSize: 16, fontFace: "Microsoft YaHei", color: "A0AEC0",
    align: "center",
  });
})();

// ═══════════════════════════════════════════════
// GENERATE
// ═══════════════════════════════════════════════
const outPath = "examples/第3集-slides.pptx";
await pptx.writeFile({ fileName: outPath });
console.log("Generated:", outPath);
