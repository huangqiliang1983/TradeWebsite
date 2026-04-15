import type { InquiryType } from "@prisma/client";

import { getMarketingDictionary } from "@/features/marketing/copy";
import { InquiryForm } from "@/features/inquiry/components/InquiryForm";
import { pickLocalizedText } from "@/features/marketing/localized-text";
import type { Locale } from "@/lib/i18n";

type InquiryFormCardProps = {
  locale?: Locale;
  inquiryType?: InquiryType;
  sourcePage: string;
  sourceProduct?: string;
  productSlug?: string;
};

export function InquiryFormCard({
  locale = "en",
  inquiryType = "CONTACT",
  sourcePage,
  sourceProduct,
  productSlug,
}: InquiryFormCardProps) {
  const isQuote = inquiryType === "QUOTE";
  const dictionary = getMarketingDictionary(locale);
  const quoteTitle = pickLocalizedText(locale, {
    en: "Share your sourcing brief",
    "zh-CN": "提交你的采购需求",
    es: "Comparta su brief de compra",
    fr: "Partagez votre brief d'achat",
    ru: "Поделитесь закупочным брифом",
    ar: "شارك موجز التوريد",
  });
  const contactTitle = pickLocalizedText(locale, {
    en: "Talk with our sales team",
    "zh-CN": "和我们的销售团队聊一聊",
    es: "Hable con nuestro equipo comercial",
    fr: "Echangez avec notre equipe commerciale",
    ru: "Свяжитесь с отделом продаж",
    ar: "تحدث مع فريق المبيعات",
  });
  const quoteDescription = pickLocalizedText(locale, {
    en: "Send your requirements and we will store the inquiry, capture the source context, and notify the admin contact.",
    "zh-CN": "提交你的需求后，系统会保存询盘、记录来源上下文，并通知管理员邮箱。",
    es: "Envie sus requisitos; guardaremos la consulta, registraremos el origen y notificaremos al administrador.",
    fr: "Envoyez vos besoins ; nous enregistrons la demande, la source et notifions l'administrateur.",
    ru: "Отправьте требования: мы сохраним заявку, источник и уведомим администратора.",
    ar: "أرسل متطلباتك؛ سنحفظ الاستفسار ونسجل المصدر ونخطر المسؤول.",
  });
  const contactDescription = pickLocalizedText(locale, {
    en: "Use this contact form for general inquiries, project discovery, or the first conversation before you request a quotation.",
    "zh-CN": "这个联系表单适合通用咨询、项目初步沟通，或在正式询价前先建立联系。",
    es: "Use este formulario para consultas generales, exploracion de proyecto o primer contacto antes de cotizar.",
    fr: "Utilisez ce formulaire pour une demande generale, une decouverte projet ou un premier contact avant devis.",
    ru: "Используйте форму для общих вопросов, первичного обсуждения или контакта перед расчетом.",
    ar: "استخدم هذا النموذج للاستفسارات العامة أو استكشاف المشروع أو التواصل الأول قبل عرض السعر.",
  });
  const quoteSuccess = pickLocalizedText(locale, {
    en: "Quote request received.",
    "zh-CN": "报价需求已收到。",
    es: "Solicitud de cotizacion recibida.",
    fr: "Demande de devis recue.",
    ru: "Запрос цены получен.",
    ar: "تم استلام طلب عرض السعر.",
  });
  const contactSuccess = pickLocalizedText(locale, {
    en: "Message received.",
    "zh-CN": "留言已收到。",
    es: "Mensaje recibido.",
    fr: "Message recu.",
    ru: "Сообщение получено.",
    ar: "تم استلام الرسالة.",
  });

  return (
    <InquiryForm
      locale={locale}
      inquiryType={inquiryType}
      sourcePage={sourcePage}
      sourceProduct={sourceProduct}
      productSlug={productSlug}
      title={isQuote ? quoteTitle : contactTitle}
      description={isQuote ? quoteDescription : contactDescription}
      submitLabel={isQuote ? dictionary.cta.requestQuote : dictionary.cta.contactUs}
      successTitle={isQuote ? quoteSuccess : contactSuccess}
    />
  );
}
