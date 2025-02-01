"use client";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/modal";
import { Loader, Save } from "lucide-react";
import { FieldValues } from "react-hook-form";

import TForm from "../form/TForm";
import TInput from "../form/TInput";
import TDatePicker from "../form/TDatePicker";

import { TSkill } from "@//types/types";

type TAvailabilityCreationModal = {
  isOpen: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  onOpenChange?: () => void;
  onSubmit: (data: FieldValues) => void;
  skill?: TSkill;
  isLoading?: boolean;
};

const AvailabilityCreationModal = ({
  isOpen,
  onOpenChange,
  onSubmit,
  isLoading = false,
}: TAvailabilityCreationModal) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        scrollBehavior="outside"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create Availability
              </ModalHeader>
              <ModalBody>
                <TForm onSubmit={onSubmit}>
                  <div className="space-y-10">
                    <TDatePicker
                      label="Date"
                      name="date"
                      placeholder="Write a skill name"
                    />
                    <TInput
                      label="Start Time"
                      name="start_time"
                      placeholder="HH:MM AM/PM"
                    />
                    <TInput
                      label="End Time"
                      name="end_time"
                      placeholder="HH:MM AM/PM"
                    />
                    <TInput
                      label="Duration"
                      name="duration"
                      placeholder="Write duration in minute"
                    />
                  </div>
                  <button
                    className="flex my-4 items-center gap-2 px-4 py-2 bg-royal-blue-500 text-white rounded-md hover:bg-royal-blue-500/90 active:bg-royal-blue-600/90 transition-all"
                    type="submit"
                  >
                    {isLoading ? <Loader className="animate-spin" /> : <Save />}
                    Save
                  </button>
                </TForm>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AvailabilityCreationModal;
