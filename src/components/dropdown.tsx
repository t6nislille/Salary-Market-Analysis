import type { Selection } from "@heroui/react";
import React, { useEffect, useState } from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@heroui/react";

// Set types
type Field = { key: string; label: string };

// Hold Keys as Set
// First value is "text"
export default function FieldDropdown({onSelect}: {onSelect: (value: string)=> void}) {
    const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set(["text"]));

    // Hold labels
    const [selectedLabel, setSelectedLabel] = useState("Text");

    // Hold fields
    const [fields, setFields] = useState<Field[]>([]);

    // Fetch fields
    useEffect(() => {
        const fetchFields = async () => {
            const res = await fetch("/api/dropdown_fields");
            const data = await res.json();
            setFields(data.fields);
        };
        fetchFields();

        // Activate one time
    }, []);

    // Match label to key
    const haldleSelect = (keys: Selection) => {
        setSelectedKeys(keys);
        const key = Array.from(keys)[0] as string;
        const label = fields.find(f => f.key === key)?.label || key;
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
        <DropdownMenu
            disallowEmptySelection
            selectedKeys={selectedKeys}
            selectionMode="single"
            onSelectionChange={haldleSelect}
        >
            {fields.map(f => (
                <DropdownItem key={f.key} textValue={f.label}>
                    {f.label}
                </DropdownItem>
            ))}
        </DropdownMenu>
    </Dropdown>
);
}