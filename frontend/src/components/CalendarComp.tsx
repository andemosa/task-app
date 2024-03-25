import { DatePickerComp } from "./DatePicker";

const CalendarComp = ({
  selected,
  onSelect,
}: {
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
}) => {
  return (
    <div className="flex justify-center">
      <DatePickerComp selected={selected} onSelect={onSelect} />
    </div>
  );
};

export default CalendarComp;
