"use client";
import React, { useEffect, useState } from "react";
import { useDisclosure } from "@heroui/modal";
import { FolderOpen, Plus } from "lucide-react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import SkillCreationModal from "@//components/skills/SkillCreationModal";
import SkillCard from "@//components/cards/SkillCard";
import {
  useCreateSkillMutation,
  useDeleteSkillMutation,
  useFetchAllSkillQuery,
  useUpdateSkillMutation,
} from "@//redux/features/skill/skill.api";
import { TSkill } from "@//types/types";
import useUser from "@//hooks/useUser";
import SkillCardSkeleton from "@//components/cards/SkillCardSkeleton";
import SkillActions from "@//components/cards/SkillActions";
import AvailabilityCreationModal from "@//components/skills/CreateAvailability";
import { useCreateAvailabilityMutation } from "@//redux/features/availability/availability.api";

const Skills = () => {
  const user = useUser();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    isOpen: isAvlOpen,
    onOpen: avlOpen,
    onOpenChange: avlOpenChange,
    onClose: avlClose,
  } = useDisclosure();
  const [skill, setSkill] = useState<TSkill | undefined>();

  const {
    data: skillsResponse,
    isLoading,
    isFetching,
  } = useFetchAllSkillQuery([{ key: "user_id", value: user?.id as string }], {
    skip: !user?.id,
  });
  let skills = skillsResponse?.data?.skills;

  const [createSkill, { isLoading: creating, isSuccess: created }] =
    useCreateSkillMutation();
  const [updateSkill, { isLoading: updating, isSuccess: updated }] =
    useUpdateSkillMutation();
  const [deleteSkill] = useDeleteSkillMutation();

  const [
    createAvailability,
    { isLoading: creatingAvl, isSuccess: createdAvl },
  ] = useCreateAvailabilityMutation();

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const categories = Array.from(data?.category);
    const skillData = {
      name: data?.name,
      category: categories?.[0],
      description: data?.description,
    };
    const formData = new FormData();

    if (data.image) {
      formData.append("file", data.image);
    }

    // Append userData and shopData as JSON strings
    formData.append("data", JSON.stringify(skillData));

    if (skill) {
      updateSkill({ data: formData, id: skill?.id });
    } else {
      createSkill(formData);
    }
  };

  const handleAction = (action: string, data: TSkill) => {
    if (action === "create-availability") {
      avlOpen();
      setSkill(data);
    }
    if (action === "update") {
      setSkill(data);
      onOpen();
    } else if (action === "delete") {
      deleteSkill(data?.id);
    }
  };

  const handleCreateAvailability: SubmitHandler<FieldValues> = (data) => {
    const avlData = {
      ...data,
      status: "AVAILABLE",
      skill_id: skill?.id,
      teacher_id: user?.id,
    };

    createAvailability(avlData);
  };

  useEffect(() => {
    if ((!creating && created) || (!updating && updated)) {
      onClose();
      toast.success("Action Completed.");
    }
  }, [creating, updating, created, updated]);

  useEffect(() => {
    if (!creatingAvl && createdAvl) {
      avlClose();
      toast.success("Availability created.");
    }
  }, [creatingAvl, createdAvl]);

  return (
    <>
      <div className="bg-neutral-50">
        <div className="container flex items-center justify-center py-10">
          <h2 className="text-2xl font-bold text-neutral-700">Profile</h2>
        </div>
      </div>
      <div className="container py-10 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">My Skills</h2>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-royal-blue-500 text-white rounded-md hover:bg-royal-blue-500/90 active:bg-royal-blue-600/90 transition-all disabled:opacity-80 disabled:hover:bg-royal-blue-500 disabled:active:bg-royal-blue-500"
            onClick={() => {
              onOpen();
              setSkill(undefined);
            }}
          >
            <Plus /> Create
          </button>
          <SkillCreationModal
            isOpen={isOpen}
            skill={skill}
            onOpenChange={onOpenChange}
            onSubmit={handleSubmit}
          />
        </div>
        {!skills?.length ? (
          <div className="flex items-center justify-center flex-col">
            <FolderOpen className="text-neutral-500 size-16" />
            <h4 className="text-lg text-neutral-700 font-semibold">
              No skills found. Please add new skills.
            </h4>
          </div>
        ) : null}
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {isLoading || isFetching
            ? Array.from({ length: 6 }).map((_, id) => (
                <SkillCardSkeleton key={id} />
              ))
            : skills?.map((skill: TSkill) => (
                <SkillCard
                  key={skill?.id}
                  actions={
                    <SkillActions
                      onAction={(event) => handleAction(event, skill)}
                    />
                  }
                  mode="my-skill"
                  skill={skill}
                />
              ))}
        </div>
        <AvailabilityCreationModal
          isLoading={creatingAvl}
          isOpen={isAvlOpen}
          onOpenChange={avlOpenChange}
          onSubmit={handleCreateAvailability}
        />
      </div>
    </>
  );
};

export default Skills;
