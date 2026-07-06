# 09. PptxGenJS 高级功能

## 演讲者备注 (addNotes)

```javascript
const slide = pres.addSlide();
slide.addText("团队工作进展", {
  x: 0.5, y: 0.5, w: 9.0, h: 0.8,
  fontSize: 32, bold: true,
});

// 添加演讲者备注
slide.addNotes("提醒自己：
1. Q2 收入增长 20%，超出预期
2. 下季度重点：海外市场拓展
3. 团队已扩招 5 人");

// addNotes 返回 Slide 对象，支持链式调用
slide.addNotes("其他备注内容");
```

> 备注内容在正常播放模式下不可见，仅在演示者视图或打印备注模式中显示。

---

## 超链接 (Hyperlink)

PptxGenJS 支持两种超链接：**外部 URL** 和**内部幻灯片跳转**。

### 外部链接

```javascript
// 文字上的超链接
slide.addText("访问官网了解更多", {
  x: 1.0, y: 3.0, w: 5.0, h: 0.5,
  fontSize: 16,
  hyperlink: {
    url: "https://github.com/gitbrent/PptxGenJS",
    tooltip: "点击访问 PptxGenJS 仓库",
  },
});

// 图片上的超链接
slide.addImage({
  path: "qr-code.png",
  x: 7.0, y: 2.0, w: 2.0, h: 2.0,
  hyperlink: {
    url: "https://example.com",
    tooltip: "扫描二维码或点击访问",
  },
});
```

### 内部幻灯片跳转（目录导航）

```javascript
// 在某一页添加跳转到第 3 页的链接
slide.addText("跳转到核心内容 →", {
  x: 7.0, y: 4.5, w: 2.5, h: 0.5,
  fontSize: 14,
  hyperlink: {
    slide: 3,                        // 跳转到第 3 张幻灯片（从 1 开始编号）
    tooltip: "前往第 3 页",
  },
});
```

> 内部跳转自 **v2.0.0** 起支持，tooltip 自 **v1.5.0** 起支持。

### HyperlinkProps 接口

```typescript
interface HyperlinkProps {
  url?: string;        // 外部 URL
  slide?: number;      // 内部幻灯片编号（1-based）
  tooltip?: string;    // 悬停提示文字
}
```

---

## 母版幻灯片 (defineSlideMaster)

`defineSlideMaster()` 允许你定义可复用的幻灯片母版，相当于 PowerPoint 的"幻灯片母版"功能。

### 创建母版

```javascript
pres.defineSlideMaster({
  title: "CONTENT_PAGE",        // 唯一标题（必需）
  background: { color: "FFFFFF" },
  margin: [0.5, 0.5, 0.5, 0.5], // [上, 右, 下, 左]
  objects: [
    // 右下角页码
    {
      placeholder: {
        options: {
          name: "pageNum",
          type: "slideNumber",
          x: 8.5, y: 5.1, w: 1.0, h: 0.4,
          fontSize: 10, color: "999999", align: "right",
        },
        text: "1",             // 占位符文本
      },
    },
    // 底部公司 Logo
    {
      image: {
        x: 0.3, y: 4.9, w: 0.8, h: 0.4,
        path: "logo.png",
      },
    },
    // 顶部蓝色装饰线
    {
      shape: {
        x: 0.0, y: 0.0, w: 10.0, h: 0.05,
        fill: { color: "3366CC" },
      },
    },
  ],
});

// 使用母版
const slide = pres.addSlide({ masterName: "CONTENT_PAGE" });
slide.addText("基于母版的内容页", {
  x: 0.5, y: 0.5, w: 9.0, h: 0.8,
});
```

### 占位符类型（共 6 种）

母版中可以定义 6 种占位符：

| 类型 | 说明 |
|------|------|
| `title` | 标题占位符 |
| `body` | 正文占位符 |
| `image` | 图片占位符 |
| `chart` | 图表占位符 |
| `table` | 表格占位符 |
| `media` | 媒体占位符 |

### 母版示例：封面

