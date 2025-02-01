"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Pagination } from "@heroui/pagination";
import { useState } from "react";

import { useFetchAllSkillQuery } from "@//redux/features/skill/skill.api";
import { TSkill } from "@//types/types";
const SkillTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: skillsResponse,
    isLoading: skillsLoading,
    isFetching: skillsFetching,
  } = useFetchAllSkillQuery([
    { key: "limit", value: "5" },
    { key: "page", value: String(currentPage) },
  ]);
  let skills = skillsResponse?.data?.skills;

  return (
    <div className="space-y-5 container py-5">
      <h3 className="text-xl font-semibold text-neutral-700">
        All Skills from Teachers
      </h3>
      <Table
        aria-label="Skill Table"
        bottomContent={
          <Pagination
            showControls
            page={currentPage}
            total={
              Math.ceil(
                skillsResponse?.data?.meta?.total /
                  skillsResponse?.data?.meta?.limit,
              ) || 1
            }
            onChange={setCurrentPage}
          />
        }
      >
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>TEACHER</TableColumn>
          <TableColumn>SLOTS</TableColumn>
          <TableColumn>CATEGORY</TableColumn>
        </TableHeader>
        <TableBody>
          {skillsFetching || skillsLoading
            ? Array.from({ length: 5 }).map((_, id) => (
                <TableRow key={id}>
                  <TableCell>
                    <div className="h-7 w-full bg-neutral-100 rounded-md animate-pulse" />
                  </TableCell>
                  <TableCell>
                    <div className="h-7 w-full bg-neutral-100 rounded-md animate-pulse" />
                  </TableCell>
                  <TableCell>
                    <div className="h-7 w-full bg-neutral-100 rounded-md animate-pulse" />
                  </TableCell>
                  <TableCell>
                    <div className="h-7 w-full bg-neutral-100 rounded-md animate-pulse" />
                  </TableCell>
                </TableRow>
              ))
            : skills?.map((skill: TSkill) => (
                <TableRow key={skill?.id}>
                  <TableCell>{skill?.name}</TableCell>
                  <TableCell>{skill?.user?.name}</TableCell>
                  <TableCell>{skill?.Availability?.length}</TableCell>
                  <TableCell>{skill?.category}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SkillTable;
