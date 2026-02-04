import type { Metadata } from "next";
import ShortTermWaitersClient from "./ShortTermWaitersClient";

export const metadata: Metadata = {
  title: "Professional Event Staffing | Waiters & Hostesses",
  description: "Hire trained and professional waiters, waitresses, and hostesses for your events in Kenya. Quality staffing solutions for corporate and private functions.",
  keywords: ["event staff hire kenya", "waiter service nairobi", "hostess hire kenya", "professional event servers"],
};

export default function ShortTermWaitersPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Short Term Staffing Services",
    "description": "Professional event staffing solutions including waiters, waitresses, and hostesses in Kenya.",
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
      <ShortTermWaitersClient />
    </>
  );
}