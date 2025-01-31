import React from "react";

import CreateSkill from "@//components/skills/CreateSkill";
import SkillCard from "@//components/cards/SkillCard";

const Skills = () => {
  return ( 
    <div className="container py-10 space-y-4">
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
    </div>
  );
};

export default Skills;
