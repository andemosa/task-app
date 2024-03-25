import useSWRMutation from "swr/mutation";
import { KeyedMutator } from "swr";

import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { CloseIcon } from "./Icons";
import LoadingIndicator from "./Loader";

import { useDialogDisplayContext } from "@/context/useDialogDisplayContext";
import { sendDeleteRequest } from "@/services/axios";
import useForm from "@/hooks/useForm";
import { ITasksResponse } from "@/interfaces/task";

const DeleteTask = ({ mutate }: { mutate: KeyedMutator<ITasksResponse> }) => {
  const { closeDeleteDisplay, closeViewDisplay, selectedTask } =
    useDialogDisplayContext();
  const { toast } = useToast();
  const { trigger } = useSWRMutation(`/tasks`, sendDeleteRequest);
  const { formState, submittingForm, formError, formSuccess } = useForm();

  const onSubmit = async () => {
    submittingForm();
    try {
      await trigger(`/${selectedTask?._id}`);
      formSuccess("");
      toast({
        description: `Your task has been deleted`,
      });
      mutate();
      closeViewDisplay();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      formError(error?.errorMessage);
    }
  };

  return (
    <div className="p-4 shadow-md rounded-md flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-lg">Delete Task</h2>
        <CloseIcon className="cursor-pointer" onClick={closeDeleteDisplay} />
      </div>
      <div className="flex flex-col gap-6">
        <p>
          Are you sure you want to delete&nbsp;
          <span className="font-bold">"{selectedTask?.title}"</span>
        </p>

        <div className="flex gap-4">
          <Button
            variant={"outline"}
            className="border-[#D0D5DD] flex-1"
            onClick={closeDeleteDisplay}
          >
            Cancel
          </Button>
          <Button className="bg-[#ef4444] flex-1" onClick={onSubmit}>
            {formState.submitting ? <LoadingIndicator /> : "Delete"}
          </Button>
        </div>

        {formState.error && (
          <p className="font-semibold text-red-600 text-center">
            {formState.error}
          </p>
        )}
      </div>
    </div>
  );
};

export default DeleteTask;
