import { useState, useEffect } from "react";

export default function AiSummary({ fieldName, years, values }) {
    // Holds generated summary
    const [summary, setSummary] = useState("");

    useEffect(() => {

        // Fetch from API route
        const res = fetch("/api/ai_summery", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({fieldName, years, values}),
        });
    })

    return (
        <div>
            <h3>Palgatrendi kokkuvõte OpenAI abiga</h3>
        </div>
    );
}