"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // Log error to console in production (you can replace with error reporting service)
        if (process.env.NODE_ENV === "production") {
            console.error("ErrorBoundary caught an error:", error, errorInfo);
        }
    }

    render() {
        if (this.state.hasError) {
            // Render fallback UI
            return (
                this.props.fallback || (
                    <div className="min-h-screen flex items-center justify-center bg-gray-50">
                        <div className="text-center p-8">
                            <h2 className="text-2xl font-bold text-[#001f3f] mb-4">
                                Something went wrong
                            </h2>
                            <p className="text-gray-600 mb-6">
                                We apologize for the inconvenience. Please try refreshing the page.
                            </p>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-6 py-3 bg-[#FF6600] text-white rounded-lg hover:bg-[#e55a00] transition"
                            >
                                Refresh Page
                            </button>
                        </div>
                    </div>
                )
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
