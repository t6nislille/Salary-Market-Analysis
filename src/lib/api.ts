import { error } from "console";
import {FieldOption} from "../lib/types";

// Fetch dropdown fields
export async function fetchDropdownFields(): Promise<FieldOption[]> {
    const res = await fetch("/api/dropdown_fields", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({})
    });

    if (!res.ok) throw new Error("Failed to fetch dropdown fields!");

    const data = await res.json();
    return data.fields ?? [];
}