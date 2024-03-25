import { format } from "date-fns";

import { Button } from "./ui/button";
import { CloseIcon, CalenderIcon, ClockIcon } from "./Icons";

import { useDialogDisplayContext } from "@/context/useDialogDisplayContext";

const ViewTask = () => {
  const { closeViewDisplay, openEditDisplay, openDeleteDisplay, selectedTask } =
    useDialogDisplayContext();

  return (
    <div className="p-4 shadow-md rounded-md">
      <div className="flex justify-end">
        <CloseIcon className="cursor-pointer" onClick={closeViewDisplay} />
      </div>
      <div className="flex flex-col gap-6">
        <h3 className="font-bold text-lg">{selectedTask?.title}</h3>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <span className="align-middle">
              <CalenderIcon />
            </span>
            {selectedTask && (
              <p>{format(new Date(selectedTask?.date), "PPP")}</p>
            )}
          </div>
          <div className="flex gap-2 items-center">
            <span className="align-middle">
              <ClockIcon />
            </span>
            {selectedTask && (
              <p>
                {format(new Date(selectedTask?.startTimeISO), "p")}
                {selectedTask?.endTime && (
                  <span>
                    - {format(new Date(selectedTask?.endTimeISO), "p")}
                  </span>
                )}
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-4">
          <Button
            variant={"outline"}
            className="border-[#D0D5DD] flex-1"
            onClick={openDeleteDisplay}
          >
            Delete
          </Button>
          <Button className="bg-[#3F5BF6] flex-1" onClick={openEditDisplay}>
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewTask;
