import {
  FormError,
  IntervalBox,
  IntervalDay,
  IntervalItem,
  IntervalInputs,
  IntervalContainer,
} from "./styles";
import { Button, Checkbox, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { convertTimeStringToMinutes } from "@/utils/convert-time-string-to-minuts";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getWeekDays } from "@/utils/get-week-days";
import { Container, Header } from "../styles";
import { ArrowRight } from "phosphor-react";
import { api } from "@/lib/axios";
import { z } from "zod";

const timeIntervalsFormSchema = z.object({
  intervals: z.array(z.object({
    weekDay: z.number().min(0).max(6),
    enabled: z.boolean(),
    startTime: z.string(),
    endTime: z.string(),
  })).length(7).transform(/* intervals vem completo com os 7 dias */
    (intervals) => intervals.filter(/* filtro somente os dias ativos e devolvo um novo arrey */
      (interval) => interval.enabled)).refine(/* valido se apenas 1 foi devolvido e valido */
        (intervals) => intervals.length > 0, {/* caso nenhum seja enagled true mando a mensagem */
        message: 'É necessário selecionar pelomenos um dia da semana!'
      }).transform(
        (intervals) => {
          return intervals.map((interval) => {
            return {
              weekDay: interval.weekDay,
              startTimeInMinutes: convertTimeStringToMinutes(interval.startTime),
              endTimeInMinutes: convertTimeStringToMinutes(interval.endTime),
            }
          })
        }).refine((intervals) => {
          return intervals.every(
            (interval) => interval.endTimeInMinutes - 60 >= interval.startTimeInMinutes)
        }, {
          message: 'É necessário que haja um intervalo de 1h entre os horários!'
        })
});

type TimeIntervalsFormInput = z.input<typeof timeIntervalsFormSchema>
type TimeIntervalsFormOutput = z.output<typeof timeIntervalsFormSchema>

export default function TimeIntervals() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
    control } = useForm<TimeIntervalsFormInput>({
      resolver: zodResolver(timeIntervalsFormSchema),
      defaultValues: {
        intervals: [
          { weekDay: 0, enabled: false, startTime: '08:00', endTime: '18:00' },
          { weekDay: 1, enabled: true, startTime: '08:00', endTime: '18:00' },
          { weekDay: 2, enabled: true, startTime: '08:00', endTime: '18:00' },
          { weekDay: 3, enabled: true, startTime: '08:00', endTime: '18:00' },
          { weekDay: 4, enabled: true, startTime: '08:00', endTime: '18:00' },
          { weekDay: 5, enabled: true, startTime: '08:00', endTime: '18:00' },
          { weekDay: 6, enabled: false, startTime: '08:00', endTime: '18:00' },
        ]
      }
    });

  /* Permite manipular um array criado no defaultValues */
  const { fields } = useFieldArray({
    control,
    name: 'intervals',
  });

  const weekDays = getWeekDays();
  const intervalWatch = watch('intervals');

  const handleSetTimeIntervals = async (data: any) => {
    const { intervals } = data as TimeIntervalsFormOutput

    await api.post('/users/time-intervals', { intervals });
  };

  return (
    <Container>
      <Header>
        <Heading as='strong'>
          Quase lá!
        </Heading>
        <Text>
          Defina o intervalo de horários que você está disponível em cada dia da semana.
        </Text>

        <MultiStep size={4} currentStep={3} />

        <IntervalBox as="form" onSubmit={handleSubmit(handleSetTimeIntervals)}>
          <IntervalContainer>
            {fields.map((intervalItem, index) => {
              return (
                <IntervalItem key={intervalItem.id}>
                  <IntervalDay>
                    <Controller
                      name={`intervals.${index}.enabled`}
                      control={control}
                      render={({ field }) => {
                        return (
                          <Checkbox
                            onCheckedChange={(checked) => {
                              field.onChange(checked === true)
                            }}
                            checked={field.value}
                          />
                        )
                      }}
                    />
                    <Text>{weekDays[intervalItem.weekDay]}</Text>
                  </IntervalDay>
                  <IntervalInputs>
                    <TextInput
                      size="sm"
                      type="time"
                      step={60} /* Minutos de intervalo que vai aparecer nesse caso de hora em hora */
                      disabled={intervalWatch[index].enabled === false}
                      {...register(`intervals.${index}.startTime`)}
                    />
                    <TextInput
                      size="sm"
                      type="time"
                      step={60}
                      disabled={intervalWatch[index].enabled === false}
                      {...register(`intervals.${index}.endTime`)}
                    />
                  </IntervalInputs>
                </IntervalItem>
              )
            })}
          </IntervalContainer>

          {errors.intervals && (
            <FormError size="sm">
              {errors.intervals.message}
            </FormError>
          )}

          <Button type="submit" disabled={isSubmitting}>
            Próximo passo
            <ArrowRight />
          </Button>
        </IntervalBox>

      </Header>
    </Container>
  );
};