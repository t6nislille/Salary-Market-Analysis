import type { NextResponse } from "next/server";

// Route Handler
export async function POST (req: Request) {
    const { fieldValue } = await req.json();

    const body = {
  "query": [
    {
      "code": "Näitaja",
      "selection": {
        "filter": "item",
        "values": [
          "GR_W_AVG"
        ]
      }
    },
    {
      "code": "Tegevusala",
      "selection": {
        "filter": "item",
        "values": [
          fieldValue
        ]
      }
    }
  ],
  "response": {
    "format": "json-stat2"
  }
};

// Making a request
const URL = process.env.STAT_API_URL;
const res = await fetch(URL!, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {"Content-Type": "application/json"},
});
}