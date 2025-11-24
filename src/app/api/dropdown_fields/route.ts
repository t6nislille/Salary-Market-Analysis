import { NextResponse } from "next/server";

export async function GET() {
    try {

        const body = {
    "query": [
        {"code": "Näitaja", "selection": { "filter": "item", "values": [ "GR_W_AVG" ] } },
        { "code": "Tegevusala", "selection": { "filter": "item", "values": [ ] } } 
    ],
        "response": { "format": "json-stat2" }
    };

    // Making a request
    const URL = process.env.STAT_API_URL;
    const res = await fetch(URL!, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {"Content-Type": "application/json"},
    });

    // Read JSON
    const data = await res.json();

    // List for field names
    

    }
}