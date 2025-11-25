import { useState, useEffect } from "react";

export default function AiSummary({ fieldName, years, values }) {
    // Holds generated summary
    const [summary, setSummary] = useState("");

    useEffect(() => {
        
        // Fetch from API route
        const fetchSummary = async () => {
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
        }

        fetchSummary();
    }, [fieldName, years, values]);

    // Don't render if field not selected
    if (!fieldName) return null;

    return (
        <div className="mt-5 p-6 bg-gray-40 border rounded-lg shadow">
            <h3 className="font-semibold mb-2">Palgatrendi kokkuvõte AI abiga</h3>
            <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                {summary}
            </pre>
        </div>
    );
}