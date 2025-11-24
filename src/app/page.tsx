"use client";
import React, {useState} from "react";
import FieldDropdown from "../components/dropdown";

export default function Home() {

  // Hold salary data
  const [salaryData, setSalaryData] = useState<number[]>([]);

  // Hold years
  const [years, setYears] = useState<string[]>([]);

  // Selected field
  const [selectedName, setSelectedName] = useState<string>("Text");

  // Update active field
  const handleSelect = async (categoryKey: string) =>{
    setSelectedName(categoryKey);

    // API call from average_salary
    const response = await fetch(`/api/average_salary`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({fieldValue: categoryKey})
    });

    const data = await response.json();

    // Save data as
    setYears(data.years);
    setSalaryData(data.values);
  };

  return (
    <main className="flex flex-col items-center">
      <h1 className="text-3xl font-bold">Keskmine palk</h1>
      
      <FieldDropdown onSelect={handleSelect} />
      <div>
        <h2>Valdkond: {selectedName}</h2>
        {years.map((year, index) => (
          <p key={year}>
            <span>{year}:</span>
            <span>{salaryData[index]}</span>
          </p>
        ))}

      </div>

    </main>
  );
}
