import type { Metadata } from "next";
import CorporateServicesClient from "./CorporateServicesClient";

export const metadata: Metadata = {
  title: "Corporate Services",
  description: "Professional corporate catering and hospitality solutions in Kenya. Specialized in conferences, business meetings, and professional event coordination.",
};

export default function CorporateServicesPage() {
  return <CorporateServicesClient />;
}