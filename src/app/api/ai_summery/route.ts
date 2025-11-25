import { error } from "console";
import { NextResponse } from "next/server";

// API Route
export async function POST(req: Request) {
    try {
        // Parse values
        const { fieldName, years, values } = await req.json();

        const apiKey = process.env.GROQ_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                {error: "API KEY is not set"},
                { status: 500}
            );
        }

        // Prompt for OpenAI 
        const prompt = `
Sinu käes on Eesti keskmise palga andmed valdkonna "${fieldName}" kohta.
Aastad: ${years.join(", ")}
Keskmine brutokuupalk (samas järjekorras): ${values.join(", ")}

Sinu ülesanded:
1) Selgita lihtsas keeles, kas trend on tõusev, langev või stabiilne.
2) Kirjelda lühidalt, mida tähendab see nende valdkondade töötajate jaoks.
3) Paku ettevaatlik prognoos järgmise 2-3 aasta palgatasemele ( sõnaline kirjeldus, mitte numbrid).
4) Too välja 3-5 oskust või tegevust, mis aitaksid selles valdkonnas palgatõusu saavutada.

Vasta eesti keeles, struktureeritult:
- Trend:
- Kokkuvõte
- Prognoos
- Soovitused
`.trim();

        // Make a request to OpenAI API
        const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "llama-3.1-8b-instant",
                messages: [
                    {
                        role: "system",
                        content: "Sa oled abivalmis vanem andmeanalüütik, kes selgitab palatrende lihtsas keeles",
                    },
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
                // Lower temperature for more consistent results
                temperature: 0.4, 
            }),
        });

        // Handle OpenAI errors
        if (!groqRes.ok) {
                console.error("OpenAI API request failed:", await groqRes.text());
                return NextResponse.json(
                    { error: "Failed to get summary!"},
                    { status: 500 }
                );
            }

        // Extract summary from API response
        const json = await groqRes.json();
        const summary = 
        json.choices?.[0]?.message?.content ??
        "Kokkuvõtte loomisel tekkis viga!";

        // Return summary
        return NextResponse.json({ summary });

    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "Failed to create summary!"},
            { status: 500 }
        );
    }
}