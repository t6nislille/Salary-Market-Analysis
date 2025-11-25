import { error } from "console";
import { NextResponse } from "next/server";

// API Route
export async function POST(req: Request) {
    
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        return NextResponse.json(
            {error: "API KEY is not set"},
            { status: 500}
        )
    }
}