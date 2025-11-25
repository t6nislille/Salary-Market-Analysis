import { useState, useEffect } from "react";

export default function AiSummary({ fieldName, years, values }) {
    // Holds generated summary
    const [summary, setSummary] = useState("");

    // Track errors
    const [error, setError] = useState("");

    // Runs every time a change happens
    useEffect(() => {
        // Prevents running in empty state
        if (!fieldName) return;

        // Fetch from API route
        async function fetchSummary() {
            try {
                setSummary("");
                setError("");
                
            
        
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
        }

        } 
        fetchSummary();
    }, [fieldName, years, values]);

    // Don't render if field not selected
    if (!fieldName) return null;

    // Error message in UI
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="mt-5 p-6 bg-gray-40 border rounded-lg shadow">
            <h3 className="font-semibold mb-2">Palgatrendi kokkuvõte AI abiga</h3>
            <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                {summary}
            </pre>
        </div>
    );
}