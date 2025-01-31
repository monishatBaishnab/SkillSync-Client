import { MoveRight } from "lucide-react";
import Link from "next/link";

import SkillCard from "../components/cards/SkillCard";
import Scheduler from "../components/scheduler/Scheduler";

export default function Home() {
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
                className="group flex items-center gap-1 text-neutral-600 transition-all hover:text-neutral-700 relative pr-6"
                href={"/skills"}
              >
                See all
                <MoveRight className="size-5 absolute right-0 group-hover:-right-1 transition-all" />
              </Link>
            </div>
            <div className="grid gap-5 grid-cols-1">
              <SkillCard />
              <SkillCard />
              <SkillCard />
              <SkillCard />
              <SkillCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
