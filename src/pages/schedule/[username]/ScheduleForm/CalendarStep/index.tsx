import { Container, TimePicker, TimePickerHeader, TimePickerItem, TimePickerList } from "./styles";
import { Calendar } from "@/components/Calendar";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { api } from "@/lib/axios";
import { useState } from "react";
import dayjs from "dayjs";

interface IAvailability {
  possibleTimes: number[],
  availableTimes: number[],
};

interface ICalendarStepProps {
  onSelectDateTime: (date: Date) => void,
};

export function CalendarStep({ onSelectDateTime }: ICalendarStepProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const router = useRouter();
  const username = String(router.query.username);

  const isDateSelected = !!selectedDate;

  const selectedWeekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null;
  const selectedMonthDay = selectedDate ? dayjs(selectedDate).format('DD[ de ]MMMM') : null;
  const selectedDateWithouTime = selectedDate ? dayjs(selectedDate).format('YYYY-MM-DD') : null;

  const { data: availability } = useQuery<IAvailability>(['availability', selectedDateWithouTime],
    async () => {
      const response = await api.get(`/users/${username}/availability`, {
        params: {
          date: selectedDateWithouTime,
        },
      })
      return response.data;
    },
    {
      enabled: !!selectedDate,
    });

  const handleSelectTime = (hour: number) => { 
    const dateWithTime = dayjs(selectedDate).set('hour', hour).startOf('hour').toDate();

    onSelectDateTime(dateWithTime);
  };

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar selectedDate={selectedDate} onDeteSelected={setSelectedDate} />

      {isDateSelected && (
        <TimePicker>
          <TimePickerHeader>
            {selectedWeekDay} <span>{selectedMonthDay}</span>
          </TimePickerHeader>

          <TimePickerList>
            {availability?.possibleTimes.map((hour) => {
              return (
                <TimePickerItem
                  key={hour}
                  onClick={() => handleSelectTime(hour)}
                  disabled={!availability.availableTimes.includes(hour)}>
                  {String(hour).padStart(2, '0')}:00h
                </TimePickerItem>

              )
            })}

          </TimePickerList>
        </TimePicker>)}
    </Container>
  );
};