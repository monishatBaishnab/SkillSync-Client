"use client";

import {
  LayoutDashboard,
  LogOut,
  MessageSquareShare,
  Settings,
  User,
  UserCog,
} from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import Cookies from "js-cookie";
import { useDisclosure } from "@heroui/modal";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import logo from "../assets/logo.png";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout } from "../redux/features/auth/auth.slice";
import { useCreateReviewMutation } from "../redux/features/review/review.api";

import Auth from "./auth/Auth";
import CreateFeedback from "./feeback/CreateFeedback";
import ProfileUpdater from "./auth/ProfileUpdater";

const Navbar = () => {
  const route = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const {
    isOpen: isPOpen,
    onOpen: pOpen,
    onClose: pClose,
    onOpenChange: pOpenChange,
  } = useDisclosure();
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  const handleLogout = async () => {
    dispatch(logout());
    Cookies.remove("token");
    if (
      ["/profile", "/profile/:path*", "/dashboard", "/dashboard/:path*"].some(
        (route) => pathname.match(route),
      )
    ) {
      route.push("/");
    }
  };

  const [createFeedback, { isLoading, isSuccess }] = useCreateReviewMutation();

  const handleCreateFeedback: SubmitHandler<FieldValues> = (data) => {
    const rData = { ...data, reviewer_id: user?.id };

    createFeedback(rData);
  };

  useEffect(() => {
    if (!isLoading && isSuccess) {
      onClose();
      toast.success("Feedback created.");
    }
  }, [isLoading, isSuccess]);

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

      <div className="flex items-center gap-4">
        <button
          className="px-3 py-1.5 flex items-center text-sm gap-1 rounded-md border border-neutral-200 bg-neutral-50/50 text-neutral-600 hover:text-royal-blue-500 hover:border-royal-blue-500 transition-all active:bg-white disabled:opacity-80 disabled:hover:border-neutral-200 disabled:active:bg-neutral-50/50 disabled:hover:text-neutral-600"
          disabled={!user?.id}
          onClick={onOpen}
        >
          <MessageSquareShare className="size-4" /> Give Feedback
        </button>
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
              <DropdownItem
                key="dashboard"
                startContent={<Settings className="size-5" />}
                onPress={pOpen}
              >
                Update Profile
              </DropdownItem>

              {user?.role === "ADMIN" ? (
                <DropdownItem
                  key="dashboard"
                  startContent={<LayoutDashboard className="size-5" />}
                  onPress={() => route.push("/dashboard")}
                >
                  Dashboard
                </DropdownItem>
              ) : null}
              {user?.role === "ADMIN" || user?.role === "TEACHER" ? (
                <DropdownItem
                  key="profile"
                  startContent={<UserCog className="size-5" />}
                  onPress={() => route.push("/profile")}
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

      <CreateFeedback
        isLoading={isLoading}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onSubmit={handleCreateFeedback}
      />

      <ProfileUpdater
        isOpen={isPOpen}
        onClose={pClose}
        onOpenChange={pOpenChange}
      />
    </div>
  );
};

export default Navbar;
