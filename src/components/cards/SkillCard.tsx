"use client";

import { Logs, User } from "lucide-react";
import Image from "next/image";
import React from "react";

import logo from "../../assets/logo.png";
import EnrollSession from "../skills/EnrollSession";

import SkillActions from "./SkillActions";
const SkillCard = ({
  mode = "all-skill",
}: {
  mode?: "my-skill" | "all-skill";
}) => {
  return (
    <div className="flex justify-between items-center border p-3 rounded-md transition-all hover:ring-2 hover:ring-offset-2 hover:ring-royal-blue-500">
      <div className="flex items-center gap-4">
        <div className="size-14 overflow-hidden rounded-md">
          <Image alt="React" className="size-full object-contain" src={logo} />
        </div>
        <div>
          <h3 className="text-lg font-bold">Learn React</h3>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1 text-sm text-neutral-500">
              <Logs className="size-5 text-royal-blue-500" />
              12 Slots
            </div>
            <div className="flex items-center gap-1 text-sm text-neutral-500">
              <User className="size-5 text-royal-blue-500" />
              Monishat
            </div>
          </div>
        </div>
      </div>
      <div>{mode === "all-skill" ? <EnrollSession /> : <SkillActions />}</div>
    </div>
  );
};

export default SkillCard;
