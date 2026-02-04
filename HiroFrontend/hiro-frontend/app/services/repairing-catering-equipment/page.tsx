import type { Metadata } from "next";
import RepairingCateringClient from "./RepairingCateringClient";

export const metadata: Metadata = {
  title: "Catering Equipment Repair & Maintenance",
  description: "Professional repair services for catering equipment in Kenya. Specialist maintenance for ovens, stoves, refrigeration, and electrical catering systems.",
  keywords: ["catering equipment repair", "oven repair kenya", "refrigeration maintenance nairobi", "kitchen equipment service"],
};

export default function RepairingCateringPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Catering Equipment Repair",
    "description": "Fast and reliable repair services for commercial catering equipment in Kenya.",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Hiro Catering Services"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Kenya"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RepairingCateringClient />
    </>
  );
}