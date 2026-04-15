import { render, screen } from "@testing-library/react";

import Home from "@/app/page";

jest.mock("@/lib/i18n", () => ({
  withLocalePath: jest.fn((_locale: string, pathname: string) => pathname),
}));

jest.mock("@/lib/i18n-server", () => ({
  getRequestLocale: jest.fn(async () => "en"),
}));

jest.mock("@/features/marketing/public-content", () => ({
  getPublishedCompanyProfile: jest.fn(async () => ({
    companyName: "Remember Everything Industrial Co., Ltd.",
    tagline: "Dependable OEM and export execution for global buyers",
    summary: "Structured B2B content for qualified inbound demand.",
    description: "Structured B2B content for qualified inbound demand.",
    logoImage: "/brand/site-preview.svg",
    logoImageAlt: "Remember Everything visual identity",
    email: "sales@remembereverything.com",
    phone: "+86 21 5555 0188",
    whatsapp: "https://wa.me/8613800138000",
    address: "Shanghai, China",
    seoTitle: "Remember Everything",
    seoDescription: "Structured B2B content for qualified inbound demand.",
    seoCanonical: "https://www.remembereverything.com",
  })),
  getPublishedProducts: jest.fn(async () => [
    {
      id: "product-1",
      slug: "smart-warehouse-scanner",
      name: "Smart Warehouse Scanner",
      category: "Warehouse Automation",
      description: "A rugged handheld scanner template.",
      intro: "Designed for warehouse workflows.",
      heroTitle: "Warehouse accuracy for fast-moving fulfillment lines",
      heroImage: "/brand/product-blueprint.svg",
      heroImageAlt: "Warehouse scanner illustration",
      sku: "RE-WS-2400",
      leadTime: "35-45 days",
      moq: "500 units",
      sellingPoints: ["Ruggedized housing"],
      specifications: [{ label: "Connectivity", value: "Bluetooth" }],
      faq: [],
      updatedAt: "2026-04-14T00:00:00.000Z",
    },
  ]),
  getPublishedIndustries: jest.fn(async () => [
    {
      id: "industry-1",
      slug: "consumer-electronics",
      name: "Consumer Electronics",
      summary: "Industry summary",
      heroTitle: "Applications tailored for electronics programs",
      image: "/brand/operations.svg",
      imageAlt: "Industry illustration",
      sections: [
        {
          heading: "Section 1",
          paragraphs: ["Industry paragraph"],
        },
      ],
      updatedAt: "2026-04-14T00:00:00.000Z",
    },
  ]),
  getPublishedBlogPosts: jest.fn(async () => [
    {
      id: "blog-1",
      slug: "reduce-lead-times",
      title: "How B2B teams reduce lead-time friction",
      summary: "Article summary",
      category: "Insights",
      readingTime: "5 min read",
      publishedAt: "2026-04-01",
      updatedAt: "2026-04-01",
      image: "/brand/insight-map.svg",
      imageAlt: "Article illustration",
      sections: [
        {
          heading: "Section 1",
          paragraphs: ["Article paragraph"],
        },
      ],
    },
  ]),
  getPublishedHomeFaq: jest.fn(async () => [
    {
      question: "How quickly can we receive a quotation package?",
      answer: "Usually within two working days.",
    },
  ]),
}));

jest.mock("@/features/marketing/components/CTAGroup", () => ({
  CTAGroup: () => <a href="/contact#quote">Request a Quote</a>,
}));

describe("Home Page", () => {
  it("renders the updated B2B homepage hero and CTA", async () => {
    render(await Home());

    expect(
      screen.getByRole("heading", {
        name: /industrial sourcing pages that read clearly/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /request a quote/i }).length).toBeGreaterThan(0);
  });
});
