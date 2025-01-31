"use client";
import { MoveRight } from "lucide-react";
import Link from "next/link";

import SkillCard from "../components/cards/SkillCard";
import Scheduler from "../components/scheduler/Scheduler";
import { useFetchAllSkillQuery } from "../redux/features/skill/skill.api";
import { TSkill } from "../types/types";
import SkillCardSkeleton from "../components/cards/SkillCardSkeleton";
import { useFetchAllSessionsQuery } from "../redux/features/session/session.api";
import useUser from "../hooks/useUser";
import { Session } from "../types";
import EmptyScheduler from "../components/scheduler/EmptyScheduler";

const formatTime = (time: string): string => {
  // Convert "9:30 AM" to "09:30" and "11:00 PM" to "23:00"
  const match = time.match(/^(\d{1,2}):(\d{2}) (AM|PM)$/);

  if (!match) return time; // Return as-is if not matching expected format

  let [_, hours, minutes, period] = match;
  let hour = parseInt(hours, 10);

  if (period === "PM" && hour !== 12) {
    hour += 12;
  } else if (period === "AM" && hour === 12) {
    hour = 0;
  }

  return `${hour.toString().padStart(2, "0")}:${minutes}`;
};

const transformSessions = (
  sessions: Session[] = [],
): { id: string; title: string; start: string; end: string }[] => {
  return sessions?.map((session) => ({
    id: session.id,
    title: `Session on ${session?.skill?.name} from ${formatTime(session.start_time)} to ${formatTime(session.end_time)}.`,
    start: `${session.session_date} ${formatTime(session.start_time)}`,
    end: `${session.session_date} ${formatTime(session.end_time)}`,
  }));
};

export default function Home() {
  const user = useUser();
  const { data: skillsResponse, isLoading: skillsLoading } =
    useFetchAllSkillQuery([{ key: "limit", value: "5" }]);
  const skills = skillsResponse?.data?.skills;

  const { data } = useFetchAllSessionsQuery([
    {
      key:
        user?.role === "TEACHER" || user?.role === "ADMIN"
          ? "teacher_id"
          : "learner_id",
      value: user?.id as string,
    },
  ]);
  const schedulerData = transformSessions(data?.data?.sessions);

  console.log(schedulerData);

  return (
    <section>
      <div className="container py-14 space-y-4">
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">See Your Next Schedules</h2>
            {schedulerData?.length ? (
              <Scheduler schedulerData={schedulerData} />
            ) : <EmptyScheduler />}
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Skills for You</h2>
              <Link
                className="group flex items-center gap-1 text-royal-blue-500 transition-all hover:text-royal-blue-600 relative pr-6"
                href={"/skills"}
              >
                See all
                <MoveRight className="size-5 absolute right-0 group-hover:-right-1 transition-all" />
              </Link>
            </div>
            <div className="grid gap-5 grid-cols-1">
              {skillsLoading
                ? Array.from({ length: 5 }).map((_, id) => (
                    <SkillCardSkeleton key={id} />
                  ))
                : skills?.map((skill: TSkill) => (
                    <SkillCard key={skill?.id} skill={skill} />
                  ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
