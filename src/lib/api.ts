import {FieldOption} from "../lib/types";

// Fetch dropdown fields
export async function fetchDropdownFields() {
    const res = await fetch("/api/dropdown_fields", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({})
    });
}