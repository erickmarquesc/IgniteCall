import { CalendarStep } from "./CalendarStep";
import { ConfirmStep } from "./ConfirmStep";
import { useState } from "react";

export function ScheduleForm() {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>();

  const handleClearSelectedDate = () => {
    setSelectedDateTime(null);
  };

  if (selectedDateTime) {
    return <ConfirmStep
      schedulingDate={selectedDateTime}
      onCancelConfirmation={handleClearSelectedDate} />
  };

  return <CalendarStep onSelectDateTime={setSelectedDateTime}/>
};