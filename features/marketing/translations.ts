import {
  companyStats,
  homeFaq,
  homeHighlights,
  type FAQItem,
} from "@/features/marketing/content";
import type {
  MarketingFaqItem,
  PublishedBlogPost,
  PublishedCompanyProfile,
  PublishedIndustry,
  PublishedProduct,
} from "@/features/marketing/public-content";
import type { Locale } from "@/lib/i18n";

const zhCompanyStats = [
  { value: "18+", label: "外贸制造经验年限" },
  { value: "42", label: "每季度审核的生产单元" },
  { value: "96%", label: "按约定节点准时出货" },
  { value: "30+", label: "覆盖的复购国家与地区" },
];

const zhHomeHighlights = [
  {
    title: "更快为技术采购整理报价信息",
    description:
      "把价格、开模说明、合规前提和出货条款整理进一份便于决策的简报。",
  },
  {
    title: "在下单前先把流程透明化",
    description:
      "从打样确认到终检放行，每个环节都为采购团队减少不确定性。",
  },
  {
    title: "文档结构兼顾报关与质量团队",
    description:
      "装箱单、标签和测试记录都按出口场景准备，减少上线前返工。",
  },
];

const zhHomeFaq: FAQItem[] = [
  {
    question: "通常多久可以拿到报价资料包？",
    answer:
      "对于标准需求，我们通常会在两个工作日内返回结构化报价，包含前提假设、交期、起订量和下一步建议。",
  },
  {
    question: "是否支持 OEM 和自有品牌项目？",
    answer:
      "支持。我们可以配合 OEM、联合品牌和自有品牌项目，包括包装评审、样品确认、检验节点和出口文件协调。",
  },
  {
    question: "哪些信息最有助于快速准确报价？",
    answer:
      "最有帮助的是目标市场、预计年量、产品图纸或图片、认证需求以及目标交付条款。",
  },
];

const zhProductTranslations: Record<string, Partial<PublishedProduct>> = {
  "smart-warehouse-scanner": {
    name: "智能仓储扫描器",
    category: "仓储自动化",
    description:
      "适合分销商和仓储项目的耐用型手持扫描器模板，便于收货、盘点和出库复核。",
    intro:
      "围绕高频仓储作业设计，这个模板展示了我们如何把硬件、配件和出货文件整理给多站点买家。",
    heroTitle: "为高节奏履约线提供更稳定的仓储识别效率",
    heroImageAlt: "带有流程节点说明的手持仓储扫描器示意图",
    leadTime: "样品确认后 35-45 天",
    moq: "500 台",
    sellingPoints: [
      "耐用外壳适合长时间值班和高频扫描场景",
      "可搭配充电座、底座、标签和多语言说明书",
      "出货前检验流程贴合分销商常见验收要求",
    ],
    specifications: [
      { label: "连接方式", value: "Bluetooth 5.0 / USB-C 底座" },
      { label: "电池表现", value: "标准班次使用可达 16 小时" },
      { label: "防护等级", value: "IP54 外壳并通过跌落测试" },
      { label: "包装形式", value: "零售彩盒、出口外箱，可选定制内托" },
    ],
    faq: [
      {
        question: "可以支持定制固件或预装程序吗？",
        answer:
          "可以。详情模板已经为固件说明和配件备注预留结构，方便技术采购在打样前确认定制范围。",
      },
      {
        question: "是否支持标签和外箱本地化？",
        answer:
          "支持。外箱唛头、说明页、插卡和合规图标都可以按目标市场做本地化。",
      },
    ],
  },
  "cold-chain-tracker": {
    name: "冷链追踪器",
    category: "温度监测",
    description:
      "面向冷链进口商的温度与位置追踪模板，用于合规记录、包装验证和数据汇报。",
    intro:
      "这个模板展示了我们如何把合规敏感型产品的追溯、包装和参数信息做成买家易读结构。",
    heroTitle: "从工厂到交付节点，全程可追踪的冷链可视化",
    heroImageAlt: "带路线监控界面的冷链追踪器示意图",
    leadTime: "样品确认后 30-40 天",
    moq: "300 套",
    sellingPoints: [
      "数据导出流程适合 QA 与索赔复盘使用",
      "包装方案可覆盖医药、食品和特殊物流项目",
      "检验清单重点关注电池完整性和传感器校准",
    ],
    specifications: [
      { label: "监测范围", value: "-30C 到 70C" },
      { label: "报告形式", value: "CSV / PDF 行程摘要模板" },
      { label: "外壳结构", value: "紧凑密封模块，带防拆标签" },
      { label: "续航时间", value: "视上传间隔可达 120 天" },
    ],
    faq: [
      {
        question: "可以做成带品牌的监测套装吗？",
        answer:
          "可以。我们可以把追踪器与说明卡、标签、启动指南和目标市场文件要求一起打包。",
      },
      {
        question: "启动资料里通常包含哪些内容？",
        answer:
          "常见资料包括行程日志样例、校准说明、外箱规格和出货前检验节点。",
      },
    ],
  },
  "custom-label-station": {
    name: "定制标签工作站",
    category: "检验与包装",
    description:
      "适用于准确贴标、重贴标和出口包装复核的小型打印贴标工作站模板。",
    intro:
      "适合自有品牌和多 SKU 项目，帮助销售和运营把部署方式、准确性和文档流程讲清楚。",
    heroTitle: "面向出口外箱、组合包和零售包装的稳定贴标能力",
    heroImageAlt: "出口外箱旁的标签工作站示意图",
    leadTime: "样品确认后 25-35 天",
    moq: "200 台",
    sellingPoints: [
      "支持重贴标、待检隔离和终检外箱复核流程",
      "占地紧凑，适合代工包装线和二次组装工位",
      "为操作员、QA 和采购团队预留结构化导入说明",
    ],
    specifications: [
      { label: "打印宽度", value: "最高 108 mm" },
      { label: "介质支持", value: "纸质及合成标签材料" },
      { label: "产线方式", value: "独立工位或输送线侧装" },
      { label: "配套文件", value: "包装 SOP、操作指南、维护清单" },
    ],
    faq: [
      {
        question: "可以覆盖多种 pack-out 场景吗？",
        answer:
          "可以。参数区已经按单品、外箱和托盘标签需求并列展示来设计。",
      },
      {
        question: "这个页面适合直接做电商下单吗？",
        answer:
          "不适合。这个模板以 B2B 报价和询盘转化为目标，CTA 会把买家引导到规格沟通。",
      },
    ],
  },
};

