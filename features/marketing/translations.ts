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

const companyStatsByLocale: Partial<Record<Locale, typeof companyStats>> = {
  "zh-CN": zhCompanyStats,
  es: [
    { value: "18+", label: "Años en manufactura de exportacion" },
    { value: "42", label: "Celulas de produccion auditadas por trimestre" },
    { value: "96%", label: "Pedidos enviados segun hitos acordados" },
    { value: "30+", label: "Paises atendidos con compradores recurrentes" },
  ],
  fr: [
    { value: "18+", label: "Annees en fabrication export" },
    { value: "42", label: "Cellules de production auditees par trimestre" },
    { value: "96%", label: "Commandes expediees aux jalons convenus" },
    { value: "30+", label: "Pays servis avec acheteurs recurrents" },
  ],
  ru: [
    { value: "18+", label: "Лет опыта экспортного производства" },
    { value: "42", label: "Производственных ячеек аудируются ежеквартально" },
    { value: "96%", label: "Заказов отгружено по согласованным этапам" },
    { value: "30+", label: "Стран с повторными покупателями" },
  ],
  ar: [
    { value: "18+", label: "سنوات في تصنيع التصدير" },
    { value: "42", label: "وحدة إنتاج يتم تدقيقها كل ربع سنة" },
    { value: "96%", label: "طلبات تشحن حسب المواعيد المتفق عليها" },
    { value: "30+", label: "دولة مع مشترين متكررين" },
  ],
};

const homeHighlightsByLocale: Partial<Record<Locale, typeof homeHighlights>> = {
  "zh-CN": zhHomeHighlights,
  es: [
    {
      title: "Cotizaciones mas rapidas para compradores tecnicos",
      description:
        "Reunimos precios, notas de moldes, supuestos de cumplimiento y terminos de envio en un brief listo para decision.",
    },
    {
      title: "Visibilidad del proceso antes de la orden",
      description:
        "Desde aprobacion de muestra hasta inspeccion final, cada paso reduce incertidumbre para compras.",
    },
    {
      title: "Documentacion preparada para aduanas y calidad",
      description:
        "Listas de empaque, etiquetas y registros de prueba se preparan en formatos listos para exportacion.",
    },
  ],
  fr: [
    {
      title: "Devis plus rapides pour acheteurs techniques",
      description:
        "Nous regroupons prix, notes d'outillage, hypotheses de conformite et conditions d'expedition dans un brief exploitable.",
    },
    {
      title: "Visibilite du processus avant la commande",
      description:
        "De la validation echantillon a l'inspection finale, chaque etape reduit l'incertitude pour les achats.",
    },
    {
      title: "Documentation prete pour douane et qualite",
      description:
        "Listes de colisage, etiquettes et rapports de test sont prepares dans des formats export.",
    },
  ],
  ru: [
    {
      title: "Более быстрые расчеты для технических закупщиков",
      description:
        "Мы собираем цены, оснастку, требования соответствия и условия доставки в один понятный пакет.",
    },
    {
      title: "Прозрачность процесса до размещения заказа",
      description:
        "От утверждения образца до финальной инспекции каждый шаг снижает неопределенность для закупок.",
    },
    {
      title: "Документы для таможни и качества",
      description:
        "Упаковочные листы, этикетки и тестовые записи готовятся в экспортных форматах.",
    },
  ],
  ar: [
    {
      title: "تسعير أسرع للمشترين التقنيين",
      description:
        "نجمع الأسعار وملاحظات القوالب وافتراضات الامتثال وشروط الشحن في موجز جاهز للقرار.",
    },
    {
      title: "وضوح العملية قبل أمر الشراء",
      description:
        "من اعتماد العينة إلى الفحص النهائي، تم تصميم كل خطوة لتقليل عدم اليقين لدى فرق الشراء.",
    },
    {
      title: "وثائق جاهزة للجمارك والجودة",
      description:
        "تجهز قوائم التعبئة والملصقات وسجلات الاختبار بصيغ مناسبة للتصدير.",
    },
  ],
};

const homeFaqByLocale: Partial<Record<Locale, FAQItem[]>> = {
  "zh-CN": zhHomeFaq,
  es: [
    {
      question: "Con que rapidez podemos recibir una cotizacion?",
      answer:
        "Para briefs estandar solemos entregar una cotizacion estructurada en dos dias laborables, con supuestos, plazo, MOQ y siguientes pasos.",
    },
    {
      question: "Pueden apoyar programas OEM y marca privada?",
      answer:
        "Si. Apoyamos OEM, co-branding y marca privada con revision de empaque, muestras, inspecciones y documentos de exportacion.",
    },
    {
      question: "Que informacion ayuda a cotizar con precision?",
      answer:
        "Mercado objetivo, volumen anual esperado, planos o fotos, certificaciones requeridas y termino de entrega deseado.",
    },
  ],
  fr: [
    {
      question: "Sous quel delai pouvons-nous recevoir un devis?",
      answer:
        "Pour un brief standard, nous envoyons generalement un devis structure sous deux jours ouvrables avec hypotheses, delai, MOQ et prochaines etapes.",
    },
    {
      question: "Pouvez-vous accompagner des programmes OEM et marque privee?",
      answer:
        "Oui. Nous accompagnons OEM, co-branding et marques privees avec revue emballage, echantillons, inspections et documents export.",
    },
    {
      question: "Quelles informations rendent le devis plus precis?",
      answer:
        "Marche cible, volume annuel estime, dessins ou photos, besoins de certification et condition de livraison souhaitee.",
    },
  ],
  ru: [
    {
      question: "Как быстро можно получить пакет предложения?",
      answer:
        "По стандартным запросам мы обычно возвращаем структурированное предложение за два рабочих дня с допущениями, сроками, MOQ и следующими шагами.",
    },
    {
      question: "Поддерживаете ли вы OEM и private label?",
      answer:
        "Да. Мы поддерживаем OEM, совместный бренд и private label: упаковка, образцы, инспекции и экспортные документы.",
    },
    {
      question: "Какая информация помогает рассчитать точнее?",
      answer:
        "Целевой рынок, ожидаемый годовой объем, чертежи или фото, требования сертификации и условия поставки.",
    },
  ],
  ar: [
    {
      question: "كم يستغرق الحصول على عرض سعر؟",
      answer:
        "للمتطلبات القياسية نرسل عادة عرضا منظما خلال يومي عمل، يتضمن الافتراضات ومدة التسليم والحد الأدنى والخطوات التالية.",
    },
    {
      question: "هل تدعمون مشاريع OEM والعلامات الخاصة؟",
      answer:
        "نعم. ندعم OEM والعلامات المشتركة والخاصة مع مراجعة التغليف واعتماد العينات ونقاط الفحص ووثائق التصدير.",
    },
    {
      question: "ما المعلومات التي تساعد على التسعير بدقة؟",
      answer:
        "السوق المستهدف، الحجم السنوي المتوقع، الرسومات أو الصور، متطلبات الشهادات وشروط التسليم المطلوبة.",
    },
  ],
};

