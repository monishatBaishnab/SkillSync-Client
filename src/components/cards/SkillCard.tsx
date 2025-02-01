"use client";

import { LayoutList, User, Video } from "lucide-react";
import Image from "next/image";
import React, { ReactNode } from "react";

import EnrollSession from "../skills/EnrollSession";

import { TSkill } from "@//types/types";
import { useAppSelector } from "@//redux/hooks";

type TSkillCardProps = {
  mode?: "my-skill" | "all-skill";
  skill?: TSkill;
  actions?: ReactNode;
};

const SkillCard = ({ mode = "all-skill", skill, actions }: TSkillCardProps) => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="flex justify-between items-center border p-3 rounded-md transition-all hover:ring-2 hover:ring-offset-2 hover:ring-royal-blue-500">
      <div className="flex items-center gap-4">
        <div className="size-14 overflow-hidden rounded-md">
          <Image
            alt="React"
            className="size-full object-contain"
            height={200}
            src={skill?.image as string}
            width={200}
          />
        </div>
        <div>
          <h3 className="text-lg font-bold">{skill?.name}</h3>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1 text-sm text-neutral-500">
              <LayoutList className="size-5 text-royal-blue-500" />
              {
                skill?.Availability?.filter(
                  (item) => item?.status === "AVAILABLE",
                )?.length
              }{" "}
              Slots
            </div>
            <div className="flex items-center gap-1 text-sm text-neutral-500">
              <User className="size-5 text-royal-blue-500" />
              {skill?.user?.name}
            </div>
          </div>
        </div>
      </div>
      <div>
        {mode === "all-skill" ? (
          !user?.email || skill?.user_id === user?.id ? (
            <button
              disabled
              className="px-4 py-1 flex items-center gap-1 rounded-md border border-neutral-200 bg-neutral-50 text-neutral-600 transition-all active:bg-white disabled:opacity-80 cursor-auto"
            >
              <Video className="size-4" /> Join
            </button>
          ) : (
            <EnrollSession skillId={skill?.id} />
          )
        ) : (
          actions
        )}
      </div>
    </div>
  );
};

export default SkillCard;
