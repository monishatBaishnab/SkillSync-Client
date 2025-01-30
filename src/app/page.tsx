import { Plus } from "lucide-react";

import SkillCard from "../components/SkillCard";
import TeacherCard from "../components/TeacherCard";
import CreateSkill from "../components/CreateSkill";

export default function Home() {
  return (
    <section>
      <div className="container py-14 space-y-4">
        <h2 className="text-xl font-bold">Visit Skills</h2>
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <SkillCard />
          <SkillCard />
          <SkillCard />
          <SkillCard />
          <SkillCard />
        </div>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">My Skills</h2>
          <CreateSkill />
        </div>
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <SkillCard mode="my-skill" />
          <SkillCard mode="my-skill" />
          <SkillCard mode="my-skill" />
          <SkillCard mode="my-skill" />
          <SkillCard mode="my-skill" />
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Teachers</h2>
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div>
              <TeacherCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
