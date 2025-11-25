import { NextResponse } from "next/server";

// API Route
export async function POST(req: Request) {
    try {
        // Read request body
        const requestBody = await req.json();
        const body = requestBody?.query || {
         "query": 
            [
             {"code": "Näitaja", "selection": { "filter": "item", "values": [ "GR_W_AVG" ] } },
             { "code": "Tegevusala", "selection": { "filter": "all", "values": ["*"] } } 
            ],
            "response": { "format": "json-stat2" }
        };
    
        // Making a request to STAT API
        const URL = process.env.STAT_API_URL;
        const res = await fetch(URL!, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {"Content-Type": "application/json"},
        });

        if (!res.ok) {
            console.error("STAT API request failed:", res.status, await res.text());
        }

        // Read JSON
        const data = await res.json();

        // Extract categories from API response
        const category = data?.dimension?.Tegevusala?.category?.label;
        if (!category) return NextResponse.json({error: "No fields found"}, {status: 500});
    
        // Restructure object structure
        const fields = Object.entries(category).map(([key, label]) => ({
            key,
            label
        }));

        // Return fields
        return NextResponse.json({ fields });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to fetch fields"}, { status: 500});
    }
};