import type { Locale } from "@/lib/i18n";

type LocalizedText = Record<Locale, string>;

export function pickLocalizedText(locale: Locale, text: LocalizedText) {
  return text[locale] ?? text.en;
}

export function getHomeLabel(locale: Locale) {
  return pickLocalizedText(locale, {
    en: "Home",
    "zh-CN": "首页",
    es: "Inicio",
    fr: "Accueil",
    ru: "Главная",
    ar: "الرئيسية",
  });
}

export const localizedMeta = {
  homeTitle: {
    en: "Global OEM Manufacturing and Export Solutions",
    "zh-CN": "企业外贸官网模板与询盘转化方案",
    es: "Soluciones globales de fabricacion OEM y exportacion",
    fr: "Solutions mondiales de fabrication OEM et d'export",
    ru: "Глобальные OEM и экспортные решения",
    ar: "حلول تصنيع OEM وتصدير عالمية",
  },
  homeDescription: {
    en: "Launch a dependable B2B sourcing website with product visibility, SEO-ready content, and direct request-a-quote paths.",
    "zh-CN": "面向 Google SEO、产品展示与询盘转化的企业外贸官网模板。",
    es: "Lance un sitio B2B confiable con productos visibles, contenido listo para SEO y rutas directas de cotizacion.",
    fr: "Lancez un site B2B fiable avec produits visibles, contenu pret pour le SEO et chemins directs de devis.",
    ru: "Запустите надежный B2B сайт с видимостью продуктов, SEO-контентом и прямыми путями запроса цены.",
    ar: "أطلق موقع توريد B2B موثوقا مع عرض منتجات ومحتوى جاهز لـ SEO ومسارات مباشرة لطلب عرض السعر.",
  },
  aboutDescription: {
    en: "Learn how we structure quoting, sampling, production visibility, and export documentation for B2B buyers.",
    "zh-CN": "了解网站如何围绕报价、打样、生产透明度与出口文件来服务 B2B 买家。",
    es: "Conozca como estructuramos cotizacion, muestras, visibilidad de produccion y documentos de exportacion para compradores B2B.",
    fr: "Decouvrez comment nous structurons devis, echantillons, visibilite production et documents export pour acheteurs B2B.",
    ru: "Узнайте, как мы структурируем расчеты, образцы, прозрачность производства и экспортные документы для B2B покупателей.",
    ar: "تعرف كيف ننظم عروض الأسعار والعينات ووضوح الإنتاج ووثائق التصدير لمشتري B2B.",
  },
  contactTitle: {
    en: "Contact Our Sales Team",
    "zh-CN": "联系我们的销售团队",
    es: "Contacte a nuestro equipo comercial",
    fr: "Contacter notre equipe commerciale",
    ru: "Связаться с отделом продаж",
    ar: "تواصل مع فريق المبيعات",
  },
  contactDescription: {
    en: "Request a quote, contact sales, or reach our team on WhatsApp and email using this responsive B2B contact page.",
    "zh-CN": "通过这个响应式联系页获取报价、联系销售，或使用 WhatsApp 与邮箱快速沟通。",
    es: "Solicite una cotizacion, contacte ventas o use WhatsApp y email desde esta pagina B2B responsive.",
    fr: "Demandez un devis, contactez les ventes ou utilisez WhatsApp et email depuis cette page B2B responsive.",
    ru: "Запросите цену, свяжитесь с продажами или используйте WhatsApp и email на этой адаптивной B2B странице.",
    ar: "اطلب عرض سعر أو تواصل مع المبيعات عبر واتساب والبريد من صفحة اتصال B2B متجاوبة.",
  },
  productsTitle: {
    en: "Product Catalog Templates",
    "zh-CN": "产品列表模板",
    es: "Plantillas de catalogo de productos",
    fr: "Modeles de catalogue produit",
    ru: "Шаблоны каталога продуктов",
    ar: "قوالب كتالوج المنتجات",
  },
  productsDescription: {
    en: "Browse responsive B2B product list templates with SEO-ready descriptions, specifications, FAQs, and quote CTAs.",
    "zh-CN": "浏览适合 B2B SEO、参数展示、FAQ 和报价 CTA 的响应式产品列表模板。",
    es: "Explore plantillas B2B responsive con descripciones SEO, especificaciones, FAQ y CTA de cotizacion.",
    fr: "Parcourez des modeles B2B responsive avec descriptions SEO, specifications, FAQ et CTA de devis.",
    ru: "Просматривайте адаптивные B2B шаблоны с SEO-описаниями, спецификациями, FAQ и CTA запроса цены.",
    ar: "تصفح قوالب منتجات B2B متجاوبة مع أوصاف SEO ومواصفات وFAQ ودعوات طلب سعر.",
  },
  industriesTitle: {
    en: "Industry Application Templates",
    "zh-CN": "行业应用模板",
    es: "Plantillas de aplicaciones industriales",
    fr: "Modeles d'applications secteur",
    ru: "Шаблоны отраслевых применений",
    ar: "قوالب تطبيقات القطاعات",
  },
  industriesDescription: {
    en: "Explore industry application page templates designed for B2B SEO, buyer education, and inquiry conversion.",
    "zh-CN": "浏览适合 B2B SEO、买家教育与询盘转化的行业应用页面模板。",
    es: "Explore paginas de aplicacion pensadas para SEO B2B, educacion del comprador y conversion.",
    fr: "Explorez des pages secteur concues pour le SEO B2B, l'education acheteur et la conversion.",
    ru: "Изучите отраслевые страницы для B2B SEO, обучения покупателей и конверсии заявок.",
    ar: "استكشف صفحات تطبيقات مصممة لـ B2B SEO وتثقيف المشترين وتحويل الاستفسارات.",
  },
  blogTitle: {
    en: "Blog and SEO Insight Templates",
    "zh-CN": "博客与 SEO 文章模板",
    es: "Plantillas de blog e insights SEO",
    fr: "Modeles de blog et d'articles SEO",
    ru: "Шаблоны блога и SEO материалов",
    ar: "قوالب المدونة ومقالات SEO",
  },
  blogDescription: {
    en: "Browse blog list templates built for Google indexing, article discovery, and B2B inquiry support.",
    "zh-CN": "浏览适合 Google 抓取、文章发现和 B2B 询盘承接的博客列表模板。",
    es: "Explore listas de blog para indexacion en Google, descubrimiento de articulos y soporte a consultas B2B.",
    fr: "Parcourez des listes de blog pour indexation Google, decouverte d'articles et soutien aux demandes B2B.",
    ru: "Просматривайте шаблоны блога для индексации Google, поиска статей и поддержки B2B заявок.",
    ar: "تصفح قوالب مدونة للفهرسة في Google واكتشاف المقالات ودعم استفسارات B2B.",
  },
  thankYouDescription: {
    en: "A simple thank-you page confirming the inquiry path and guiding buyers toward the next relevant content.",
    "zh-CN": "一个简洁的感谢页，用于确认询盘已提交并引导用户进入下一步内容。",
    es: "Una pagina de gracias sencilla que confirma la consulta y guia al comprador al siguiente contenido.",
    fr: "Une page de remerciement simple qui confirme la demande et guide l'acheteur vers le contenu suivant.",
    ru: "Простая страница благодарности, подтверждающая заявку и ведущая покупателя к следующему контенту.",
    ar: "صفحة شكر بسيطة تؤكد الاستفسار وتوجه المشتري إلى المحتوى التالي.",
  },
} satisfies Record<string, LocalizedText>;

