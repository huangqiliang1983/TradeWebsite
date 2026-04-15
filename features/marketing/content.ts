export type FAQItem = {
  question: string;
  answer: string;
};

export type ContentSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type Product = {
  slug: string;
  name: string;
  category: string;
  description: string;
  intro: string;
  heroTitle: string;
  heroImageAlt: string;
  image: string;
  sku: string;
  leadTime: string;
  moq: string;
  sellingPoints: string[];
  specifications: Array<{ label: string; value: string }>;
  faq: FAQItem[];
};

export type IndustryApplication = {
  slug: string;
  name: string;
  summary: string;
  heroTitle: string;
  image: string;
  imageAlt: string;
  sections: ContentSection[];
};

export type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  readingTime: string;
  publishedAt: string;
  updatedAt: string;
  image: string;
  imageAlt: string;
  sections: ContentSection[];
};

export const companyStats = [
  { value: "18+", label: "Years in export manufacturing" },
  { value: "42", label: "Production cells audited each quarter" },
  { value: "96%", label: "Orders shipped on agreed milestone dates" },
  { value: "30+", label: "Countries served with repeat buyers" },
];

export const homeHighlights = [
  {
    title: "Faster quoting for technical buyers",
    description:
      "We package pricing, tooling notes, compliance assumptions, and shipping terms into one buyer-ready brief.",
  },
  {
    title: "Process visibility before the PO lands",
    description:
      "From sample approval to final inspection, every step is designed to reduce uncertainty for procurement teams.",
  },
  {
    title: "Documentation built for customs and quality teams",
    description:
      "Packing lists, labels, and test records are prepared in export-ready formats so launches move without rework.",
  },
];

export const homeFaq: FAQItem[] = [
  {
    question: "How quickly can we receive a quotation package?",
    answer:
      "For standard briefs we normally return a structured quotation within two working days, including assumptions, lead time, MOQ, and recommended next actions.",
  },
  {
    question: "Can you support OEM and private label programs?",
    answer:
      "Yes. We support OEM, co-branded, and private label programs with packaging review, sample approval, inspection checkpoints, and export document coordination.",
  },
  {
    question: "What information helps your team quote accurately?",
    answer:
      "The most useful inputs are target market, expected annual volume, product drawings or photos, certification needs, and the desired delivery term.",
  },
];

