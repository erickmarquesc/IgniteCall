import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { api } from "@/lib/axios";
import { useMemo } from "react";
import dayjs from "dayjs";

interface ICalendarWeek {
  week: number,
  days: Array<{
    date: dayjs.Dayjs,
    disabled: boolean | undefined,
  }>,
};

type CalendarWeeks = ICalendarWeek[];

interface IBlockDates {
  blockedWeekDays: number[],
};

export function CalcWeekCurrentMonth(currentDate: dayjs.Dayjs) {

  const router = useRouter();
  const username = String(router.query.username);

  const { data: blockedDates } = useQuery<IBlockDates>(
    ['blocked-dates', currentDate.get('year'), currentDate.get('month')],
    async () => {
      const response = await api.get(`/users/${username}/blocked-dates`, {
        params: {
          year: currentDate.get('year'),
          month: currentDate.get('month'),
        },
      })
      return response.data;
    });

  /*
   * Usei o memo aqui por questões de calculo 
   * assim os calculos são memorizados 
   */

  const calendarWeeks = useMemo(() => {
    /* 
     * daysInMonthArray é um array que retorn os dias do mês atuall começando no dia 1.
     *
     * 'date' é um atributo que representa o dia do mês
     *
     * firstWeekDay devolve o index do dia da semana do primeiro dia do mês sendo 0 domingo
     * tambem devolve exatamente a quantidade de dias do mês anterior
     * 
     * lastWeekDay devolve o index do ultimo dia da semana do ultimo dia do mês
     * 
     * previousMonthFilllArray são os dias do mês anterior
     * nextMonthFillArray são os dias do próximo mês
     */

    const totalDaysWeek = 7; // 7 days

    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, i) => {
      return currentDate.set('date', i + 1);
    });

    const firstWeekDay = currentDate.get('day');

    const previousMonthFilllArray = Array.from({
      length: firstWeekDay,
    }).map((_, i) => {
      return currentDate.subtract(i + 1, 'day');
    }).reverse();

    const lastDayInCurrentMonth = currentDate.set('date', currentDate.daysInMonth());
    const lastWeekDay = lastDayInCurrentMonth.get('day');

    const nextMonthFillArray = Array.from({
      length: totalDaysWeek - (lastWeekDay + 1),
    }).map((_, i) => {
      return lastDayInCurrentMonth.add(i + 1, 'day');
    });

    const calendarDays = [
      ...previousMonthFilllArray.map((date) => {
        return { date, disabled: true }
      }),
      ...daysInMonthArray.map((date) => {
        return {
          date,
          disabled:
            date.endOf('day').isBefore(new Date()) ||
            blockedDates?.blockedWeekDays.includes(date.get('day'))
        }
      }),
      ...nextMonthFillArray.map((date) => {
        return { date, disabled: true }
      }),
    ];

    const calendarWeeks = calendarDays.reduce<CalendarWeeks>(
      (weeks, _, i, original) => {
        const isNewWeek = i % totalDaysWeek === 0;

        if (isNewWeek) {
          weeks.push({
            week: i / totalDaysWeek + 1,
            days: original.slice(i, i + totalDaysWeek),
          })
        };

        return weeks;
      }, []);

    return calendarWeeks;
  }, [currentDate, blockedDates]);

  return calendarWeeks;
};