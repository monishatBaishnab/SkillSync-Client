"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@heroui/modal";
import { Loader, MessageSquareDiff, Save } from "lucide-react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "sonner";

import TForm from "../form/TForm";
import TTextarea from "../form/TTextarea";
import TRating from "../form/TRating";

import { useCreateReviewMutation } from "@//redux/features/review/review.api";
import { useAppSelector } from "@//redux/hooks";

type TCreateFeedback = {
  skill_id?: string;
};

const CreateFeedback = ({ skill_id }: TCreateFeedback) => {
  const user = useAppSelector((state) => state.auth.user);
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  const [createReview, { isLoading, isSuccess }] = useCreateReviewMutation();
  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const skillData = { ...data, skill_id, reviewer_id: user?.id };

    createReview(skillData);
  };

  useEffect(() => {
    if (!isLoading && isSuccess) {
      toast.success("Review created.");
      onClose();
    }
  }, [isLoading, isSuccess]);

  return (
    <>
      <button
        className="p-2 flex items-center gap-1 rounded-md border border-neutral-200 bg-neutral-50 text-neutral-600 transition-all active:bg-white disabled:opacity-80"
        onClick={onOpen}
      >
        <MessageSquareDiff className="size-4" />
      </button>
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
                <TForm onSubmit={handleSubmit}>
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
