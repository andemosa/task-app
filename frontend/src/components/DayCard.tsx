import { forwardRef } from "react";

interface IDayCardProps {
  day: string;
  date: number;
  isSelected: boolean;
  handleSelect: () => void;
}

const DayCard = forwardRef<HTMLDivElement, IDayCardProps>(
  ({ isSelected, day, date, handleSelect }, ref) => (
    <div
      className={`flex flex-col items-center justify-center py-3 px-4 border rounded-lg shadow-[0px 1px 2px 0px rgba(16, 24, 40, 0.05)] font-semibold min-w-[70px] cursor-pointer ${
        isSelected
          ? "text-[#fff] border-[#D0D5DD] bg-[#3F5BF6]"
          : "text-[#344054] border-[#D0D5DD]"
      }`}
      onClick={handleSelect}
      ref={ref}
    >
      <p>{day}</p>
      <p>{date}</p>
    </div>
  )
);

export default DayCard;
