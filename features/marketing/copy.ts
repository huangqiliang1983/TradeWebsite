import type { Locale } from "@/lib/i18n";

export type MarketingDictionary = {
  localeLabel: string;
  brandSubtitle: string;
  navigation: Array<{ label: string; href: string }>;
  languageSwitch: {
    label: string;
    english: string;
    chinese: string;
    spanish: string;
    russian: string;
    french: string;
    arabic: string;
  };
  cta: {
    requestQuote: string;
    contactUs: string;
    viewProducts: string;
    talkToSales: string;
    discussUseCase: string;
    backToBlog: string;
    whatsapp: string;
    email: string;
  };
  footer: {
    eyebrow: string;
    title: string;
    products: string;
    company: string;
    conversions: string;
    about: string;
    applications: string;
    insights: string;
    contact: string;
    thankYou: string;
    emailSales: string;
    copyright: string;
  };
  form: {
    quoteEyebrow: string;
    contactEyebrow: string;
    fullName: string;
    fullNamePlaceholder: string;
    businessEmail: string;
    businessEmailPlaceholder: string;
    company: string;
    companyPlaceholder: string;
    country: string;
    countryPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    productContext: string;
    generalInquiry: string;
    productContextHint: string;
    quoteMessageLabel: string;
    contactMessageLabel: string;
    quoteMessagePlaceholder: string;
    contactMessagePlaceholder: string;
    validationHint: string;
    defaultMessage: string;
    submitting: string;
    websiteTrap: string;
  };
  home: {
    heroTitle: string;
    whyEyebrow: string;
    whyTitle: string;
    whyDescription: string;
    productsEyebrow: string;
    productsTitle: string;
    productsDescription: string;
    industryEyebrow: string;
    industryTitle: string;
    industryDescription: string;
    industryLabel: string;
    insightsEyebrow: string;
    insightsTitle: string;
    insightsDescription: string;
    faqEyebrow: string;
    faqTitle: string;
    faqDescription: string;
    finalEyebrow: string;
    finalTitle: string;
    finalDescription: string;
    emptyProducts: string;
    emptyIndustries: string;
    emptyPosts: string;
    moq: string;
    leadTime: string;
    sku: string;
    viewProductTemplate: string;
  };
  about: {
    eyebrow: string;
    title: string;
    heroAsideTitle: string;
    whatEyebrow: string;
    whatTitle: string;
    whatDescription: string;
    introOne: string;
    projectEyebrow: string;
    projectTitle: string;
    projectDescription: string;
    stage: string;
    principlesEyebrow: string;
    principlesTitle: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    asideTitle: string;
    asideDescription: string;
    reachEyebrow: string;
    reachTitle: string;
    reachDescription: string;
    email: string;
    whatsapp: string;
    phone: string;
  };
  products: {
    eyebrow: string;
    title: string;
    description: string;
    asideTitle: string;
    asideDescription: string;
    layoutEyebrow: string;
    layoutTitle: string;
    sku: string;
    moq: string;
    leadTime: string;
    openDetail: string;
    empty: string;
  };
  productDetail: {
    description: string;
    sellingEyebrow: string;
    sellingTitle: string;
    facts: string;
    gallery: string;
    galleryDescription: string;
    video: string;
    videoDescription: string;
    downloads: string;
    downloadsDescription: string;
    parametersEyebrow: string;
    parametersTitle: string;
    emptySpecs: string;
    faqEyebrow: string;
    faqTitle: string;
    emptyFaq: string;
    browseText: string;
    browseLink: string;
    productNotFound: string;
    productNotFoundDescription: string;
  };
  industries: {
    eyebrow: string;
    title: string;
    description: string;
    asideTitle: string;
    asideDescription: string;
    listEyebrow: string;
    listTitle: string;
    open: string;
    empty: string;
  };
  industryDetail: {
    eyebrow: string;
    description: string;
    focusEyebrow: string;
    focusTitle: string;
    implementationEyebrow: string;
    implementationTitle: string;
    detailEyebrow: string;
    detailTitle: string;
    empty: string;
    notFound: string;
    notFoundDescription: string;
  };
  blog: {
    eyebrow: string;
    title: string;
    description: string;
    asideTitle: string;
    asideDescription: string;
    latestEyebrow: string;
    latestTitle: string;
    readArticle: string;
    empty: string;
  };
  blogDetail: {
    publishedLabel: string;
    updatedLabel: string;
    articleEyebrow: string;
    articleTitle: string;
    emptyArticle: string;
    nextEyebrow: string;
    nextTitle: string;
    nextDescription: string;
    relatedEyebrow: string;
    relatedTitle: string;
    emptyRelated: string;
    notFound: string;
    notFoundDescription: string;
  };
  thankYou: {
    eyebrow: string;
    title: string;
    description: string;
  };
};

