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
    }, []);


    // Update state of dropdown & inform parent
    const haldleSelect = (keys: Selection) => {
        setSelectedKeys(keys);
        
        // Show first key
        onSelect(Array.from(keys)[0] as string);
    };


return (
    <Dropdown>
        <DropdownTrigger>
            <Button className="capitalize" variant="bordered">
                {selectedValue}
            </Button>
        </DropdownTrigger>
        <DropdownMenu
            disallowEmptySelection
            selectedKeys={selectedKeys}
            selectionMode="single"
            onSelectionChange={haldleSelect}
        >
            <DropdownItem key={"text"}>Text</DropdownItem>
            <DropdownItem key={"A01"}>Taime- ja loomakasvatus, jahindus ja neid teenindavad tegevusalad</DropdownItem>
            <DropdownItem key={"A02"}>Metsamajandus ja metsavarumine</DropdownItem>
            <DropdownItem key={"A03"}>Kalapüük ja vesiviljelus</DropdownItem>

        </DropdownMenu>
    </Dropdown>
);
}