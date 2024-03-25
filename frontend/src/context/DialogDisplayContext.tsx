import { useState, useMemo } from "react";

import { DialogDisplayContext } from "./useDialogDisplayContext";

import {
  DisplayType,
  CALENDARDISPLAY,
  VIEWTASKDISPLAY,
  DELETETASKDISPLAY,
  TASKDISPLAY,
} from "@/utils/constants";
import { ITask } from "@/interfaces/task";

type PageProps = {
  children: React.ReactElement;
};

const DialogDisplayProvider = ({ children }: PageProps) => {
  const [display, setDisplay] = useState<DisplayType>(CALENDARDISPLAY);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [open, setOpen] = useState(false);

  const openAddDisplay = () => {
    setSelectedTask(null);
    setDisplay(TASKDISPLAY);
    setOpen(true);
  };

  const closeAddDisplay = () => {
    setDisplay(CALENDARDISPLAY);
    setOpen(false);
  };

  const openEditDisplay = () => {
    setDisplay(TASKDISPLAY);
    setOpen(true);
  };

  const closeEditDisplay = () => {
    setDisplay(VIEWTASKDISPLAY);
    setOpen(true);
  };

  const openDeleteDisplay = () => {
    setDisplay(DELETETASKDISPLAY);
    setOpen(true);
  };

  const closeDeleteDisplay = () => {
    setDisplay(VIEWTASKDISPLAY);
    setOpen(true);
  };

  const openViewDisplay = (task: ITask) => {
    setSelectedTask(task);
    setDisplay(VIEWTASKDISPLAY);
    setOpen(true);
  };

  const closeViewDisplay = () => {
    setSelectedTask(null);
    setDisplay(CALENDARDISPLAY);
    setOpen(false);
  };

  const value = useMemo(
    () => ({
      display,
      open,
      selectedTask,
      openAddDisplay,
      openViewDisplay,
      openEditDisplay,
      openDeleteDisplay,
      closeAddDisplay,
      closeViewDisplay,
      closeEditDisplay,
      closeDeleteDisplay,
    }),
    [display, open, selectedTask]
  );

  return (
    <DialogDisplayContext.Provider value={value}>
      {children}
    </DialogDisplayContext.Provider>
  );
};

export default DialogDisplayProvider;
