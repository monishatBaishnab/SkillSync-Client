"use client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";

const SkillActions = () => {
  return (
    <Dropdown>
      <DropdownTrigger className="outline-none">
        <button className="p-1 rounded-md border border-neutral-200 bg-neutral-50 text-neutral-600 hover:text-royal-blue-500 hover:border-royal-blue-500 transition-all active:bg-white">
          <MoreVertical />
        </button>
      </DropdownTrigger>
      <DropdownMenu  aria-label="skill-actions">
        <DropdownItem key="update" startContent={<Pencil className="size-5" />}>
          Update
        </DropdownItem>
        <DropdownItem key="delete" startContent={<Trash2 className="size-5" />}>
          Delete
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default SkillActions;
