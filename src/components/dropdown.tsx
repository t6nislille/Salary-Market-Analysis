import type { Selection } from "@heroui/react";
import React, { useEffect, useState } from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@heroui/react";

// Set types
type Field = { key: string; label: string };

// Dropdown components
export default function FieldDropdown({onSelect}: {onSelect: (value: string)=> void}) {
    const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set());
    const [selectedLabel, setSelectedLabel] = useState("Vali Valdkond:");
    const [fields, setFields] = useState<Field[]>([]);

    // Fetch fields
    useEffect(() => {
        const fetchFields = async () => {
            const res = await fetch("/api/dropdown_fields", {
                method: "POST",
                body: JSON.stringify({})
            });

            const data = await res.json();
            const fields = data.fields ?? [];
            setFields(fields);

            // Automatically select the first available field
            const first = fields[0];
            if (!first) return; 

            const {key, label} = first;
            setSelectedKeys(new Set([key]));
            setSelectedLabel(label);
            onSelect(key);
                      
        };
        fetchFields();
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
                <Button className="capitalize" variant="bordered">
                    {selectedLabel}
                </Button>
            </DropdownTrigger>
            {fields.length > 0 && (
            <DropdownMenu
                disallowEmptySelection={false}
                selectedKeys={selectedKeys}
                selectionMode="single"
                onSelectionChange={handleSelect}
            >
                {fields.map((f) => (
                    <DropdownItem key={f.key}>{f.label}</DropdownItem>
                ))}
            </DropdownMenu>
            )}
        </Dropdown>
);
}