export const products: Product[] = [
  {
    slug: "smart-warehouse-scanner",
    name: "Smart Warehouse Scanner",
    category: "Warehouse Automation",
    description:
      "A rugged handheld scanner template for distributors that need faster receiving, cycle counting, and outbound verification.",
    intro:
      "Designed for high-frequency warehouse workflows, this product template highlights how we package hardware, accessories, and documentation for multi-site buyers.",
    heroTitle: "Warehouse accuracy for fast-moving fulfillment lines",
    heroImageAlt: "Illustration of a handheld warehouse scanner with process checkpoints",
    image: "/brand/product-blueprint.svg",
    sku: "RE-WS-2400",
    leadTime: "35-45 days after sample approval",
    moq: "500 units",
    sellingPoints: [
      "Ruggedized housing ready for long shifts and repetitive scanning",
      "Accessory program for chargers, cradles, labels, and multilingual manuals",
      "Pre-shipment verification workflow aligned to distributor acceptance checks",
    ],
    specifications: [
      { label: "Connectivity", value: "Bluetooth 5.0 / USB-C dock" },
      { label: "Battery profile", value: "Up to 16 hours on standard shift use" },
      { label: "Protection", value: "IP54 enclosure with drop-tested shell" },
      { label: "Packaging", value: "Retail carton, bulk export carton, custom insert optional" },
    ],
    faq: [
      {
        question: "Can this template support custom firmware loading?",
        answer:
          "The detail template is prepared for firmware and accessory notes so technical buyers can review customization scope before sampling.",
      },
      {
        question: "Do you support label and carton localization?",
        answer:
          "Yes. Carton marks, instruction sheets, insert cards, and compliance icons can be localized for your destination market.",
      },
    ],
  },
  {
    slug: "cold-chain-tracker",
    name: "Cold Chain Tracker",
    category: "Temperature Monitoring",
    description:
      "A temperature and location tracker template for importers managing cold-chain compliance, packaging validation, and reporting needs.",
    intro:
      "This template shows how we present compliance-sensitive products with traceability notes, packing logic, and buyer-friendly specifications.",
    heroTitle: "Traceable cold-chain visibility from factory to delivery point",
    heroImageAlt: "Illustration of a cold-chain tracker with route monitoring display",
    image: "/brand/operations.svg",
    sku: "RE-CT-1180",
    leadTime: "30-40 days after sample sign-off",
    moq: "300 units",
    sellingPoints: [
      "Data export workflow prepared for QA and claims review",
      "Packaging options for pharma, food, and specialty logistics programs",
      "Inspection checklist focused on battery integrity and sensor calibration",
    ],
    specifications: [
      { label: "Monitoring range", value: "-30C to 70C" },
      { label: "Reporting", value: "CSV / PDF trip summary template" },
      { label: "Enclosure", value: "Compact sealed module with tamper-evident label" },
      { label: "Battery life", value: "Up to 120 days depending on upload interval" },
    ],
    faq: [
      {
        question: "Can we adapt this for a branded monitoring kit?",
        answer:
          "Yes. We can package the tracker with inserts, labels, starter guides, and destination-specific documentation requirements.",
      },
      {
        question: "What data is typically included in the launch package?",
        answer:
          "Buyers usually receive trip log samples, calibration notes, carton specs, and pre-shipment inspection checkpoints.",
      },
    ],
  },
  {
    slug: "custom-label-station",
    name: "Custom Label Station",
    category: "Inspection and Packing",
    description:
      "A compact print-and-apply station template for teams that need accurate carton labeling, relabeling, and export packing checks.",
    intro:
      "Built for private label and multi-SKU operations, this template helps sales and operations teams explain setup, accuracy, and documentation flow.",
    heroTitle: "Reliable labeling for export cartons, kits, and retail packs",
    heroImageAlt: "Illustration of a labeling station beside export cartons",
    image: "/brand/insight-map.svg",
    sku: "RE-LS-830",
    leadTime: "25-35 days after approved sample",
    moq: "200 units",
    sellingPoints: [
      "Supports relabeling, inspection hold, and final carton verification workflows",
      "Compact footprint for contract packing lines and secondary assembly cells",
      "Structured onboarding notes for operators, QA leads, and procurement teams",
    ],
    specifications: [
      { label: "Print width", value: "Up to 108 mm" },
      { label: "Media support", value: "Paper and synthetic label stock" },
      { label: "Line setup", value: "Standalone workstation or conveyor side-mount" },
      { label: "Documentation", value: "Packing SOP, operator guide, maintenance checklist" },
    ],
    faq: [
      {
        question: "Can the template cover multiple pack-out scenarios?",
        answer:
          "Yes. The specification area is structured to show carton, unit, and pallet labeling requirements side by side.",
      },
      {
        question: "Is this page meant for direct e-commerce checkout?",
        answer:
          "No. The template is optimized for B2B quoting and inquiry capture, with the final CTA guiding buyers toward specification review.",
      },
    ],
  },
];

