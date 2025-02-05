"use client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { MoreVertical, Pencil, Plus, Trash2 } from "lucide-react";

const SkillActions = ({ onAction }: { onAction: (event: string) => void }) => {
  return (
    <Dropdown
      classNames={{ content: "border-neutral-100 p-0" }}
      placement="bottom-end"
      radius="sm"
    >
      <DropdownTrigger className="outline-none">
        <span className="p-1 flex cursor-pointer rounded-md border border-neutral-200 bg-neutral-50 text-neutral-600 hover:text-royal-blue-500 hover:border-royal-blue-500 transition-all active:bg-white">
          <MoreVertical />
        </span>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="skill-actions"
        itemClasses={{
          base: [
            "text-neutral-600 font-medium",
            "data[hover=true]:text-neutral-700 data-[hover=true]:bg-[#F4F4F4]",
            "px-4 py-2.5",
          ],
        }}
      >
        <DropdownItem
          key="create-availability"
          startContent={<Plus className="size-5" />}
          onPress={() => onAction("create-availability")}
        >
          Create Availability
        </DropdownItem>
        <DropdownItem
          key="update"
          startContent={<Pencil className="size-5" />}
          onPress={() => onAction("update")}
        >
          Update
        </DropdownItem>
        <DropdownItem
          key="delete"
          startContent={<Trash2 className="size-5" />}
          onPress={() => onAction("delete")}
        >
          Delete
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default SkillActions;
