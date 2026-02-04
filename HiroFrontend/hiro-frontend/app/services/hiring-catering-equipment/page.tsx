import type { Metadata } from "next";
import HiringCateringClient from "./HiringCateringClient";

export const metadata: Metadata = {
  title: "Catering Equipment Hire | Tents, Chairs, Tables & Decor",
  description: "High-quality catering equipment for hire in Kenya. We provide Tents, Chairs, Tables, Tableware, Decor, Linens, and Lighting for all events and occasions.",
  keywords: ["equipment hire kenya", "tent rental nairobi", "chair hire kenya", "catering equipment for rent", "event decor hiring"],
};

export default function HiringCateringPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Catering Equipment Hiring",
    "description": "Premium hiring services for catering equipment including tents, chairs, tables, and event decor in Kenya.",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Hiro Catering Services"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Kenya"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Catering Equipment",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Tents for Hire"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Chairs & Seating"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Tables & Tableware"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Decor & Linens"
          }
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HiringCateringClient />
    </>
  );
}