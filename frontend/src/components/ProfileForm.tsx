import { useState } from "react";
import { X } from "lucide-react";
import useSWRMutation from "swr/mutation";

import { Button } from "./ui/button";
import LoadingIndicator from "./Loader";
import { CameraIcon } from "./Icons";

import { useModalContext } from "@/context/useModalContext";
import { useAuthContext } from "@/context/useAuthContext";

import useForm from "@/hooks/useForm";
import { sendPatchRequest } from "@/services/axios";
import uploadImage from "@/utils/upload";

interface IFormData {
  password?: string;
  name?: string;
  email?: string;
  avatar?: string;
  image?: File | null;
}

const ProfileForm = () => {
  const { closeModal } = useModalContext();
  const { user, loginUser } = useAuthContext();
  const { trigger } = useSWRMutation("/users/me", sendPatchRequest);
  const [formData, setFormData] = useState<IFormData>({
    email: user?.email,
    name: user?.name,
    avatar: user?.avatar,
    password: "",
  });
  const { email, name, password, avatar } = formData;
  const { formState, submittingForm, formError, formSuccess } = useForm();

  const buttonDisabled = !name || !email || formState.submitting;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      if (files && files[0]) {
        setFormData({
          ...formData,
          image: files && files[0],
          avatar: files && files[0] && URL.createObjectURL(files[0]),
        });
      } else {
        setFormData({
          ...formData,
          avatar: formData.avatar,
          image: files && files[0],
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (buttonDisabled) return;

    submittingForm();
    try {
      let payload: Record<string, string> = {
        ...(name && { name: name }),
        ...(password && { password: password }),
      };

      if (formData.image) {
        const { data } = await uploadImage(formData.image!);
        const { url } = data;
        payload = {
          ...payload,
          avatar: url,
        };
      }

      const res = await trigger({
        payload,
      });
      formSuccess("");
      loginUser(res?.data?.user);
      closeModal();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      formError(error.errorMessage ?? "An error occurred. Please try again");
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
          <h1 className="my-4 font-bold text-2xl text-center">
            Update Profile
          </h1>
          <form
            autoComplete="update-form"
            className="flex max-w-md flex-col gap-4 p-4 rounded-lg mx-auto"
            onSubmit={onSubmit}
          >
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <img
                  src={avatar}
                  alt="user"
                  className="rounded-full w-28 h-28 border border-white"
                />
                <label
                  htmlFor="avatar"
                  className="absolute bottom-[-20px] right-0 cursor-pointer"
                >
                  <input
                    type="file"
                    name="avatar"
                    id="avatar"
                    className="hidden"
                    onChange={handleChange}
                  />
                  <CameraIcon />
                </label>
              </div>
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
                disabled
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@example.com"
                autoComplete="off"
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Update your name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John Doe"
                autoComplete="input-field"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Change your password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="*********"
                autoComplete="input-field"
              />
            </div>
            <Button className="bg-[#3F5BF6]" disabled={buttonDisabled}>
              {formState.submitting ? <LoadingIndicator /> : "Update"}
            </Button>

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

export default ProfileForm;
