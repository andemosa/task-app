/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { CloseIcon } from "./Icons";
import LoadingIndicator from "./Loader";

import {
  selectTask,
  closeViewDisplay,
  closeDeleteDisplay,
} from "@/store/features/dialog/dialogSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  isFetchBaseQueryError,
  useTasksMutation,
} from "@/store/features/api/apiSlice";

const DeleteTask = () => {
  const dispatch = useAppDispatch();
  const selectedTask = useAppSelector(selectTask);
  const { toast } = useToast();
  const [task, { isLoading, isError, error }] = useTasksMutation();

  const onSubmit = async () => {
    try {
      await task({
        body: {},
        method: "DELETE",
        url: `/tasks/${selectedTask?._id}`,
      }).unwrap();
      toast({
        description: `Your task has been deleted`,
      });
      dispatch(closeViewDisplay());
    } catch (error) {
      // console.log(error);
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
            disabled={isLoading}
            onClick={() => dispatch(closeDeleteDisplay())}
          >
            Cancel
          </Button>
          <Button
            className="bg-[#ef4444] flex-1"
            disabled={isLoading}
            onClick={onSubmit}
          >
            {isLoading ? <LoadingIndicator /> : "Delete"}
          </Button>
        </div>

        {isError && (
          <p className="font-semibold text-red-600 text-center">
            {isFetchBaseQueryError(error)
              ? (error?.data as any)?.errorMessage
              : "An error occurred"}
          </p>
        )}
      </div>
    </div>
  );
};

export default DeleteTask;
