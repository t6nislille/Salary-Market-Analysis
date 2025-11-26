"use client";
import React, {useState} from "react";
import FieldDropdown from "../components/dropdown";
import AiSummary from "../components/ai_summery";
import { fetchAverageSalary } from "../lib/api";
import type { AverageSalaryResponse } from "../lib/types";

// Display average salary data in dropdown menu selection
export default function Home() {
  
  // Store average_salary response
  const [salary, setSalary] = useState<AverageSalaryResponse | null>(null);

  // Track error from API calls
  const [error, setError] = useState("");

  // Tracks loading state
  const [loading, setLoading] = useState(false)

  // Update active field when value is selected
  const handleSelect = async (fieldKey: string) => {
   
    try {

      setError("");
      setLoading(true);

      // Fetch average salary from STAT API
      const data = await fetchAverageSalary(fieldKey);

      // Save returned data
      setSalary(data);

    } catch (err) {
      console.error(err);
      setError("Palgaandmete laadimine ebaõnnestus!");
    } finally {
      // Turns off loading
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center p-6 space-y-6 max-w-2xl mx-auto">

      {/* Title */}
      <h1 className="text-3xl font-bold">Keskmine Bruutopalkalk</h1>
      
      {/* Dropdown select*/}
      <FieldDropdown onSelect={handleSelect} />

      {/* Error UI*/}
      {error && <p className="text-red-500">{error}</p>}

      {/* Loading UI*/}
      {loading && <p>Andmete laadimine...</p>}

      {/* Year and Salary row */}
      {salary && (
      <div className="bg-[#e2dad9] p-4 rounded-md shadow text-center mt-2">
        {salary && salary.years?.map((year, index) => (
          <p key={year} className="text-black">
            <span className="font-medium">{year}: </span>
            <span>{salary?.values[index]} €</span>
          </p>
        ))}
      </div >
      )}
      {/* Summary from OpenAI */}
      {salary && salary.years.length > 0 && (
        <AiSummary
          fieldName={salary.valueText}
          years={salary.years}
          values={salary.values}
        />
      )}
    </main>
  );
}