export const localizedVisualText = {
  homepageVisualTitle: {
    en: "Operations-ready homepage",
    "zh-CN": "适合运营与外贸转化的首页结构",
    es: "Pagina de inicio lista para operaciones",
    fr: "Page d'accueil prete pour les operations",
    ru: "Главная страница, готовая к операциям",
    ar: "صفحة رئيسية جاهزة للتشغيل",
  },
  quoteWorkflowAlt: {
    en: "Illustration of a quote request workflow with product brief and approval notes",
    "zh-CN": "带有产品需求与审批说明的报价流程示意图",
    es: "Ilustracion del flujo de cotizacion con brief de producto y aprobaciones",
    fr: "Illustration du flux de devis avec brief produit et notes d'approbation",
    ru: "Иллюстрация процесса запроса цены с брифом продукта и согласованиями",
    ar: "رسم توضيحي لمسار طلب عرض السعر مع موجز المنتج وملاحظات الاعتماد",
  },
  productPlanningAlt: {
    en: "Illustration of product planning with specification layers and quote checkpoints",
    "zh-CN": "带参数层级和报价节点的产品规划示意图",
    es: "Ilustracion de planificacion de producto con capas de especificacion y cotizacion",
    fr: "Illustration de planification produit avec specifications et jalons de devis",
    ru: "Иллюстрация планирования продукта со спецификациями и точками расчета",
    ar: "رسم توضيحي لتخطيط المنتج مع طبقات المواصفات ونقاط عرض السعر",
  },
  industryPlansAlt: {
    en: "Illustration of industry-specific sourcing plans across logistics, retail, and electronics",
    "zh-CN": "物流、零售和电子项目的行业化方案示意图",
    es: "Ilustracion de planes por industria en logistica, retail y electronica",
    fr: "Illustration de plans secteur pour logistique, retail et electronique",
    ru: "Иллюстрация отраслевых планов для логистики, ритейла и электроники",
    ar: "رسم توضيحي لخطط توريد قطاعية في اللوجستيات والتجزئة والإلكترونيات",
  },
  blogPlanningAlt: {
    en: "Illustration of article planning, SEO structure, and inquiry handoff",
    "zh-CN": "文章规划、SEO 结构与询盘承接示意图",
    es: "Ilustracion de planificacion editorial, estructura SEO y traspaso de consultas",
    fr: "Illustration de planification article, structure SEO et relais de demande",
    ru: "Иллюстрация планирования статей, SEO структуры и передачи заявок",
    ar: "رسم توضيحي لتخطيط المقالات وهيكل SEO وتسليم الاستفسارات",
  },
} satisfies Record<string, LocalizedText>;

