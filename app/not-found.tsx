import Link from "next/link";

import { buttonStyles } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { withLocalePath } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/i18n-server";

const notFoundCopy = {
  en: {
    title: "Page Not Found",
    description:
      "Use the main navigation to continue exploring products, industry pages, or blog content.",
    home: "Back Home",
    contact: "Contact Us",
  },
  "zh-CN": {
    title: "页面未找到",
    description: "可以通过主导航继续浏览产品、行业页面或博客内容。",
    home: "返回首页",
    contact: "联系我们",
  },
  es: {
    title: "Pagina no encontrada",
    description:
      "Usa la navegacion principal para seguir explorando productos, industrias o articulos.",
    home: "Volver al inicio",
    contact: "Contactar",
  },
  fr: {
    title: "Page introuvable",
    description:
      "Utilisez la navigation principale pour continuer vers les produits, secteurs ou articles.",
    home: "Retour accueil",
    contact: "Nous contacter",
  },
  ru: {
    title: "Страница не найдена",
    description: "Перейдите через основную навигацию к продуктам, отраслям или блогу.",
    home: "На главную",
    contact: "Связаться",
  },
  ar: {
    title: "الصفحة غير موجودة",
    description: "استخدم التنقل الرئيسي لمتابعة تصفح المنتجات أو صفحات القطاعات أو المدونة.",
    home: "العودة للرئيسية",
    contact: "اتصل بنا",
  },
} as const;

export default async function NotFound() {
  const locale = await getRequestLocale();
  const copy = notFoundCopy[locale];

  return (
    <Section className="flex flex-1 items-center">
      <Container>
        <div className="mx-auto max-w-2xl text-center py-16">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-[var(--accent-soft)]">
            <svg className="h-10 w-10 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </div>
          <p className="eyebrow eyebrow-accent justify-center mb-4">
            404
          </p>
          <h1 className="text-4xl font-black sm:text-5xl">
            {copy.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[var(--muted)]">
            {copy.description}
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link className={buttonStyles({ variant: "primary", size: "lg" })} href={withLocalePath(locale, "/")}>
              {copy.home}
            </Link>
            <Link className={buttonStyles({ variant: "secondary", size: "lg" })} href={withLocalePath(locale, "/contact")}>
              {copy.contact}
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