const englishDictionary: MarketingDictionary = {
  localeLabel: "EN",
  brandSubtitle: "B2B Export Programs",
  navigation: [
    { label: "Products", href: "/products" },
    { label: "Industries", href: "/industries" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  languageSwitch: {
    label: "Switch language",
    english: "EN",
    chinese: "中文",
    spanish: "ES",
    russian: "RU",
    french: "FR",
    arabic: "AR",
  },
  cta: {
    requestQuote: "Request a Quote",
    contactUs: "Contact Us",
    viewProducts: "View Products",
    talkToSales: "Talk to Sales",
    discussUseCase: "Discuss Your Use Case",
    backToBlog: "Back to Blog",
    whatsapp: "WhatsApp",
    email: "Email",
  },
  footer: {
    eyebrow: "Ready for buyer review",
    title: "Clear product stories, stronger SEO signals, and direct inquiry paths.",
    products: "Products",
    company: "Company",
    conversions: "CTA",
    about: "About Us",
    applications: "Applications",
    insights: "Insights",
    contact: "Contact",
    thankYou: "Thank You",
    emailSales: "Email Sales",
    copyright: "Built for responsive B2B discovery and inquiry conversion.",
  },
  form: {
    quoteEyebrow: "Request a Quote",
    contactEyebrow: "Contact Form",
    fullName: "Full name",
    fullNamePlaceholder: "Your full name",
    businessEmail: "Business email",
    businessEmailPlaceholder: "name@company.com",
    company: "Company",
    companyPlaceholder: "Your company name",
    country: "Country",
    countryPlaceholder: "Target market or country",
    phone: "Phone",
    phonePlaceholder: "Phone or WhatsApp",
    productContext: "Product context",
    generalInquiry: "General inquiry",
    productContextHint: "Captured automatically to help the sales team follow up.",
    quoteMessageLabel: "Project requirements",
    contactMessageLabel: "Message",
    quoteMessagePlaceholder:
      "Tell us about product specs, quantity, certifications, target market, and timing.",
    contactMessagePlaceholder:
      "Tell us what you need help with, your timeline, and any relevant product or market details.",
    validationHint: "All validation also runs again on the server before anything is saved.",
    defaultMessage: "Required fields are validated on both the client and server.",
    submitting: "Submitting...",
    websiteTrap: "Website",
  },
  home: {
    heroTitle:
      "Industrial sourcing pages",
    whyEyebrow: "Why It Converts",
    whyTitle:
      "The homepage is organized to answer buyer questions in the order they usually appear.",
    whyDescription:
      "Credibility first, then product fit, then use-case context, then FAQ, then direct inquiry.",
    productsEyebrow: "Products",
    productsTitle:
      "Product list templates built for search visibility and technical scanning.",
    productsDescription:
      "Each template includes the core blocks buyers expect before they ask for a quotation.",
    industryEyebrow: "Applications",
    industryTitle:
      "Industry pages give search engines and buyers the use-case context they need.",
    industryDescription:
      "Instead of one vague overview, each application template explains challenges, outcomes, and process fit.",
    industryLabel: "Industry Application",
    insightsEyebrow: "Insights",
    insightsTitle:
      "Blog templates support long-tail SEO without breaking the site’s information hierarchy.",
    insightsDescription:
      "Each article page keeps the reading surface simple and gives buyers a clear next step.",
    faqEyebrow: "FAQ",
    faqTitle: "Answers for common sourcing questions",
    faqDescription:
      "The FAQ block is built for scanning, search context, and cleaner buyer handoff into sales.",
    finalEyebrow: "Final CTA",
    finalTitle: "Ready to turn traffic into qualified inquiries?",
    finalDescription:
      "Use the quote request route, direct contact page, WhatsApp, or email depending on how much detail the buyer already has.",
    emptyProducts:
      "Published products will appear here after they are marked as published in the admin area.",
    emptyIndustries: "Published industry pages will appear here after release.",
    emptyPosts:
      "Published blog posts will appear here once editorial content is released.",
    moq: "MOQ",
    leadTime: "Lead time",
    sku: "SKU",
    viewProductTemplate: "View product template",
  },
  about: {
    eyebrow: "About Us",
    title: "A B2B export website should sound as dependable as the operation behind it.",
    heroAsideTitle: "Operational trust",
    whatEyebrow: "What We Do",
    whatTitle: "We help buyers organize complex OEM conversations into reviewable decisions with",
    whatDescription:
      "The strongest B2B websites avoid vague claims. They explain how work gets done and what the buyer should expect next.",
    introOne:
      "is positioned as a partner for importers, distributors, and private label teams that need more than a product catalog. They need structure.",
    projectEyebrow: "How Projects Move",
    projectTitle:
      "A simple four-stage story keeps the page easy to scan on mobile, tablet, and desktop.",
    projectDescription: "Each stage is short enough for SEO and clear enough for real buyers.",
    stage: "Stage",
    principlesEyebrow: "Working Principles",
    principlesTitle: "The message stays practical because buyers remember specifics.",
  },
  contact: {
    eyebrow: "Contact Us",
    title: "Make the next step obvious for buyers who are ready to talk.",
    description:
      "The contact page keeps four clear CTA routes visible: Request a Quote, Contact Us, WhatsApp, and Email, while the form now validates, stores inquiry data, and captures source context.",
    asideTitle: "Inquiry flow",
    asideDescription:
      "This layout is optimized for readability on smaller screens while still giving desktop visitors a structured quote entry point.",
    reachEyebrow: "Reach Sales",
    reachTitle: "Use the channel that matches your buying stage.",
    reachDescription:
      "Some buyers want a formal quote brief. Others just need a quick confirmation before sharing specifications.",
    email: "Email",
    whatsapp: "WhatsApp",
    phone: "Phone",
  },
  products: {
    eyebrow: "Products",
    title: "A product list page should help buyers qualify fit before they contact sales.",
    description:
      "Each item below leads into a detail template with room for a hero image, selling points, parameters, FAQ, and conversion CTA.",
    asideTitle: "Product discovery",
    asideDescription:
      "The list page avoids clutter and keeps the path into product detail pages obvious across all screen sizes.",
    layoutEyebrow: "Catalog Layout",
    layoutTitle: "Short descriptions for scanning, deeper detail one click away.",
    sku: "SKU",
    moq: "MOQ",
    leadTime: "Lead time",
    openDetail: "Open product detail",
    empty:
      "No published products are available yet. Publish a product from the admin area to make it visible here.",
  },
  productDetail: {
    description:
      "The product detail template keeps technical value, specifications, FAQ content, and inquiry actions within one clean responsive flow.",
    sellingEyebrow: "Selling Points",
    sellingTitle: "What the buyer should understand before asking for a quotation",
    facts: "Quick Facts",
    gallery: "Gallery",
    galleryDescription:
      "Product media is optimized for mobile-first scanning with a single clear hero asset and room for future gallery expansion.",
    video: "Video",
    videoDescription:
      "Video demos stay optional so performance remains stable, while the layout is already prepared for future embeds.",
    downloads: "Downloads",
    downloadsDescription:
      "Datasheet and compliance downloads can be added later without breaking the small-screen layout.",
    parametersEyebrow: "Parameters",
    parametersTitle: "A specification area ready for technical review",
    emptySpecs:
      "Technical specifications will appear here after the product is updated with published parameter data.",
    faqEyebrow: "FAQ",
    faqTitle: "Questions often asked before sample approval",
    emptyFaq: "Published product FAQs will appear here when they are available.",
    browseText: "Looking for another product type? Browse the full",
    browseLink: "product template list",
    productNotFound: "Product Not Found",
    productNotFoundDescription: "The requested product page could not be found.",
  },
  industries: {
    eyebrow: "Industries",
    title: "Use-case pages help both search engines and buyers understand fit faster.",
    description:
      "Instead of repeating the same generic product copy, industry pages explain challenges, outcomes, and the workflow each buyer group actually cares about.",
    asideTitle: "Use-case storytelling",
    asideDescription:
      "This page type supports stronger long-tail SEO while keeping the conversion path direct and easy to scan.",
    listEyebrow: "Industry Templates",
    listTitle:
      "Each application page has room for challenges, outcomes, process detail, and CTA.",
    open: "Open application page",
    empty:
      "No published industry pages are available yet. Publish one in the admin area to make it visible here.",
  },
  industryDetail: {
    eyebrow: "Industry Application",
    description:
      "Industry pages are structured to connect operational concerns with a clear commercial next step.",
    focusEyebrow: "Application Focus",
    focusTitle: "What buyers usually need to solve first",
    implementationEyebrow: "Implementation",
    implementationTitle: "What a strong application page helps communicate",
    detailEyebrow: "Application Detail",
    detailTitle:
      "Long-form sections stay readable because they are structured data-first, not decoration-first.",
    empty: "Published industry detail sections will appear here after content is released.",
    notFound: "Industry Page Not Found",
    notFoundDescription: "The requested industry page could not be found.",
  },
  blog: {
    eyebrow: "Blog",
    title:
      "A clean blog structure supports long-tail traffic without distracting from conversion.",
    description:
      "The list page is intentionally editorial and restrained. It keeps category, reading time, summary, and the route into each article readable on every viewport.",
    asideTitle: "Article discovery",
    asideDescription:
      "The blog structure leaves room for search-focused article growth while staying aligned with the site’s B2B sales goals.",
    latestEyebrow: "Latest Articles",
    latestTitle: "Templates for insight content, FAQ support, and related reading.",
    readArticle: "Read article",
    empty:
      "No published blog posts are available yet. Release one in the admin area to make it visible here.",
  },
  blogDetail: {
    publishedLabel: "Published",
    updatedLabel: "Updated",
    articleEyebrow: "Article",
    articleTitle: "Readable content blocks with safe rendering by default",
    emptyArticle:
      "Published article sections will appear here once editorial content is released.",
    nextEyebrow: "Next Step",
    nextTitle: "Turn article traffic into buyer conversations.",
    nextDescription:
      "The blog detail template keeps the CTA visible without disrupting the reading experience.",
    relatedEyebrow: "Related",
    relatedTitle: "More content",
    emptyRelated: "More published articles will appear here as the blog grows.",
    notFound: "Article Not Found",
    notFoundDescription: "The requested article could not be found.",
  },
  thankYou: {
    eyebrow: "Thank You",
    title: "Your quote request path is ready for the next step.",
    description:
      "Your inquiry flow is now connected to the database and admin inbox, so this page can serve as a lightweight confirmation step after submission.",
  },
};

const chineseDictionary: MarketingDictionary = {
  localeLabel: "中文",
  brandSubtitle: "外贸官网与询盘转化",
  navigation: [
    { label: "产品中心", href: "/products" },
    { label: "行业应用", href: "/industries" },
    { label: "博客资讯", href: "/blog" },
    { label: "关于我们", href: "/about" },
    { label: "联系我们", href: "/contact" },
  ],
  languageSwitch: {
    label: "切换语言",
    english: "EN",
    chinese: "中文",
    spanish: "ES",
    russian: "RU",
    french: "FR",
    arabic: "AR",
  },
  cta: {
    requestQuote: "获取报价",
    contactUs: "联系我们",
    viewProducts: "查看产品",
    talkToSales: "联系销售",
    discussUseCase: "沟通应用场景",
    backToBlog: "返回博客",
    whatsapp: "WhatsApp",
    email: "邮箱",
  },
  footer: {
    eyebrow: "面向海外买家决策",
    title: "清晰的产品叙事、扎实的 SEO 基础，以及直接可转化的询盘入口。",
    products: "产品",
    company: "公司",
    conversions: "转化入口",
    about: "关于我们",
    applications: "行业应用",
    insights: "博客资讯",
    contact: "联系我们",
    thankYou: "感谢页",
    emailSales: "邮件联系销售",
    copyright: "面向 B2B 搜索获客与询盘转化而构建。",
  },
  form: {
    quoteEyebrow: "获取报价",
    contactEyebrow: "联系表单",
    fullName: "姓名",
    fullNamePlaceholder: "请输入您的姓名",
    businessEmail: "企业邮箱",
    businessEmailPlaceholder: "name@company.com",
    company: "公司名称",
    companyPlaceholder: "请输入公司名称",
    country: "国家/市场",
    countryPlaceholder: "目标国家或主要市场",
    phone: "电话 / WhatsApp",
    phonePlaceholder: "请输入联系电话",
    productContext: "产品上下文",
    generalInquiry: "通用咨询",
    productContextHint: "系统会自动记录来源，方便销售团队后续跟进。",
    quoteMessageLabel: "需求说明",
    contactMessageLabel: "留言内容",
    quoteMessagePlaceholder: "请描述产品规格、数量、认证要求、目标市场与交付时间。",
    contactMessagePlaceholder: "请告诉我们您的需求、项目时间节点，以及相关产品或市场信息。",
    validationHint: "所有字段在前端校验后，服务端还会再次校验再入库。",
    defaultMessage: "必填字段会在前端和服务端同时校验。",
    submitting: "提交中...",
    websiteTrap: "网站",
  },
  home: {
    heroTitle: "面向工业与外贸采购的官网页面，要读得清楚、搜得到、也能带来有效询盘。",
    whyEyebrow: "为什么更容易转化",
    whyTitle: "首页按买家真实决策顺序组织内容，而不是只堆一层品牌话术。",
    whyDescription: "先建立可信度，再说明产品匹配，再补行业场景、FAQ 和明确 CTA。",
    productsEyebrow: "产品",
    productsTitle: "产品列表模板兼顾搜索抓取、技术浏览与询盘引导。",
    productsDescription: "每个模板都保留了买家在发起询盘前最关心的核心信息区块。",
    industryEyebrow: "行业应用",
    industryTitle: "行业页面帮助搜索引擎和买家更快理解你的产品适配场景。",
    industryDescription: "不是泛泛而谈，而是围绕挑战、结果和流程适配来建立场景内容。",
    industryLabel: "行业方案",
    insightsEyebrow: "博客资讯",
    insightsTitle: "博客模板支持长尾 SEO，同时不破坏整站的信息层级。",
    insightsDescription: "文章页保持阅读面干净，也让买家始终能找到下一步 CTA。",
    faqEyebrow: "常见问题",
    faqTitle: "回答采购前最常被问到的问题",
    faqDescription: "FAQ 区块同时服务于可读性、搜索理解和更顺畅的销售承接。",
    finalEyebrow: "最终 CTA",
    finalTitle: "准备把自然流量转成更高质量的询盘了吗？",
    finalDescription: "可以直接获取报价、进入联系页，或通过 WhatsApp、邮箱快速沟通。",
    emptyProducts: "后台发布产品后，这里会自动展示已发布产品。",
    emptyIndustries: "后台发布行业页面后，这里会自动展示已发布内容。",
    emptyPosts: "后台发布博客文章后，这里会自动展示已发布文章。",
    moq: "起订量",
    leadTime: "交期",
    sku: "SKU",
    viewProductTemplate: "查看产品详情模板",
  },
  about: {
    eyebrow: "关于我们",
    title: "一家 B2B 外贸官网，应该和它背后的交付能力一样让人放心。",
    heroAsideTitle: "可信的运营呈现",
    whatEyebrow: "我们在做什么",
    whatTitle: "我们帮助买家把复杂的 OEM 沟通，整理成可评估、可推进的决策内容，依托",
    whatDescription: "优秀的 B2B 官网不会堆空泛形容词，而是清楚说明项目如何推进、下一步是什么。",
    introOne: "为进口商、分销商和自有品牌团队提供的不只是产品目录，而是一套可执行的合作结构。",
    projectEyebrow: "项目如何推进",
    projectTitle: "用四个清晰阶段讲清流程，让手机、平板、电脑三端都易读。",
    projectDescription: "每个阶段都足够简洁，既利于 SEO，也方便真实买家快速理解。",
    stage: "阶段",
    principlesEyebrow: "合作原则",
    principlesTitle: "表达保持务实，因为买家记住的永远是具体而不是空话。",
  },
  contact: {
    eyebrow: "联系我们",
    title: "让已经准备沟通的买家，一眼就知道下一步该做什么。",
    description: "联系页保留四个清晰 CTA：获取报价、联系我们、WhatsApp、邮箱，同时表单会完成校验、入库，并记录来源上下文。",
    asideTitle: "询盘流转",
    asideDescription: "这个布局优先保证小屏可填写性，同时也让桌面端保留清晰的报价入口。",
    reachEyebrow: "联系销售",
    reachTitle: "按你当前采购阶段，选择最合适的联系渠道。",
    reachDescription: "有的买家想先拿正式报价，有的只需要先确认可行性再发规格。",
    email: "邮箱",
    whatsapp: "WhatsApp",
    phone: "电话",
  },
  products: {
    eyebrow: "产品中心",
    title: "产品列表页的任务，是让买家在联系销售前先判断是否匹配。",
    description: "下面每个条目都能进入详情模板，预留主图、卖点、参数、FAQ 和转化 CTA。",
    asideTitle: "产品浏览",
    asideDescription: "列表页尽量保持简洁，让不同屏幕下进入产品详情的路径都足够直观。",
    layoutEyebrow: "列表结构",
    layoutTitle: "先看摘要快速筛选，需要更深信息时再进入详情。",
    sku: "SKU",
    moq: "起订量",
    leadTime: "交期",
    openDetail: "打开产品详情",
    empty: "目前还没有已发布产品。请先在后台发布产品，这里才会展示。",
  },
  productDetail: {
    description: "产品详情模板把技术价值、参数、FAQ 和询盘入口放进同一条清晰的响应式阅读路径里。",
    sellingEyebrow: "核心卖点",
    sellingTitle: "买家在发起询盘前，应该先读懂哪些关键点",
    facts: "快速信息",
    gallery: "图集",
    galleryDescription: "产品媒体优先保证移动端浏览效率，当前先用一个明确主视觉，并预留未来图集扩展。",
    video: "视频",
    videoDescription: "演示视频保持可选，优先不影响性能，同时布局已经为后续嵌入预留空间。",
    downloads: "下载资料",
    downloadsDescription: "后续可补充规格书和合规资料下载，不会破坏小屏下的阅读布局。",
    parametersEyebrow: "参数信息",
    parametersTitle: "为技术评估预留的一块清晰参数区",
    emptySpecs: "产品发布参数后，这里会自动展示技术规格。",
    faqEyebrow: "常见问题",
    faqTitle: "打样或评估前最常被问到的问题",
    emptyFaq: "该产品发布 FAQ 后，这里会自动展示。",
    browseText: "如果你还想比较其他产品，可以查看完整的",
    browseLink: "产品列表",
    productNotFound: "未找到产品页面",
    productNotFoundDescription: "你访问的产品页面不存在或暂未发布。",
  },
  industries: {
    eyebrow: "行业应用",
    title: "应用场景页能让搜索引擎和买家更快理解产品是否适合自己的业务。",
    description: "比起重复一套泛化产品文案，行业页面更适合解释痛点、结果和实际流程。",
    asideTitle: "场景化表达",
    asideDescription: "这种页面更利于长尾 SEO，同时继续保持清晰直接的转化路径。",
    listEyebrow: "行业模板",
    listTitle: "每个行业页都预留挑战、结果、过程说明和 CTA 区域。",
    open: "打开行业页面",
    empty: "目前还没有已发布行业页面。请先在后台发布，这里才会展示。",
  },
  industryDetail: {
    eyebrow: "行业应用",
    description: "行业详情页的结构，重点是把运营问题和商业下一步连接起来，而不是堆视觉装饰。",
    focusEyebrow: "应用重点",
    focusTitle: "买家通常最先要解决什么问题",
    implementationEyebrow: "落地方式",
    implementationTitle: "一个好的行业页，应该帮助买家快速理解什么",
    detailEyebrow: "场景详情",
    detailTitle: "长内容依然易读，因为页面是先按信息结构组织，而不是先按装饰组织。",
    empty: "行业详情内容发布后，这里会自动展示。",
    notFound: "未找到行业页面",
    notFoundDescription: "你访问的行业页面不存在或暂未发布。",
  },
  blog: {
    eyebrow: "博客资讯",
    title: "干净克制的博客结构，可以承接长尾搜索流量，又不会打断转化路径。",
    description: "列表页刻意保持编辑风格，只保留分类、阅读时间、摘要和进入文章的清晰路径。",
    asideTitle: "文章发现",
    asideDescription: "博客结构为搜索增长预留空间，同时继续对齐整站的 B2B 销售目标。",
    latestEyebrow: "最新文章",
    latestTitle: "用于内容沉淀、FAQ 支撑和相关文章推荐的文章模板。",
    readArticle: "阅读文章",
    empty: "目前还没有已发布文章。请先在后台发布，这里才会展示。",
  },
  blogDetail: {
    publishedLabel: "发布时间",
    updatedLabel: "更新时间",
    articleEyebrow: "正文",
    articleTitle: "默认安全渲染、可长读的文章结构",
    emptyArticle: "文章内容发布后，这里会自动展示。",
    nextEyebrow: "下一步",
    nextTitle: "把文章流量继续引导成买家对话。",
    nextDescription: "文章详情页保留 CTA 可见，但不会打断阅读体验。",
    relatedEyebrow: "相关文章",
    relatedTitle: "更多内容",
    emptyRelated: "随着博客持续发布，这里会展示更多相关文章。",
    notFound: "未找到文章",
    notFoundDescription: "你访问的文章不存在或暂未发布。",
  },
  thankYou: {
    eyebrow: "感谢提交",
    title: "你的询盘已经进入下一步处理流程。",
    description: "表单提交后，数据会进入数据库和后台询盘列表，这个页面可以作为轻量确认页继续承接用户。",
  },
};

const spanishDictionary: MarketingDictionary = {
  localeLabel: "ES",
  brandSubtitle: "Programas B2B de exportacion",
  navigation: [
    { label: "Productos", href: "/products" },
    { label: "Industrias", href: "/industries" },
    { label: "Blog", href: "/blog" },
    { label: "Nosotros", href: "/about" },
    { label: "Contacto", href: "/contact" },
  ],
  languageSwitch: {
    label: "Cambiar idioma",
    english: "EN",
    chinese: "中文",
    spanish: "ES",
    russian: "RU",
    french: "FR",
    arabic: "AR",
  },
  cta: {
    requestQuote: "Solicitar cotizacion",
    contactUs: "Contactenos",
    viewProducts: "Ver productos",
    talkToSales: "Hablar con ventas",
    discussUseCase: "Comentar su caso de uso",
    backToBlog: "Volver al blog",
    whatsapp: "WhatsApp",
    email: "Email",
  },
  footer: {
    eyebrow: "Listo para revision del comprador",
    title: "Historias de producto claras, mejores senales SEO y rutas directas a la consulta.",
    products: "Productos",
    company: "Empresa",
    conversions: "CTA",
    about: "Nosotros",
    applications: "Aplicaciones",
    insights: "Ideas",
    contact: "Contacto",
    thankYou: "Gracias",
    emailSales: "Enviar email a ventas",
    copyright: "Creado para descubrimiento B2B responsive y conversion de consultas.",
  },
  form: {
    quoteEyebrow: "Solicitar cotizacion",
    contactEyebrow: "Formulario de contacto",
    fullName: "Nombre completo",
    fullNamePlaceholder: "Su nombre completo",
    businessEmail: "Email corporativo",
    businessEmailPlaceholder: "nombre@empresa.com",
    company: "Empresa",
    companyPlaceholder: "Nombre de su empresa",
    country: "Pais",
    countryPlaceholder: "Mercado o pais objetivo",
    phone: "Telefono",
    phonePlaceholder: "Telefono o WhatsApp",
    productContext: "Contexto del producto",
    generalInquiry: "Consulta general",
    productContextHint: "Se captura automaticamente para ayudar al equipo comercial.",
    quoteMessageLabel: "Requisitos del proyecto",
    contactMessageLabel: "Mensaje",
    quoteMessagePlaceholder: "Indiquenos especificaciones, cantidad, certificaciones, mercado objetivo y plazos.",
    contactMessagePlaceholder: "Cuente que necesita, su calendario y cualquier detalle de producto o mercado.",
    validationHint: "La validacion tambien se ejecuta en el servidor antes de guardar.",
    defaultMessage: "Los campos obligatorios se validan en cliente y servidor.",
    submitting: "Enviando...",
    websiteTrap: "Sitio web",
  },
  home: {
    heroTitle: "Paginas de abastecimiento industrial que se leen claro, posicionan limpio y convierten compradores cualificados.",
    whyEyebrow: "Por que convierte",
    whyTitle: "La pagina de inicio responde las preguntas del comprador en el orden real de decision.",
    whyDescription: "Primero credibilidad, luego ajuste de producto, contexto de uso, FAQ y consulta directa.",
    productsEyebrow: "Productos",
    productsTitle: "Plantillas de lista de productos pensadas para SEO y lectura tecnica.",
    productsDescription: "Cada plantilla incluye los bloques que un comprador espera antes de pedir una cotizacion.",
    industryEyebrow: "Aplicaciones",
    industryTitle: "Las paginas de industria dan a buscadores y compradores el contexto de uso necesario.",
    industryDescription: "Cada plantilla explica retos, resultados y encaje operativo en vez de una vision generica.",
    industryLabel: "Aplicacion industrial",
    insightsEyebrow: "Ideas",
    insightsTitle: "Las plantillas de blog apoyan SEO long-tail sin romper la jerarquia del sitio.",
    insightsDescription: "Cada articulo mantiene lectura limpia y ofrece un siguiente paso claro.",
    faqEyebrow: "FAQ",
    faqTitle: "Respuestas a preguntas frecuentes de abastecimiento",
    faqDescription: "El bloque FAQ mejora lectura, contexto de busqueda y traspaso a ventas.",
    finalEyebrow: "CTA final",
    finalTitle: "Listo para convertir trafico en consultas cualificadas?",
    finalDescription: "Use solicitud de cotizacion, contacto, WhatsApp o email segun el detalle del comprador.",
    emptyProducts: "Los productos publicados apareceran aqui despues de publicarse en el admin.",
    emptyIndustries: "Las paginas de industria publicadas apareceran aqui despues de su publicacion.",
    emptyPosts: "Los articulos publicados apareceran aqui cuando se libere contenido editorial.",
    moq: "MOQ",
    leadTime: "Plazo",
    sku: "SKU",
    viewProductTemplate: "Ver plantilla de producto",
  },
  about: {
    eyebrow: "Nosotros",
    title: "Un sitio B2B de exportacion debe sonar tan confiable como la operacion que lo respalda.",
    heroAsideTitle: "Confianza operativa",
    whatEyebrow: "Que hacemos",
    whatTitle: "Ayudamos a compradores a convertir conversaciones OEM complejas en decisiones revisables con",
    whatDescription: "Los mejores sitios B2B evitan promesas vagas y explican como avanza el trabajo.",
    introOne: "se posiciona como socio para importadores, distribuidores y marcas privadas que necesitan estructura.",
    projectEyebrow: "Como avanza un proyecto",
    projectTitle: "Una historia de cuatro etapas mantiene la pagina clara en movil, tablet y escritorio.",
    projectDescription: "Cada etapa es breve para SEO y clara para compradores reales.",
    stage: "Etapa",
    principlesEyebrow: "Principios de trabajo",
    principlesTitle: "El mensaje sigue siendo practico porque los compradores recuerdan lo especifico.",
  },
  contact: {
    eyebrow: "Contacto",
    title: "Haga obvio el siguiente paso para compradores listos para hablar.",
    description: "La pagina mantiene cuatro CTA claros: cotizacion, contacto, WhatsApp y email, con validacion, base de datos y contexto de origen.",
    asideTitle: "Flujo de consulta",
    asideDescription: "Optimizado para lectura en pantallas pequenas y con entrada de cotizacion estructurada en escritorio.",
    reachEyebrow: "Contactar ventas",
    reachTitle: "Use el canal que coincida con su etapa de compra.",
    reachDescription: "Algunos compradores quieren una cotizacion formal; otros solo una confirmacion rapida.",
    email: "Email",
    whatsapp: "WhatsApp",
    phone: "Telefono",
  },
  products: {
    eyebrow: "Productos",
    title: "Una lista de productos debe ayudar al comprador a calificar el encaje antes de contactar ventas.",
    description: "Cada item lleva a una plantilla con imagen principal, ventajas, parametros, FAQ y CTA.",
    asideTitle: "Descubrimiento de productos",
    asideDescription: "La lista evita ruido y mantiene claro el camino hacia el detalle en todos los tamanos.",
    layoutEyebrow: "Diseno de catalogo",
    layoutTitle: "Descripciones breves para escanear y mas detalle a un clic.",
    sku: "SKU",
    moq: "MOQ",
    leadTime: "Plazo",
    openDetail: "Abrir detalle",
    empty: "Aun no hay productos publicados. Publique uno en el admin para hacerlo visible.",
  },
  productDetail: {
    description: "La plantilla de detalle une valor tecnico, especificaciones, FAQ y consulta en un flujo responsive.",
    sellingEyebrow: "Ventajas",
    sellingTitle: "Lo que el comprador debe entender antes de solicitar cotizacion",
    facts: "Datos rapidos",
    gallery: "Galeria",
    galleryDescription: "Medios optimizados para escaneo mobile-first con un asset principal claro.",
    video: "Video",
    videoDescription: "Los demos de video son opcionales para mantener rendimiento estable.",
    downloads: "Descargas",
    downloadsDescription: "Fichas tecnicas y documentos de cumplimiento pueden agregarse despues.",
    parametersEyebrow: "Parametros",
    parametersTitle: "Area de especificaciones lista para revision tecnica",
    emptySpecs: "Las especificaciones apareceran cuando el producto tenga parametros publicados.",
    faqEyebrow: "FAQ",
    faqTitle: "Preguntas frecuentes antes de aprobar muestras",
    emptyFaq: "Las FAQ publicadas del producto apareceran aqui.",
    browseText: "Busca otro tipo de producto? Consulte la",
    browseLink: "lista de productos",
    productNotFound: "Producto no encontrado",
    productNotFoundDescription: "No se encontro la pagina de producto solicitada.",
  },
  industries: {
    eyebrow: "Industrias",
    title: "Las paginas de uso ayudan a buscadores y compradores a entender el encaje mas rapido.",
    description: "Explican retos, resultados y flujo real de cada grupo comprador.",
    asideTitle: "Historia por caso de uso",
    asideDescription: "Apoyan SEO long-tail manteniendo la ruta de conversion directa.",
    listEyebrow: "Plantillas de industria",
    listTitle: "Cada pagina tiene espacio para retos, resultados, proceso y CTA.",
    open: "Abrir aplicacion",
    empty: "Aun no hay paginas de industria publicadas.",
  },
  industryDetail: {
    eyebrow: "Aplicacion industrial",
    description: "Las paginas de industria conectan preocupaciones operativas con un siguiente paso comercial.",
    focusEyebrow: "Foco de aplicacion",
    focusTitle: "Lo que los compradores suelen resolver primero",
    implementationEyebrow: "Implementacion",
    implementationTitle: "Lo que una buena pagina de aplicacion comunica",
    detailEyebrow: "Detalle de aplicacion",
    detailTitle: "Las secciones largas siguen siendo legibles por su estructura de datos.",
    empty: "Los detalles publicados de industria apareceran aqui.",
    notFound: "Pagina de industria no encontrada",
    notFoundDescription: "No se encontro la pagina de industria solicitada.",
  },
  blog: {
    eyebrow: "Blog",
    title: "Una estructura limpia de blog apoya trafico long-tail sin distraer de la conversion.",
    description: "La lista mantiene categoria, tiempo de lectura, resumen y ruta clara al articulo.",
    asideTitle: "Descubrimiento editorial",
    asideDescription: "La estructura deja espacio para crecer en busqueda y sigue alineada con ventas B2B.",
    latestEyebrow: "Ultimos articulos",
    latestTitle: "Plantillas para contenido, FAQ y lectura relacionada.",
    readArticle: "Leer articulo",
    empty: "Aun no hay articulos publicados.",
  },
  blogDetail: {
    publishedLabel: "Publicado",
    updatedLabel: "Actualizado",
    articleEyebrow: "Articulo",
    articleTitle: "Bloques legibles con renderizado seguro por defecto",
    emptyArticle: "Las secciones del articulo apareceran cuando se publiquen.",
    nextEyebrow: "Siguiente paso",
    nextTitle: "Convierta el trafico editorial en conversaciones con compradores.",
    nextDescription: "La plantilla mantiene el CTA visible sin interrumpir la lectura.",
    relatedEyebrow: "Relacionado",
    relatedTitle: "Mas contenido",
    emptyRelated: "Apareceran mas articulos publicados a medida que crezca el blog.",
    notFound: "Articulo no encontrado",
    notFoundDescription: "No se encontro el articulo solicitado.",
  },
  thankYou: {
    eyebrow: "Gracias",
    title: "Su solicitud esta lista para el siguiente paso.",
    description: "El flujo de consulta esta conectado con la base de datos y la bandeja del admin.",
  },
};

const frenchDictionary: MarketingDictionary = {
  ...spanishDictionary,
  localeLabel: "FR",
  brandSubtitle: "Programmes export B2B",
  navigation: [
    { label: "Produits", href: "/products" },
    { label: "Secteurs", href: "/industries" },
    { label: "Blog", href: "/blog" },
    { label: "A propos", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  languageSwitch: { ...spanishDictionary.languageSwitch, label: "Changer de langue" },
  cta: {
    requestQuote: "Demander un devis",
    contactUs: "Nous contacter",
    viewProducts: "Voir les produits",
    talkToSales: "Parler aux ventes",
    discussUseCase: "Discuter de votre cas",
    backToBlog: "Retour au blog",
    whatsapp: "WhatsApp",
    email: "Email",
  },
  footer: {
    eyebrow: "Pret pour l'examen acheteur",
    title: "Des messages produit clairs, de meilleurs signaux SEO et des chemins directs vers la demande.",
    products: "Produits",
    company: "Entreprise",
    conversions: "CTA",
    about: "A propos",
    applications: "Applications",
    insights: "Articles",
    contact: "Contact",
    thankYou: "Merci",
    emailSales: "Email ventes",
    copyright: "Concu pour la decouverte B2B responsive et la conversion de demandes.",
  },
  form: {
    quoteEyebrow: "Demander un devis",
    contactEyebrow: "Formulaire de contact",
    fullName: "Nom complet",
    fullNamePlaceholder: "Votre nom complet",
    businessEmail: "Email professionnel",
    businessEmailPlaceholder: "nom@entreprise.com",
    company: "Entreprise",
    companyPlaceholder: "Nom de votre entreprise",
    country: "Pays",
    countryPlaceholder: "Marche ou pays cible",
    phone: "Telephone",
    phonePlaceholder: "Telephone ou WhatsApp",
    productContext: "Contexte produit",
    generalInquiry: "Demande generale",
    productContextHint: "Capture automatiquement pour aider l'equipe commerciale.",
    quoteMessageLabel: "Exigences du projet",
    contactMessageLabel: "Message",
    quoteMessagePlaceholder: "Indiquez specifications, quantite, certifications, marche cible et calendrier.",
    contactMessagePlaceholder: "Expliquez votre besoin, votre calendrier et les details produit ou marche.",
    validationHint: "La validation est aussi executee cote serveur avant enregistrement.",
    defaultMessage: "Les champs obligatoires sont valides cote client et serveur.",
    submitting: "Envoi...",
    websiteTrap: "Site web",
  },
  home: {
    heroTitle: "Des pages d'approvisionnement industriel lisibles, bien referencees et capables de convertir des acheteurs qualifies.",
    whyEyebrow: "Pourquoi cela convertit",
    whyTitle: "La page d'accueil repond aux questions acheteur dans l'ordre naturel de decision.",
    whyDescription: "Credibilite, adequation produit, contexte d'usage, FAQ puis demande directe.",
    productsEyebrow: "Produits",
    productsTitle: "Des listes produit concues pour la visibilite SEO et la lecture technique.",
    productsDescription: "Chaque modele inclut les blocs attendus avant une demande de devis.",
    industryEyebrow: "Applications",
    industryTitle: "Les pages secteur donnent aux moteurs et aux acheteurs le contexte d'usage utile.",
    industryDescription: "Chaque modele explique les defis, les resultats et l'adaptation au processus.",
    industryLabel: "Application secteur",
    insightsEyebrow: "Articles",
    insightsTitle: "Les modeles de blog soutiennent le SEO longue traine sans casser la hierarchie.",
    insightsDescription: "Chaque article reste lisible et propose une prochaine etape claire.",
    faqEyebrow: "FAQ",
    faqTitle: "Reponses aux questions courantes d'approvisionnement",
    faqDescription: "Le bloc FAQ facilite la lecture, le contexte de recherche et le relais commercial.",
    finalEyebrow: "CTA final",
    finalTitle: "Pret a transformer le trafic en demandes qualifiees ?",
    finalDescription: "Utilisez le devis, le contact, WhatsApp ou l'email selon le niveau de detail.",
    emptyProducts: "Les produits publies apparaitront ici apres publication dans l'administration.",
    emptyIndustries: "Les pages secteur publiees apparaitront ici apres leur mise en ligne.",
    emptyPosts: "Les articles publies apparaitront ici lorsque le contenu editorial sera publie.",
    moq: "MOQ",
    leadTime: "Delai",
    sku: "SKU",
    viewProductTemplate: "Voir le modele produit",
  },
  about: {
    eyebrow: "A propos",
    title: "Un site export B2B doit inspirer autant de confiance que l'operation qui le soutient.",
    heroAsideTitle: "Confiance operationnelle",
    whatEyebrow: "Ce que nous faisons",
    whatTitle: "Nous aidons les acheteurs a transformer les discussions OEM complexes en decisions exploitables avec",
    whatDescription: "Les bons sites B2B expliquent comment le travail avance et quelle est la prochaine etape.",
    introOne: "se positionne comme partenaire pour importateurs, distributeurs et marques privees qui ont besoin de structure.",
    projectEyebrow: "Deroulement des projets",
    projectTitle: "Une histoire en quatre etapes reste claire sur mobile, tablette et ordinateur.",
    projectDescription: "Chaque etape est assez courte pour le SEO et assez claire pour les acheteurs.",
    stage: "Etape",
    principlesEyebrow: "Principes de travail",
    principlesTitle: "Le message reste concret car les acheteurs retiennent les details.",
  },
  contact: {
    eyebrow: "Contact",
    title: "Rendre la prochaine etape evidente pour les acheteurs prets a echanger.",
    description: "La page garde quatre CTA clairs : devis, contact, WhatsApp et email, avec validation et suivi de source.",
    asideTitle: "Flux de demande",
    asideDescription: "Optimise pour les petits ecrans tout en offrant un point d'entree devis structure sur ordinateur.",
    reachEyebrow: "Contacter les ventes",
    reachTitle: "Choisissez le canal adapte a votre etape d'achat.",
    reachDescription: "Certains acheteurs veulent un devis formel, d'autres une confirmation rapide.",
    email: "Email",
    whatsapp: "WhatsApp",
    phone: "Telephone",
  },
  products: {
    eyebrow: "Produits",
    title: "Une liste produit doit aider l'acheteur a qualifier l'adaptation avant de contacter les ventes.",
    description: "Chaque element mene a une page detail avec image, arguments, parametres, FAQ et CTA.",
    asideTitle: "Decouverte produit",
    asideDescription: "La liste reste claire et garde le chemin vers le detail evident sur chaque ecran.",
    layoutEyebrow: "Structure catalogue",
    layoutTitle: "Descriptions courtes pour scanner, detail plus profond en un clic.",
    sku: "SKU",
    moq: "MOQ",
    leadTime: "Delai",
    openDetail: "Ouvrir le detail",
    empty: "Aucun produit publie pour le moment. Publiez un produit dans l'administration.",
  },
  productDetail: {
    description: "La page detail combine valeur technique, specifications, FAQ et demande dans un flux responsive.",
    sellingEyebrow: "Arguments cles",
    sellingTitle: "Ce que l'acheteur doit comprendre avant de demander un devis",
    facts: "Infos rapides",
    gallery: "Galerie",
    galleryDescription: "Les medias sont optimises pour le mobile avec un visuel principal clair.",
    video: "Video",
    videoDescription: "Les demos video restent optionnelles pour conserver la performance.",
    downloads: "Telechargements",
    downloadsDescription: "Les fiches techniques et documents de conformite pourront etre ajoutes ensuite.",
    parametersEyebrow: "Parametres",
    parametersTitle: "Zone de specifications prete pour l'examen technique",
    emptySpecs: "Les specifications apparaitront apres publication des parametres produit.",
    faqEyebrow: "FAQ",
    faqTitle: "Questions frequentes avant validation d'echantillon",
    emptyFaq: "Les FAQ publiees du produit apparaitront ici.",
    browseText: "Vous cherchez un autre type de produit ? Consultez la",
    browseLink: "liste des produits",
    productNotFound: "Produit introuvable",
    productNotFoundDescription: "La page produit demandee est introuvable.",
  },
  industries: {
    eyebrow: "Secteurs",
    title: "Les pages de cas d'usage aident les moteurs et les acheteurs a comprendre plus vite l'adaptation.",
    description: "Elles expliquent les defis, les resultats et le flux reel de chaque groupe acheteur.",
    asideTitle: "Recit par cas d'usage",
    asideDescription: "Ces pages soutiennent le SEO longue traine tout en gardant un chemin de conversion direct.",
    listEyebrow: "Modeles secteur",
    listTitle: "Chaque page contient defis, resultats, processus et CTA.",
    open: "Ouvrir l'application",
    empty: "Aucune page secteur publiee pour le moment.",
  },
  industryDetail: {
    eyebrow: "Application secteur",
    description: "Les pages secteur relient les enjeux operationnels a une prochaine etape commerciale.",
    focusEyebrow: "Focus application",
    focusTitle: "Ce que les acheteurs doivent resoudre en premier",
    implementationEyebrow: "Mise en oeuvre",
    implementationTitle: "Ce qu'une bonne page application communique",
    detailEyebrow: "Detail application",
    detailTitle: "Les longues sections restent lisibles grace a une structure data-first.",
    empty: "Les details secteur publies apparaitront ici.",
    notFound: "Page secteur introuvable",
    notFoundDescription: "La page secteur demandee est introuvable.",
  },
  blog: {
    eyebrow: "Blog",
    title: "Une structure de blog claire soutient le trafic longue traine sans distraire de la conversion.",
    description: "La liste garde categorie, temps de lecture, resume et route claire vers chaque article.",
    asideTitle: "Decouverte d'articles",
    asideDescription: "La structure permet la croissance SEO tout en restant alignee avec les ventes B2B.",
    latestEyebrow: "Derniers articles",
    latestTitle: "Modeles pour contenus, FAQ et lectures associees.",
    readArticle: "Lire l'article",
    empty: "Aucun article publie pour le moment.",
  },
  blogDetail: {
    publishedLabel: "Publie",
    updatedLabel: "Mis a jour",
    articleEyebrow: "Article",
    articleTitle: "Blocs lisibles avec rendu securise par defaut",
    emptyArticle: "Les sections de l'article apparaitront apres publication.",
    nextEyebrow: "Prochaine etape",
    nextTitle: "Transformez le trafic editorial en conversations acheteur.",
    nextDescription: "Le modele garde le CTA visible sans interrompre la lecture.",
    relatedEyebrow: "Associe",
    relatedTitle: "Plus de contenu",
    emptyRelated: "D'autres articles publies apparaitront avec la croissance du blog.",
    notFound: "Article introuvable",
    notFoundDescription: "L'article demande est introuvable.",
  },
  thankYou: {
    eyebrow: "Merci",
    title: "Votre demande est prete pour la prochaine etape.",
    description: "Le flux de demande est connecte a la base de donnees et a la boite admin.",
  },
};

const russianDictionary: MarketingDictionary = {
  ...spanishDictionary,
  localeLabel: "RU",
  brandSubtitle: "B2B экспортные программы",
  navigation: [
    { label: "Продукты", href: "/products" },
    { label: "Отрасли", href: "/industries" },
    { label: "Блог", href: "/blog" },
    { label: "О нас", href: "/about" },
    { label: "Контакты", href: "/contact" },
  ],
  languageSwitch: { ...spanishDictionary.languageSwitch, label: "Выбрать язык" },
  cta: {
    requestQuote: "Запросить предложение",
    contactUs: "Связаться",
    viewProducts: "Смотреть продукты",
    talkToSales: "Связаться с отделом продаж",
    discussUseCase: "Обсудить задачу",
    backToBlog: "Назад к блогу",
    whatsapp: "WhatsApp",
    email: "Email",
  },
  footer: {
    eyebrow: "Готово для оценки покупателем",
    title: "Понятные продуктовые истории, сильные SEO-сигналы и прямые пути к заявке.",
    products: "Продукты",
    company: "Компания",
    conversions: "CTA",
    about: "О нас",
    applications: "Применения",
    insights: "Материалы",
    contact: "Контакты",
    thankYou: "Спасибо",
    emailSales: "Написать продажам",
    copyright: "Создано для B2B-поиска и конверсии заявок.",
  },
  form: {
    quoteEyebrow: "Запросить предложение",
    contactEyebrow: "Форма контакта",
    fullName: "Полное имя",
    fullNamePlaceholder: "Ваше имя",
    businessEmail: "Рабочий email",
    businessEmailPlaceholder: "name@company.com",
    company: "Компания",
    companyPlaceholder: "Название компании",
    country: "Страна",
    countryPlaceholder: "Целевой рынок или страна",
    phone: "Телефон",
    phonePlaceholder: "Телефон или WhatsApp",
    productContext: "Контекст продукта",
    generalInquiry: "Общий запрос",
    productContextHint: "Записывается автоматически для отдела продаж.",
    quoteMessageLabel: "Требования проекта",
    contactMessageLabel: "Сообщение",
    quoteMessagePlaceholder: "Укажите спецификации, количество, сертификацию, рынок и сроки.",
    contactMessagePlaceholder: "Опишите задачу, сроки и важные детали продукта или рынка.",
    validationHint: "Проверка также выполняется на сервере перед сохранением.",
    defaultMessage: "Обязательные поля проверяются на клиенте и сервере.",
    submitting: "Отправка...",
    websiteTrap: "Сайт",
  },
  home: {
    heroTitle: "Страницы промышленного сорсинга, которые легко читать, индексировать и превращать в качественные заявки.",
    whyEyebrow: "Почему это конвертирует",
    whyTitle: "Главная страница отвечает на вопросы покупателя в естественном порядке принятия решения.",
    whyDescription: "Сначала доверие, затем соответствие продукта, контекст применения, FAQ и прямой запрос.",
    productsEyebrow: "Продукты",
    productsTitle: "Списки продуктов для SEO-видимости и технического просмотра.",
    productsDescription: "Каждый шаблон содержит блоки, которые покупатель ожидает перед запросом цены.",
    industryEyebrow: "Применения",
    industryTitle: "Отраслевые страницы дают поиску и покупателям нужный контекст применения.",
    industryDescription: "Каждый шаблон объясняет задачи, результаты и операционное соответствие.",
    industryLabel: "Отраслевое применение",
    insightsEyebrow: "Материалы",
    insightsTitle: "Шаблоны блога поддерживают long-tail SEO без нарушения структуры сайта.",
    insightsDescription: "Каждая статья остается простой для чтения и ведет к понятному следующему шагу.",
    faqEyebrow: "FAQ",
    faqTitle: "Ответы на частые вопросы по закупкам",
    faqDescription: "FAQ помогает чтению, поисковому контексту и передаче в продажи.",
    finalEyebrow: "Финальный CTA",
    finalTitle: "Готовы превращать трафик в квалифицированные заявки?",
    finalDescription: "Используйте запрос цены, контакт, WhatsApp или email в зависимости от деталей.",
    emptyProducts: "Опубликованные продукты появятся здесь после публикации в админке.",
    emptyIndustries: "Опубликованные отраслевые страницы появятся здесь после публикации.",
    emptyPosts: "Опубликованные статьи появятся здесь после выпуска контента.",
    moq: "MOQ",
    leadTime: "Срок",
    sku: "SKU",
    viewProductTemplate: "Открыть шаблон продукта",
  },
  about: {
    eyebrow: "О нас",
    title: "B2B экспортный сайт должен звучать так же надежно, как операция за ним.",
    heroAsideTitle: "Операционное доверие",
    whatEyebrow: "Что мы делаем",
    whatTitle: "Мы помогаем покупателям превращать сложные OEM-обсуждения в решения с помощью",
    whatDescription: "Сильные B2B сайты объясняют, как выполняется работа и что будет дальше.",
    introOne: "позиционируется как партнер для импортеров, дистрибьюторов и private label команд.",
    projectEyebrow: "Как движется проект",
    projectTitle: "Четыре этапа делают страницу понятной на телефоне, планшете и компьютере.",
    projectDescription: "Каждый этап короткий для SEO и ясный для реальных покупателей.",
    stage: "Этап",
    principlesEyebrow: "Принципы работы",
    principlesTitle: "Сообщение остается практичным, потому что покупатели запоминают конкретику.",
  },
  contact: {
    eyebrow: "Контакты",
    title: "Сделайте следующий шаг очевидным для покупателей, готовых к разговору.",
    description: "Страница сохраняет четыре CTA: запрос цены, контакт, WhatsApp и email, с валидацией и записью источника.",
    asideTitle: "Поток заявки",
    asideDescription: "Оптимизировано для маленьких экранов и дает структурированный вход для запроса цены на desktop.",
    reachEyebrow: "Связаться с продажами",
    reachTitle: "Выберите канал под вашу стадию покупки.",
    reachDescription: "Некоторым нужен формальный расчет, другим - быстрая проверка возможности.",
    email: "Email",
    whatsapp: "WhatsApp",
    phone: "Телефон",
  },
  products: {
    eyebrow: "Продукты",
    title: "Страница продуктов помогает покупателю оценить соответствие до контакта с продажами.",
    description: "Каждый элемент ведет в шаблон с главным изображением, преимуществами, параметрами, FAQ и CTA.",
    asideTitle: "Просмотр продуктов",
    asideDescription: "Список остается простым и сохраняет ясный путь к деталям на всех экранах.",
    layoutEyebrow: "Структура каталога",
    layoutTitle: "Короткие описания для быстрого просмотра, детали - в один клик.",
    sku: "SKU",
    moq: "MOQ",
    leadTime: "Срок",
    openDetail: "Открыть детали",
    empty: "Пока нет опубликованных продуктов. Опубликуйте продукт в админке.",
  },
  productDetail: {
    description: "Страница продукта объединяет техническую ценность, спецификации, FAQ и заявку в responsive-поток.",
    sellingEyebrow: "Преимущества",
    sellingTitle: "Что покупатель должен понять перед запросом цены",
    facts: "Краткие факты",
    gallery: "Галерея",
    galleryDescription: "Медиа оптимизированы для mobile-first просмотра с одним понятным главным изображением.",
    video: "Видео",
    videoDescription: "Видео-демо остаются опциональными, чтобы сохранить производительность.",
    downloads: "Загрузки",
    downloadsDescription: "Техпаспорта и документы соответствия можно добавить позже.",
    parametersEyebrow: "Параметры",
    parametersTitle: "Зона спецификаций для технической оценки",
    emptySpecs: "Спецификации появятся после публикации параметров продукта.",
    faqEyebrow: "FAQ",
    faqTitle: "Вопросы перед утверждением образца",
    emptyFaq: "Опубликованные FAQ продукта появятся здесь.",
    browseText: "Ищете другой тип продукта? Посмотрите",
    browseLink: "список продуктов",
    productNotFound: "Продукт не найден",
    productNotFoundDescription: "Запрошенная страница продукта не найдена.",
  },
  industries: {
    eyebrow: "Отрасли",
    title: "Страницы применений помогают поиску и покупателям быстрее понять соответствие.",
    description: "Они объясняют задачи, результаты и реальный процесс для каждой группы покупателей.",
    asideTitle: "История по применению",
    asideDescription: "Эти страницы поддерживают long-tail SEO и сохраняют прямой путь к конверсии.",
    listEyebrow: "Шаблоны отраслей",
    listTitle: "Каждая страница содержит задачи, результаты, процесс и CTA.",
    open: "Открыть применение",
    empty: "Пока нет опубликованных отраслевых страниц.",
  },
  industryDetail: {
    eyebrow: "Отраслевое применение",
    description: "Отраслевые страницы связывают операционные вопросы с коммерческим следующим шагом.",
    focusEyebrow: "Фокус применения",
    focusTitle: "Что покупатели обычно решают первым",
    implementationEyebrow: "Внедрение",
    implementationTitle: "Что должна передать сильная страница применения",
    detailEyebrow: "Детали применения",
    detailTitle: "Длинные разделы читаются легко благодаря структуре данных.",
    empty: "Опубликованные детали отрасли появятся здесь.",
    notFound: "Отраслевая страница не найдена",
    notFoundDescription: "Запрошенная отраслевая страница не найдена.",
  },
  blog: {
    eyebrow: "Блог",
    title: "Чистая структура блога поддерживает long-tail трафик и не отвлекает от конверсии.",
    description: "Список сохраняет категорию, время чтения, резюме и ясный путь к статье.",
    asideTitle: "Поиск статей",
    asideDescription: "Структура оставляет место для SEO-роста и остается связанной с B2B продажами.",
    latestEyebrow: "Последние статьи",
    latestTitle: "Шаблоны для материалов, FAQ и связанных чтений.",
    readArticle: "Читать статью",
    empty: "Пока нет опубликованных статей.",
  },
  blogDetail: {
    publishedLabel: "Опубликовано",
    updatedLabel: "Обновлено",
    articleEyebrow: "Статья",
    articleTitle: "Читаемые блоки с безопасным рендерингом по умолчанию",
    emptyArticle: "Разделы статьи появятся после публикации.",
    nextEyebrow: "Следующий шаг",
    nextTitle: "Превратите редакционный трафик в разговоры с покупателями.",
    nextDescription: "Шаблон держит CTA видимым и не мешает чтению.",
    relatedEyebrow: "Похожие",
    relatedTitle: "Больше контента",
    emptyRelated: "Больше опубликованных статей появится по мере роста блога.",
    notFound: "Статья не найдена",
    notFoundDescription: "Запрошенная статья не найдена.",
  },
  thankYou: {
    eyebrow: "Спасибо",
    title: "Ваш запрос готов к следующему шагу.",
    description: "Поток заявок подключен к базе данных и панели администратора.",
  },
};

const arabicDictionary: MarketingDictionary = {
  ...spanishDictionary,
  localeLabel: "AR",
  brandSubtitle: "برامج تصدير B2B",
  navigation: [
    { label: "المنتجات", href: "/products" },
    { label: "القطاعات", href: "/industries" },
    { label: "المدونة", href: "/blog" },
    { label: "من نحن", href: "/about" },
    { label: "اتصل بنا", href: "/contact" },
  ],
  languageSwitch: { ...spanishDictionary.languageSwitch, label: "تغيير اللغة" },
  cta: {
    requestQuote: "اطلب عرض سعر",
    contactUs: "اتصل بنا",
    viewProducts: "عرض المنتجات",
    talkToSales: "تحدث مع المبيعات",
    discussUseCase: "ناقش حالتك",
    backToBlog: "العودة للمدونة",
    whatsapp: "واتساب",
    email: "البريد",
  },
  footer: {
    eyebrow: "جاهز لمراجعة المشتري",
    title: "قصص منتجات واضحة وإشارات SEO أقوى ومسارات مباشرة للاستفسار.",
    products: "المنتجات",
    company: "الشركة",
    conversions: "دعوات الإجراء",
    about: "من نحن",
    applications: "التطبيقات",
    insights: "المقالات",
    contact: "اتصل بنا",
    thankYou: "شكرا",
    emailSales: "راسل المبيعات",
    copyright: "مصمم لاكتشاف B2B المتجاوب وتحويل الاستفسارات.",
  },
  form: {
    quoteEyebrow: "اطلب عرض سعر",
    contactEyebrow: "نموذج الاتصال",
    fullName: "الاسم الكامل",
    fullNamePlaceholder: "اكتب اسمك الكامل",
    businessEmail: "بريد العمل",
    businessEmailPlaceholder: "name@company.com",
    company: "الشركة",
    companyPlaceholder: "اسم شركتك",
    country: "الدولة",
    countryPlaceholder: "السوق أو الدولة المستهدفة",
    phone: "الهاتف",
    phonePlaceholder: "الهاتف أو واتساب",
    productContext: "سياق المنتج",
    generalInquiry: "استفسار عام",
    productContextHint: "يتم تسجيله تلقائيا لمساعدة فريق المبيعات.",
    quoteMessageLabel: "متطلبات المشروع",
    contactMessageLabel: "الرسالة",
    quoteMessagePlaceholder: "اذكر المواصفات والكمية والشهادات والسوق والجدول الزمني.",
    contactMessagePlaceholder: "اشرح ما تحتاجه والجدول الزمني وأي تفاصيل مهمة.",
    validationHint: "يتم التحقق مرة أخرى على الخادم قبل الحفظ.",
    defaultMessage: "يتم التحقق من الحقول المطلوبة في المتصفح والخادم.",
    submitting: "جار الإرسال...",
    websiteTrap: "الموقع",
  },
  home: {
    heroTitle: "صفحات توريد صناعي واضحة القراءة، قوية في البحث، وتحول المشترين المؤهلين.",
    whyEyebrow: "لماذا تحول",
    whyTitle: "تنظم الصفحة الرئيسية أسئلة المشتري حسب ترتيب القرار الحقيقي.",
    whyDescription: "الثقة أولا، ثم ملاءمة المنتج، ثم سياق الاستخدام، ثم الأسئلة الشائعة، ثم الاستفسار المباشر.",
    productsEyebrow: "المنتجات",
    productsTitle: "قوالب قوائم منتجات مصممة للظهور في البحث والمراجعة التقنية.",
    productsDescription: "يتضمن كل قالب الكتل التي يتوقعها المشتري قبل طلب عرض سعر.",
    industryEyebrow: "التطبيقات",
    industryTitle: "صفحات القطاعات تمنح محركات البحث والمشترين سياق الاستخدام المطلوب.",
    industryDescription: "بدلا من نظرة عامة عامة، يشرح كل قالب التحديات والنتائج وملاءمة العملية.",
    industryLabel: "تطبيق قطاعي",
    insightsEyebrow: "المقالات",
    insightsTitle: "قوالب المدونة تدعم SEO طويل الذيل دون كسر هيكل المعلومات.",
    insightsDescription: "تحافظ كل مقالة على قراءة بسيطة وتقدم للمشتري خطوة تالية واضحة.",
    faqEyebrow: "الأسئلة",
    faqTitle: "إجابات عن أسئلة التوريد الشائعة",
    faqDescription: "تم بناء قسم الأسئلة للمسح السريع وسياق البحث وتسليم أوضح إلى المبيعات.",
    finalEyebrow: "دعوة أخيرة",
    finalTitle: "هل أنت جاهز لتحويل الزيارات إلى استفسارات مؤهلة؟",
    finalDescription: "استخدم طلب عرض السعر أو صفحة الاتصال أو واتساب أو البريد حسب مستوى التفاصيل المتوفر.",
    emptyProducts: "ستظهر المنتجات المنشورة هنا بعد تفعيلها في لوحة الإدارة.",
    emptyIndustries: "ستظهر صفحات القطاعات المنشورة هنا بعد إصدارها.",
    emptyPosts: "ستظهر المقالات المنشورة هنا بعد إصدار المحتوى التحريري.",
    moq: "الحد الأدنى",
    leadTime: "مدة التسليم",
    sku: "SKU",
    viewProductTemplate: "عرض قالب المنتج",
  },
  about: {
    eyebrow: "من نحن",
    title: "يجب أن يبدو موقع التصدير B2B موثوقا مثل العملية التي تقف خلفه.",
    heroAsideTitle: "ثقة تشغيلية",
    whatEyebrow: "ماذا نفعل",
    whatTitle: "نساعد المشترين على تحويل محادثات OEM المعقدة إلى قرارات قابلة للمراجعة عبر",
    whatDescription: "أفضل مواقع B2B تتجنب الوعود الغامضة وتشرح كيف يتم العمل وما الذي يحدث بعد ذلك.",
    introOne: "يتموضع كشريك للمستوردين والموزعين وفرق العلامات الخاصة التي تحتاج إلى هيكل واضح.",
    projectEyebrow: "كيف يتحرك المشروع",
    projectTitle: "قصة من أربع مراحل تجعل الصفحة سهلة القراءة على الهاتف والتابلت والكمبيوتر.",
    projectDescription: "كل مرحلة قصيرة بما يكفي للـ SEO وواضحة بما يكفي للمشترين الحقيقيين.",
    stage: "مرحلة",
    principlesEyebrow: "مبادئ العمل",
    principlesTitle: "تبقى الرسالة عملية لأن المشترين يتذكرون التفاصيل المحددة.",
  },
  contact: {
    eyebrow: "اتصل بنا",
    title: "اجعل الخطوة التالية واضحة للمشترين الجاهزين للتواصل.",
    description: "تحافظ صفحة الاتصال على أربع دعوات واضحة: طلب عرض سعر، الاتصال، واتساب، والبريد، مع التحقق وحفظ سياق المصدر.",
    asideTitle: "مسار الاستفسار",
    asideDescription: "تم تحسين التخطيط للقراءة على الشاشات الصغيرة مع توفير مدخل منظم لطلب عرض السعر على الكمبيوتر.",
    reachEyebrow: "تواصل مع المبيعات",
    reachTitle: "اختر القناة المناسبة لمرحلة الشراء لديك.",
    reachDescription: "بعض المشترين يحتاجون عرضا رسميا، وآخرون يحتاجون تأكيدا سريعا قبل مشاركة المواصفات.",
    email: "البريد",
    whatsapp: "واتساب",
    phone: "الهاتف",
  },
  products: {
    eyebrow: "المنتجات",
    title: "صفحة المنتجات تساعد المشتري على تقييم الملاءمة قبل التواصل مع المبيعات.",
    description: "كل عنصر ينتقل إلى قالب تفاصيل يتضمن صورة رئيسية ونقاط بيع ومواصفات وأسئلة شائعة ودعوة تحويل.",
    asideTitle: "اكتشاف المنتجات",
    asideDescription: "تتجنب القائمة الفوضى وتحافظ على مسار واضح نحو صفحات التفاصيل على كل أحجام الشاشة.",
    layoutEyebrow: "هيكل الكتالوج",
    layoutTitle: "وصف قصير للمسح السريع وتفاصيل أعمق بنقرة واحدة.",
    sku: "SKU",
    moq: "الحد الأدنى",
    leadTime: "مدة التسليم",
    openDetail: "فتح التفاصيل",
    empty: "لا توجد منتجات منشورة بعد. انشر منتجا من لوحة الإدارة ليظهر هنا.",
  },
  productDetail: {
    description: "يجمع قالب تفاصيل المنتج القيمة التقنية والمواصفات والأسئلة الشائعة وإجراءات الاستفسار في تدفق متجاوب واضح.",
    sellingEyebrow: "نقاط البيع",
    sellingTitle: "ما الذي يجب أن يفهمه المشتري قبل طلب عرض السعر",
    facts: "حقائق سريعة",
    gallery: "المعرض",
    galleryDescription: "تم تحسين الوسائط للمسح mobile-first مع أصل بصري رئيسي واضح ومساحة لتوسيع المعرض لاحقا.",
    video: "فيديو",
    videoDescription: "تبقى عروض الفيديو اختيارية للحفاظ على الأداء، مع تجهيز التخطيط للإضافات المستقبلية.",
    downloads: "تنزيلات",
    downloadsDescription: "يمكن إضافة ملفات البيانات ووثائق الامتثال لاحقا دون كسر تخطيط الشاشة الصغيرة.",
    parametersEyebrow: "المواصفات",
    parametersTitle: "منطقة مواصفات جاهزة للمراجعة التقنية",
    emptySpecs: "ستظهر المواصفات الفنية هنا بعد تحديث المنتج ببيانات مواصفات منشورة.",
    faqEyebrow: "الأسئلة",
    faqTitle: "أسئلة تطرح غالبا قبل اعتماد العينة",
    emptyFaq: "ستظهر أسئلة المنتج المنشورة هنا عند توفرها.",
    browseText: "تبحث عن نوع منتج آخر؟ تصفح",
    browseLink: "قائمة المنتجات",
    productNotFound: "المنتج غير موجود",
    productNotFoundDescription: "تعذر العثور على صفحة المنتج المطلوبة.",
  },
  industries: {
    eyebrow: "القطاعات",
    title: "صفحات الاستخدام تساعد محركات البحث والمشترين على فهم الملاءمة بسرعة.",
    description: "بدلا من تكرار نصوص عامة، تشرح صفحات القطاعات التحديات والنتائج وسير العمل الذي يهم كل مجموعة مشترين.",
    asideTitle: "سرد حسب حالة الاستخدام",
    asideDescription: "يدعم هذا النوع من الصفحات SEO طويل الذيل مع الحفاظ على مسار تحويل مباشر وسهل المسح.",
    listEyebrow: "قوالب القطاعات",
    listTitle: "كل صفحة تطبيق تتسع للتحديات والنتائج وتفاصيل العملية والدعوة للإجراء.",
    open: "فتح صفحة التطبيق",
    empty: "لا توجد صفحات قطاعات منشورة بعد. انشر واحدة من لوحة الإدارة لتظهر هنا.",
  },
  industryDetail: {
    eyebrow: "تطبيق قطاعي",
    description: "تم تصميم صفحات القطاعات لربط الاهتمامات التشغيلية بخطوة تجارية واضحة.",
    focusEyebrow: "تركيز التطبيق",
    focusTitle: "ما يحتاج المشترون عادة إلى حله أولا",
    implementationEyebrow: "التنفيذ",
    implementationTitle: "ما تساعد صفحة التطبيق القوية على توصيله",
    detailEyebrow: "تفاصيل التطبيق",
    detailTitle: "تبقى الأقسام الطويلة سهلة القراءة لأنها مبنية على بنية بيانات أولا لا على الزخرفة.",
    empty: "ستظهر أقسام تفاصيل القطاع المنشورة هنا بعد إصدار المحتوى.",
    notFound: "صفحة القطاع غير موجودة",
    notFoundDescription: "تعذر العثور على صفحة القطاع المطلوبة.",
  },
  blog: {
    eyebrow: "المدونة",
    title: "هيكل مدونة نظيف يدعم زيارات طويلة الذيل دون تشتيت عن التحويل.",
    description: "صفحة القائمة تحريرية ومقيدة عمدا، وتحافظ على الفئة ووقت القراءة والملخص ومسار المقالة قابلة للقراءة على كل الشاشات.",
    asideTitle: "اكتشاف المقالات",
    asideDescription: "يترك هيكل المدونة مساحة لنمو المقالات الموجهة للبحث مع بقائه منسجما مع أهداف مبيعات B2B.",
    latestEyebrow: "أحدث المقالات",
    latestTitle: "قوالب للمحتوى المعرفي ودعم FAQ والقراءات ذات الصلة.",
    readArticle: "قراءة المقال",
    empty: "لا توجد مقالات منشورة بعد. انشر مقالة من لوحة الإدارة لتظهر هنا.",
  },
  blogDetail: {
    publishedLabel: "نشر",
    updatedLabel: "تحديث",
    articleEyebrow: "مقال",
    articleTitle: "كتل محتوى مقروءة مع عرض آمن افتراضيا",
    emptyArticle: "ستظهر أقسام المقالة المنشورة هنا بعد إصدار المحتوى التحريري.",
    nextEyebrow: "الخطوة التالية",
    nextTitle: "حوّل زيارات المقالات إلى محادثات مع المشترين.",
    nextDescription: "يحافظ قالب تفاصيل المدونة على الدعوة للإجراء مرئية دون تعطيل تجربة القراءة.",
    relatedEyebrow: "ذات صلة",
    relatedTitle: "مزيد من المحتوى",
    emptyRelated: "ستظهر مقالات منشورة إضافية هنا مع نمو المدونة.",
    notFound: "المقالة غير موجودة",
    notFoundDescription: "تعذر العثور على المقالة المطلوبة.",
  },
  thankYou: {
    eyebrow: "شكرا",
    title: "تم استلام طلبك وهو جاهز للخطوة التالية.",
    description: "تم ربط مسار الاستفسار بقاعدة البيانات ولوحة الإدارة.",
  },
};

export function getMarketingDictionary(locale: Locale) {
  if (locale === "zh-CN") {
    return chineseDictionary;
  }

  if (locale === "es") {
    return spanishDictionary;
  }

  if (locale === "ru") {
    return russianDictionary;
  }

  if (locale === "fr") {
    return frenchDictionary;
  }

  if (locale === "ar") {
    return arabicDictionary;
  }

  return englishDictionary;
}
