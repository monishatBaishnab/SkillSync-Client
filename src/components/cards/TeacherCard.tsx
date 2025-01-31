import { Rss } from "lucide-react";
import Image from "next/image";
import React from "react";

import logo from "../../assets/logo.png";
const TeacherCard = () => {
  return (
    <div className="border p-3 rounded-md transition-all hover:ring-2 hover:ring-offset-2 hover:ring-royal-blue-500">
      <div className="flex items-center gap-4">
        <div className="size-14 overflow-hidden rounded-md">
          <Image alt="React" className="size-full object-contain" src={logo} />
        </div>
        <div>
          <h3 className="text-lg font-bold">Monishat Baishnab</h3>
          <div className="flex items-center gap-1 text-sm text-neutral-500">
            <Rss className="size-5 text-royal-blue-500" />
            12 Skills
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherCard;