const zhIndustryTranslations: Record<string, Partial<PublishedIndustry>> = {
  "consumer-electronics": {
    name: "消费电子",
    summary:
      "适合需要同时兼顾上市节奏、配件一致性和多渠道出口包装的买家团队。",
    heroTitle: "面向发布时间紧、协作链长的电子类项目应用方案",
    imageAlt: "电子产品经过仓储和质检节点的示意图",
    sections: [
      {
        heading: "买家最容易耗时的环节",
        paragraphs: [
          "消费电子进口商经常在产品已确认后，仍然花大量时间反复对齐包装、配件清单和外箱唛头。",
          "这个应用模板的目标，是把这些问题前置，让采购和市场团队能在同一节奏上推进。",
        ],
      },
      {
        heading: "页面如何组织流程",
        paragraphs: [
          "我们围绕目标市场、包装方式、合规预期和量产放行节点来组织内容，让应用场景页面更有实际决策价值。",
        ],
        bullets: ["样品确认顺序", "配件与内页核对", "外箱标签与运输标识审查"],
      },
    ],
  },
  "cold-chain-logistics": {
    name: "冷链物流",
    summary:
      "适合需要稳定监测硬件、清晰行程记录和严格包装流程的温控物流团队。",
    heroTitle: "面向温控运输项目的运营可视化应用页面",
    imageAlt: "带冷链节点的物流线路示意图",
    sections: [
      {
        heading: "我们优先呈现的买家关注点",
        paragraphs: [
          "冷链团队通常希望在试点前先看到可执行的数据管理、包装保护和部署说明，而不是只看功能列表。",
        ],
      },
      {
        heading: "这个应用页能承接什么内容",
        paragraphs: [
          "页面结构预留了验证步骤、上线指标和 FAQ，用更直白的方式回答运营团队真正关心的问题。",
        ],
        bullets: ["试点订单范围", "包装完整性检查点", "面向客服与索赔团队的行程摘要输出"],
      },
    ],
  },
  "private-label-retail": {
    name: "自有品牌零售",
    summary:
      "适合需要协调设计、包装和补货节奏，同时又不能失控于质量与排期的零售团队。",
    heroTitle: "面向规模化自有品牌项目的应用规划页面",
    imageAlt: "零售包装方案与生产检查点示意图",
    sections: [
      {
        heading: "我们如何组织页面叙事",
        paragraphs: [
          "自有品牌项目最适合把包装、配件和合规备注放在同一页面里讲清楚，这个模板就是围绕这个目标搭的。",
        ],
      },
      {
        heading: "推荐保留的模块",
        paragraphs: [
          "每个行业页都可以重点展示渠道组合、包装变体，以及量产前最关键的 QA 节点。",
        ],
        bullets: ["按渠道拆分的包装逻辑", "印刷与组装检验节点", "补货与复购计划 FAQ"],
      },
    ],
  },
};

