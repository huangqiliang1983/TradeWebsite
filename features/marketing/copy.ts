import type { Locale } from "@/lib/i18n";

export type MarketingDictionary = {
  localeLabel: string;
  brandSubtitle: string;
  navigation: Array<{ label: string; href: string }>;
  languageSwitch: {
    label: string;
    english: string;
    chinese: string;
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
  languageSwitch: { label: "Switch language", english: "EN", chinese: "中文" },
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
      "Industrial sourcing pages that read clearly, rank cleanly, and convert qualified buyers.",
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
  languageSwitch: { label: "切换语言", english: "EN", chinese: "中文" },
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

export function getMarketingDictionary(locale: Locale) {
  return locale === "zh-CN" ? chineseDictionary : englishDictionary;
}
