import { createContext, useContext } from "react";

import { DisplayType } from "@/utils/constants";
import { ITask } from "@/interfaces/task";

type DialogDisplayContextType = {
  display: DisplayType;
  open: boolean;
  selectedTask: ITask | null;
  openAddDisplay: () => void;
  openViewDisplay: (task: ITask) => void;
  openEditDisplay: () => void;
  openDeleteDisplay: () => void;
  closeAddDisplay: () => void;
  closeViewDisplay: () => void;
  closeEditDisplay: () => void;
  closeDeleteDisplay: () => void;
};

export const DialogDisplayContext =
  createContext<DialogDisplayContextType | null>(null);

export const useDialogDisplayContext = () => {
  const context = useContext(DialogDisplayContext);
  if (!context) {
    throw new Error(
      `useDialogDisplayContext can only be used inside a DialogDisplayContextProvider`
    );
  }

  return context;
};