const companyTranslationsByLocale: Partial<
  Record<Locale, Partial<PublishedCompanyProfile>>
> = {
  "zh-CN": {
    tagline: "面向全球买家的稳定 OEM 与出口执行",
    summary:
      "我们帮助进口商、分销商和自有品牌团队更快完成报价、样品、量产与出口文件协同。",
    description:
      "以 Google SEO、询盘转化和后台可维护为目标，构建适合海外买家阅读与决策的企业外贸官网。",
    seoDescription:
      "面向 Google SEO 与询盘转化的企业外贸官网模板，支持产品展示、行业内容、博客与报价表单。",
  },
  es: {
    tagline: "OEM estable y ejecucion de exportacion para compradores globales",
    summary:
      "Ayudamos a importadores, distribuidores y marcas privadas a coordinar cotizaciones, muestras, produccion y documentos de exportacion con mas rapidez.",
    description:
      "Un sitio B2B de exportacion pensado para Google SEO, conversion de consultas y mantenimiento operativo desde el panel.",
    seoDescription:
      "Plantilla de sitio B2B para Google SEO y conversion de consultas, con productos, industrias, blog y formularios de cotizacion.",
  },
  fr: {
    tagline: "Execution OEM et export stable pour acheteurs mondiaux",
    summary:
      "Nous aidons importateurs, distributeurs et marques privees a coordonner devis, echantillons, production et documents export plus vite.",
    description:
      "Un site export B2B concu pour Google SEO, la conversion de demandes et la maintenance depuis l'administration.",
    seoDescription:
      "Modele de site B2B pour Google SEO et conversion de demandes, avec produits, secteurs, blog et formulaires de devis.",
  },
  ru: {
    tagline: "Стабильное OEM и экспортное исполнение для международных покупателей",
    summary:
      "Мы помогаем импортерам, дистрибьюторам и private label командам быстрее согласовывать расчеты, образцы, производство и экспортные документы.",
    description:
      "B2B экспортный сайт для Google SEO, конверсии заявок и удобного обслуживания через админ-панель.",
    seoDescription:
      "Шаблон B2B сайта для Google SEO и конверсии заявок: продукты, отрасли, блог и формы запроса цены.",
  },
  ar: {
    tagline: "تنفيذ OEM وتصدير مستقر للمشترين العالميين",
    summary:
      "نساعد المستوردين والموزعين وفرق العلامات الخاصة على تنسيق عروض الأسعار والعينات والإنتاج ووثائق التصدير بسرعة أكبر.",
    description:
      "موقع تصدير B2B مصمم لـ Google SEO وتحويل الاستفسارات وسهولة الصيانة من لوحة الإدارة.",
    seoDescription:
      "قالب موقع B2B لـ Google SEO وتحويل الاستفسارات، مع منتجات وقطاعات ومدونة ونماذج عرض سعر.",
  },
};

const productTranslationsByLocale: Partial<
  Record<Locale, Record<string, Partial<PublishedProduct>>>
