import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { ITask } from "@/interfaces/task";
import {
  CALENDARDISPLAY,
  DELETETASKDISPLAY,
  DisplayType,
  TASKDISPLAY,
  VIEWTASKDISPLAY,
} from "@/utils/constants";

export interface DialogState {
  display: DisplayType;
  selectedTask: ITask | null;
  open: boolean;
}

const initialState: DialogState = {
  display: CALENDARDISPLAY,
  selectedTask: null,
  open: false,
};

export const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    openAddDisplay: (state) => {
      state.open = true;
      state.display = TASKDISPLAY;
      state.selectedTask = null;
    },
    closeAddDisplay: (state) => {
      state.open = false;
      state.display = CALENDARDISPLAY;
      state.selectedTask = null;
    },
    openEditDisplay: (state) => {
      state.open = true;
      state.display = TASKDISPLAY;
    },
    closeEditDisplay: (state) => {
      state.open = true;
      state.display = VIEWTASKDISPLAY;
    },
    openDeleteDisplay: (state) => {
      state.open = true;
      state.display = DELETETASKDISPLAY;
    },
    closeDeleteDisplay: (state) => {
      state.open = true;
      state.display = VIEWTASKDISPLAY;
    },
    openViewDisplay: (state, action: PayloadAction<ITask>) => {
      state.open = true;
      state.display = VIEWTASKDISPLAY;
      state.selectedTask = action.payload;
    },
    closeViewDisplay: (state) => {
      state.open = false;
      state.display = CALENDARDISPLAY;
      state.selectedTask = null;
    },
  },
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectDisplay: (dialog) => dialog.display,
    selectOpen: (dialog) => dialog.open,
    selectTask: (dialog) => dialog.selectedTask,
  },
});

// Action creators are generated for each case reducer function
export const {
  openAddDisplay,
  openEditDisplay,
  openViewDisplay,
  openDeleteDisplay,
  closeAddDisplay,
  closeEditDisplay,
  closeViewDisplay,
  closeDeleteDisplay,
} = dialogSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectDisplay, selectOpen, selectTask } = dialogSlice.selectors;
