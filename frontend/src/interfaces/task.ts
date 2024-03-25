export interface ITask {
  _id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  startTimeISO: string;
  endTimeISO: string;
  reminderTime: number;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ITasksResponse {
  tasks: ITask[];
  limit: number;
  page: number;
  total: number;
}
