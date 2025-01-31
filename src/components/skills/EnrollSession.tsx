"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@heroui/modal";
import { Save, Video } from "lucide-react";
import { RadioGroup, Radio } from "@heroui/radio";
import { cn } from "@heroui/theme";

const EnrollSession = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <button
        className="px-4 py-1 flex items-center gap-1 rounded-md border border-neutral-200 bg-neutral-50 text-neutral-600 hover:text-royal-blue-500 hover:border-royal-blue-500 transition-all active:bg-white"
        onClick={onOpen}
      >
        <Video className="size-4" /> Join
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
                Enroll Session
              </ModalHeader>
              <ModalBody>
                <div className="pb-4 space-y-5">
                  <div
                    className="flex items-center gap-1 overflow-x-auto pb-1 mb-1"
                    id="dashboard-sidebar"
                  >
                    <button className="px-2 py-1 border border-neutral-200 rounded-md text-nowrap">
                      26, January
                    </button>
                    <button className="px-2 py-1 border border-neutral-200 rounded-md text-nowrap">
                      26, January
                    </button>
                    <button className="px-2 py-1 border border-neutral-200 rounded-md text-nowrap">
                      26, January
                    </button>
                    <button className="px-2 py-1 border border-neutral-200 rounded-md text-nowrap">
                      26, January
                    </button>
                    <button className="px-2 py-1 border border-neutral-200 rounded-md text-nowrap">
                      26, January
                    </button>
                  </div>
                  <RadioGroup>
                    <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
                      <Radio
                        classNames={{
                          base: cn(
                            "flex m-0 bg-natural-50 hover:bg-natural-100 items-center ",
                            "max-w-full cursor-pointer rounded-lg gap-4 px-4 py-2 border-1 border-natural-200",
                            "data-[selected=true]:border-royal-blue-500",
                          ),
                        }}
                        name="df"
                        value="sdf"
                      >
                        oresdfdsf
                      </Radio>{" "}
                    </div>
                  </RadioGroup>
                  <button
                    className="flex items-center gap-2 px-4 py-2 bg-royal-blue-500 text-white rounded-md hover:bg-royal-blue-500/90 active:bg-royal-blue-600/90 transition-all"
                    type="submit"
                  >
                    <Save />
                    Save
                  </button>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default EnrollSession;