> = {
  "zh-CN": zhProductTranslations,
  es: {
    "smart-warehouse-scanner": {
      name: "Escaner inteligente para almacenes",
      category: "Automatizacion de almacen",
      description:
        "Escaner manual robusto para distribuidores que necesitan recepcion, conteo y verificacion de salida mas rapidos.",
      intro:
        "Disenado para flujos de almacen de alta frecuencia, muestra como empaquetamos hardware, accesorios y documentacion para compradores multi-sitio.",
      heroTitle: "Precision de almacen para lineas de cumplimiento de alto ritmo",
      heroImageAlt: "Ilustracion de un escaner de almacen con puntos de proceso",
      leadTime: "35-45 dias tras aprobar muestra",
      moq: "500 unidades",
      sellingPoints: [
        "Carcasa robusta para turnos largos y escaneo repetitivo",
        "Accesorios para cargadores, bases, etiquetas y manuales multilingues",
        "Verificacion previa al envio alineada con controles de distribuidores",
      ],
      specifications: [
        { label: "Conectividad", value: "Bluetooth 5.0 / base USB-C" },
        { label: "Bateria", value: "Hasta 16 horas por turno estandar" },
        { label: "Proteccion", value: "Carcasa IP54 con prueba de caida" },
        { label: "Empaque", value: "Caja retail, carton export, inserto opcional" },
      ],
    },
    "cold-chain-tracker": {
      name: "Rastreador de cadena de frio",
      category: "Monitoreo de temperatura",
      description:
        "Rastreador de temperatura y ubicacion para importadores que gestionan cumplimiento, empaque y reportes.",
      intro:
        "Presenta productos sensibles al cumplimiento con trazabilidad, logica de empaque y especificaciones faciles de revisar.",
      heroTitle: "Visibilidad trazable de cadena de frio desde fabrica hasta entrega",
      heroImageAlt: "Ilustracion de rastreador de cadena de frio con monitoreo de ruta",
      leadTime: "30-40 dias tras aprobar muestra",
      moq: "300 unidades",
      sellingPoints: [
        "Exportacion de datos preparada para QA y reclamos",
        "Empaque para pharma, alimentos y logistica especial",
        "Inspeccion centrada en bateria y calibracion",
      ],
      specifications: [
        { label: "Rango", value: "-30C a 70C" },
        { label: "Reporte", value: "Resumen de viaje CSV / PDF" },
        { label: "Carcasa", value: "Modulo sellado compacto con etiqueta antimanipulacion" },
        { label: "Autonomia", value: "Hasta 120 dias segun intervalo de carga" },
      ],
    },
    "custom-label-station": {
      name: "Estacion de etiquetado personalizada",
      category: "Inspeccion y empaque",
      description:
        "Estacion compacta de impresion y aplicacion para etiquetado, reetiquetado y controles de empaque export.",
      intro:
        "Creada para marca privada y multi-SKU, ayuda a explicar configuracion, precision y flujo documental.",
      heroTitle: "Etiquetado confiable para cartones de exportacion, kits y packs retail",
      heroImageAlt: "Ilustracion de estacion de etiquetado junto a cartones de exportacion",
      leadTime: "25-35 dias tras aprobar muestra",
      moq: "200 unidades",
      sellingPoints: [
        "Soporta reetiquetado, retencion de inspeccion y verificacion final",
        "Huella compacta para lineas de empaque y ensamblaje secundario",
        "Notas para operadores, QA y compras",
      ],
      specifications: [
        { label: "Ancho de impresion", value: "Hasta 108 mm" },
        { label: "Material", value: "Etiquetas de papel y sinteticas" },
        { label: "Instalacion", value: "Puesto independiente o lateral de transportador" },
        { label: "Documentacion", value: "SOP de empaque, guia de operador, mantenimiento" },
      ],
    },
  },
  fr: {
    "smart-warehouse-scanner": {
      name: "Scanner intelligent d'entrepot",
      category: "Automatisation d'entrepot",
      description:
        "Scanner portable robuste pour distributeurs ayant besoin de reception, inventaire et verification sortie plus rapides.",
      intro:
        "Concu pour les flux d'entrepot intensifs, il structure materiel, accessoires et documents pour acheteurs multi-sites.",
      heroTitle: "Precision d'entrepot pour lignes logistiques rapides",
      heroImageAlt: "Illustration d'un scanner d'entrepot avec jalons de processus",
      leadTime: "35-45 jours apres validation echantillon",
      moq: "500 unites",
      sellingPoints: [
        "Boitier robuste pour longues equipes et scans repetes",
        "Accessoires pour chargeurs, stations, etiquettes et manuels multilingues",
        "Verification pre-expedition adaptee aux controles distributeurs",
      ],
      specifications: [
        { label: "Connectivite", value: "Bluetooth 5.0 / dock USB-C" },
        { label: "Batterie", value: "Jusqu'a 16 heures sur equipe standard" },
        { label: "Protection", value: "Boitier IP54 teste aux chutes" },
        { label: "Emballage", value: "Boite retail, carton export, insert optionnel" },
      ],
    },
    "cold-chain-tracker": {
      name: "Traceur chaine du froid",
      category: "Suivi de temperature",
      description:
        "Traceur temperature et localisation pour importateurs gerant conformite, emballage et rapports.",
      intro:
        "Presente des produits sensibles avec tracabilite, emballage et specifications lisibles.",
      heroTitle: "Visibilite tracable de la chaine du froid, de l'usine a la livraison",
      heroImageAlt: "Illustration d'un traceur chaine du froid avec suivi de route",
      leadTime: "30-40 jours apres validation echantillon",
      moq: "300 unites",
      sellingPoints: [
        "Export de donnees pret pour qualite et reclamations",
        "Emballages pour pharma, alimentaire et logistique speciale",
        "Inspection centree sur batterie et calibration capteur",
      ],
      specifications: [
        { label: "Plage", value: "-30C a 70C" },
        { label: "Rapport", value: "Resume trajet CSV / PDF" },
        { label: "Boitier", value: "Module scelle compact avec etiquette inviolable" },
        { label: "Autonomie", value: "Jusqu'a 120 jours selon intervalle d'envoi" },
      ],
    },
    "custom-label-station": {
      name: "Station d'etiquetage personnalisee",
      category: "Inspection et emballage",
      description:
        "Station compacte d'impression-pose pour etiquetage carton, reetiquetage et controles export.",
      intro:
        "Pour marque privee et multi-SKU, elle clarifie installation, precision et flux documentaire.",
      heroTitle: "Etiquetage fiable pour cartons export, kits et packs retail",
      heroImageAlt: "Illustration d'une station d'etiquetage pres de cartons export",
      leadTime: "25-35 jours apres validation echantillon",
      moq: "200 unites",
      sellingPoints: [
        "Supporte reetiquetage, blocage inspection et verification finale",
        "Format compact pour lignes de conditionnement et assemblage secondaire",
        "Notes pour operateurs, qualite et achats",
      ],
      specifications: [
        { label: "Largeur impression", value: "Jusqu'a 108 mm" },
        { label: "Supports", value: "Etiquettes papier et synthetiques" },
        { label: "Installation", value: "Poste autonome ou montage convoyeur" },
        { label: "Documents", value: "SOP emballage, guide operateur, maintenance" },
      ],
    },
  },
  ru: {
    "smart-warehouse-scanner": {
      name: "Умный складской сканер",
      category: "Складская автоматизация",
      description:
        "Прочный ручной сканер для быстрой приемки, инвентаризации и проверки отгрузки.",
      intro:
        "Шаблон показывает, как мы упаковываем оборудование, аксессуары и документы для покупателей с несколькими площадками.",
      heroTitle: "Точность склада для быстрых линий фулфилмента",
      heroImageAlt: "Иллюстрация ручного складского сканера с контрольными точками",
      leadTime: "35-45 дней после утверждения образца",
      moq: "500 единиц",
      sellingPoints: [
        "Прочный корпус для длинных смен и частого сканирования",
        "Аксессуары: зарядки, базы, этикетки и многоязычные инструкции",
        "Предотгрузочная проверка под требования дистрибьюторов",
      ],
      specifications: [
        { label: "Подключение", value: "Bluetooth 5.0 / USB-C док" },
        { label: "Батарея", value: "До 16 часов стандартной смены" },
        { label: "Защита", value: "Корпус IP54 с тестом падения" },
        { label: "Упаковка", value: "Розничная коробка, экспортный картон, вставка опционально" },
      ],
    },
    "cold-chain-tracker": {
      name: "Трекер холодовой цепи",
      category: "Температурный мониторинг",
      description:
        "Трекер температуры и местоположения для соответствия, упаковки и отчетности.",
      intro:
        "Показывает чувствительный продукт через прослеживаемость, упаковку и понятные спецификации.",
      heroTitle: "Прослеживаемость холодовой цепи от фабрики до точки доставки",
      heroImageAlt: "Иллюстрация трекера холодовой цепи с мониторингом маршрута",
      leadTime: "30-40 дней после утверждения образца",
      moq: "300 единиц",
      sellingPoints: [
        "Экспорт данных для QA и претензий",
        "Упаковка для фармы, еды и специальной логистики",
        "Инспекция фокусируется на батарее и калибровке",
      ],
      specifications: [
        { label: "Диапазон", value: "-30C до 70C" },
        { label: "Отчет", value: "CSV / PDF сводка рейса" },
        { label: "Корпус", value: "Компактный герметичный модуль с пломбой" },
        { label: "Автономность", value: "До 120 дней в зависимости от интервала" },
      ],
    },
    "custom-label-station": {
      name: "Станция индивидуальной маркировки",
      category: "Инспекция и упаковка",
      description:
        "Компактная станция печати и нанесения для маркировки, перемаркировки и экспортных проверок.",
      intro:
        "Подходит private label и multi-SKU проектам, объясняя настройку, точность и документы.",
      heroTitle: "Надежная маркировка экспортных коробов, наборов и retail упаковки",
      heroImageAlt: "Иллюстрация станции маркировки рядом с экспортными коробами",
      leadTime: "25-35 дней после утверждения образца",
      moq: "200 единиц",
      sellingPoints: [
        "Поддерживает перемаркировку, удержание на инспекции и финальную проверку",
        "Компактная площадь для контрактной упаковки и вторичной сборки",
        "Инструкции для операторов, QA и закупок",
      ],
      specifications: [
        { label: "Ширина печати", value: "До 108 мм" },
        { label: "Материалы", value: "Бумажные и синтетические этикетки" },
        { label: "Установка", value: "Отдельная станция или боковой монтаж к конвейеру" },
        { label: "Документы", value: "SOP упаковки, инструкция оператора, обслуживание" },
      ],
    },
  },
  ar: {
    "smart-warehouse-scanner": {
      name: "ماسح مستودعات ذكي",
      category: "أتمتة المستودعات",
      description:
        "ماسح يدوي متين للموزعين الذين يحتاجون إلى استلام وجرد وتحقق خروج أسرع.",
      intro:
        "يوضح كيف ننظم الأجهزة والملحقات والوثائق للمشترين متعددي المواقع.",
      heroTitle: "دقة مستودعات لخطوط تنفيذ سريعة الحركة",
      heroImageAlt: "رسم توضيحي لماسح مستودع يدوي مع نقاط عملية",
      leadTime: "35-45 يوما بعد اعتماد العينة",
      moq: "500 وحدة",
      sellingPoints: [
        "هيكل متين للمناوبات الطويلة والمسح المتكرر",
        "ملحقات للشواحن والقواعد والملصقات والأدلة متعددة اللغات",
        "تحقق قبل الشحن متوافق مع فحوصات الموزعين",
      ],
      specifications: [
        { label: "الاتصال", value: "Bluetooth 5.0 / قاعدة USB-C" },
        { label: "البطارية", value: "حتى 16 ساعة في مناوبة قياسية" },
        { label: "الحماية", value: "هيكل IP54 مع اختبار سقوط" },
        { label: "التغليف", value: "علبة تجزئة، كرتون تصدير، حشوة اختيارية" },
      ],
    },
    "cold-chain-tracker": {
      name: "متعقب سلسلة التبريد",
      category: "مراقبة الحرارة",
      description:
        "متعقب حرارة وموقع للمستوردين الذين يديرون الامتثال والتغليف والتقارير.",
      intro:
        "يوضح المنتجات الحساسة للامتثال عبر التتبع ومنطق التغليف والمواصفات سهلة القراءة.",
      heroTitle: "رؤية قابلة للتتبع لسلسلة التبريد من المصنع إلى نقطة التسليم",
      heroImageAlt: "رسم توضيحي لمتعقب سلسلة تبريد مع شاشة مراقبة مسار",
      leadTime: "30-40 يوما بعد اعتماد العينة",
      moq: "300 وحدة",
      sellingPoints: [
        "تصدير بيانات مناسب للجودة والمطالبات",
        "تغليف للدواء والغذاء واللوجستيات الخاصة",
        "فحص يركز على البطارية ومعايرة المستشعر",
      ],
      specifications: [
        { label: "نطاق المراقبة", value: "-30C إلى 70C" },
        { label: "التقرير", value: "ملخص رحلة CSV / PDF" },
        { label: "الغلاف", value: "وحدة محكمة صغيرة مع ملصق ضد العبث" },
        { label: "عمر البطارية", value: "حتى 120 يوما حسب فاصل الرفع" },
      ],
    },
    "custom-label-station": {
      name: "محطة ملصقات مخصصة",
      category: "الفحص والتغليف",
      description:
        "محطة طباعة وتطبيق مدمجة للملصقات وإعادة الملصقات وفحص تغليف التصدير.",
      intro:
        "مناسبة للعلامات الخاصة ومشاريع SKU متعددة، وتشرح الإعداد والدقة وتدفق الوثائق.",
      heroTitle: "ملصقات موثوقة لكرتون التصدير والمجموعات وتغليف التجزئة",
      heroImageAlt: "رسم توضيحي لمحطة ملصقات بجانب كراتين تصدير",
      leadTime: "25-35 يوما بعد اعتماد العينة",
      moq: "200 وحدة",
      sellingPoints: [
        "تدعم إعادة الملصقات والحجز للفحص والتحقق النهائي",
        "مساحة مدمجة لخطوط التعبئة والتجميع الثانوي",
        "ملاحظات تشغيل منظمة للمشغلين والجودة والمشتريات",
      ],
      specifications: [
        { label: "عرض الطباعة", value: "حتى 108 مم" },
        { label: "المواد", value: "ملصقات ورقية وصناعية" },
        { label: "الإعداد", value: "محطة مستقلة أو تثبيت بجانب ناقل" },
        { label: "الوثائق", value: "SOP تغليف، دليل تشغيل، قائمة صيانة" },
      ],
    },
  },
};

