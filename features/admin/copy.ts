import type { PublishStatus } from "@prisma/client";

import type { Locale } from "@/lib/i18n";

export const ADMIN_LOCALE_COOKIE = "remember_admin_locale";

export function getAdminDictionary(locale: Locale) {
  const isZh = locale === "zh-CN";

  return {
    localeLabel: isZh ? "中文" : "EN",
    topbar: {
      eyebrow: isZh ? "内容管理" : "Content Management",
      signedInAs: isZh ? "当前登录" : "Signed in as",
      signOut: isZh ? "退出登录" : "Sign out",
      language: isZh ? "后台语言" : "Language",
    },
    login: {
      eyebrow: isZh ? "后台登录" : "Admin Login",
      title: isZh ? "安全访问后台内容" : "Secure content access",
      description: isZh
        ? "这里保护后台仪表盘、内容编辑页、上传能力和询盘数据。"
        : "This login protects the admin dashboard, content editing screens, uploads, and inquiry data.",
      email: isZh ? "管理员邮箱" : "Admin email",
      password: isZh ? "密码" : "Password",
      helper: isZh
        ? "登录尝试会在服务端限流并校验。"
        : "Login attempts are rate-limited and verified on the server.",
      pending: isZh ? "登录中..." : "Signing in...",
      submit: isZh ? "登录" : "Sign in",
      incorrect: isZh ? "邮箱或密码不正确。" : "The email or password is incorrect.",
      limited: isZh
        ? "登录尝试过多，请稍后再试。"
        : "Too many login attempts. Please wait a few minutes and try again.",
      unavailable: isZh
        ? "登录保护服务暂时不可用，请稍后重试。"
        : "The login protection service is temporarily unavailable. Please try again shortly.",
    },
    sidebar: {
      eyebrow: isZh ? "后台" : "Admin",
      dashboard: isZh ? "仪表盘" : "Dashboard",
      company: isZh ? "公司信息" : "Company",
      categories: isZh ? "产品分类" : "Categories",
      products: isZh ? "产品管理" : "Products",
      industries: isZh ? "行业页面" : "Industry Pages",
      blog: isZh ? "博客文章" : "Blog Posts",
      faqs: isZh ? "FAQ 管理" : "FAQs",
      inquiries: isZh ? "询盘列表" : "Inquiries",
    },
    common: {
      edit: isZh ? "编辑" : "Edit",
      manage: isZh ? "管理" : "Manage",
      none: isZh ? "无" : "None",
      contact: isZh ? "联系" : "Contact",
      quote: isZh ? "报价" : "Quote",
      draft: isZh ? "草稿" : "Draft",
      published: isZh ? "已发布" : "Published",
      archived: isZh ? "已归档" : "Archived",
      uncategorized: isZh ? "未分类" : "Uncategorized",
      save: isZh ? "保存" : "Save",
      delete: isZh ? "删除" : "Delete",
      statusSaved: isZh ? "保存成功。" : "Changes saved successfully.",
      statusDeleted: isZh ? "删除成功。" : "Item deleted successfully.",
      statusDone: isZh ? "操作已完成。" : "Action completed.",
      question: isZh ? "问题" : "Question",
      answer: isZh ? "答案" : "Answer",
      slug: "Slug",
      summary: isZh ? "摘要" : "Summary",
      descriptionField: isZh ? "描述" : "Description",
      publishStatus: isZh ? "发布状态" : "Publish status",
      seoTitle: isZh ? "SEO 标题" : "SEO title",
      seoCanonical: "SEO Canonical",
      seoDescription: isZh ? "SEO 描述" : "SEO description",
      name: isZh ? "名称" : "Name",
      title: isZh ? "标题" : "Title",
      status: isZh ? "状态" : "Status",
      sortOrder: isZh ? "排序值" : "Sort order",
      created: isZh ? "时间" : "Created",
      product: isZh ? "产品" : "Product",
      category: isZh ? "分类" : "Category",
      company: isZh ? "公司" : "Company",
      source: isZh ? "来源" : "Source",
      type: isZh ? "类型" : "Type",
      email: isZh ? "邮箱" : "Email",
      phone: isZh ? "电话" : "Phone",
      imageAlt: isZh ? "图片 Alt" : "Image alt",
      translations: isZh ? "多语言内容" : "Localized content",
      translationsDescription: isZh
        ? "请把已翻译好的内容填入对应语言。留空时，该语言前台会回退到主内容。"
        : "Enter already-translated content for each language. Empty fields fall back to the primary content on the public site.",
      saveAction: isZh ? "保存" : "Save",
      deleteAction: isZh ? "删除" : "Delete",
    },
    dashboard: {
      title: isZh ? "仪表盘" : "Dashboard",
      description: isZh
        ? "通过后台管理内容、上传、SEO 字段、发布状态和进入站点的询盘，同时避免公开暴露后台实现细节。"
        : "Use the admin area to manage content, uploads, SEO metadata, publish status, and incoming inquiries without exposing backend details publicly.",
      latestInquiries: isZh ? "最新询盘" : "Latest Inquiries",
      latestInquiriesDescription: isZh
        ? "前台联系表单和报价表单最近捕获的询盘。"
        : "Recent contact and quote requests captured by the front-end forms.",
      stats: {
        company: isZh ? "公司资料" : "Company Profiles",
        categories: isZh ? "产品分类" : "Product Categories",
        products: isZh ? "产品" : "Products",
        industries: isZh ? "行业页面" : "Industry Pages",
        blog: isZh ? "博客文章" : "Blog Posts",
        faqs: isZh ? "FAQ" : "FAQs",
        inquiries: isZh ? "询盘" : "Inquiries",
      },
    },
    companyPage: {
      title: isZh ? "公司信息" : "Company Information",
      description: isZh
        ? "维护站点使用的核心公司资料，以及后续后台化内容依赖的基础信息。"
        : "Maintain the core company profile used by the site and future backend-managed content.",
      cardTitle: isZh ? "公司资料" : "Company Profile",
      companyName: isZh ? "公司名称" : "Company name",
      tagline: isZh ? "标语" : "Tagline",
      companyImage: isZh ? "公司图片" : "Company image",
      companyImageHint: isZh
        ? "仅支持 JPG、PNG、WEBP，大小上限由服务端限制。"
        : "JPG, PNG, or WEBP only. Max size is limited server-side.",
      addressLine1: isZh ? "地址行 1" : "Address line 1",
      addressLine2: isZh ? "地址行 2" : "Address line 2",
      city: isZh ? "城市" : "City",
      state: isZh ? "省/州/地区" : "State / Region",
      country: isZh ? "国家" : "Country",
      postalCode: isZh ? "邮编" : "Postal code",
      whatsapp: "WhatsApp",
      save: isZh ? "保存公司资料" : "Save company profile",
    },
    categoriesPage: {
      title: isZh ? "产品分类" : "Product Categories",
      description: isZh
        ? "管理分类 slug、排序、SEO 元信息和发布状态。"
        : "Manage category slugs, sort order, SEO metadata, and publish status.",
      listTitle: isZh ? "分类列表" : "Category List",
      newTitle: isZh ? "新建分类" : "New Category",
      editTitle: isZh ? "编辑分类" : "Edit Category",
      save: isZh ? "保存分类" : "Save category",
      delete: isZh ? "删除分类" : "Delete category",
      sort: isZh ? "排序" : "Sort",
    },
    productsPage: {
      title: isZh ? "产品管理" : "Products",
      description: isZh
        ? "管理产品内容、图片、规格参数、SEO 字段和发布状态。"
        : "Manage product content, images, specifications, SEO fields, and publish status.",
      listTitle: isZh ? "产品列表" : "Product List",
      newTitle: isZh ? "新建产品" : "New Product",
      editTitle: isZh ? "编辑产品" : "Edit Product",
      sku: "SKU",
      moq: isZh ? "起订量" : "MOQ",
      leadTime: isZh ? "交期" : "Lead time",
      heroTitle: isZh ? "Hero 标题" : "Hero title",
      productImage: isZh ? "产品图片" : "Product image",
      sellingPoints: isZh ? "卖点" : "Selling points",
      sellingPointsHint: isZh ? "每行一个卖点" : "One point per line",
      specifications: isZh ? "规格参数" : "Specifications",
      specificationsHint: isZh
        ? "每行一个，格式为 标签: 值"
        : "One per line using Label: Value",
      save: isZh ? "保存产品" : "Save product",
      delete: isZh ? "删除产品" : "Delete product",
    },
    industriesPage: {
      title: isZh ? "行业页面" : "Industry Pages",
      description: isZh
        ? "管理行业应用页、主视觉、发布状态和 SEO 元信息。"
        : "Manage industry use-case pages, hero images, publish status, and SEO metadata.",
      listTitle: isZh ? "行业页面列表" : "Industry Pages",
      newTitle: isZh ? "新建行业页面" : "New Industry Page",
      editTitle: isZh ? "编辑行业页面" : "Edit Industry Page",
      heroTitle: isZh ? "Hero 标题" : "Hero title",
      heroImage: isZh ? "主图" : "Hero image",
      content: isZh ? "正文内容" : "Content",
      contentHint: isZh
        ? "用空行分隔不同内容区块。"
        : "Separate content blocks with a blank line.",
      save: isZh ? "保存行业页面" : "Save industry page",
      delete: isZh ? "删除行业页面" : "Delete industry page",
    },
    blogPage: {
      title: isZh ? "博客文章" : "Blog Posts",
      description: isZh
        ? "管理文章内容、封面上传、发布状态和 SEO 元信息。"
        : "Manage article content, cover uploads, publish state, and SEO metadata.",
      listTitle: isZh ? "文章列表" : "Blog Posts",
      newTitle: isZh ? "新建文章" : "New Blog Post",
      editTitle: isZh ? "编辑文章" : "Edit Blog Post",
      excerpt: isZh ? "摘要" : "Excerpt",
      publishedDate: isZh ? "发布时间" : "Published date",
      coverImage: isZh ? "封面图" : "Cover image",
      coverImageAlt: isZh ? "封面图 Alt" : "Cover image alt",
      content: isZh ? "正文内容" : "Content",
      save: isZh ? "保存文章" : "Save blog post",
      delete: isZh ? "删除文章" : "Delete blog post",
    },
    faqPage: {
      title: isZh ? "FAQ 管理" : "FAQs",
      description: isZh
        ? "管理可复用 FAQ，并把它们关联到产品、行业页面或博客文章。"
        : "Manage reusable FAQ entries and connect them to products, industry pages, or blog posts.",
      listTitle: isZh ? "FAQ 列表" : "FAQ List",
      newTitle: isZh ? "新建 FAQ" : "New FAQ",
      editTitle: isZh ? "编辑 FAQ" : "Edit FAQ",
      linkedTo: isZh ? "关联对象" : "Linked to",
      industryPage: isZh ? "行业页面" : "Industry page",
      blogPost: isZh ? "博客文章" : "Blog post",
      save: isZh ? "保存 FAQ" : "Save FAQ",
      delete: isZh ? "删除 FAQ" : "Delete FAQ",
    },
    inquiriesPage: {
      title: isZh ? "询盘列表" : "Inquiry List",
      description: isZh
        ? "查看前台联系与报价请求，包含基础来源和 UTM 信息。"
        : "Review incoming contact and quote requests, including basic source and UTM data.",
      cardTitle: isZh ? "最近询盘" : "Recent Inquiries",
      utm: "UTM",
    },
    error: {
      title: isZh ? "后台页面加载失败。" : "This admin page could not be loaded.",
      description: isZh ? "请刷新页面后重试。" : "Reload the page to try again.",
      retry: isZh ? "重新加载" : "Reload page",
    },
  };
}

export function getAdminPublishStatusOptions(locale: Locale) {
  const dictionary = getAdminDictionary(locale);

  return [
    { value: "DRAFT", label: dictionary.common.draft },
    { value: "PUBLISHED", label: dictionary.common.published },
    { value: "ARCHIVED", label: dictionary.common.archived },
  ] as const;
}

export function getAdminPublishStatusLabel(locale: Locale, status: PublishStatus) {
  const dictionary = getAdminDictionary(locale);

  if (status === "PUBLISHED") {
    return dictionary.common.published;
  }

  if (status === "ARCHIVED") {
    return dictionary.common.archived;
  }

  return dictionary.common.draft;
}

export function getAdminInquiryTypeLabel(
  locale: Locale,
  inquiryType: "CONTACT" | "QUOTE",
) {
  const dictionary = getAdminDictionary(locale);

  return inquiryType === "QUOTE" ? dictionary.common.quote : dictionary.common.contact;
}
