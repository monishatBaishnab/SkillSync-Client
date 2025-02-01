/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
"use client";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/modal";
import { Loader, Save } from "lucide-react";
import { useEffect } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

import TForm from "../form/TForm";
import TInput from "../form/TInput";
import TSelect from "../form/TSelect";

import { useUpdateProfileMutation } from "@//redux/features/auth/auth.api";
import useUser from "@//hooks/useUser";
import { login } from "@//redux/features/auth/auth.slice";
import { useAppDispatch } from "@//redux/hooks";
const ProfileUpdater = ({
  isOpen,
  onOpenChange,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange?: () => void;
}) => {
  const dispatch = useAppDispatch();
  const [updateProfile, { isLoading, isSuccess, data }] =
    useUpdateProfileMutation();
  const user = useUser();

  // Function for handle register
  const handleRegister = (data: FieldValues) => {
    const role = Array.from(data?.role)[0] || user?.role;
    const userData = { ...data, role };

    // Pass FormData to the mutate function
    updateProfile({ data: userData, id: user?.id });
  };

  useEffect(() => {
    if (isSuccess && !isLoading) {
      const user = jwtDecode(data.data.token);

      Cookies.set("token", data.data.token);
      dispatch(login({ user, token: data.data.token }));
      toast.success("Profile Updated.");
      onClose();
    }
  }, [isSuccess, isLoading]);

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
                {"Update Profile"}
              </ModalHeader>
              <ModalBody>
                <TForm
                  defaultValues={{
                    name: user?.name,
                    email: user?.email,
                    role: user?.role,
                  }}
                  onSubmit={handleRegister}
                >
                  <div className="pb-4 space-y-5">
                    <TInput
                      name="name"
                      placeholder="Write your full name."
                      type="text"
                    />

                    <TInput
                      isDisabled
                      name="email"
                      placeholder="Write your mail address."
                      type="email"
                    />

                    <TSelect
                      name="role"
                      options={[
                        { key: "LEARNER", label: "Learner" },
                        { key: "TEACHER", label: "Teacher" },
                      ]}
                      placeholder="Write your mail address."
                    />
                    <button
                      className="flex items-center gap-2 px-4 py-2 bg-royal-blue-500 text-white rounded-md hover:bg-royal-blue-500/90 active:bg-royal-blue-600/90 transition-all disabled:cursor-default disabled:opacity-70"
                      disabled={isLoading}
                      type="submit"
                    >
                      {isLoading ? (
                        <Loader className="size-5 animate-spin" />
                      ) : (
                        <Save className="size-5" />
                      )}
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

export default ProfileUpdater;