const industryTranslationsByLocale: Partial<
  Record<Locale, Record<string, Partial<PublishedIndustry>>>
> = {
  "zh-CN": zhIndustryTranslations,
  es: {
    "consumer-electronics": {
      name: "Electronica de consumo",
      summary:
        "Para equipos que equilibran lanzamiento, accesorios consistentes y empaque export en varios canales.",
      heroTitle: "Aplicaciones para programas electronicos con ventanas de lanzamiento ajustadas",
      imageAlt: "Ilustracion de productos electronicos pasando por almacen y QA",
      sections: [
        {
          heading: "Donde se pierde tiempo",
          paragraphs: [
            "Los importadores suelen reconciliar empaque, accesorios y marcas de carton cuando el producto ya esta aprobado.",
            "La plantilla adelanta esas preguntas para que compras y marketing avancen juntos.",
          ],
        },
        {
          heading: "Como se presenta el flujo",
          paragraphs: [
            "Organizamos mercado objetivo, logica de empaque, cumplimiento y puntos de liberacion de produccion.",
          ],
          bullets: ["Secuencia de muestras", "Verificacion de accesorios", "Revision de etiquetas y marcas"],
        },
      ],
    },
    "cold-chain-logistics": {
      name: "Logistica de cadena de frio",
      summary:
        "Para equipos que necesitan hardware confiable, registros claros y disciplina de empaque.",
      heroTitle: "Visibilidad operativa para envios sensibles a temperatura",
      imageAlt: "Ilustracion de ruta logistica con puntos de cadena de frio",
      sections: [
        {
          heading: "Prioridades del comprador",
          paragraphs: [
            "Los equipos de frio quieren ver manejo de datos, proteccion de empaque e instrucciones antes del piloto.",
          ],
        },
        {
          heading: "Que soporta la pagina",
          paragraphs: ["La estructura deja espacio para validacion, metricas de lanzamiento y FAQ operativas."],
          bullets: ["Alcance del piloto", "Controles de empaque", "Resumen de viaje para servicio y reclamos"],
        },
      ],
    },
    "private-label-retail": {
      name: "Retail de marca privada",
      summary:
        "Para retailers que coordinan diseno, empaque y reposicion sin perder control de calidad y calendario.",
      heroTitle: "Planificacion para marcas privadas que necesitan consistencia a escala",
      imageAlt: "Ilustracion de planes de empaque retail y controles de produccion",
      sections: [
        {
          heading: "Como estructuramos la narrativa",
          paragraphs: [
            "Los programas de marca privada funcionan mejor cuando empaque, accesorios y cumplimiento se ven en un solo lugar.",
          ],
        },
        {
          heading: "Modulos recomendados",
          paragraphs: ["Cada pagina puede destacar canales, variantes de empaque y puertas QA previas a produccion."],
          bullets: ["Empaque por canal", "Inspeccion de impresion y ensamble", "FAQ de reposicion"],
        },
      ],
    },
  },
  fr: {
    "consumer-electronics": {
      name: "Electronique grand public",
      summary:
        "Pour equipes equilibrant lancement, coherence accessoires et emballage export multi-canaux.",
      heroTitle: "Applications pour programmes electroniques aux delais de lancement courts",
      imageAlt: "Illustration de produits electroniques passant par entrepot et qualite",
      sections: [
        {
          heading: "Ou les acheteurs perdent du temps",
          paragraphs: [
            "Les importateurs rapprochent souvent emballage, accessoires et marquages carton apres validation produit.",
            "Le modele place ces questions plus tot pour aligner achats et marketing.",
          ],
        },
        {
          heading: "Presentation du flux",
          paragraphs: ["La page s'organise autour du marche, du pack-out, de la conformite et des jalons de production."],
          bullets: ["Sequence echantillons", "Verification accessoires", "Revue etiquettes et marquages"],
        },
      ],
    },
    "cold-chain-logistics": {
      name: "Logistique chaine du froid",
      summary:
        "Pour equipes ayant besoin de materiel fiable, de traces claires et d'un emballage discipline.",
      heroTitle: "Visibilite operationnelle pour expeditions temperature controlee",
      imageAlt: "Illustration d'une route logistique avec points chaine du froid",
      sections: [
        {
          heading: "Priorites acheteur",
          paragraphs: ["Les equipes veulent voir donnees, protection emballage et instructions avant d'approuver un pilote."],
        },
        {
          heading: "Ce que la page supporte",
          paragraphs: ["La structure prevoit validation, indicateurs de lancement et FAQ operationnelles."],
          bullets: ["Portee pilote", "Controles emballage", "Sorties trajet pour service et reclamations"],
        },
      ],
    },
    "private-label-retail": {
      name: "Retail marque privee",
      summary:
        "Pour retailers coordonnant design, emballage et reapprovisionnement sans perdre qualite ni planning.",
      heroTitle: "Planification pour marques privees qui cherchent la coherence a l'echelle",
      imageAlt: "Illustration de plans d'emballage retail et jalons de production",
      sections: [
        {
          heading: "Structure du recit",
          paragraphs: [
            "Les programmes marque privee fonctionnent mieux quand emballage, accessoires et conformite sont visibles ensemble.",
          ],
        },
        {
          heading: "Modules recommandes",
          paragraphs: ["Chaque page peut montrer mix canal, variantes d'emballage et portes qualite avant production."],
          bullets: ["Logique emballage par canal", "Inspection impression et assemblage", "FAQ reapprovisionnement"],
        },
      ],
    },
  },
  ru: {
    "consumer-electronics": {
      name: "Потребительская электроника",
      summary:
        "Для команд, балансирующих запуск, единообразие аксессуаров и экспортную упаковку по каналам.",
      heroTitle: "Применения для электронных проектов с короткими окнами запуска",
      imageAlt: "Иллюстрация электроники на этапах склада и QA",
      sections: [
        {
          heading: "Где покупатели теряют время",
          paragraphs: [
            "Импортеры часто сверяют упаковку, аксессуары и маркировку уже после утверждения продукта.",
            "Шаблон выносит эти вопросы раньше, чтобы закупки и маркетинг двигались вместе.",
          ],
        },
        {
          heading: "Как представлен процесс",
          paragraphs: ["Мы структурируем рынок, упаковку, соответствие и контрольные точки запуска производства."],
          bullets: ["Очередность образцов", "Проверка аксессуаров", "Ревью этикеток и shipping marks"],
        },
      ],
    },
    "cold-chain-logistics": {
      name: "Холодовая логистика",
      summary:
        "Для команд, которым нужны надежное оборудование, понятные записи рейса и дисциплина упаковки.",
      heroTitle: "Операционная видимость для температурно-чувствительных перевозок",
      imageAlt: "Иллюстрация логистического маршрута с точками холодовой цепи",
      sections: [
        {
          heading: "Приоритеты покупателя",
          paragraphs: ["Команды хотят увидеть работу с данными, защиту упаковки и инструкции до пилота."],
        },
        {
          heading: "Что поддерживает страница",
          paragraphs: ["Структура оставляет место для проверки, метрик запуска и операционных FAQ."],
          bullets: ["Объем пилота", "Контроль упаковки", "Сводки рейса для сервиса и претензий"],
        },
      ],
    },
    "private-label-retail": {
      name: "Private label ритейл",
      summary:
        "Для ритейлеров, координирующих дизайн, упаковку и пополнение без потери качества и сроков.",
      heroTitle: "Планирование private label проектов с масштабной консистентностью",
      imageAlt: "Иллюстрация розничной упаковки и производственных контрольных точек",
      sections: [
        {
          heading: "Как строится история",
          paragraphs: ["Private label лучше работает, когда упаковка, аксессуары и соответствие видны в одном месте."],
        },
        {
          heading: "Рекомендуемые модули",
          paragraphs: ["Страница может показывать каналы, варианты упаковки и QA-гейты до производства."],
          bullets: ["Упаковка по каналам", "Инспекция печати и сборки", "FAQ по пополнению"],
        },
      ],
    },
  },
  ar: {
    "consumer-electronics": {
      name: "الإلكترونيات الاستهلاكية",
      summary:
        "للفرق التي توازن بين توقيت الإطلاق واتساق الملحقات وتغليف التصدير عبر قنوات متعددة.",
      heroTitle: "تطبيقات مخصصة لمشاريع إلكترونية ذات نوافذ إطلاق ضيقة",
      imageAlt: "رسم توضيحي لمنتجات إلكترونية تمر عبر المستودع ونقاط الجودة",
      sections: [
        {
          heading: "أين يضيع وقت المشترين عادة",
          paragraphs: [
            "غالبا ما يراجع المستوردون التغليف وقوائم الملحقات وعلامات الكرتون بعد اعتماد المنتج.",
            "هذا القالب يطرح هذه الأسئلة مبكرا حتى تتحرك فرق الشراء والتسويق معا.",
          ],
        },
        {
          heading: "كيف يتم عرض سير العمل",
          paragraphs: ["ننظم الصفحة حول السوق المستهدف ومنطق التغليف وتوقعات الامتثال ونقاط إطلاق الإنتاج."],
          bullets: ["تسلسل اعتماد العينات", "فحص الملحقات", "مراجعة الملصقات وعلامات الشحن"],
        },
      ],
    },
    "cold-chain-logistics": {
      name: "لوجستيات سلسلة التبريد",
      summary:
        "للفرق التي تحتاج إلى أجهزة مراقبة موثوقة وسجلات رحلة واضحة وانضباط في التغليف.",
      heroTitle: "رؤية تشغيلية لبرامج شحن حساسة للحرارة",
      imageAlt: "رسم توضيحي لمسار لوجستي مع نقاط سلسلة تبريد",
      sections: [
        {
          heading: "أولويات المشتري التي نبرزها",
          paragraphs: ["تريد فرق سلسلة التبريد رؤية إدارة بيانات قابلة للاستخدام وحماية تغليف وتعليمات نشر قبل اعتماد التجربة."],
        },
        {
          heading: "ما الذي تدعمه صفحة التطبيق",
          paragraphs: ["يترك الهيكل مساحة لخطوات التحقق ومؤشرات الإطلاق وأسئلة FAQ تشغيلية واضحة."],
          bullets: ["نطاق الطلب التجريبي", "نقاط سلامة التغليف", "ملخصات رحلة لخدمة العملاء والمطالبات"],
        },
      ],
    },
    "private-label-retail": {
      name: "تجزئة العلامة الخاصة",
      summary:
        "لتجار التجزئة الذين ينسقون التصميم والتغليف والتجديد دون فقدان السيطرة على الجودة والجدول.",
      heroTitle: "تخطيط تطبيقات لفرق العلامة الخاصة التي تحتاج اتساقا على نطاق واسع",
      imageAlt: "رسم توضيحي لخطط تغليف التجزئة ونقاط فحص الإنتاج",
      sections: [
        {
          heading: "كيف ننظم سرد الصفحة",
          paragraphs: ["تنجح مشاريع العلامة الخاصة أكثر عندما تظهر ملاحظات التغليف والملحقات والامتثال في مكان واحد."],
        },
        {
          heading: "الوحدات الموصى بها",
          paragraphs: ["يمكن لكل صفحة قطاع إبراز مزيج القنوات ومتغيرات التغليف وأهم بوابات الجودة قبل الإنتاج."],
          bullets: ["منطق تغليف حسب القناة", "فحص الطباعة والتجميع", "FAQ للتجديد وإعادة الطلب"],
        },
      ],
    },
  },
};

