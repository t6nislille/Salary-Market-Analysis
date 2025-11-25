import { error } from "console";
import { NextResponse } from "next/server";

// API Route
export async function POST(req: Request) {

    // Parse values
    const { fieldName } = await req.json();

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        return NextResponse.json(
            {error: "API KEY is not set"},
            { status: 500}
        );
    }

    const prompt = 
    'Sinu käes on Eesti keskmise palga andmed valdkonna "${fieldName}" kohta.'

    // Make a request to OpenAI API
    const openAiRes = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            Authorization: "Bearer ${apiKey}",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "gpt-40",
            messages: [
                {
                    role: "system",
                    content: ""
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
}