import type { Metadata } from "next";
import { use } from "react";
import privacy from "@/app/data/translations/privacy";
import pageMeta from "@/app/data/translations/pageMeta";
import type { LangParams } from "@/app/types";
import { pageAlternates } from "@/lib/urls";
import LegalDocumentPage from "@/app/components/LegalDocumentPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<LangParams>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: pageMeta.privacy.title[lang],
    description: pageMeta.privacy.description[lang],
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
