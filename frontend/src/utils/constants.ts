export type DisplayType =
  | typeof CALENDARDISPLAY
  | typeof VIEWTASKDISPLAY
  | typeof TASKDISPLAY
  | typeof DELETETASKDISPLAY;

export const CALENDARDISPLAY = "CALENDARDISPLAY",
  VIEWTASKDISPLAY = "VIEWTASKDISPLAY",
  TASKDISPLAY = "TASKDISPLAY",
  DELETETASKDISPLAY = "DELETETASKDISPLAY";

export type ModalDisplayType =
  | typeof LOGINMODAL
  | typeof REGISTERMODAL
  | typeof PROFILEMODAL;

export const LOGINMODAL = "LOGINMODAL",
  REGISTERMODAL = "REGISTERMODAL",
  PROFILEMODAL = "PROFILEMODAL";

export const dayList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
