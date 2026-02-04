"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { CheckCircle, Wrench, Hammer, Settings, Zap } from "lucide-react";

const specialties = [
    { title: "Oven & Stove Repair", icon: <Wrench className="w-8 h-8 text-[#001f3f]" /> },
    { title: "Refrigeration Maintenance", icon: <Hammer className="w-8 h-8 text-[#001f3f]" /> },
    { title: "Electrical Systems", icon: <Settings className="w-8 h-8 text-[#001f3f]" /> },
    { title: "Emergency Repairs", icon: <Zap className="w-8 h-8 text-[#001f3f]" /> },
];

const processSteps = [
    {
        title: "Assessment & Diagnosis",
        description:
            "We inspect your catering equipment thoroughly to identify any issues or potential failures.",
        icon: <Wrench className="w-6 h-6 text-white" />,
    },
    {
        title: "Disassembly & Cleaning",
        description:
            "Equipment is carefully disassembled and cleaned to ensure optimal repair conditions.",
        icon: <Hammer className="w-6 h-6 text-white" />,
    },
    {
        title: "Repair & Replacement",
        description:
            "Faulty parts are repaired or replaced using professional-grade tools and materials.",
        icon: <Settings className="w-6 h-6 text-white" />,
    },
    {
        title: "Testing & Quality Check",
        description:
            "Each item is rigorously tested to ensure full functionality and safety.",
        icon: <Zap className="w-6 h-6 text-white" />,
    },
    {
        title: "Final Delivery",
        description:
            "Your equipment is delivered back, fully operational and ready for use.",
        icon: <Wrench className="w-6 h-6 text-white" />,
    },
];

const RepairingCateringClient: React.FC = () => {
    const revealRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("opacity-100", "translate-y-0");
                    }
                });
            },
            { threshold: 0.15 }
        );

        revealRefs.current.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
            {/* Hero Section */}
            <section className="bg-[#001f3f] text-white py-24 px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Repairing Catering Equipment</h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6 text-white/90">
                    Fast, professional, and reliable repair services to keep your catering operations running smoothly.
                </p>
                <Link
                    href="/get-quote"
                    className="inline-block px-8 py-3 bg-[#5cc3ff] text-[#001f3f] font-semibold rounded hover:bg-white transition"
                >
                    Book a Repair
                </Link>
            </section>

            {/* Specialties Section */}
            <section className="py-20 px-6 max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#001f3f] dark:text-white">
                    Our Repair Specialties
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {specialties.map((spec) => (
                        <div
                            key={spec.title}
                            className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow hover:shadow-lg transition text-center"
                        >
                            <div className="bg-[#5cc3ff]/20 p-4 rounded-full mb-4 inline-flex justify-center items-center">
                                {spec.icon}
                            </div>
                            <h3 className="text-xl font-semibold">{spec.title}</h3>
                        </div>
                    ))}
                </div>
            </section>

            {/* Process Section - Vertical Timeline */}
            <section className="py-20 px-6 bg-gray-50 dark:bg-gray-950">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#001f3f] dark:text-white">
                    How Our Process Works
                </h2>

                <div className="relative max-w-3xl mx-auto">
                    {/* Vertical line for timeline */}
                    <div className="absolute left-6 top-0 h-full w-1 bg-[#5cc3ff]/40 rounded" />

                    <div className="space-y-12">
                        {processSteps.map((step, idx) => (
                            <div
                                key={step.title}
                                ref={(el) => {
                                    revealRefs.current[idx] = el;
                                }}
                                className="opacity-0 translate-y-10 transition-all duration-700 flex flex-col sm:flex-row sm:items-start gap-4"
                            >
                                {/* Icon */}
                                <div className="flex-shrink-0 z-10 w-12 h-12 bg-[#001f3f] rounded-full flex items-center justify-center mt-1">
                                    {step.icon}
                                </div>

                                {/* Card */}
                                <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-6 flex-1">
                                    <h3 className="text-xl font-semibold mb-2 text-[#001f3f] dark:text-white">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-700 dark:text-gray-300">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-20 px-6 max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-[#001f3f] dark:text-white">
                    Why Choose Us
                </h2>

                <ul className="space-y-6">
                    {[
                        "Experienced technicians with catering equipment expertise.",
                        "Quick turnaround times for minimal downtime.",
                        "Professional-grade tools and genuine parts.",
                        "Strict quality assurance on all repairs.",
                    ].map((text) => (
                        <li key={text} className="flex gap-4 justify-center items-start">
                            <CheckCircle className="w-6 h-6 text-[#5cc3ff] shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">{text}</span>
                        </li>
                    ))}
                </ul>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-[#001f3f] text-white text-center px-6">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Your Equipment Repaired Today</h2>
                <p className="max-w-xl mx-auto mb-6 text-white/90">
                    Trust our skilled technicians to restore your catering equipment efficiently.
                </p>
                <Link
                    href="/contact"
                    className="inline-block px-8 py-3 bg-[#5cc3ff] text-[#001f3f] font-semibold rounded hover:bg-white transition"
                >
                    Contact Us
                </Link>
            </section>
        </div>
    );
};

export default RepairingCateringClient;