const blogTranslationsByLocale: Partial<
  Record<Locale, Record<string, Partial<PublishedBlogPost>>>
> = {
  "zh-CN": zhBlogTranslations,
  es: {
    "reduce-lead-times-cross-border-fulfillment": {
      title: "Como los equipos B2B reducen friccion de plazo en fulfillment internacional",
      summary:
        "Resumen practico para acortar la brecha entre aprobacion interna, liberacion de fabrica y preparacion de envio.",
      category: "Operaciones",
      readingTime: "5 min de lectura",
      imageAlt: "Ilustracion de planificacion de hitos para fulfillment global",
      sections: [
        {
          heading: "Empiece con una ruta de aprobacion",
          paragraphs: [
            "Los plazos fallan cuando producto, empaque y envio viven en conversaciones separadas.",
            "Consolidar decisiones en un paquete permite que compras, calidad y logistica aprueben la misma version.",
          ],
          bullets: ["Confirme mercado e Incoterm temprano", "Congele empaque antes de produccion", "Defina responsables por hito"],
        },
        {
          heading: "Trate la documentacion como produccion",
          paragraphs: ["Listas de inspeccion, packing lists y etiquetas son parte del sistema que permite salir a tiempo."],
        },
      ],
    },
    "what-procurement-teams-need-before-requesting-a-quote": {
      title: "Que debe preparar compras antes de solicitar una cotizacion",
      summary:
        "Los ciclos mas rapidos vienen de compradores que explican volumen, mercado y calidad en un brief claro.",
      category: "Compras",
      readingTime: "4 min de lectura",
      imageAlt: "Ilustracion de un brief de cotizacion con calidad y logistica",
      sections: [
        {
          heading: "Volumen y mercado primero",
          paragraphs: ["Un proveedor cotiza mejor cuando entiende mercado, demanda anual y expectativa de empaque."],
          bullets: ["Volumen anual y fecha de lanzamiento", "Mercado destino y certificacion", "Empaque y marca privada"],
        },
        {
          heading: "Comparta las restricciones importantes",
          paragraphs: ["Tamanos maximos, reglas de pallet o checklist de onboarding ahorran revisiones si se comparten al inicio."],
        },
      ],
    },
    "using-faqs-to-improve-b2b-seo-and-conversion": {
      title: "Usar FAQ para mejorar SEO B2B y calidad de consultas",
      summary:
        "Un buen FAQ ayuda a buscadores a entender intencion y a compradores a autocalificarse antes de contactar ventas.",
      category: "SEO",
      readingTime: "6 min de lectura",
      imageAlt: "Ilustracion de FAQ conectado con SEO y consultas",
      sections: [
        {
          heading: "Responda objeciones practicas",
          paragraphs: ["Las mejores FAQ responden volumen, plazo, personalizacion y documentos en lenguaje claro."],
        },
        {
          heading: "Sea especifico y facil de escanear",
          paragraphs: ["Respuestas cortas apoyan lectura, datos estructurados y transferencia a ventas."],
          bullets: ["Una intencion por pregunta", "No repetir el hero", "Cerrar con un CTA claro"],
        },
      ],
    },
  },
  fr: {
    "reduce-lead-times-cross-border-fulfillment": {
      title: "Comment les equipes B2B reduisent les frictions de delai en fulfillment international",
      summary:
        "Apercu pratique pour raccourcir l'ecart entre validation interne, release usine et preparation expedition.",
      category: "Operations",
      readingTime: "5 min de lecture",
      imageAlt: "Illustration de planification de jalons pour fulfillment mondial",
      sections: [
        {
          heading: "Commencer par un chemin d'approbation",
          paragraphs: [
            "Les delais glissent quand produit, emballage et expedition vivent dans des conversations separees.",
            "Un pack unique aide achats, qualite et logistique a valider la meme version.",
          ],
          bullets: ["Confirmer marche et Incoterm tot", "Figer l'emballage avant production", "Nommer les responsables de jalons"],
        },
        {
          heading: "Traiter les documents comme la production",
          paragraphs: ["Checklists, packing lists et etiquettes font partie du systeme qui permet aux marchandises de partir a temps."],
        },
      ],
    },
    "what-procurement-teams-need-before-requesting-a-quote": {
      title: "Ce que les achats doivent preparer avant de demander un devis",
      summary: "Les cycles les plus rapides viennent de briefs clairs sur volume, marche et qualite.",
      category: "Achats",
      readingTime: "4 min de lecture",
      imageAlt: "Illustration d'un brief devis avec qualite et logistique",
      sections: [
        {
          heading: "Volume et marche d'abord",
          paragraphs: ["Un fournisseur peut mieux deviser lorsqu'il comprend le marche, la demande annuelle et l'emballage."],
          bullets: ["Volume annuel et lancement", "Marche destination et certification", "Emballage et marque privee"],
        },
        {
          heading: "Partager les contraintes importantes",
          paragraphs: ["Taille carton, regle palette ou checklist fournisseur evite des revisions si partagee au depart."],
        },
      ],
    },
    "using-faqs-to-improve-b2b-seo-and-conversion": {
      title: "Utiliser les FAQ pour ameliorer le SEO B2B et la qualite des demandes",
      summary:
        "Une bonne FAQ aide les moteurs a comprendre l'intention et les acheteurs a se qualifier avant contact.",
      category: "SEO",
      readingTime: "6 min de lecture",
      imageAlt: "Illustration de plan FAQ relie au SEO et aux demandes",
      sections: [
        {
          heading: "Repondre aux objections pratiques",
          paragraphs: ["Les meilleures FAQ repondent clairement au volume, delai, personnalisation et documents."],
        },
        {
          heading: "Rester specifique et scannable",
          paragraphs: ["Des reponses courtes aident la lecture, les donnees structurees et le relais commercial."],
          bullets: ["Une intention par question", "Ne pas repeter le hero", "Ajouter un CTA clair"],
        },
      ],
    },
  },
  ru: {
    "reduce-lead-times-cross-border-fulfillment": {
      title: "Как B2B команды сокращают трение сроков в международном фулфилменте",
      summary:
        "Практический обзор того, как сократить разрыв между внутренним утверждением, выпуском фабрики и подготовкой отгрузки.",
      category: "Операции",
      readingTime: "5 мин чтения",
      imageAlt: "Иллюстрация планирования этапов глобального фулфилмента",
      sections: [
        {
          heading: "Начните с одного пути утверждения",
          paragraphs: [
            "Сроки срываются, когда продукт, упаковка и отгрузка обсуждаются отдельно.",
            "Единый пакет помогает закупкам, качеству и логистике утверждать одну рабочую версию.",
          ],
          bullets: ["Рано подтвердить рынок и Incoterm", "Зафиксировать упаковку до производства", "Назначить владельцев этапов"],
        },
        {
          heading: "Считайте документы частью производства",
          paragraphs: ["Инспекционные листы, packing lists и этикетки определяют, сможет ли груз уйти вовремя."],
        },
      ],
    },
    "what-procurement-teams-need-before-requesting-a-quote": {
      title: "Что подготовить закупкам перед запросом цены",
      summary:
        "Самые быстрые расчеты приходят от покупателей, которые ясно описали объем, рынок и требования качества.",
      category: "Закупки",
      readingTime: "4 мин чтения",
      imageAlt: "Иллюстрация брифа на расчет с качеством и логистикой",
      sections: [
        {
          heading: "Сначала объем и рынок",
          paragraphs: ["Поставщик точнее рассчитывает, когда понимает рынок, годовой спрос и ожидания по упаковке."],
          bullets: ["Годовой объем и запуск", "Рынок и сертификация", "Упаковка и private label"],
        },
        {
          heading: "Расскажите важные ограничения заранее",
          paragraphs: ["Максимальный размер короба, правила паллет или onboarding checklist экономят итерации."],
        },
      ],
    },
    "using-faqs-to-improve-b2b-seo-and-conversion": {
      title: "Как FAQ улучшает B2B SEO и качество заявок",
      summary:
        "Хороший FAQ помогает поиску понять намерение, а покупателям - квалифицировать себя до контакта с продажами.",
      category: "SEO",
      readingTime: "6 мин чтения",
      imageAlt: "Иллюстрация планирования FAQ, связанного с SEO и заявками",
      sections: [
        {
          heading: "Отвечайте на практические возражения",
          paragraphs: ["Лучшие FAQ простым языком отвечают про объем, сроки, кастомизацию и документы."],
        },
        {
          heading: "Будьте конкретны и удобны для сканирования",
          paragraphs: ["Короткие ответы помогают чтению, структурированным данным и передаче в продажи."],
          bullets: ["Один вопрос - одно намерение", "Не повторять hero", "Завершить четким CTA"],
        },
      ],
    },
  },
  ar: {
    "reduce-lead-times-cross-border-fulfillment": {
      title: "كيف تقلل فرق B2B احتكاك مواعيد التسليم في التنفيذ عبر الحدود",
      summary:
        "نظرة عملية تساعد المستوردين على تقليل الفجوة بين الاعتماد الداخلي وإطلاق المصنع وجاهزية الشحن.",
      category: "العمليات",
      readingTime: "قراءة 5 دقائق",
      imageAlt: "رسم توضيحي لتخطيط مراحل التنفيذ العالمي",
      sections: [
        {
          heading: "ابدأ بمسار اعتماد واحد",
          paragraphs: [
            "تتأخر المواعيد عندما تعيش افتراضات المنتج والتغليف والشحن في محادثات منفصلة.",
            "توحيد القرارات في حزمة مراجعة واحدة يساعد الشراء والجودة واللوجستيات على اعتماد نفس النسخة.",
          ],
          bullets: ["تأكيد السوق و Incoterm مبكرا", "تثبيت نطاق التغليف قبل الإنتاج", "تحديد مسؤول لكل مرحلة"],
        },
        {
          heading: "عامل الوثائق كجزء من الإنتاج",
          paragraphs: ["قوائم الفحص وقوائم التعبئة وملفات الملصقات جزء من نظام خروج الشحنة في الوقت المناسب."],
        },
      ],
    },
    "what-procurement-teams-need-before-requesting-a-quote": {
      title: "ما الذي يجب أن تجهزه فرق الشراء قبل طلب عرض السعر",
      summary:
        "أسرع دورات التسعير تأتي من المشترين الذين يوضحون الحجم والسوق ومتطلبات الجودة في موجز واحد.",
      category: "المشتريات",
      readingTime: "قراءة 4 دقائق",
      imageAlt: "رسم توضيحي لموجز عرض سعر مع ملاحظات جودة ولوجستيات",
      sections: [
        {
          heading: "الحجم والسوق أولا",
          paragraphs: ["لا يمكن للمورد تقديم سعر موثوق إلا عندما يفهم السوق وشكل الطلب السنوي وتوقعات التغليف."],
          bullets: ["الحجم السنوي وموعد الإطلاق", "السوق المستهدف ونطاق الشهادات", "افتراضات التغليف والعلامة الخاصة"],
        },
        {
          heading: "شارك القيود المهمة مبكرا",
          paragraphs: ["أبعاد الكرتون أو قواعد الباليت أو قائمة إدخال المورد تقلل التعديلات إذا شاركت مبكرا."],
        },
      ],
    },
    "using-faqs-to-improve-b2b-seo-and-conversion": {
      title: "استخدام FAQ لتحسين B2B SEO وجودة الاستفسارات",
      summary:
        "FAQ الجيد يساعد محركات البحث على فهم النية ويساعد المشترين على التأهل ذاتيا قبل التواصل.",
      category: "SEO",
      readingTime: "قراءة 6 دقائق",
      imageAlt: "رسم توضيحي لتخطيط FAQ مرتبط بـ SEO والاستفسارات",
      sections: [
        {
          heading: "أجب عن الاعتراضات العملية",
          paragraphs: ["أفضل أقسام FAQ تجيب بوضوح عن الكمية ومدة التسليم والتخصيص والوثائق."],
        },
        {
          heading: "كن محددا وسهل المسح",
          paragraphs: ["الإجابات القصيرة تدعم القراءة والبيانات المنظمة وتحويل المعرفة إلى مبيعات."],
          bullets: ["نية واحدة لكل سؤال", "لا تكرر نص Hero", "اربط FAQ بدعوة CTA واضحة"],
        },
      ],
    },
  },
};