export const industries: IndustryApplication[] = [
  {
    slug: "consumer-electronics",
    name: "Consumer Electronics",
    summary:
      "For buyers balancing launch timing, accessory consistency, and export packaging across multiple retail channels.",
    heroTitle: "Applications tailored for electronics programs with tight launch windows",
    image: "/brand/operations.svg",
    imageAlt: "Illustration of electronics goods moving through warehouse and QA checkpoints",
    sections: [
      {
        heading: "Where buyers usually lose time",
        paragraphs: [
          "Electronics importers often spend extra cycles reconciling packaging, accessory lists, and carton marks after the product itself is already approved.",
          "This application template shows how we frame those questions early so procurement and marketing teams can move together.",
        ],
      },
      {
        heading: "How the workflow is presented",
        paragraphs: [
          "We organize the page around target market, pack-out logic, compliance expectations, and the checkpoints needed to release mass production.",
        ],
        bullets: [
          "Sample approval sequence",
          "Accessory and insert verification",
          "Carton label and shipping mark review",
        ],
      },
    ],
  },
  {
    slug: "cold-chain-logistics",
    name: "Cold Chain Logistics",
    summary:
      "For logistics teams that need dependable monitoring hardware, clear trip records, and packaging discipline for temperature-sensitive goods.",
    heroTitle: "Operational visibility for temperature-sensitive shipping programs",
    image: "/brand/product-blueprint.svg",
    imageAlt: "Illustration of a logistics route with cold-chain checkpoints",
    sections: [
      {
        heading: "Buyer priorities we surface",
        paragraphs: [
          "Cold-chain teams typically want to see usable data handling, packaging protection, and deployment instructions before they approve a pilot program.",
        ],
      },
      {
        heading: "What the application page supports",
        paragraphs: [
          "The page structure leaves room for validation steps, launch metrics, and FAQ content that answers operational concerns in plain language.",
        ],
        bullets: [
          "Pilot order scope",
          "Packaging integrity checkpoints",
          "Trip summary outputs for customer service and claims teams",
        ],
      },
    ],
  },
  {
    slug: "private-label-retail",
    name: "Private Label Retail",
    summary:
      "For retailers coordinating design, packaging, and repeat replenishment without losing control over quality and schedule.",
    heroTitle: "Application planning for private label teams that need consistency at scale",
    image: "/brand/insight-map.svg",
    imageAlt: "Illustration of retail packaging plans and production checkpoints",
    sections: [
      {
        heading: "How we structure the page",
        paragraphs: [
          "Private label programs work best when packaging, accessories, and compliance notes are visible in one place. This template is built to present that story clearly.",
        ],
      },
      {
        heading: "Recommended modules",
        paragraphs: [
          "Each application page can highlight the channel mix, packaging variants, and the QA gates that matter most before mass production.",
        ],
        bullets: [
          "Channel-specific packaging logic",
          "Inspection checkpoints for print and assembly",
          "FAQ for replenishment and reorder planning",
        ],
      },
    ],
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "reduce-lead-times-cross-border-fulfillment",
    title: "How B2B teams reduce lead-time friction in cross-border fulfillment",
    summary:
      "A practical overview of how importers shorten the gap between internal approval, factory release, and shipment readiness.",
    category: "Operations",
    readingTime: "5 min read",
    publishedAt: "2026-03-03",
    updatedAt: "2026-03-03",
    image: "/brand/insight-map.svg",
    imageAlt: "Illustration of milestone planning for global fulfillment",
    sections: [
      {
        heading: "Start with one approval path",
        paragraphs: [
          "Lead times slip when product, packaging, and shipping assumptions live in separate conversations. The fastest teams consolidate those decisions into one review pack.",
          "That makes it easier for procurement, quality, and logistics leads to approve the same working version of the order.",
        ],
        bullets: [
          "Confirm the target market and Incoterm early",
          "Freeze packaging scope before mass production begins",
          "Document approval owners for each milestone",
        ],
      },
      {
        heading: "Treat documentation as part of production",
        paragraphs: [
          "Inspection checklists, packing lists, and label files are not afterthoughts. They are part of the production system that determines whether goods can actually leave on time.",
        ],
      },
    ],
  },
  {
    slug: "what-procurement-teams-need-before-requesting-a-quote",
    title: "What procurement teams should prepare before requesting a quote",
    summary:
      "The fastest quotation cycles usually come from buyers that brief target volume, destination market, and quality requirements in one clear package.",
    category: "Procurement",
    readingTime: "4 min read",
    publishedAt: "2026-02-19",
    updatedAt: "2026-02-19",
    image: "/brand/operations.svg",
    imageAlt: "Illustration of a buyer quote brief with quality and logistics notes",
    sections: [
      {
        heading: "Volume and market come first",
        paragraphs: [
          "A supplier can only give a dependable quote when it understands the market, the annual demand shape, and the packaging expectation.",
        ],
        bullets: [
          "Target annual volume and launch timing",
          "Destination market and certification scope",
          "Packaging assumptions and private label needs",
        ],
      },
      {
        heading: "Share the constraints that matter",
        paragraphs: [
          "If your team has a maximum carton size, pallet rule, or onboarding checklist, sharing it upfront saves time and avoids revisions later.",
        ],
      },
    ],
  },
  {
    slug: "using-faqs-to-improve-b2b-seo-and-conversion",
    title: "Using FAQ content to improve B2B SEO and inquiry quality",
    summary:
      "Good FAQ blocks do more than fill space. They help search engines understand intent and help buyers self-qualify before they contact sales.",
    category: "SEO",
    readingTime: "6 min read",
    publishedAt: "2026-01-28",
    updatedAt: "2026-01-28",
    image: "/brand/product-blueprint.svg",
    imageAlt: "Illustration of FAQ planning connected to SEO and inquiries",
    sections: [
      {
        heading: "Answer the practical objections",
        paragraphs: [
          "The best FAQ sections answer volume, lead time, customization, and document questions in plain language. Those are the questions that block buyers from reaching out.",
        ],
      },
      {
        heading: "Keep the answers specific and readable",
        paragraphs: [
          "Short, direct answers support both scanning behavior and structured data. They also keep internal knowledge from turning into vague marketing copy.",
        ],
        bullets: [
          "Use one intent per question",
          "Avoid repeating the hero copy",
          "Link the FAQ to a clear next CTA",
        ],
      },
    ],
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getIndustry(slug: string) {
  return industries.find((industry) => industry.slug === slug);
}

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
