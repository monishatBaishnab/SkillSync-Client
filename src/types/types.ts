export type TSkill = {
  id: string;
  name: string;
  user_id: string;
  description: string;
  image: string | null;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  user?: { name: string };
  Availability?: [{ id: string; status: "AVAILABLE" | "BOOKED" }];
};

export type TAvailability = {
  id: string;
  skill_id: string;
  teacher_id: string;
  date: string;
  start_time: string;
  end_time: string;
  status: "AVAILABLE" | "BOOKED";
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
};
