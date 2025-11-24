import type { Selection } from "@heroui/react";
import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@heroui/react";

// Hold Keys as Set
// First value is "text"
export default function fieldDropdown() {
    const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set(["text"]));

    // Convert Set to String
    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", "),
        [selectedKeys],
    );


return (
    <Dropdown>
        <DropdownTrigger>
            <Button className="capitalize" variant="bordered">
                {selectedValue}
            </Button>
        </DropdownTrigger>
        <DropdownMenu
            >

        </DropdownMenu>
    </Dropdown>
);
};