import type { InquiryType } from "@prisma/client";

import { getMarketingDictionary } from "@/features/marketing/copy";
import { InquiryForm } from "@/features/inquiry/components/InquiryForm";
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

  return (
    <InquiryForm
      locale={locale}
      inquiryType={inquiryType}
      sourcePage={sourcePage}
      sourceProduct={sourceProduct}
      productSlug={productSlug}
      title={isQuote ? (locale === "zh-CN" ? "提交你的采购需求" : "Share your sourcing brief") : locale === "zh-CN" ? "和我们的销售团队聊一聊" : "Talk with our sales team"}
      description={
        isQuote
          ? locale === "zh-CN"
            ? "提交你的需求后，系统会保存询盘、记录来源上下文，并通知管理员邮箱。"
            : "Send your requirements and we will store the inquiry, capture the source context, and notify the admin contact."
          : locale === "zh-CN"
            ? "这个联系表单适合通用咨询、项目初步沟通，或在正式询价前先建立联系。"
            : "Use this contact form for general inquiries, project discovery, or the first conversation before you request a quotation."
      }
      submitLabel={isQuote ? dictionary.cta.requestQuote : dictionary.cta.contactUs}
      successTitle={isQuote ? (locale === "zh-CN" ? "报价需求已收到。" : "Quote request received.") : locale === "zh-CN" ? "留言已收到。" : "Message received."}
    />
  );
}
