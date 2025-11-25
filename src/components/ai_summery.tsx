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
        <div >
            <h3>Palgatrendi kokkuvõte OpenAI abiga</h3>
            <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                {summary}
            </pre>
        </div>
    );
}