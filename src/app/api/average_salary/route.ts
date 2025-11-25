import { NextResponse } from "next/server";

// API Route
export async function POST (req: Request) {
  try {
      // Extract selected value
      const { fieldValue } = await req.json();

      const body = {
        "query": 
          [
          {"code": "Näitaja", "selection": { "filter": "item", "values": [ "GR_W_AVG" ] } },
          { "code": "Tegevusala", "selection": { "filter": "item", "values": [ fieldValue ] } } 
          ],
          "response": { "format": "json-stat2" }
      };

      // Make a request to STAT API
      const URL = process.env.STAT_API_URL;
      const res = await fetch(URL!, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {"Content-Type": "application/json"},
      });

      // Read JSON
      const data = await res.json();

      // Extract response data
      const years = Object.keys(data.dimension.Vaatlusperiood.category.index);
      const values = data.value;
      const index = data.dimension.Tegevusala.category.index[fieldValue];
      const valueText = data.dimension.Tegevusala.category.label[fieldValue] || fieldValue;

      return NextResponse.json({
        fieldValue,
        valueText,
        years,
        values
      });

    } catch (err) {
      console.error(err);
      return NextResponse.json({error: "Failed to fetch data"}, {status: 500});
    }
}