export const aboutLocalizedLists = {
  milestones: {
    en: [
      "Commercial review aligned with the buyer’s target market and channel plan",
      "Sample approval checkpoints covering packaging, labels, and functional expectations",
      "Production follow-up designed to keep procurement and quality teams working from one brief",
      "Pre-shipment documentation prepared for customs, warehouse intake, and launch teams",
    ],
    "zh-CN": [
      "围绕目标市场和渠道计划展开商务评估",
      "覆盖包装、标签和功能预期的样品确认节点",
      "让采购和质量团队基于同一份简报推进量产跟踪",
      "为报关、仓储入库和上市团队准备出货前文件",
    ],
    es: [
      "Revision comercial alineada con mercado objetivo y canal",
      "Aprobacion de muestras con empaque, etiquetas y expectativas funcionales",
      "Seguimiento de produccion para que compras y calidad trabajen desde un mismo brief",
      "Documentos pre-embarque para aduanas, almacen y lanzamiento",
    ],
    fr: [
      "Revue commerciale alignee avec marche cible et canaux",
      "Validation echantillon couvrant emballage, etiquettes et attentes fonctionnelles",
      "Suivi production pour garder achats et qualite sur le meme brief",
      "Documents pre-expedition pour douane, entrepot et lancement",
    ],
    ru: [
      "Коммерческая оценка под целевой рынок и каналы",
      "Утверждение образцов по упаковке, этикеткам и функциям",
      "Сопровождение производства по единому брифу для закупок и качества",
      "Предотгрузочные документы для таможни, склада и запуска",
    ],
    ar: [
      "مراجعة تجارية متوافقة مع السوق والقنوات المستهدفة",
      "اعتماد عينات يغطي التغليف والملصقات والتوقعات الوظيفية",
      "متابعة إنتاج تجعل الشراء والجودة يعملان من موجز واحد",
      "وثائق قبل الشحن للجمارك والمستودع وفريق الإطلاق",
    ],
  },
  principles: {
    en: [
      "We keep commercial promises grounded in operational reality.",
      "We write pages and documents so non-technical stakeholders can still follow the process.",
      "We design around repeat orders, not one-off hero claims.",
    ],
    "zh-CN": [
      "商业承诺必须建立在真实可执行的运营基础上。",
      "页面和文件都要让非技术角色也能看懂流程。",
      "我们的结构为复购和长期合作而设计，而不是一次性包装。",
    ],
    es: [
      "Las promesas comerciales se basan en realidad operativa.",
      "Paginas y documentos deben ser claros tambien para perfiles no tecnicos.",
      "La estructura busca pedidos repetidos, no solo una promesa llamativa.",
    ],
    fr: [
      "Les promesses commerciales restent ancrees dans la realite operationnelle.",
      "Pages et documents doivent rester lisibles pour les profils non techniques.",
      "La structure vise les commandes repetes, pas une promesse ponctuelle.",
    ],
    ru: [
      "Коммерческие обещания должны опираться на реальную операционную основу.",
      "Страницы и документы понятны даже нетехническим участникам.",
      "Структура рассчитана на повторные заказы, а не на разовые заявления.",
    ],
    ar: [
      "تبقى الوعود التجارية مبنية على واقع تشغيلي قابل للتنفيذ.",
      "يجب أن تكون الصفحات والوثائق مفهومة حتى لغير التقنيين.",
      "نصمم للطلبات المتكررة لا للوعود الدعائية لمرة واحدة.",
    ],
  },
} satisfies {
  milestones: Record<Locale, string[]>;
  principles: Record<Locale, string[]>;
};
