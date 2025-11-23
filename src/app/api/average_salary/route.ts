import { NextResponse } from "next/server";

// Route Handler
export async function POST (req: Request) {
    // "Tegevusala"
    const { fieldValue } = await req.json();

    const body = {
  "query": [
    {"code": "Näitaja", "selection": { "filter": "item", "values": [ "GR_W_AVG" ] } },
    { "code": "Tegevusala", "selection": { "filter": "item", "values": [ fieldValue ] } } ],
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

// Get years from values
const years = Object.keys(data.dimension.Vaatlusperiood.category.index);

// Get average salary from values
const values = data.value;

return NextResponse.json({
  fieldValue,
  years,
  values});
}

