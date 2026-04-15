import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildLanguageAlternates } from "@/lib/i18n";
import { breadcrumbSchema } from "@/lib/seo/schema";

describe("SEO helpers", () => {
  it("builds absolute canonical URLs", () => {
    const metadata = buildPageMetadata({
      title: "Products",
      description: "Product list page",
      path: "/products",
    });

    expect(metadata.alternates?.canonical).toBe(
      "https://www.remembereverything.com/products",
    );
  });

  it("builds breadcrumb structured data in order", () => {
    const schema = breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Products", path: "/products" },
    ]);

    expect(schema.itemListElement).toHaveLength(2);
    expect(schema.itemListElement[1]).toMatchObject({
      position: 2,
      name: "Products",
      item: "https://www.remembereverything.com/products",
    });
  });

  it("builds language alternates with x-default", () => {
    const alternates = buildLanguageAlternates("/products");

    expect(alternates.languages).toMatchObject({
      en: "https://www.remembereverything.com/products",
      "zh-CN": "https://www.remembereverything.com/zh-cn/products",
      es: "https://www.remembereverything.com/es/products",
      ru: "https://www.remembereverything.com/ru/products",
      fr: "https://www.remembereverything.com/fr/products",
      ar: "https://www.remembereverything.com/ar/products",
      "x-default": "https://www.remembereverything.com/products",
    });
  });
});
