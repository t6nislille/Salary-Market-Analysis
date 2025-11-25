import { useState, useEffect } from "react";

// Define types
interface AiSummaryTypes {
    fieldName: string;
    years: string[];
    values: number[];
}

export default function AiSummary({ fieldName, years, values }: AiSummaryTypes) {
    // Holds generated summary
    const [summary, setSummary] = useState("");

    // Track errors
    const [error, setError] = useState("");

    // Show loader while API responds
    const [loading, setLoading] = useState(false);

    // Runs every time a change happens
    useEffect(() => {
        // Prevents running in empty state
        if (!fieldName) return;

        // Fetch from API route
        async function fetchSummary() {
            try {
                setSummary("");
                setError("");
                setLoading(true);
                
            
        
                const res = await fetch("/api/ai_summery", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({fieldName, years, values}),
                });

                // Error handle
                if (!res.ok) throw new Error("AI summary failed!");

                const data = await res.json();

                // Save summary to UI
                setSummary(data.summary);

            } catch (err) {
                console.error(err);
                setError("Kokkuvõtte loomine ebaõnnestus!");
            } finally {
                // Turns off loading
                setLoading(false);
            }

        } 
        fetchSummary();
    }, [fieldName, years, values]);

    // Don't render if field not selected
    if (!fieldName) return null;

    // Error message in UI
    if (error) return <p className="text-red-500">{error}</p>;

    // Loading state display
    if (loading) return <p>Kokkuvõtte laadimine...</p>;

    return (
        <div className="mt-5 p-6 bg-gray-40 border rounded-lg shadow">
            <h3 className="font-semibold mb-2">Palgatrendi kokkuvõte AI abiga</h3>
            <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                {summary}
            </pre>
        </div>
    );
}