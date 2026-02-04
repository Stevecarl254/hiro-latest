import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
    title: "Contact Us | Hiro Catering & Equipment Hire Kenya",
    description:
        "Contact Hiro Catering Services for event catering, equipment hire, weddings and corporate events in Kenya. We respond within 24 hours.",
    keywords: [
        "contact hiro catering",
        "catering services Kenya",
        "event catering Nairobi",
        "equipment hire Kenya",
        "contact event planners Kenya",
        "hire chairs tables tents Kenya",
        "Hiro Catering contact",
        "catering quote Kenya",
        "catering equipments hire",
        "Hiro Catering Services",
    ],
    alternates: {
        canonical: "https://hirocateringandequipment.co.ke/contact",
    },
    openGraph: {
        title: "Contact Hiro Catering & Equipment Hire",
        description:
            "Get in touch with Hiro Catering Services for professional catering and equipment hire across Kenya.",
        url: "https://hirocateringandequipment.co.ke/contact",
        siteName: "Hiro Catering Services",
        images: [
            {
                url: "https://hirocateringandequipment.co.ke/og/logo.png",
                width: 1200,
                height: 630,
                alt: "Contact Hiro Catering Services",
            },
        ],
        locale: "en_KE",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Contact Hiro Catering & Equipment Hire",
        description:
            "Talk to Hiro Catering Services today. Fast responses for catering and equipment hire.",
        images: ["https://hirocateringandequipment.co.ke/og/logo.png"],
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function ContactPage() {
    return <ContactClient />;
}
