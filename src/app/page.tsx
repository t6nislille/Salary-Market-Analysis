"use client";
import React, {useState} from "react";
import FieldDropdown from "../components/dropdown";
import AiSummary from "../components/ai_summery";

// Display average salary data in dropdown menu selection
export default function Home() {

  // Holds all salary numbers
  const [salaryData, setSalaryData] = useState<number[]>([]);

  // Holds all salary years
  const [years, setYears] = useState<string[]>([]);

  // Holds selected field label
  const [selectedName, setSelectedName] = useState<string>("");

  // Track error from API calls
  const [error, setError] = useState("");

  // Update active field when value is selected
  const handleSelect = async (categoryKey: string) => {
    try {
      setError("");

    // Fetch from api/average_salary
    const response = await fetch(`/api/average_salary`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({fieldValue: categoryKey})
    });

    if (!response.ok) throw new Error("Average Salary API request failed! ");

    const data = await response.json();

    // Save returned data
    setSelectedName(data.valueText);
    setYears(data.years);
    setSalaryData(data.values);

    } catch (err) {
      console.error(err);
      setError("Palgaandmete laadimine ebaõnnestus!");
    }
  };

  return (
    <main className="flex flex-col items-center">
      <h1 className="text-3xl font-bold">Keskmine palk</h1>
      
      <FieldDropdown onSelect={handleSelect} />
      <div>
        {years.map((year, index) => (
          <p key={year}>
            <span>{year}: </span>
            <span>{salaryData[index]} €</span>
          </p>
        ))}
      </div>
      {/* Summary from OpenAI */}
      {selectedName && years.length > 0 && (
        <AiSummary
          fieldName={selectedName}
          years={years}
          values={salaryData}
        />
      )}
    </main>
  );
}
