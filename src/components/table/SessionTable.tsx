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

import { useFetchAllSessionsQuery } from "@//redux/features/session/session.api";
import { Session } from "@//types";
const SessionTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: sessionsResponse,
    isLoading: sessionsLoading,
    isFetching: sessionsFetching,
  } = useFetchAllSessionsQuery([
    { key: "limit", value: "5" },
    { key: "page", value: String(currentPage) },
  ]);

  let sessions = sessionsResponse?.data?.sessions;

  return (
    <div className="space-y-5 container py-5">
      <h3 className="text-xl font-semibold text-neutral-700">
        All Skills from Teachers
      </h3>
      <Table
        aria-label="Session"
        bottomContent={
          <Pagination
            showControls
            page={currentPage}
            total={
              Math.ceil(
                sessionsResponse?.data?.meta?.total /
                  sessionsResponse?.data?.meta?.limit,
              ) || 1
            }
            onChange={setCurrentPage}
          />
        }
      >
        <TableHeader>
          <TableColumn>Date</TableColumn>
          <TableColumn>TEACHER</TableColumn>
          <TableColumn>LEARNER</TableColumn>
          <TableColumn>SKILL</TableColumn>
        </TableHeader>
        <TableBody>
          {sessionsFetching || sessionsLoading
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
            : sessions?.map((skill: Session) => (
                <TableRow key={skill?.id}>
                  <TableCell>{skill?.session_date}</TableCell>
                  <TableCell>{skill?.teacher?.name}</TableCell>
                  <TableCell>{skill?.learner?.name}</TableCell>
                  <TableCell>{skill?.skill?.name}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SessionTable;
