/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { X } from "lucide-react";

import { Button } from "./ui/button";
import LoadingIndicator from "./Loader";

import { closeModal, openLoginModal } from "@/store/features/modal/modalSlice";
import { useAppDispatch } from "@/store/hooks";
import {
  isFetchBaseQueryError,
  useAuthMutation,
} from "@/store/features/api/apiSlice";

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const [auth, { isLoading, isError, error }] = useAuthMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const buttonDisabled = !name || !email || !password || isLoading;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (buttonDisabled) return;

    try {
      await auth({
        body: {
          email,
          password,
          name,
        },
        method: "POST",
        url: "/auth/register",
      }).unwrap();
      dispatch(closeModal());
    } catch (error) {
      // formError(error.errorMessage);
    }
  };

  return (
    <div className="relative">
      <div
        className="absolute right-0 top-0 cursor-pointer p-1 rounded-md border "
        onClick={() => dispatch(closeModal())}
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
              {isLoading ? <LoadingIndicator /> : "Register"}
            </Button>
            <p className="font-semibold text-sm text-center">
              Have an account?&nbsp;
              <span
                className="text-[#3F5BF6] cursor-pointer"
                onClick={() => dispatch(openLoginModal())}
              >
                Log in
              </span>
            </p>
            {isError && (
              <p className="font-semibold text-red-600 text-center">
                {isFetchBaseQueryError(error)
                  ? (error?.data as any)?.errorMessage
                  : "An error occurred"}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
