/* eslint-disable @typescript-eslint/no-explicit-any */
import { KeyedMutator } from "swr";

import TaskCard from "./TaskCard";
import { PaginationComp } from "./Pagination";
import LoadingIndicator from "./Loader";

import { ITasksResponse } from "@/interfaces/task";

const TaskList = ({
  data,
  error,
  isLoading,
  page,
  mutate,
  setPage,
}: {
  data: ITasksResponse | undefined;
  error: any;
  isLoading: boolean;
  page: number;
  mutate: KeyedMutator<ITasksResponse>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) => {

  if (isLoading)
    return (
      <div className="min-h-[200px] flex items-center justify-center">
        <LoadingIndicator />
      </div>
    );

  if (error)
    return <>{error?.errorMessage ?? "An error occurred. Please try again"}</>;

  if (data?.tasks?.length === 0)
    return (
      <div className="flex items-center">
        <h3>No task yet for this day</h3>
      </div>
    );

  if (data && data?.tasks?.length > 0)
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          {data.tasks.map((task) => (
            <TaskCard task={task} key={task._id} mutate={mutate} />
          ))}
        </div>
        <PaginationComp
          page={page}
          total={data.total}
          limit={data.limit}
          setPage={setPage}
        />
      </div>
    );
};

export default TaskList;
