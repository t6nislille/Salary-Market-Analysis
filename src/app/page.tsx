"use client";
import React, {useState} from "react";
import FieldDropdown from "../components/dropdown";

export default function Home() {

  return (
    <main className="flex flex-col items-center">
      <h1 className="text-3xl font-bold">Keskmine palk</h1>
      
      <FieldDropdown />

    </main>
  );
}
