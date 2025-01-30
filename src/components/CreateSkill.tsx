"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@heroui/modal";
import { Plus, Save } from "lucide-react";
import { FieldValues, SubmitHandler } from "react-hook-form";

import TForm from "./form/TForm";
import TInput from "./form/TInput";
import TTextarea from "./form/TTextarea";
import TSelect from "./form/TSelect";
import TFile from "./form/TFile";
import TDatePicker from "./form/TDatePicker";
const CreateSkill = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <>
      <button
        className="flex items-center gap-2 px-4 py-2 bg-royal-blue-500 text-white rounded-md hover:bg-royal-blue-500/90 active:bg-royal-blue-600/90 transition-all"
        onClick={onOpen}
      >
        <Plus /> Create
      </button>
      <Modal scrollBehavior="outside" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create Skill
              </ModalHeader>
              <ModalBody>
                <TForm onSubmit={handleSubmit}>
                  <div className="space-y-4 pb-4">
                    <TInput
                      label="Skill Name"
                      name="name"
                      placeholder="Write a skill name"
                    />
                    <TDatePicker
                      label="Skill Name"
                      name="date"
                      placeholder="Write a skill name"
                    />
                    <TSelect
                      label="Skill Category"
                      name="category"
                      options={[
                        {
                          key: "software-development",
                          label: "Software Development",
                        },
                      ]}
                      placeholder="Select skill category"
                    />
                    <TTextarea
                      label="Skill Description"
                      name="description"
                      placeholder="Write a description about skills"
                    />
                    <TFile label="Skill Image" name="image" />
                    <button
                      className="flex items-center gap-2 px-4 py-2 bg-royal-blue-500 text-white rounded-md hover:bg-royal-blue-500/90 active:bg-royal-blue-600/90 transition-all"
                      type="submit"
                    >
                      <Save />
                      Save
                    </button>
                  </div>
                </TForm>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateSkill;
