"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { Pagination } from "@heroui/pagination";

import { useFetchAllAvailabilityQuery } from "@//redux/features/availability/availability.api";
import { TAvailability } from "@//types/types";
const AvailabilitiesTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: availabilitiesResponse,
    isLoading: availabilityLoading,
    isFetching: availabilityFetching,
  } = useFetchAllAvailabilityQuery([
    { key: "limit", value: "5" },
    { key: "page", value: String(currentPage) },
  ]);

  let availabilities = availabilitiesResponse?.data?.availabilities;

  return (
    <div className="space-y-5 container py-5">
      <h3 className="text-xl font-semibold text-neutral-700">
        Teachers Availabilities
      </h3>
      <Table
        aria-label="Session"
        bottomContent={
          <Pagination
            showControls
            page={currentPage}
            total={
              Math.ceil(
                availabilitiesResponse?.data?.meta?.total /
                  availabilitiesResponse?.data?.meta?.limit,
              ) || 1
            }
            onChange={setCurrentPage}
          />
        }
      >
        <TableHeader>
          <TableColumn>Date</TableColumn>
          <TableColumn>TEACHER</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>SKILL</TableColumn>
        </TableHeader>
        <TableBody>
          {availabilityLoading || availabilityFetching
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
            : availabilities?.map((availability: TAvailability) => (
                <TableRow key={availability?.id}>
                  <TableCell>{availability?.date?.split("T")[0]}</TableCell>
                  <TableCell>{availability?.teacher?.name}</TableCell>
                  <TableCell>{availability?.status}</TableCell>
                  <TableCell>{availability?.skill?.name}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AvailabilitiesTable;
