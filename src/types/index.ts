import { ReactNode } from "react";

export type TLayout = { children: ReactNode };

export type TFormElementProps = {
  name: string;
  label?: string;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  isDisabled?: boolean;
  fullWidth?: boolean;
  type?: string;
  startContent?: ReactNode;
  endContent?: ReactNode;
};

export type TQueryParams = { name: string; value: string }[] | undefined;

export interface Session {
  id: string;
  skill_id: string;
  teacher_id: string;
  learner_id: string;
  session_date: string;
  start_time: string;
  end_time: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  skill?: {
    name: string;
  };
  teacher?: {
    name: string;
  };
  learner?: {
    name: string;
  };
}

export interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
}