```javascript
pres.defineSlideMaster({
  title: "COVER_PAGE",
  background: { color: "003366" },
  objects: [
    {
      shape: {
        x: 0, y: 3.5, w: 10, h: 2.0,
        fill: { color: "002244" },
      },
    },
    {
      placeholder: {
        options: {
          name: "coverTitle",
          type: "title",
          x: 1.0, y: 3.7, w: 8.0, h: 1.2,
          fontSize: 40, color: "FFFFFF", bold: true,
        },
        text: "演示文稿标题",
      },
    },
    {
      placeholder: {
        options: {
          name: "coverSubtitle",
          type: "body",
          x: 1.0, y: 4.8, w: 8.0, h: 0.6,
          fontSize: 18, color: "CCCCCC",
        },
        text: "副标题",
      },
    },
  ],
});
```

---

## 幻灯片编号 (slideNumber)

PptxGenJS 可以通过母版占位符添加页码：

```javascript
pres.defineSlideMaster({
  title: "NUMBERED_SLIDE",
  objects: [
    {
      placeholder: {
        options: {
          name: "pagenum",
          type: "slideNumber",      // 关键：类型为 slideNumber
          x: 8.5, y: 5.1, w: 1.0, h: 0.4,
          fontSize: 10,
          color: "999999",
          align: "right",
        },
        text: "1",
      },
    },
  ],
});
```

---

## 重要注意事项

### ⚠️ Option 对象会被就地修改（Mutate）

PptxGenJS 的一个关键行为是 **option 对象在方法调用时会被就地修改**。这意味着如果你复用同一个 option 对象，可能得到意外的结果：

```javascript
// ❌ 错误做法：复用 option 对象
const opts = { x: 1.0, y: 1.0, w: 8.0, h: 1.0, fontSize: 24 };

slide1.addText("文本 A", opts);   // opts 被修改了！
slide2.addText("文本 B", opts);   // 此时 opts 的值可能不是你期望的

// ✅ 正确做法：每次调用使用工厂函数
const makeOpts = () => ({ x: 1.0, y: 1.0, w: 8.0, h: 1.0, fontSize: 24 });

slide1.addText("文本 A", makeOpts());
slide2.addText("文本 B", makeOpts());

// ✅ 或者：每次都展开
slide1.addText("文本 A", { ...commonOpts });
slide2.addText("文本 B", { ...commonOpts });
```

### 其他注意事项

| 事项 | 说明 |
|------|------|
| Promise | 所有 `write/writeFile` 方法返回 Promise |
| SVG | Node.js 环境中 SVG 需要 Canvas API 实现 |
| GIF | 动画 GIF 在旧版 PowerPoint 中可能静态显示 |
| 中文 | 建议指定 `fontFace: "Microsoft YaHei"` 等中文字体 |
| 图表 | 图表在 PowerPoint 中作为标准 Chart 对象，可编辑 |

---

## 与 Marp 的对比

| 特性 | Marp | PptxGenJS |
|------|------|-----------|
| **输入格式** | Markdown | JavaScript API |
| **输出格式** | HTML/PDF/PPTX/PNG/JPEG | PPTX（可直接编辑） |
| **编程模型** | 声明式（声明式 Markdown） | 命令式（代码控制一切） |
| **编辑性** | PPTX 中为背景图片 | 文本/图表可编辑 |
| **适合场景** | 快速制作演示文稿 | 程序化批量生成报告 |
| **学习曲线** | 低（会 Markdown 即可） | 中（需要 JS/TS） |
| **布局控制** | 有限（基于 CSS） | 精确（像素/英寸级） |
| **图表** | 依赖图片 | 原生 Chart 对象 |

---

## 完整示例：自动化季度报表

