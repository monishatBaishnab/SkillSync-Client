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
  Session: { learner: { id: string } }[];
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
  skill: {
    name: string;
  };
  teacher: {
    name: string;
  };
};

export type TUser = {
  name: string;
  id: string;
  email: string;
  password: string;
  role: "LEARNER" | "TEACHER" | "ADMIN";
  profile: string | null;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  Availability?: [{ id: string; status: "AVAILABLE" | "BOOKED" }];
};
