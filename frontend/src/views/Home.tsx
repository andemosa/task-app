import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import useSWR from "swr";

import CalendarComp from "@/components/CalendarComp";
import Header from "@/components/Header";
import DayCard from "@/components/DayCard";
import ViewTask from "@/components/ViewTask";
import TaskDisplay from "@/components/TaskDisplay";
import DeleteTask from "@/components/DeleteTask";
import { DatePickerComp } from "@/components/DatePicker";
import { MicrophoneIcon } from "@/components/Icons";
import TaskList from "@/components/TaskList";
import LoginForm from "@/components/LoginForm";
import ProfileForm from "@/components/ProfileForm";
import RegisterForm from "@/components/RegisterForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";

import { useMediaQuery } from "@/hooks/useMediaQuery";

import { getDaysInMonth } from "@/utils/helpers";
import {
  CALENDARDISPLAY,
  DELETETASKDISPLAY,
  LOGINMODAL,
  PROFILEMODAL,
  REGISTERMODAL,
  TASKDISPLAY,
  VIEWTASKDISPLAY,
  dayList,
} from "@/utils/constants";
import { ITasksResponse } from "@/interfaces/task";

import { useDialogDisplayContext } from "@/context/useDialogDisplayContext";
import { useAuthContext } from "@/context/useAuthContext";
import { useModalContext } from "@/context/useModalContext";

const timeNow = new Date().getHours();
const greeting =
  timeNow >= 0 && timeNow < 12
    ? " Good morning"
    : timeNow >= 12 && timeNow < 18
    ? " Good afternoon"
    : "Good evening";

const Home = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [page, setPage] = useState(1);
  const { data, error, isLoading, mutate } = useSWR<ITasksResponse>([
    "/tasks",
    `?date=${date?.getFullYear()}-${String(
      date && date?.getMonth() + 1
    ).padStart(2, "0")}-${String(date?.getDate()).padStart(
      2,
      "0"
    )}&page=${page}`,
  ]);
  const { open, display, selectedTask, openAddDisplay } =
    useDialogDisplayContext();
  const { user } = useAuthContext();
  const { modalOpen, modalDisplay } = useModalContext();
  const isMobile = useMediaQuery("(min-width: 1024px)");

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollToSection();
  }, [date]);

  const scrollToSection = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  return (
    <>
      <Header />
      <section className="lg:px-10 xl:px-20 pt-32 px-4 min-h-full max-w-[1440px] mx-auto pb-28 lg:pb-4">
        <div className="flex items-center gap-4 justify-between ">
          <div>
            <h1 className="text-[#101828] font-bold text-xl">{greeting}!</h1>
            <p className="text-[#475467]">You got some task to do.</p>
          </div>
          <Button
            className="bg-[#3F5BF6] hidden lg:flex"
            onClick={openAddDisplay}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create New Task
          </Button>
        </div>
        <div className="min-h-[300px] mt-4 flex">
          <div className="w-full lg:w-2/3 grow-0 border-r border-[#EAECF0] lg:pr-4 flex flex-col gap-4">
            <section className="flex flex-col gap-2">
              <div className="flex justify-between sm:items-center flex-col sm:flex-row">
                <h2 className="text-[#101828] font-bold">
                  {date?.toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                  })}
                </h2>
                <div className="flex justify-end lg:hidden">
                  <DatePickerComp selected={date} onSelect={setDate} />
                </div>
              </div>
              <div className="flex gap-4 w-full overflow-x-auto no-scrollbar">
                {getDaysInMonth(date!).map((dayObj, idx) => (
                  <DayCard
                    key={idx}
                    date={dayObj.getDate()}
                    day={dayList[dayObj.getDay()].slice(0, 3)}
                    handleSelect={() => setDate(dayObj)}
                    isSelected={dayObj.getDate() === date?.getDate()}
                    ref={
                      dayObj.getDate() === date?.getDate()
                        ? scrollRef
                        : undefined
                    }
                  />
                ))}
              </div>
            </section>
            <section className="flex flex-col gap-3">
              <h2 className="text-[#101828] font-bold">My Tasks</h2>
              <div className="min-h-[200px]">
                {!user ? (
                  <h3 className="font-medium">
                    Sign in to start creating tasks
                  </h3>
                ) : (
                  <TaskList
                    data={data}
                    error={error}
                    isLoading={isLoading}
                    page={page}
                    mutate={mutate}
                    setPage={setPage}
                    key={user?._id}
                  />
                )}
              </div>
            </section>
          </div>
          <div className="w-1/3 pl-4 hidden lg:block">
            {display === CALENDARDISPLAY && (
              <CalendarComp selected={date} onSelect={setDate} />
            )}
            {display === VIEWTASKDISPLAY && <ViewTask />}
            {display === TASKDISPLAY && (
              <TaskDisplay mutate={mutate} key={selectedTask?._id} />
            )}
            {display === DELETETASKDISPLAY && <DeleteTask mutate={mutate} />}
          </div>
        </div>
      </section>
      <section className="fixed bottom-0 left-0 w-full bg-white z-3 p-4 lg:hidden">
        <AlertDialog open={isMobile ? false : open}>
          <div
            className="flex justify-between items-center bg-[#F9FAFB] border border-[#D0D5DD] p-3 rounded-lg cursor-pointer"
            onClick={openAddDisplay}
          >
            <p className="text-[#475467] py-1">Input task</p>
            <MicrophoneIcon />
          </div>
          <AlertDialogContent>
            {display === VIEWTASKDISPLAY && <ViewTask />}
            {display === TASKDISPLAY && (
              <TaskDisplay mutate={mutate} key={selectedTask?._id} />
            )}
            {display === DELETETASKDISPLAY && <DeleteTask mutate={mutate} />}
          </AlertDialogContent>
        </AlertDialog>
      </section>
      <Dialog open={modalOpen}>
        <DialogContent>
          {modalDisplay === REGISTERMODAL && <RegisterForm mutate={mutate} />}
          {modalDisplay === LOGINMODAL && <LoginForm mutate={mutate} />}
          {modalDisplay === PROFILEMODAL && <ProfileForm />}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Home;