```javascript
import pptxgen from "pptxgenjs";

async function generateQuarterlyReport(data) {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "自动报表系统";

  // ====== 封面 ======
  const cover = pres.addSlide();
  cover.background = { color: "003366" };
  cover.addText(data.title, {
    x: 1.0, y: 1.5, w: 8.0, h: 1.5,
    fontSize: 44, bold: true, color: "FFFFFF", align: "center",
  });
  cover.addText(`报告期间：${data.period}`, {
    x: 1.0, y: 3.2, w: 8.0, h: 0.6,
    fontSize: 18, color: "AACCDD", align: "center",
  });

  // ====== 关键指标 ======
  const metrics = pres.addSlide();
  metrics.addText("关键指标", {
    x: 0.5, y: 0.3, w: 9.0, h: 0.8,
    fontSize: 32, bold: true, color: "003366",
  });

  // 指标卡片（用形状 + 文本模拟）
  const cardData = [
    { label: "营收", value: `¥${data.revenue}`, color: "3366CC" },
    { label: "增长率", value: `${data.growth}%`, color: "33CC66" },
    { label: "客户数", value: data.customers, color: "FF6600" },
    { label: "NPS", value: data.nps, color: "CC33CC" },
  ];
  cardData.forEach((card, i) => {
    const x = 0.5 + i * 2.3;
    metrics.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y: 1.5, w: 2.0, h: 1.5,
      fill: { color: card.color, transparency: 85 },
      rectRadius: 0.1,
    });
    metrics.addText(`${card.value}`, {
      x, y: 1.6, w: 2.0, h: 0.8,
      fontSize: 28, bold: true, color: card.color, align: "center",
    });
    metrics.addText(card.label, {
      x, y: 2.4, w: 2.0, h: 0.5,
      fontSize: 14, color: "666666", align: "center",
    });
  });

  // ====== 趋势图 ======
  const chartSlide = pres.addSlide();
  chartSlide.addText("营收趋势", {
    x: 0.5, y: 0.3, w: 9.0, h: 0.8,
    fontSize: 32, bold: true, color: "003366",
  });
  chartSlide.addChart(pres.charts.LINE, [{
    name: "营收（万元）",
    labels: data.trendLabels,
    values: data.trendValues,
  }], {
    x: 0.5, y: 1.5, w: 9.0, h: 3.5,
    showTitle: false,
    showLegend: false,
    lineSize: 3,
    chartColors: ["3366CC"],
  });

  // ====== 明细表 ======
  const tableSlide = pres.addSlide();
  tableSlide.addText("交易明细", {
    x: 0.5, y: 0.3, w: 9.0, h: 0.8,
    fontSize: 32, bold: true, color: "003366",
  });

  const headerRow = ["日期", "客户", "金额", "状态"].map(h => ({
    text: h,
    options: { bold: true, color: "FFFFFF", fill: { color: "3366CC" }, align: "center", fontSize: 12 },
  }));
  const dataRows = data.transactions.map(t => [
    { text: t.date, options: { align: "center", fontSize: 11 } },
    { text: t.client, options: { align: "left", fontSize: 11 } },
    { text: `¥${t.amount}`, options: { align: "right", fontSize: 11 } },
    { text: t.status, options: { align: "center", fontSize: 11 } },
  ]);

  tableSlide.addTable([headerRow, ...dataRows], {
    x: 0.3, y: 1.3, w: 9.4,
    border: { type: "solid", pt: 0.5, color: "DDDDDD" },
    colW: [1.5, 3.0, 1.5, 1.0],
    autoPage: true,
    autoPageRepeatHeader: true,
  });

  // ====== 保存 ======
  await pres.writeFile({ fileName: `季度报告-${data.period}.pptx` });
  console.log("报表已生成！");
}

// 使用
generateQuarterlyReport({
  title: "2026年 Q2 季度业务报告",
  period: "2026年4月-6月",
  revenue: "580万",
  growth: 23.5,
  customers: 1280,
  nps: 72,
  trendLabels: ["1月", "2月", "3月", "4月", "5月", "6月"],
  trendValues: [80, 95, 110, 130, 160, 195],
  transactions: [
    { date: "2026-06-30", client: "ABC科技有限公司", amount: "120,000", status: "已完成" },
    { date: "2026-06-29", client: "XYZ集团", amount: "85,000", status: "已完成" },
    { date: "2026-06-28", client: "123数字公司", amount: "50,000", status: "处理中" },
  ],
});
```
