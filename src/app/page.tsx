"use client";
import React, {useState} from "react";
import FieldDropdown from "../components/dropdown";

// Display average salary data in dropdown menu selection
export default function Home() {
  const [salaryData, setSalaryData] = useState<number[]>([]);
  const [years, setYears] = useState<string[]>([]);
  const [selectedName, setSelectedName] = useState<string>("");

  // Update active field when value is selected
  const handleSelect = async (categoryKey: string) =>{
    setSelectedName(categoryKey);

    // Fetch from api/average_salary
    const response = await fetch(`/api/average_salary`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({fieldValue: categoryKey})
    });

    const data = await response.json();
    setSelectedName(data.valueText);
    setYears(data.years);
    setSalaryData(data.values);
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
    </main>
  );
}
