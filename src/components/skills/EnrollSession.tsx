"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@heroui/modal";
import { Loader, Save, Video } from "lucide-react";
import { RadioGroup, Radio } from "@heroui/radio";
import { cn } from "@heroui/theme";
import { useEffect, useState } from "react";

import { useFetchAllAvailabilityQuery } from "@//redux/features/availability/availability.api";
import { TAvailability } from "@//types/types";
import { useAppSelector } from "@//redux/hooks";
import { useCreateSessionMutation } from "@//redux/features/session/session.api";
type GroupedAvailabilities = {
  [date: string]: TAvailability[];
};
const groupByDate = (
  availabilities: TAvailability[] = [],
): GroupedAvailabilities => {
  return availabilities.reduce(
    (acc: GroupedAvailabilities, appointment: TAvailability) => {
      const date = appointment.date.split("T")[0]; // Extract date part only (YYYY-MM-DD)

      if (!acc[date]) {
        acc[date] = [];
      }

      acc[date].push(appointment);

      return acc;
    },
    {},
  );
};
const EnrollSession = ({ skillId }: { skillId: string | undefined }) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const user = useAppSelector((state) => state?.auth?.user);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSession, setSelectedSession] = useState<
    { start_time: string; end_time: string; id: string } | undefined
  >();
  const { data, isSuccess: fetchedAvailabilities } =
    useFetchAllAvailabilityQuery(
      [{ key: "skill_id", value: skillId as string }],
      { skip: !skillId },
    );
  const [createSession, { isLoading, isSuccess, data: df }] =
    useCreateSessionMutation();

  console.log(df);
  const availabilities = groupByDate(data?.data?.availabilities);

  const handleEnrollSession = () => {
    const data = {
      skill_id: skillId,
      teacher_id: availabilities?.[selectedDate]?.[0]?.teacher_id,
      learner_id: user?.id,
      session_date: selectedDate,
      start_time: selectedSession?.start_time,
      end_time: selectedSession?.end_time,
      availability_id: selectedSession?.id,
    };

    createSession(data);
  };

  useEffect(() => {
    if (!isLoading && isSuccess) {
      onClose();
    }
  }, [isSuccess, isLoading]);

  useEffect(() => {
    setSelectedDate(Object.keys(availabilities)?.[0]);
  }, [fetchedAvailabilities]);

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
        size="xl"
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
                    className="flex items-center justify-center gap-1 overflow-x-auto pb-1 mb-1"
                    id="dashboard-sidebar"
                  >
                    {Object.keys(availabilities)?.map((date) => {
                      return (
                        <button
                          key={date}
                          className={cn(
                            "px-2 py-1 border border-neutral-200 rounded-md text-nowrap",
                            date === selectedDate
                              ? "text-royal-blue-500 border-royal-blue-500"
                              : "",
                          )}
                          onClick={() => setSelectedDate(date)}
                        >
                          {date}
                        </button>
                      );
                    })}
                  </div>
                  <RadioGroup>
                    <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
                      {availabilities?.[selectedDate]?.map((availability) => {
                        return (
                          <Radio
                            key={availability?.id}
                            classNames={{
                              base: cn(
                                "flex m-0 bg-natural-50 hover:bg-natural-100 items-center ",
                                "max-w-full cursor-pointer rounded-lg gap-4 px-4 py-2 border-1 border-natural-200",
                                "data-[selected=true]:border-royal-blue-500",
                              ),
                            }}
                            isDisabled={availability?.status === "BOOKED"}
                            name={`${availability?.start_time} - ${availability?.end_time}`}
                            value={`${availability?.start_time} - ${availability?.end_time}`}
                            onChange={() =>
                              setSelectedSession({
                                start_time: availability.start_time,
                                end_time: availability.end_time,
                                id: availability.id,
                              })
                            }
                          >
                            {availability?.start_time} -{" "}
                            {availability?.end_time}
                          </Radio>
                        );
                      })}
                    </div>
                  </RadioGroup>
                  <button
                    className="flex items-center gap-2 px-4 py-2 bg-royal-blue-500 text-white rounded-md hover:bg-royal-blue-500/90 active:bg-royal-blue-600/90 transition-all"
                    onClick={handleEnrollSession}
                  >
                    {isLoading || isLoading ? (
                      <Loader className="size-5 animate-spin" />
                    ) : (
                      <Save className="size-5" />
                    )}
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
