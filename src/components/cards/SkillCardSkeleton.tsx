"use client";

import React from "react";

const SkillCardSkeleton = () => {
  return (
    <div className="flex justify-between items-center border p-3 rounded-md animate-pulse">
      <div className="flex items-center gap-4">
        <div className="size-14 overflow-hidden rounded-md bg-neutral-300" />
        <div>
          <div className="text-lg font-bold bg-neutral-300 h-5 w-24 rounded" />
          <div className="flex items-center gap-2 flex-wrap mt-1">
            <div className="flex items-center gap-1 text-sm text-neutral-500">
              <div className="bg-neutral-300 size-5 rounded" />
              <div className="bg-neutral-300 h-4 w-10 rounded" />
            </div>
            <div className="flex items-center gap-1 text-sm text-neutral-500">
              <div className="bg-neutral-300 size-5 rounded" />
              <div className="bg-neutral-300 h-4 w-16 rounded" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-neutral-300 h-8 w-24 rounded" />
    </div>
  );
};

export default SkillCardSkeleton;
