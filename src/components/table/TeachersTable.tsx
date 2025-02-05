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

import { TUser } from "@//types/types";
import { useFetchAvailableTeachersQuery } from "@//redux/features/auth/auth.api";
const AvailableTeachersTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isFetching } = useFetchAvailableTeachersQuery([
    { key: "limit", value: "5" },
    { key: "page", value: String(currentPage) },
  ]);
  let teachers = data?.data?.teachers;

  return (
    <div className="space-y-5 container py-5">
      <h3 className="text-xl font-semibold text-neutral-700">
      Available Teachers for Sessions
      </h3>
      <Table
        aria-label="Avail able teachers"
        bottomContent={
          <Pagination
            showControls
            page={currentPage}
            total={
              Math.ceil(data?.data?.meta?.total / data?.data?.meta?.limit) || 1
            }
            onChange={setCurrentPage}
          />
        }
      >
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>EMAIL</TableColumn>
          <TableColumn>ROLE</TableColumn>
          <TableColumn>AVAILABILITIES</TableColumn>
        </TableHeader>
        <TableBody>
          {isFetching || isLoading
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
            : teachers?.map((teacher: TUser) => (
                <TableRow key={teacher?.id}>
                  <TableCell>{teacher?.name}</TableCell>
                  <TableCell>{teacher?.email}</TableCell>
                  <TableCell>{teacher?.role}</TableCell>
                  <TableCell>{teacher?.Availability?.length || 0}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AvailableTeachersTable;
