import { CaretLeft, CaretRight } from "phosphor-react";
import { getWeekDays } from "@/utils/get-week-days";
import {
  CalendarContainer,
  CalendarHeader,
  CalendarTitle,
  CalendarActions,
  CalendarBody,
  CalendarDay,
} from "./styles";
import { useState } from "react";
import dayjs from "dayjs";
import { CalcWeekCurrentMonth } from "./CalcWeekCurrentMonth";

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(() => {
    return (
      dayjs().set("date", 1) /* Mês atual */
    )
  });

  /* FORMATO DO MÊS POR EXTENSO */
  const currentMonth = currentDate.format('MMMM');
  /* FORMATO DO ANO POR EXTENSO */
  const currentYear = currentDate.format('YYYY');

  const shortWeekDays = getWeekDays({ short: true });

  const handlePreviousMonth = () => {
    const previousMonthDate = currentDate.subtract(1, 'month');
    setCurrentDate(previousMonthDate);
  };

  const handleNextMonth = () => {
    const nextMonthDate = currentDate.add(1, 'month');
    setCurrentDate(nextMonthDate);
  };

  const calendarWeeks = CalcWeekCurrentMonth(currentDate);

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          {currentMonth} <span>{currentYear}</span>
        </CalendarTitle>

        <CalendarActions>
          <button
            title="Previous month"
            onClick={handlePreviousMonth}>
            <CaretLeft />
          </button>
          <button
            title="Next month"
            onClick={handleNextMonth}>
            <CaretRight />
          </button>
        </CalendarActions>
      </CalendarHeader>

      <CalendarBody>
        <thead>
          <tr>
            {shortWeekDays.map((weekDay) => {
              return (
                <th key={weekDay}>{weekDay}.</th>
              )
            })}
          </tr>
        </thead>
        <tbody>
            {calendarWeeks.map(({week,days}) => {
              return (
                <tr key={week}>
                  {days.map(({date,disabled}) => {
                    return (
                      <td key={date.toString()}>
                        <CalendarDay disabled={disabled}>
                          {date.get('date')}
                        </CalendarDay>
                      </td>
                    )
                  })}
                </tr>
              )
            })}
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  );
};