const productFaqByLocale: Partial<Record<Locale, FAQItem[]>> = {
  es: [
    {
      question: "Se puede adaptar para requisitos personalizados?",
      answer:
        "Si. La pagina esta preparada para revisar personalizacion, accesorios, empaque y documentos antes de la muestra.",
    },
    {
      question: "Pueden localizar empaque y documentos?",
      answer:
        "Si. Etiquetas, instrucciones, marcas de carton e iconos de cumplimiento pueden adaptarse al mercado destino.",
    },
  ],
  fr: [
    {
      question: "Peut-on l'adapter a des exigences personnalisees?",
      answer:
        "Oui. La page permet de revoir personnalisation, accessoires, emballage et documents avant echantillon.",
    },
    {
      question: "Pouvez-vous localiser emballage et documents?",
      answer:
        "Oui. Etiquettes, notices, marquages carton et pictogrammes peuvent etre adaptes au marche cible.",
    },
  ],
  ru: [
    {
      question: "Можно ли адаптировать под индивидуальные требования?",
      answer:
        "Да. Страница готова для обсуждения кастомизации, аксессуаров, упаковки и документов до образца.",
    },
    {
      question: "Можно локализовать упаковку и документы?",
      answer:
        "Да. Этикетки, инструкции, маркировка коробов и знаки соответствия адаптируются под целевой рынок.",
    },
  ],
  ar: [
    {
      question: "هل يمكن تكييفه لمتطلبات مخصصة؟",
      answer:
        "نعم. الصفحة جاهزة لمراجعة التخصيص والملحقات والتغليف والوثائق قبل العينة.",
    },
    {
      question: "هل يمكن توطين التغليف والوثائق؟",
      answer:
        "نعم. يمكن تكييف الملصقات والتعليمات وعلامات الكرتون وأيقونات الامتثال للسوق المستهدف.",
    },
  ],
};

