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

  // Holds all salary numbers
  //const [salaryData, setSalaryData] = useState<number[]>([]);

  // Holds all salary years
  // const [years, setYears] = useState<string[]>([]);

  // Holds selected field label
  // const [selectedLabel, setSelectedLabel] = useState<string>("");

  // Track error from API calls
  const [error, setError] = useState("");

  // Tracks loading state
  const [loading, setLoading] = useState(false)

  // Update active field when value is selected
  const handleSelect = async (categoryKey: string) => {
    try {
      setError("");
      setLoading(true);

      // Fetch from api/average_salary
      const response = await fetch(`/api/average_salary`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({fieldValue: categoryKey})
      });

      if (!response.ok) throw new Error("Average Salary API request failed! ");

      const data = await response.json();

      // Save returned data
      setSelectedLabel(data.valueText);
      setYears(data.years);
      setSalaryData(data.values);

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
      <h1 className="text-3xl font-bold">Keskmine palk</h1>
      
      {/* Dropdown select*/}
      <FieldDropdown onSelect={handleSelect} />

      {/* Error UI*/}
      {error && <p className="text-red-500">{error}</p>}

      {/* Loading UI*/}
      {loading && <p>Andmete laadimine...</p>}

      {/* Year and Salary row */}
      <div>
        {years.map((year, index) => (
          <p key={year} className="text-sm">
            <span className="font-medium">{year}: </span>
            <span>{salaryData[index]} €</span>
          </p>
        ))}
      </div>
      
      {/* Summary from OpenAI */}
      {selectedLabel && years.length > 0 && (
        <AiSummary
          fieldName={selectedLabel}
          years={years}
          values={salaryData}
        />
      )}
    </main>
  );
}
