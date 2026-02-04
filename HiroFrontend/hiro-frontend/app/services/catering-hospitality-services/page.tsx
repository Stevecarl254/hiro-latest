import type { Metadata } from "next";
import CateringHospitalityClient from "./CateringHospitalityClient";

export const metadata: Metadata = {
    title: "Catering & Hospitality Services",
    description: "Exquisite gourmet catering and professional hospitality services for weddings, corporate galas, and private events in Kenya.",
};

export default function CateringHospitalityPage() {
    return <CateringHospitalityClient />;
}
