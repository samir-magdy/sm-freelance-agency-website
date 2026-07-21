import type { Metadata } from "next";
import { SITE_NAME } from "./constants";
import NotFoundContent from "./components/NotFoundContent";

export const metadata: Metadata = {
  title: `Page Not Found | ${SITE_NAME}`,
};

export default function NotFound() {
  return <NotFoundContent />;
}
