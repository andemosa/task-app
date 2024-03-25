import { format } from "date-fns";
import { KeyedMutator } from "swr";
import useSWRMutation from "swr/mutation";

import { useToast } from "./ui/use-toast";

import { useDialogDisplayContext } from "@/context/useDialogDisplayContext";

import { ITask, ITasksResponse } from "@/interfaces/task";
import { sendPatchRequest } from "@/services/axios";
import { isToday } from "@/utils/helpers";

const TaskCard = ({
  task,
  mutate,
}: {
  task: ITask;
  mutate: KeyedMutator<ITasksResponse>;
}) => {
  const { title, startTimeISO, endTimeISO, date, completed, _id } = task;
  const { toast } = useToast();
  const { trigger } = useSWRMutation(`/tasks/${_id}`, sendPatchRequest);
  const { openViewDisplay } = useDialogDisplayContext();

  return (
    <div
      className="flex flex-row items-center gap-3 bg-[#F9FAFB] border-b border-[#EAECF0] py-4 px-6 text-sm text-[#475467] cursor-pointer hover:bg-[#EAEDFE]"
      onClick={() => openViewDisplay(task)}
    >
      <label htmlFor="checkbox">
        <input
          type="checkbox"
          name="checkbox"
          id="checkbox"
          aria-label="Complete Task"
          className="cursor-pointer"
          checked={completed}
          onClick={(e) => e.stopPropagation()}
          onChange={async () => {
            await trigger({
              payload: { completed: !completed },
            });
            mutate();
            toast({
              description: "Your task has been updated",
            });
          }}
        />
      </label>
      <div className="flex flex-col gap-1 flex-1">
        <p
          className={`${
            completed ? "line-through text-[#D0D5DD]" : "text-[#101828]"
          } font-semibold transition-all duration-300`}
        >
          {title}
        </p>
        <div
          className={`flex items-center transition-all duration-300 ${
            completed ? "line-through text-[#D0D5DD]" : "text-[#475467]"
          }`}
        >
          <span>{format(new Date(startTimeISO), "p")}</span>
          {endTimeISO && (
            <>
              &nbsp;<span>-</span>&nbsp;
              <span>{format(new Date(endTimeISO), "p")}</span>
            </>
          )}
        </div>
      </div>
      <p>{isToday(new Date(), new Date(date)) ? "Today" : format(new Date(date), "PP")}</p>
    </div>
  );
};

export default TaskCard;
