import type { Selection } from "@heroui/react";
import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@heroui/react";

export default function fieldDropdown() {
    const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set(["text"]));

    
}