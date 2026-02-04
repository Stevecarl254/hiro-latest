import type { Metadata } from "next";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
    title: "Event Gallery",
    description: "View our portfolio of successfully executed events, including weddings, corporate functions, and private parties in Kenya.",
};

export default function GalleryPage() {
    return <GalleryClient />;
}
