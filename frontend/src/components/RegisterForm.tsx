import { useState } from "react";
import { X } from "lucide-react";
import useSWRMutation from "swr/mutation";
import { KeyedMutator } from "swr";

import { Button } from "./ui/button";
import LoadingIndicator from "./Loader";

import { useModalContext } from "@/context/useModalContext";
import { useAuthContext } from "@/context/useAuthContext";

import useForm from "@/hooks/useForm";
import { sendPostRequest } from "@/services/axios";
import { ITasksResponse } from "@/interfaces/task";

const RegisterForm = ({ mutate }: { mutate: KeyedMutator<ITasksResponse> }) => {
  const { closeModal, openLoginModal } = useModalContext();
  const { loginUser } = useAuthContext();
  const { trigger } = useSWRMutation("/auth/register", sendPostRequest);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { formState, submittingForm, formError, formSuccess } = useForm();

  const buttonDisabled = !name || !email || !password || formState.submitting;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (buttonDisabled) return;

    submittingForm();
    try {
      const res = await trigger({
        name,
        email,
        password,
      });
      loginUser(res?.data?.user);
      formSuccess("");
      mutate()
      closeModal();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      formError(error.errorMessage);
    }
  };

  return (
    <div className="relative">
      <div
        className="absolute right-0 top-0 cursor-pointer p-1 rounded-md border "
        onClick={closeModal}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </div>
      <div className="flex h-full min-w-full items-center justify-center">
        <div className="w-3/4 mx-auto">
          <h1 className="my-4 font-bold text-2xl text-center">Register</h1>
          <form
            className="flex max-w-md flex-col gap-4 p-4 rounded-lg mx-auto"
            onSubmit={onSubmit}
          >
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@example.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@example.com"
                required
              />
            </div>
            <Button className="bg-[#3F5BF6]" disabled={buttonDisabled}>
              {formState.submitting ? <LoadingIndicator /> : "Register"}
            </Button>
            <p className="font-semibold text-sm text-center">
              Have an account?&nbsp;
              <span
                className="text-[#3F5BF6] cursor-pointer"
                onClick={openLoginModal}
              >
                Log in
              </span>
            </p>
            {formState.error && (
              <p className="font-semibold text-red-600 text-center">
                {formState.error}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
