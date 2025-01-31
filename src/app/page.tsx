"use client";
import { MoveRight } from "lucide-react";
import Link from "next/link";

import SkillCard from "../components/cards/SkillCard";
import Scheduler from "../components/scheduler/Scheduler";
import { useFetchAllSkillQuery } from "../redux/features/skill/skill.api";
import { TSkill } from "../types/types";
import SkillCardSkeleton from "../components/cards/SkillCardSkeleton";

export default function Home() {
  const { data: skillsResponse, isLoading: skillsLoading } =
    useFetchAllSkillQuery([{ key: "limit", value: "5" }]);
  const skills = skillsResponse?.data?.skills;

  return (
    <section>
      <div className="container py-14 space-y-4">
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">See Your Next Schedules</h2>
            <Scheduler />
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
