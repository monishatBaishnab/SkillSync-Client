"use client";

import React from "react";
import { Select, SelectItem } from "@heroui/select";

import SkillCard from "@//components/cards/SkillCard";
import { availability, categories } from "@//config/category.config";
const selectClasses = {
  base: "justify-start data-[has-label=true]:mt-[0px]",
  mainWrapper: "group-data-[has-label=true]:!mt-7",
  helperWrapper: "!mt-4",
  label: "!cursor-text !text-base font-medium !top-[20px]",
  trigger: [
    "!transition !bg-white !border !border-solid_border hover:!border-primary",
    "data-[open=true]:!ring data-[open=true]:!ring-2 data-[open=true]:!ring-primary data-[open=true]:!ring-offset-2 data-[open=true]:!border-solid_border",
  ],
  popoverContent: "!rounded-md p-0",
};

const selectItemsClasses = {
  base: "py-2.5 px-3 !rounded-md data-[hover=true]:bg-[#F4F4F4] data-[focus-visible=true]:bg-[#F4F4F4] data-[selected=true]:bg-[#F4F4F4] data-[selectable=true]:focus:bg-[#F4F4F4]",
};
const Skills = () => {
  return (
    <div className="container py-10">
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap">
          <h2 className="text-xl font-bold">Skills</h2>
          <div className="flex items-center gap-2">
            <div className="w-44">
              <Select
                aria-label="category"
                classNames={selectClasses}
                placeholder="Category"
                size="sm"
              >
                {categories?.map((category) => (
                  <SelectItem
                    key={category.key}
                    classNames={selectItemsClasses}
                    value={category.key}
                  >
                    {category.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className="w-44">
            <Select
                aria-label="Availability"
                classNames={selectClasses}
                placeholder="Availability"
                size="sm"
              >
                {availability?.map((category) => (
                  <SelectItem
                    key={category.key}
                    classNames={selectItemsClasses}
                    value={category.key}
                  >
                    {category.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>
        </div>
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <SkillCard />
          <SkillCard />
          <SkillCard />
          <SkillCard />
          <SkillCard />
        </div>
      </div>
    </div>
  );
};

export default Skills;
