import type { NextResponse } from "next/server";

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
}