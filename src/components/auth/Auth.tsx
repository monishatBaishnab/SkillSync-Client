/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@heroui/modal";
import { Loader, LogIn } from "lucide-react";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import Cookies from "js-cookie";

import TForm from "../form/TForm";
import TInput from "../form/TInput";
import TSelect from "../form/TSelect";

import { useAppDispatch } from "@//redux/hooks";
import {
  useLogInMutation,
  useRegisterMutation,
} from "@//redux/features/auth/auth.api";
import { login } from "@//redux/features/auth/auth.slice";
const Auth = () => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [mode, setMode] = useState<"login" | "register">("login");
  const dispatch = useAppDispatch();
  const [registerUser, { isLoading, data, isSuccess }] = useRegisterMutation();
  const [
    loginUser,
    { isLoading: loggining, data: loginData, isSuccess: loginSuccess },
  ] = useLogInMutation();

  // Function for handle login
  const handleLogin = (data: FieldValues) => {
    loginUser(data as FormData);
  };

  // Function for handle register
  const handleRegister = (data: FieldValues) => {
    const userData = { ...data };

    // Remove profilePhoto from the userData
    delete userData.profile;

    // Create FormData instance
    const formData = new FormData();

    formData.append("data", JSON.stringify(userData));

    if (data.profile) {
      formData.append("file", data.profile);
    }
    // Pass FormData to the mutate function
    registerUser(formData);
  };

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    if (mode === "login") handleLogin(data);
    if (mode === "register") handleRegister(data);
  };

  useEffect(() => {
    if (isSuccess && !isLoading) {
      const user = jwtDecode(data.data.token);

      Cookies.set('token', loginData.data.token);
      toast.success("Register Success.");
      dispatch(login({ user, token: data.data.token }));
      onClose();
    }
  }, [isSuccess, isLoading, data, dispatch]);
  useEffect(() => {
    if (loginSuccess && !loggining) {
      const user = jwtDecode(loginData.data.token);

      Cookies.set('token', loginData.data.token);
      toast.success("Login Success.");
      dispatch(login({ user, token: loginData.data.token }));
      onClose();
    }
  }, [loggining, loginData, loginSuccess, dispatch]);

  return (
    <>
      <button
        className="p-1 px-3 flex items-center gap-1 rounded-md border border-neutral-200 bg-neutral-50 text-neutral-600 hover:text-royal-blue-500 hover:border-royal-blue-500 transition-all active:bg-white"
        onClick={onOpen}
      >
        Login
        <LogIn className="size-5" />
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
                {mode === "login" ? "Login" : "Register"}
              </ModalHeader>
              <ModalBody>
                <TForm onSubmit={handleSubmit}>
                  <div className="pb-4 space-y-5">
                    {mode === "register" && (
                      <TInput
                        name="name"
                        placeholder="Write your full name."
                        type="email"
                      />
                    )}
                    <TInput
                      name="email"
                      placeholder="Write your mail address."
                      type="email"
                    />
                    {mode === "register" && (
                      <TSelect
                        name="role"
                        options={[
                          { key: "LEARNER", label: "Learner" },
                          { key: "TEACHER", label: "Teacher" },
                        ]}
                        placeholder="Write your mail address."
                      />
                    )}
                    <TInput
                      name="password"
                      placeholder="Password."
                      type="password"
                    />
                    <button
                      className="flex items-center gap-2 px-4 py-2 bg-royal-blue-500 text-white rounded-md hover:bg-royal-blue-500/90 active:bg-royal-blue-600/90 transition-all disabled:cursor-default disabled:opacity-70"
                      disabled={isLoading || loggining}
                      type="submit"
                    >
                      {isLoading || loggining ? (
                        <Loader className="size-5 animate-spin" />
                      ) : (
                        <LogIn className="size-5" />
                      )}
                      {mode === "login" ? "Login" : "Register"}
                    </button>
                    {mode === "login" ? (
                      <div className="text-center text-athens-gray-600">
                        <span>Don&apos;t have an Account? </span>
                        <span
                          className="text-royal-blue-500 cursor-pointer"
                          onClick={() => setMode("register")}
                        >
                          Create account
                        </span>
                      </div>
                    ) : (
                      <div className="text-center text-athens-gray-600">
                        <span>You have already an Account? </span>
                        <span
                          className="text-royal-blue-500 cursor-pointer"
                          onClick={() => setMode("login")}
                        >
                          Login
                        </span>
                      </div>
                    )}
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

export default Auth;
