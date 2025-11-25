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

            const data = await res.json();
        }
    })

    return (
        <div>
            <h3>Palgatrendi kokkuvõte OpenAI abiga</h3>
        </div>
    );
}