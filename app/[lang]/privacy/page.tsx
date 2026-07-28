import type { Metadata } from "next";
import { use } from "react";
import privacy from "@/app/data/translations/privacy";
import { SITE_NAME } from "@/app/constants";
import type { Lang, LangParams } from "@/app/types";
import { pageAlternates } from "@/lib/urls";
import LegalDocumentPage from "@/app/components/LegalDocumentPage";

const metaDescription: Record<Lang, string> = {
  en: `Read ${SITE_NAME}'s privacy policy to understand how we collect, use, and protect your personal data when you use our services.`,
  ar: `اطّلع على سياسة الخصوصية الخاصة بـ ${SITE_NAME} وتعرّف على كيفية جمع بياناتك الشخصية واستخدامها وحمايتها.`,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<LangParams>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: privacy.heading[lang] || privacy.heading.en || "Privacy Policy",
    description: metaDescription[lang] ?? metaDescription.en,
    robots: { index: false, follow: true },
    alternates: pageAlternates(lang, "/privacy"),
  };
}

export default function PrivacyPage({
  params,
}: {
  params: Promise<LangParams>;
}) {
  const { lang } = use(params);
  return <LegalDocumentPage document={privacy} lang={lang} />;
}