const zhBlogTranslations: Record<string, Partial<PublishedBlogPost>> = {
  "reduce-lead-times-cross-border-fulfillment": {
    title: "B2B 团队如何减少跨境履约中的交期摩擦",
    summary:
      "一篇实用概览，帮助进口商缩短内部审批、工厂放行和出货准备之间的时间差。",
    category: "运营",
    readingTime: "5 分钟阅读",
    imageAlt: "全球履约节点规划示意图",
    sections: [
      {
        heading: "先统一成一条审批路径",
        paragraphs: [
          "当产品、包装和出货前提散落在不同对话里时，交期最容易失控。高效团队会先把这些决策整合进一份统一审阅包。",
          "这样采购、质量和物流负责人更容易围绕同一个工作版本快速给出结论。",
        ],
        bullets: ["尽早确认目标市场和贸易条款", "量产前锁定包装范围", "明确每个节点的审批责任人"],
      },
      {
        heading: "把文件也视为生产的一部分",
        paragraphs: [
          "检验清单、装箱单和标签文件不是后补材料，而是决定货物能否准时离开的生产系统一部分。",
        ],
      },
    ],
  },
  "what-procurement-teams-need-before-requesting-a-quote": {
    title: "采购团队在发起询盘前，应该先准备哪些信息",
    summary:
      "最快的报价周期，通常来自把目标量、目标市场和质量要求一次性讲清楚的买家。",
    category: "采购",
    readingTime: "4 分钟阅读",
    imageAlt: "包含质量和物流说明的报价需求简报示意图",
    sections: [
      {
        heading: "先说清量和市场",
        paragraphs: [
          "只有当供应商真正理解市场、年需求形态和包装预期时，报价才会更稳定、更接近真实执行。",
        ],
        bullets: ["预计年量和上市时间", "目标市场与认证范围", "包装前提和自有品牌需求"],
      },
      {
        heading: "把真正重要的限制条件提前告诉供应商",
        paragraphs: [
          "如果你有最大箱规、托盘规则或供应商导入清单，越早共享，越能减少后续来回修改。",
        ],
      },
    ],
  },
  "using-faqs-to-improve-b2b-seo-and-conversion": {
    title: "如何用 FAQ 同时提升 B2B SEO 和询盘质量",
    summary:
      "好的 FAQ 不只是补字数，它能帮助搜索引擎理解意图，也能让买家在联系销售前先完成自我筛选。",
    category: "SEO",
    readingTime: "6 分钟阅读",
    imageAlt: "FAQ 规划与 SEO、询盘转化关系示意图",
    sections: [
      {
        heading: "优先回答真正阻碍询盘的问题",
        paragraphs: [
          "最有效的 FAQ，往往直接回答数量、交期、定制和文件要求这些问题，因为这正是买家犹豫是否联系你的节点。",
        ],
      },
      {
        heading: "答案要具体，也要方便扫读",
        paragraphs: [
          "短而直接的回答更适合快速浏览和结构化数据，也能避免内部知识被写成模糊营销文案。",
        ],
        bullets: ["一个问题只对应一个意图", "不要重复 Hero 区的话", "FAQ 之后要接清晰的 CTA"],
      },
    ],
  },
};

export function getLocalizedCompanyStats(locale: Locale) {
  return locale === "zh-CN" ? zhCompanyStats : companyStats;
}

export function getLocalizedHomeHighlights(locale: Locale) {
  return locale === "zh-CN" ? zhHomeHighlights : homeHighlights;
}

export function getLocalizedHomeFaq(locale: Locale, faqItems: MarketingFaqItem[]) {
  if (locale === "en") {
    return faqItems;
  }

  const translationMap = new Map(
    homeFaq.map((item, index) => [item.question, zhHomeFaq[index]]),
  );

  return faqItems.map((item) => translationMap.get(item.question) ?? item);
}

export function localizeCompany(
  locale: Locale,
  company: PublishedCompanyProfile,
): PublishedCompanyProfile {
  if (locale === "en") {
    return company;
  }

  return {
    ...company,
    tagline: "面向全球买家的稳定 OEM 与出口执行",
    summary:
      "我们帮助进口商、分销商和自有品牌团队更快完成报价、样品、量产与出口文件协同。",
    description:
      "以 Google SEO、询盘转化和后台可维护为目标，构建适合海外买家阅读与决策的企业外贸官网。",
    logoImageAlt: `${company.companyName} 品牌视觉`,
    seoDescription:
      "面向 Google SEO 与询盘转化的企业外贸官网模板，支持产品展示、行业内容、博客与报价表单。",
  };
}

export function localizeProduct(
  locale: Locale,
  product: PublishedProduct,
): PublishedProduct {
  if (locale === "en") {
    return product;
  }

  const translation = zhProductTranslations[product.slug];

  if (!translation) {
    return product;
  }

  return {
    ...product,
    ...translation,
    sellingPoints: translation.sellingPoints ?? product.sellingPoints,
    specifications: translation.specifications ?? product.specifications,
    faq: translation.faq ?? product.faq,
  };
}

export function localizeIndustry(
  locale: Locale,
  industry: PublishedIndustry,
): PublishedIndustry {
  if (locale === "en") {
    return industry;
  }

  const translation = zhIndustryTranslations[industry.slug];

  if (!translation) {
    return industry;
  }

  return {
    ...industry,
    ...translation,
    sections: translation.sections ?? industry.sections,
  };
}

export function localizeBlogPost(
  locale: Locale,
  post: PublishedBlogPost,
): PublishedBlogPost {
  if (locale === "en") {
    return post;
  }

  const translation = zhBlogTranslations[post.slug];

  if (!translation) {
    return {
      ...post,
      readingTime: post.readingTime.replace(/min read/i, "分钟阅读"),
    };
  }

  return {
    ...post,
    ...translation,
    sections: translation.sections ?? post.sections,
  };
}
