"use client";

import React, { useState } from "react";
import { Select, SelectItem } from "@heroui/select";
import { Input } from "@heroui/input";

import SkillCard from "@//components/cards/SkillCard";
import { categories } from "@//config/category.config";
import { selectClasses, selectItemsClasses } from "@//components/form/TSelect";
import { useFetchAllSkillQuery } from "@//redux/features/skill/skill.api";
import SkillCardSkeleton from "@//components/cards/SkillCardSkeleton";
import { TSkill } from "@//types/types";

const Skills = () => {
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState<string | null | undefined>(null);

  // const [availability, setAvailability] = useState();
  const queries = [];

  if (category) {
    queries?.push({ key: "category", value: category });
  }
  if (search) {
    queries?.push({ key: "searchTerm", value: search });
  }

  const handleSearch = (e: any) => {
    setTimeout(() => {
      setSearch((e?.target as unknown as { value: string } | null)?.value);
    }, 300);
  };

  const {
    data: skillsResponse,
    isLoading,
    isFetching,
  } = useFetchAllSkillQuery(queries);

  let skills = skillsResponse?.data?.skills;

  return (
    <div className="container py-10">
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap">
          <h2 className="text-xl font-bold">Skills</h2>
          <div className="flex items-center gap-3">
            <Input placeholder="Search" size="sm" onChange={handleSearch} />
            <div className="w-44">
              <Select
                aria-label="category"
                classNames={selectClasses}
                placeholder="Category"
                size="sm"
                onChange={(e) => setCategory(e?.target?.value)}
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
          </div>
        </div>
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {isLoading || isFetching
            ? Array.from({ length: 6 }).map((_, id) => (
                <SkillCardSkeleton key={id} />
              ))
            : skills?.map((skill: TSkill) => (
                <SkillCard
                  key={skill?.id}
                  skill={skill}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
