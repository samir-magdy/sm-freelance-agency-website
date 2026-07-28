import type { Metadata } from "next";
import { use } from "react";
import terms from "@/app/data/translations/terms";
import { SITE_NAME } from "@/app/constants";
import type { Lang, LangParams } from "@/app/types";
import { pageAlternates } from "@/lib/urls";
import LegalDocumentPage from "@/app/components/LegalDocumentPage";

const metaDescription: Record<Lang, string> = {
  en: `Read the terms of service for ${SITE_NAME}. Learn about your rights and obligations when using our web design and development services.`,
  ar: `اطّلع على شروط الخدمة الخاصة بـ ${SITE_NAME} وتعرّف على حقوقك والتزاماتك عند استخدام خدمات تصميم المواقع لدينا.`,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<LangParams>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: terms.heading[lang] || terms.heading.en || "Terms of Service",
    description: metaDescription[lang] ?? metaDescription.en,
    robots: { index: false, follow: true },
    alternates: pageAlternates(lang, "/terms"),
  };
}

export default function TermsPage({
  params,
}: {
  params: Promise<LangParams>;
}) {
  const { lang } = use(params);
  return <LegalDocumentPage document={terms} lang={lang} />;
}
