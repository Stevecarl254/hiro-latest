// app/about/page.tsx
import type { Metadata } from "next";
import AboutClient from "./aboutClient";

export const metadata: Metadata = {
    title: "About Hiro Catering and Equipments| Premium Catering Services",
    description:
        "Learn about Hiro Catering & Equipments — a premium catering company delivering elegant, unforgettable food experiences for weddings, corporate events, and private functions in Kenya.",
    openGraph: {
        title: "About Hiro Catering & Equipments",
        description:
            "Discover our story, values, sustainability efforts, and commitment to unforgettable catering experiences.",
        url: "https://hirocateringandequipments.co.ke/about",
        siteName: "Hiro Catering and Equipments",
        images: [
            {
                url: "/about.jpeg",
                width: 1200,
                height: 630,
                alt: "Hiro Catering Team",
            },
        ],
        type: "website",
    },
};

export default function AboutPage() {
    return <AboutClient />;
}
