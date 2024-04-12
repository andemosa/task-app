/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { CloseIcon, CalenderIcon, ClockIcon, AddBellIcon } from "./Icons";
import LoadingIndicator from "./Loader";

import {
  selectTask,
  closeAddDisplay,
  closeEditDisplay,
} from "@/store/features/dialog/dialogSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  isFetchBaseQueryError,
  useTasksMutation,
} from "@/store/features/api/apiSlice";

const TaskDisplay = () => {
  const dispatch = useAppDispatch();
  const selectedTask = useAppSelector(selectTask);

  const { toast } = useToast();
  const [task, { isLoading, isError, error }] = useTasksMutation();
  const [formData, setFormData] = useState({
    ...selectedTask,
  });

  const { date, endTime, reminderTime, startTime, title } = formData;

  const buttonDisabled = !title || !date || !startTime || isLoading;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (startTime && endTime) {
      if (endTime < startTime) {
        return toast({
          description: "End time must be later than start time",
          variant: "destructive",
        });
      }
    }
    if (buttonDisabled) return;
    const body = {
      title,
      date,
      startTime,
      endTime,
      reminderTime: reminderTime ? +reminderTime : 0,
    };
    try {
      selectedTask
        ? await task({
            body,
            method: "PATCH",
            url: `/tasks/${selectedTask?._id}`,
          }).unwrap()
        : await task({
            body,
            method: "POST",
            url: `/tasks`,
          }).unwrap();
      toast({
        description: `Your task has been ${selectedTask ? "updated" : "added"}`,
      });
      dispatch(closeAddDisplay());
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement & HTMLSelectElement & HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="p-2 sm:p-4 shadow-md rounded-md flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-lg">
          {selectedTask ? "Edit" : "Add"} Task
        </h2>
        <CloseIcon
          className="cursor-pointer"
          onClick={
            selectedTask
              ? () => dispatch(closeEditDisplay())
              : () => dispatch(closeAddDisplay())
          }
        />
      </div>
      <form className="flex flex-col gap-6" onSubmit={onSubmit}>
        <div className="flex flex-col gap-4">
          <textarea
            name="title"
            id="title"
            cols={30}
            className="p-1 sm:py-3 sm:px-[14px] rounded-lg border border-[#D0D5DD] bg-[#F9FAFB] w-full"
            placeholder="Task Title"
            value={title}
            onChange={handleChange}
          ></textarea>
          <div className="flex gap-1 sm:gap-3">
            <div className="relative flex-1 flex items-center overflow-hidden">
              <CalenderIcon
                stroke="#344054"
                className="h-[14px] w-[14px] sm:h-[20px] sm:w-[20px] lg:h-[14px] lg:w-[14px] xl:h-[20px] xl:w-[20px] absolute left-[6px]"
              />
              <input
                type="date"
                name="date"
                id="date"
                className="border border-[#D0D5DD] flex-1 pl-[22px] sm:pl-[28px] lg:pl-[22px] xl:pl-[28px] text-[#667085] rounded-lg py-1 text-sm"
                value={date}
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-2 flex-1">
              <div className="relative flex-1 flex items-center overflow-hidden clock-div">
                <ClockIcon
                  stroke="#344054"
                  className="h-[14px] w-[14px] sm:h-[20px] sm:w-[20px] lg:h-[14px] lg:w-[14px] xl:h-[20px] xl:w-[20px] absolute left-[6px]"
                />
                <input
                  type="time"
                  name="startTime"
                  id="startTime"
                  className="border border-[#D0D5DD] flex-1 pl-[22px] sm:pl-[28px] lg:pl-[22px] xl:pl-[28px] text-[#667085] rounded-lg py-1 text-sm"
                  value={startTime}
                  onChange={handleChange}
                />
              </div>
              <div className="relative flex-1 flex items-center overflow-hidden clock-div">
                <ClockIcon
                  stroke="#344054"
                  className="h-[14px] w-[14px] sm:h-[20px] sm:w-[20px] lg:h-[14px] lg:w-[14px] xl:h-[20px] xl:w-[20px] absolute left-[6px]"
                />
                <input
                  type="time"
                  name="endTime"
                  id="endTime"
                  className="border border-[#D0D5DD] flex-1 pl-[22px] sm:pl-[28px] lg:pl-[22px] xl:pl-[28px] text-[#667085] rounded-lg py-1 text-sm"
                  min={startTime}
                  value={endTime}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-1 sm:gap-3 items-center">
              <AddBellIcon />
              <select
                name="reminderTime"
                id=""
                onChange={handleChange}
                value={reminderTime}
                className="outline-none"
              >
                <option value="0">None</option>
                <option value="10">10 Minute before</option>
                <option value="30">30 Minute before</option>
                <option value="60">1 Hour before</option>
              </select>
            </div>
            <CloseIcon className="h-4 w-4 cursor-pointer" />
          </div>
        </div>

        <div className="flex gap-1 sm:gap-4">
          <Button
            variant={"outline"}
            className="border-[#D0D5DD] flex-1"
            disabled={isLoading}
            onClick={
              selectedTask
                ? () => dispatch(closeEditDisplay())
                : () => dispatch(closeAddDisplay())
            }
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-[#3F5BF6] flex-1"
            disabled={buttonDisabled}
          >
            {isLoading ? (
              <LoadingIndicator />
            ) : (
              <>{selectedTask ? "Save" : "Add"}</>
            )}
          </Button>
        </div>

        {isError && (
          <p className="font-semibold text-red-600 text-center">
            {isFetchBaseQueryError(error)
              ? (error?.data as any)?.errorMessage
              : "An error occurred"}
          </p>
        )}
      </form>
    </div>
  );
};

export default TaskDisplay;
