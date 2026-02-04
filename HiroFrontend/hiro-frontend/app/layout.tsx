// app/layout.tsx
import Script from "next/script";
import "./globals.css";
import { Figtree } from "next/font/google";
import ClientWrapper from "../components/ClientWrapper";
import type { Metadata } from "next";
import { ReactNode } from "react";

const figtree = Figtree({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: {
    default: "Hiro Catering Services | Premium Event Catering in Kenya",
    template: "%s | Hiro Catering Services"
  },
  description: "Hiro Catering Services is your premier partner for exquisite event catering, corporate hospitality, and professional equipment hiring in Kenya.",
  keywords: ["catering kenya", "event equipment hire", "corporate catering nairobi", "wedding catering kenya", "party hospitality services"],
  authors: [{ name: "Hiro Catering" }],
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://hirocateringandequipments.co.ke",
    siteName: "Hiro Catering Services",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Hiro Catering Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hiro Catering Services",
    description: "Premium event catering and equipment hiring services in Kenya.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${figtree.className} bg-gray-50 text-gray-900`}>
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Hiro Catering Services",
            "image": "https://hirocateringandequipments.co.ke/logo.png",
            "@id": "https://hirocateringandequipments.co.ke",
            "url": "https://hirocateringandequipments.co.ke",
            "telephone": "+254722440643",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Nairobi",
              "addressLocality": "Nairobi",
              "addressRegion": "Nairobi",
              "postalCode": "00100",
              "addressCountry": "KE"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": -1.2921,
              "longitude": 36.8219
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
              ],
              "opens": "08:00",
              "closes": "18:00"
            },
            "sameAs": [
              "https://www.facebook.com/hirocatering",
              "https://www.instagram.com/hirocatering"
            ]
          })}
        </Script>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}