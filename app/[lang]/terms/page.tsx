import type { Metadata } from "next";
import { use } from "react";
import terms from "@/app/data/translations/terms";
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
    title: pageMeta.terms.title[lang],
    description: pageMeta.terms.description[lang],
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
