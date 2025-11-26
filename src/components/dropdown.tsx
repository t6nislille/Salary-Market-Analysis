import type { Selection } from "@heroui/react";
import React, { useEffect, useState } from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@heroui/react";
import type {FieldOption} from "../lib/types";
import {fetchDropdownFields} from "../lib/api";

// Set types
type Field = { key: string; label: string };
interface Props {
    onSelect: (value: string) => void;
}

// Dropdown components
export default function FieldDropdown({onSelect}: Props) {
    const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set());
    const [selectedLabel, setSelectedLabel] = useState("Vali tegevusala");
    const [fields, setFields] = useState<FieldOption[]>([]);

    // Fetch fields
    useEffect(() => {
        async function loadFields() {
            const fields = await fetchDropdownFields();
            setFields(fields);       
        }

        loadFields();
        
        // Activate once
    }, []);

    // Uptate dropdown
    const handleSelect = (keys: Selection) => {
        const key = Array.from(keys)[0] as string;
        const label = fields.find(f => f.key === key)?.label || key;

        setSelectedKeys(keys);
        setSelectedLabel(label);
        onSelect(key);
    };

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button className="
                    capitalize 
                    bg-[#FBECEC] 
                    text-black
                    border-2 border-gray-400 
                    rounded-md 
                    shadow-md 
                    hover:bg-[#F4DADA]
                    transition
                    px-5 py-3
                    text-base
                    font-medium
                    ">
                    {selectedLabel}
                </Button>
            </DropdownTrigger>
            {fields.length > 0 && (
            <DropdownMenu
                disallowEmptySelection={false}
                selectedKeys={selectedKeys}
                selectionMode="single"
                onSelectionChange={handleSelect}
                className="bg-[#FBECEC] text-black max-h-64 overflow-y-auto rounded-md shadow-xl border border-gray-300"
                itemClasses={{
                base: "hover:bg-[#F4DADA] text-black",
  }}
                
            >
                {fields.map((f) => (
                    <DropdownItem key={f.key}>{f.label}</DropdownItem>
                ))}
            </DropdownMenu>
            )}
        </Dropdown>
);
}