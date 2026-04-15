import { StructuredData } from "@/components/StructuredData";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/features/marketing/components/Breadcrumbs";
import { CTAGroup } from "@/features/marketing/components/CTAGroup";
import { IllustrationPanel } from "@/features/marketing/components/IllustrationPanel";
import { PageHero } from "@/features/marketing/components/PageHero";
import { SectionHeading } from "@/features/marketing/components/SectionHeading";
import { getMarketingDictionary } from "@/features/marketing/copy";
import { getPublishedCompanyProfile } from "@/features/marketing/public-content";
import { localizeCompany } from "@/features/marketing/translations";
import { withLocalePath } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/i18n-server";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const locale = await getRequestLocale();
  const company = localizeCompany(locale, await getPublishedCompanyProfile());

  return buildPageMetadata({
    title: locale === "zh-CN" ? `关于 ${company.companyName}` : `About ${company.companyName}`,
    description:
      company.summary ||
      (locale === "zh-CN"
        ? "了解网站如何围绕报价、打样、生产透明度与出口文件来服务 B2B 买家。"
        : "Learn how Remember Everything structures quoting, sampling, production visibility, and export documentation for B2B buyers."),
    path: "/about",
    locale,
    keywords: ["about export supplier", "OEM manufacturing team", "B2B sourcing company"],
  });
}

export default async function AboutPage() {
  const locale = await getRequestLocale();
  const dictionary = getMarketingDictionary(locale);
  const company = localizeCompany(locale, await getPublishedCompanyProfile());
  const homeHref = withLocalePath(locale, "/");
  const aboutHref = withLocalePath(locale, "/about");
  const milestones =
    locale === "zh-CN"
      ? [
          "围绕目标市场和渠道计划展开商务评估",
          "覆盖包装、标签和功能预期的样品确认节点",
          "让采购和质量团队基于同一份简报推进量产跟踪",
          "为报关、仓储入库和上市团队准备出货前文件",
        ]
      : [
          "Commercial review aligned with the buyer’s target market and channel plan",
          "Sample approval checkpoints covering packaging, labels, and functional expectations",
          "Production follow-up designed to keep procurement and quality teams working from one brief",
          "Pre-shipment documentation prepared for customs, warehouse intake, and launch teams",
        ];
  const principles =
    locale === "zh-CN"
      ? [
          "商业承诺必须建立在真实可执行的运营基础上。",
          "页面和文件都要让非技术角色也能看懂流程。",
          "我们的结构为复购和长期合作而设计，而不是一次性包装。",
        ]
      : [
          "We keep commercial promises grounded in operational reality.",
          "We write pages and documents so non-technical stakeholders can still follow the process.",
          "We design around repeat orders, not one-off hero claims.",
        ];

  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: locale === "zh-CN" ? "首页" : "Home", path: homeHref },
          { name: dictionary.about.eyebrow, path: aboutHref },
        ])}
      />

      <PageHero
        eyebrow={dictionary.about.eyebrow}
        title={dictionary.about.title}
        description={company.description}
        breadcrumbs={<Breadcrumbs items={[{ label: locale === "zh-CN" ? "首页" : "Home", href: homeHref }, { label: dictionary.about.eyebrow }]} />}
        actions={<CTAGroup locale={locale} />}
        aside={
          <IllustrationPanel
            src={company.logoImage}
            alt={company.logoImageAlt}
            title={dictionary.about.heroAsideTitle}
            description={company.summary}
          />
        }
      />

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <SectionHeading
              eyebrow={dictionary.about.whatEyebrow}
              title={`${dictionary.about.whatTitle} ${company.companyName}.`}
              description={dictionary.about.whatDescription}
            />
            <div className="space-y-5 text-base leading-8 text-[var(--muted)]">
              <p>
                {company.companyName} {dictionary.about.introOne}
              </p>
              <p>
                {company.description}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-[var(--surface)]">
        <Container>
          <SectionHeading
            eyebrow={dictionary.about.projectEyebrow}
            title={dictionary.about.projectTitle}
            description={dictionary.about.projectDescription}
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {milestones.map((item, index) => (
              <article
                key={item}
                className="rounded-[2rem] border border-[var(--line)] bg-white p-6"
              >
                <p className="text-sm uppercase tracking-[0.18em] text-[var(--accent)]">
                  {dictionary.about.stage} {index + 1}
                </p>
                <h2 className="mt-3 text-2xl">{item}</h2>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow={dictionary.about.principlesEyebrow}
            title={dictionary.about.principlesTitle}
          />
          <div className="mt-8 space-y-4">
            {principles.map((principle) => (
              <div key={principle} className="flex gap-4 border-t border-[var(--line)] py-4">
                <span className="mt-3 h-2 w-2 rounded-full bg-[var(--accent)]" />
                <p className="text-base leading-8 text-[var(--muted)]">{principle}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
