"use client";

import { LogOut, Search } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

import logo from "../assets/logo.png";

const Navbar = () => {
  const route = useRouter();

  return (
    <div className="h-full flex items-center gap-2 justify-between container">
      <button
        className="inline-flex items-center gap-2 cursor-pointer h-16"
        onClick={() => route.push("/")}
      >
        <div className="size-8 overflow-hidden">
          <Image
            alt="SkillSync"
            className="size-full overscroll-contain"
            src={logo}
          />
        </div>
        <h2 className="text-2xl font-bold hidden md:block">Skill Sync</h2>
      </button>
      <div className="border border-neutral-100 rounded-md flex items-center px-3 max-w-96 grow">
        <input
          className="h-full outline-none focus:outline-none py-2.5 w-full"
          placeholder="Search"
        />
        <button className="text-neutral-500 hover:text-royal-blue-500 transition-all">
          <Search />
        </button>
      </div>
      <button className="flex items-center gap-2 text-neutral-500 text-sm px-3 py-2 border border-neutral-100 rounded-md hover:bg-neutral-50 transition-all active:bg-white">
        <LogOut className="size-5" />
        <span className="hidden sm:block">Logout</span>
      </button>
    </div>
  );
};

export default Navbar;