export function getLocalizedCompanyStats(locale: Locale) {
  return companyStatsByLocale[locale] ?? companyStats;
}

export function getLocalizedHomeHighlights(locale: Locale) {
  return homeHighlightsByLocale[locale] ?? homeHighlights;
}

export function getLocalizedHomeFaq(locale: Locale, faqItems: MarketingFaqItem[]) {
  if (locale === "en") {
    return faqItems;
  }

  const localizedHomeFaq = homeFaqByLocale[locale];

  if (!localizedHomeFaq) {
    return faqItems;
  }

  const translationMap = new Map(
    homeFaq.map((item, index) => [item.question, localizedHomeFaq[index]]),
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

  const translation = companyTranslationsByLocale[locale];

  if (!translation) {
    return company;
  }

  return {
    ...company,
    ...translation,
    logoImageAlt:
      locale === "zh-CN"
        ? `${company.companyName} 品牌视觉`
        : locale === "ar"
          ? `هوية ${company.companyName} البصرية`
          : `${company.companyName} visual identity`,
  };
}

export function localizeProduct(
  locale: Locale,
  product: PublishedProduct,
): PublishedProduct {
  if (locale === "en") {
    return product;
  }

  const translation = productTranslationsByLocale[locale]?.[product.slug];

  if (!translation) {
    return product;
  }

  return {
    ...product,
    ...translation,
    sellingPoints: translation.sellingPoints ?? product.sellingPoints,
    specifications: translation.specifications ?? product.specifications,
    faq: translation.faq ?? productFaqByLocale[locale] ?? product.faq,
  };
}

export function localizeIndustry(
  locale: Locale,
  industry: PublishedIndustry,
): PublishedIndustry {
  if (locale === "en") {
    return industry;
  }

  const translation = industryTranslationsByLocale[locale]?.[industry.slug];

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

  const translation = blogTranslationsByLocale[locale]?.[post.slug];

  if (!translation) {
    if (locale === "zh-CN") {
      return {
        ...post,
        readingTime: post.readingTime.replace(/min read/i, "分钟阅读"),
      };
    }

    return {
      ...post,
      readingTime:
        locale === "es"
          ? post.readingTime.replace(/min read/i, "min de lectura")
          : locale === "fr"
            ? post.readingTime.replace(/min read/i, "min de lecture")
            : locale === "ru"
              ? post.readingTime.replace(/min read/i, "мин чтения")
              : locale === "ar"
                ? post.readingTime.replace(/(\d+)\s*min read/i, "قراءة $1 دقائق")
                : post.readingTime,
    };
  }

  return {
    ...post,
    ...translation,
    sections: translation.sections ?? post.sections,
  };
}
