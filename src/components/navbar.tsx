"use client";

import { LayoutDashboard, LogOut, Search, User, UserCog } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";

import logo from "../assets/logo.png";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout } from "../redux/features/auth/auth.slice";

import Auth from "./auth/Auth";

const Navbar = () => {
  const route = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    dispatch(logout());
  };

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
      {user?.email ? (
        <Dropdown
          classNames={{ content: "border-neutral-100 p-0" }}
          placement="bottom-end"
          radius="sm"
        >
          <DropdownTrigger className="outline-none">
            <span className="p-1 cursor-pointer rounded-md border border-neutral-200 bg-neutral-50 text-neutral-600 hover:text-royal-blue-500 hover:border-royal-blue-500 transition-all active:bg-white">
              <User />
            </span>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="skill-actions"
            itemClasses={{
              base: [
                "text-neutral-600 font-medium",
                "data[hover=true]:text-neutral-700 data-[hover=true]:bg-[#F4F4F4]",
                "px-4 py-2.5",
              ],
            }}
          >
            {user?.role === "ADMIN" ? (
              <DropdownItem
                key="dashboard"
                startContent={<LayoutDashboard className="size-5" />}
              >
                Dashboard
              </DropdownItem>
            ) : null}
            {user?.role === "ADMIN" || user?.role === "TEACHER" ? (
              <DropdownItem
                key="profile"
                startContent={<UserCog className="size-5" />}
              >
                Profile
              </DropdownItem>
            ) : null}
            <DropdownItem
              key="logout"
              startContent={<LogOut className="size-5" />}
              onPress={handleLogout}
            >
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <Auth />
      )}
    </div>
  );
};

export default Navbar;
