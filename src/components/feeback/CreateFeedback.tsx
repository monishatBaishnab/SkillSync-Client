"use client";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/modal";
import { Loader, Save } from "lucide-react";
import { FieldValues } from "react-hook-form";

import TForm from "../form/TForm";
import TTextarea from "../form/TTextarea";
import TRating from "../form/TRating";

import { TSkill } from "@//types/types";

type TCreateFeedback = {
  isOpen: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  onOpenChange?: () => void;
  onSubmit: (data: FieldValues) => void;
  skill?: TSkill;
  isLoading?: boolean;
};

const CreateFeedback = ({
  isOpen,
  onOpenChange,
  onSubmit,
  isLoading = false,
}: TCreateFeedback) => {
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
                Create Feedback
              </ModalHeader>
              <ModalBody>
                <TForm onSubmit={onSubmit}>
                  <div className="space-y-4">
                    <TRating label="Rating" name="rating" />
                    <TTextarea
                      label="Feedback"
                      name="feedback"
                      placeholder="Write you feedback"
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

export default CreateFeedback;
